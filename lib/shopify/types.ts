export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  images: Image[];
  variants: {
    nodes: ProductVariant[];
    edges: {
      nodes: ProductVariant[];
    }
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