import { ParsedUrlQuery } from "querystring";

/**
 * Get variables for route loader to support pagination
 * @param autoLoadOnScroll enable auto loading
 * @param inView trigger element is in viewport
 * @param isIdle page transition is idle
 * @param connection Storefront API connection
 * @returns cumulativePageInfo {startCursor, endCursor, hasPreviousPage, hasNextPage}
 */
export function getPaginationVariables(
  searchParams: ParsedUrlQuery,
  pageBy: number
) {
  //   const searchParams = new URLSearchParams(new URL(request.url).search);

  const cursor = searchParams["cursor"] ?? undefined;
  const direction =
    searchParams["direction"] === "previous" ? "previous" : "next";
  const isPrevious = direction === "previous";

  const prevPage = {
    last: pageBy,
    startCursor: cursor ?? null,
  };

  const nextPage = {
    first: pageBy,
    endCursor: cursor ?? null,
  };

  const variables = isPrevious ? prevPage : nextPage;

  return variables;
}
