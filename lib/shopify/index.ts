import { SHOPIFY_GRAPHQL_API_ENDPOINT } from "@/lib/constants";
import { isShopifyError } from "@/lib/type-guards";
import { LAYOUT_QUERY } from "./queries/layout";
import { ALL_PRODUCTS_QUERY } from "./queries/product";
import { COLLECTIONS_QUERY } from "./queries/collection";
import {
  Cart,
  Blog,
  CollectionConnection,
  Connection,
  ProductConnection,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
  ShopifyFeaturedCollectionOperation,
  ShopifyFeaturedProductOperation,
  ShopifyHeroOperation,
  ShopifyHomePageSeoOperation,
  ShopifyLayoutOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
} from "./types";
import {
  HOMEPAGE_FEATURED_PRODUCTS_QUERY,
  COLLECTION_HERO_QUERY,
  FEATURED_COLLECTIONS_QUERY,
} from "./queries/homepage";
import { createCartMutation, addToCartMutation, removeFromCartMutation, editCartItemsMutation } from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import { ARTICLE_QUERY, BLOGS_QUERY } from "./queries/blog";

const domain = `https://${process.env.PUBLIC_STORE_DOMAIN!}`;
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.PUBLIC_STOREFRONT_API_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};


const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: "USD",
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
};

export async function shopifyFetch<T>({
  query,
  variables,
  headers,
  cache = "force-cache",
}: {
  query: string;
  variables?: ExtractVariables<T>;
  headers?: HeadersInit;
  cache?: RequestCache;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      next: { revalidate: 900 }, // 15 minutes
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e,
      query,
    };
  }
}

export async function getLayoutData() {
  const data = await shopifyFetch<ShopifyLayoutOperation>({
    query: LAYOUT_QUERY,
    variables: {
      headerMenuHandle: "main-menu",
      footerMenuHandle: "footer",
    },
  });
  return data;
}

export async function getAllProducts({
  variables,
}: {
  variables: {
    last?: number;
    startCursor?: string;
    first?: number;
    endCursor?: string;
  };
}) {
  const data = await shopifyFetch<{
    data: {
      products: ProductConnection;
    };
    variables: {
      last?: number;
      startCursor?: string;
      first?: number;
      endCursor?: string;
    };
  }>({
    query: ALL_PRODUCTS_QUERY,
    variables: {
      ...variables,
    },
  });
  return data;
}

export async function getAllCollections({
  variables,
}: {
  variables: {
    last?: number;
    startCursor?: string;
    first?: number;
    endCursor?: string;
  };
}) {
  const data = await shopifyFetch<{
    data: {
      collections: CollectionConnection;
    };
    variables: {
      last?: number;
      startCursor?: string;
      first?: number;
      endCursor?: string;
    };
  }>({
    query: COLLECTIONS_QUERY,
    variables: {
      ...variables,
    },
  });
  return data;
}

export async function getHomepageSeo() {
  const data = await shopifyFetch<ShopifyHomePageSeoOperation>({
    query: COLLECTION_HERO_QUERY,
    variables: {
      handle: "hydrogen",
    },
  });
  return data;
}

export async function getFeaturedProducts() {
  const data = await shopifyFetch<ShopifyFeaturedProductOperation>({
    query: HOMEPAGE_FEATURED_PRODUCTS_QUERY,
  });
  return data;
}

export async function getSecondaryHero() {
  const data = await shopifyFetch<ShopifyHeroOperation>({
    query: COLLECTION_HERO_QUERY,
    variables: {
      handle: "automated-collection",
    },
  });
  return data;
}

export async function getFeaturedCollections() {
  const data = await shopifyFetch<ShopifyFeaturedCollectionOperation>({
    query: FEATURED_COLLECTIONS_QUERY,
  });
  return data;
}

export async function getTertiaryHero() {
  const data = await shopifyFetch<ShopifyHeroOperation>({
    query: COLLECTION_HERO_QUERY,
    variables: {
      handle: "frontpage",
    },
  });
  return data;
}

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-store",
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    cache: "no-store",
  });

  if (!res.body.data.cart) {
    return null;
  }

  return reshapeCart(res.body.data.cart);
}
export async function getAllPosts({
  variables,
}: {
  variables: {
    cursor?: string;
    pageBy?: number;
    blogHandle: string;
  };
}) {
  const data = await shopifyFetch<{
    data: {
      blog: Blog;
    };
    variables: {
      cursor?: string;
      pageBy?: number;
      blogHandle: string;
    };
  }>({
    query: BLOGS_QUERY,
    variables: {
      ...variables,
    },
  });
  return data;
}

export async function getArticleByHandle({
  variables,
}: {
  variables: {
    articleHandle: string;
    blogHandle: string;
  };
}) {
  const data = await shopifyFetch<{
    data: {
      blog: Blog;
    };
    variables: {
      articleHandle: string;
      blogHandle: string;
    };
  }>({
    query: ARTICLE_QUERY,
    variables: {
      ...variables,
    },
  });
  return data;
}
