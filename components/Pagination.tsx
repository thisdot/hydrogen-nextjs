import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { PageInfo, ProductConnection } from "@/lib/shopify/types";

type Connection = {
  nodes: ProductConnection["nodes"] | any[];
  pageInfo: PageInfo;
};

type PaginationState = {
  nodes: ProductConnection["nodes"] | any[];
  pageInfo: PageInfo | null;
};

type Props<Resource extends Connection> = {
  connection: Resource;
  autoLoadOnScroll?: boolean;
};

interface PaginationInfo {
  endCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  nextLinkRef: any;
  nextPageUrl: string;
  nodes: ProductConnection["nodes"] | any[];
  prevPageUrl: string;
  startCursor?: string;
}

export function Pagination<Resource extends Connection>({
  connection,
  children = () => null,
  autoLoadOnScroll = true,
}: Props<Resource> & {
  children: ({
    endCursor,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    nextPageUrl,
    nodes,
    prevPageUrl,
    startCursor,
  }: PaginationInfo) => JSX.Element | null;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [nextLinkRef, setNextLinkRef] = useState(null);
  const [inView, setInView] = useState(false);
  const {
    endCursor,
    hasNextPage,
    hasPreviousPage,
    nextPageUrl,
    nodes,
    prevPageUrl,
    startCursor,
  } = usePagination(connection);

  // auto load next page if in view
  useEffect(() => {
    if (!autoLoadOnScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isLoading) {
          setIsLoading(true);
          router.push(nextPageUrl).then(() => setIsLoading(false));
        }
      },
      {
        rootMargin: "1000px 0px 0px 0px",
      }
    );

    if (nextLinkRef) {
      observer.observe(nextLinkRef);
      return () => observer.unobserve(nextLinkRef);
    }
  }, [
    autoLoadOnScroll,
    hasNextPage,
    isLoading,
    nextPageUrl,
    nextLinkRef,
    router,
  ]);

  return children({
    endCursor,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    nextLinkRef: setNextLinkRef,
    nextPageUrl,
    nodes,
    prevPageUrl,
    startCursor,
  });
}

/**
 * Get cumulative pagination logic for a given connection
 */
export function usePagination(
  connection: Connection
): Omit<PaginationInfo, "isLoading" | "nextLinkRef"> {
  const [nodes, setNodes] = useState(connection.nodes);
  const router = useRouter();
  const { nodes: stateNodes, pageInfo: statePageInfo } = router.query;
  const state = useMemo(
    () => ({
      nodes: stateNodes || [],
      pageInfo: statePageInfo || null,
    }),
    [stateNodes, statePageInfo]
  );
  const params = new URLSearchParams(router.asPath.split("?")[1] || "");
  const direction = params.get("direction");
  const isPrevious = direction === "previous";

  const { hasNextPage, hasPreviousPage, startCursor, endCursor } =
    connection.pageInfo;

  const currentPageInfo = useMemo(() => {
    let pageStartCursor =
      state?.pageInfo?.startCursor === undefined
        ? startCursor
        : state.pageInfo.startCursor;

    let pageEndCursor =
      state?.pageInfo?.endCursor === undefined
        ? endCursor
        : state.pageInfo.endCursor;

    if (state?.nodes) {
      if (isPrevious) {
        pageStartCursor = startCursor;
      } else {
        pageEndCursor = endCursor;
      }
    }

    const previousPageExists =
      state?.pageInfo?.hasPreviousPage === undefined
        ? hasPreviousPage
        : state.pageInfo.hasPreviousPage;

    const nextPageExists =
      state?.pageInfo?.hasNextPage === undefined
        ? hasNextPage
        : state.pageInfo.hasNextPage;

    return {
      startCursor: pageStartCursor,
      endCursor: pageEndCursor,
      hasPreviousPage: previousPageExists,
      hasNextPage: nextPageExists,
    };
  }, [isPrevious, state, hasNextPage, hasPreviousPage, startCursor, endCursor]);

  const prevPageUrl = useMemo(() => {
    const params = new URLSearchParams(router.asPath.split("?")[1] || "");
    params.set("direction", "previous");
    currentPageInfo.startCursor &&
      params.set("cursor", currentPageInfo.startCursor);
    return `${router.pathname}?${params.toString()}`;
  }, [router, currentPageInfo.startCursor]);

  const nextPageUrl = useMemo(() => {
    const params = new URLSearchParams(router.asPath.split("?")[1] || "");
    params.set("direction", "next");
    currentPageInfo.endCursor &&
      params.set("cursor", currentPageInfo.endCursor);
    return `${router.pathname}?${params.toString()}`;
  }, [router, currentPageInfo.endCursor]);

  // the only way to prevent hydration mismatches
  useEffect(() => {
    if (!state || !state?.nodes) {
      setNodes(connection.nodes);
      return;
    }

    if (isPrevious) {
      setNodes([...connection.nodes, ...state.nodes]);
    } else {
      setNodes([...state.nodes, ...connection.nodes]);
    }
  }, [state, isPrevious, connection.nodes]);

  return { ...currentPageInfo, prevPageUrl, nextPageUrl, nodes };
}
