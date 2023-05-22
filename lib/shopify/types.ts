export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  images: Image[];
  variants: {
    nodes: ProductVariant[];
    edges: {
      node: ProductVariant;
    }[]
  }
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
  image: Image;
  compareAtPrice: Money;
  sku: string | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
  vendor: string;
  productType: string;
  publishedAt: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyAnalyticsProduct = {
  /** Product id in the form of `gid://shopify/Product/<id>`. */
  productGid: Product['id'];
  /** Variant id in the form of `gid://shopify/ProductVariant/<id>`. */
  variantGid?: ProductVariant['id'];
  /** Product name. */
  name: Product['title'];
  /** Variant name. */
  variantName?: ProductVariant['title'];
  /** Product brand or vendor. */
  brand: Product['vendor'];
  /** Product category or type. */
  category?: Product['productType'];
  /** Product price. */
  price: ProductVariant['price']['amount'];
  /** Product sku. */
  sku?: ProductVariant['sku'];
  /** Quantity of the product in this event. */
  quantity?: number;
};

export type ProductVariantConnection = {
  __typename?: 'ProductVariantConnection';
  /** A list of edges. */
  edges: Array<ProductVariantEdge>;
  /** A list of the nodes contained in ProductVariantEdge. */
  nodes: Array<ProductVariant>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one ProductVariant and a cursor during pagination.
 *
 */
export type ProductVariantEdge = {
  __typename?: 'ProductVariantEdge';
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of ProductVariantEdge. */
  node: ProductVariant;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last node in edges. */
  endCursor?: string | null;
  /** Whether there are more pages to fetch following the current page. */
  hasNextPage: boolean | null;
  /** Whether there are any pages prior to the current page. */
  hasPreviousPage: boolean | null;
  /** The cursor corresponding to the first node in edges. */
  startCursor?: string | null;
};