export type Shop = {
  id: string;
  name: string;
  description: string | null;
  primaryDomain: {
    url: string;
  };
  brand: {
    logo?: {
      image: {
        url: string;
      };
    };
  };
};

export type ShopifyHeaderMenu = {
  id: string;
  items: Array<{
    id: string;
    resourceId: string | null;
    tags: Array<string>;
    title: string;
    type: string;
    url: string;
    items: Array<{
      id: string;
      resourceId: string | null;
      tags: Array<string>;
      title: string;
      type: string;
      url: string;
    }>;
  }>;
};

export type ShopifyFooterMenu = {
  id: string;
  items: Array<{
    id: string;
    resourceId: string | null;
    tags: Array<string>;
    title: string;
    type: string;
    url: string;
    items?: Array<{
      id: string;
      resourceId: string | null;
      tags: Array<string>;
      title: string;
      type: string;
      url: string;
    }>;
  }>;
};

export type ShopifyFooterItem = {
  id: string;
  resourceId: string | null;
  tags: Array<string>;
  title: string;
  type: string;
  url: string;
  items?: Array<{
    id: string;
    resourceId: string | null;
    tags: Array<string>;
    title: string;
    type: string;
    url: string;
  }>;
};

export type ShopifyLayoutOperation = {
  data: {
    shop: Shop;
    headerMenu: ShopifyHeaderMenu;
    footerMenu: ShopifyFooterMenu;
  };
  variables: {
    headerMenuHandle: string;
    footerMenuHandle: string;
  };
};

export type Maybe<T> = T | null;

export type Product = Omit<ShopifyProduct, "variants" | "images"> & {
  images: Image[];
  variants: {
    nodes: ProductVariant[];
    edges: {
      node: ProductVariant;
    }[];
  };
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
  productGid: Product["id"];
  /** Variant id in the form of `gid://shopify/ProductVariant/<id>`. */
  variantGid?: ProductVariant["id"];
  /** Product name. */
  name: Product["title"];
  /** Variant name. */
  variantName?: ProductVariant["title"];
  /** Product brand or vendor. */
  brand: Product["vendor"];
  /** Product category or type. */
  category?: Product["productType"];
  /** Product price. */
  price: ProductVariant["price"]["amount"];
  /** Product sku. */
  sku?: ProductVariant["sku"];
  /** Quantity of the product in this event. */
  quantity?: number;
};

export type ProductVariantConnection = {
  __typename?: "ProductVariantConnection";
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
  __typename?: "ProductVariantEdge";
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of ProductVariantEdge. */
  node: ProductVariant;
};

export type PageInfo = {
  __typename?: "PageInfo";
  /** The cursor corresponding to the last node in edges. */
  endCursor?: string | null;
  /** Whether there are more pages to fetch following the current page. */
  hasNextPage: boolean | null;
  /** Whether there are any pages prior to the current page. */
  hasPreviousPage: boolean | null;
  /** The cursor corresponding to the first node in edges. */
  startCursor?: string | null;
};

export type Collection = HasMetafields &
  Node &
  OnlineStorePublishable & {
    __typename?: "Collection";
    /** Stripped description of the collection, single line with HTML tags removed. */
    description: string;
    /** The description of the collection, complete with HTML formatting. */
    descriptionHtml: string;
    /**
     * A human-friendly unique string for the collection automatically generated from its title.
     * Limit of 255 characters.
     *
     */
    handle: string;
    /** A globally-unique identifier. */
    id: string;
    /** Image associated with the collection. */
    image?: Maybe<Image>;
    /** Returns a metafield found by namespace and key. */
    metafield?: Maybe<Metafield>;
    /**
     * The metafields associated with the resource matching the supplied list of namespaces and keys.
     *
     */
    metafields: Array<Maybe<Metafield>>;
    /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
    onlineStoreUrl?: Maybe<string>;
    /** List of products in the collection. */
    products: ProductConnection;
    /** The collection's SEO information. */
    seo: Seo;
    /** The collection’s name. Limit of 255 characters. */
    title: string;
    /** The date and time when the collection was last modified. */
    updatedAt: string;
  };

export type ProductConnection = {
  __typename?: "ProductConnection";
  /** A list of edges. */
  edges: Array<ProductEdge>;
  /** A list of available filters. */
  filters: Array<Filter>;
  /** A list of the nodes contained in ProductEdge. */
  nodes: Array<Product>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ProductEdge = {
  __typename?: "ProductEdge";
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of ProductEdge. */
  node: Product;
};

export type Filter = {
  __typename?: "Filter";
  /** A unique identifier. */
  id: string;
  /** A human-friendly string for this filter. */
  label: string;
  /** An enumeration that denotes the type of data this filter represents. */
  type: FilterType;
  /** The list of values for this filter. */
  values: Array<FilterValue>;
};

export type FilterType =
  /** A boolean value. */
  | "BOOLEAN"
  /** A list of selectable values. */
  | "LIST"
  /** A range of prices. */
  | "PRICE_RANGE";

export type FilterValue = {
  __typename?: "FilterValue";
  /** The number of results that match this filter value. */
  count: number;
  /** A unique identifier. */
  id: string;
  /**
   * An input object that can be used to filter by this value on the parent field.
   *
   * The value is provided as a helper for building dynamic filtering UI. For example, if you have a list of selected `FilterValue` objects, you can combine their respective `input` values to use in a subsequent query.
   *
   */
  input: unknown;
  /** A human-friendly string for this filter value. */
  label: string;
};

export type HasMetafields = {
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<Metafield>;
  /**
   * The metafields associated with the resource matching the supplied list of namespaces and keys.
   *
   */
  metafields: Array<Maybe<Metafield>>;
};

export type Metafield = Node & {
  __typename?: "Metafield";
  /** The date and time when the storefront metafield was created. */
  createdAt: string;
  /** The description of a metafield. */
  description?: Maybe<string>;
  /** A globally-unique identifier. */
  id: string;
  /** The key name for a metafield. */
  key: string;
  /** The namespace for a metafield. */
  namespace: string;
  /** The parent object that the metafield belongs to. */
  parentResource: MetafieldParentResource;
  /** Returns a reference object if the metafield definition's type is a resource reference. */
  reference?: Maybe<MetafieldReference>;
  /** A list of reference objects if the metafield's type is a resource reference list. */
  references?: Maybe<MetafieldReferenceConnection>;
  /**
   * The type name of the metafield.
   * See the list of [supported types](https://shopify.dev/apps/metafields/definitions/types).
   *
   */
  type: string;
  /** The date and time when the storefront metafield was updated. */
  updatedAt: string;
  /** The value of a metafield. */
  value: string;
};

export type Node = {
  /** A globally-unique identifier. */
  id: string;
};

export type MetafieldParentResource =
  | Article
  | Blog
  // | Cart
  | Collection
  // | Customer
  | Location
  // | Market
  // | Order
  // | Page
  | Product
  | ProductVariant;
// | Shop;

export type MetafieldReference =
  | Collection
  // | GenericFile
  | MediaImage
  // | Metaobject
  // | Page
  | Product
  | ProductVariant;
// | Video;

export type MetafieldReferenceConnection = {
  __typename?: "MetafieldReferenceConnection";
  /** A list of edges. */
  edges: Array<MetafieldReferenceEdge>;
  /** A list of the nodes contained in MetafieldReferenceEdge. */
  nodes: Array<MetafieldReference>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type MetafieldReferenceEdge = {
  __typename?: "MetafieldReferenceEdge";
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of MetafieldReferenceEdge. */
  node: MetafieldReference;
};

export type Article = HasMetafields &
  Node &
  OnlineStorePublishable & {
    __typename?: "Article";
    /**
     * The article's author.
     * @deprecated Use `authorV2` instead.
     */
    author: ArticleAuthor;
    /** The article's author. */
    authorV2?: Maybe<ArticleAuthor>;
    /** The blog that the article belongs to. */
    blog: Blog;
    /** List of comments posted on the article. */
    comments: CommentConnection;
    /** Stripped content of the article, single line with HTML tags removed. */
    content: string;
    /** The content of the article, complete with HTML formatting. */
    contentHtml: string;
    /** Stripped excerpt of the article, single line with HTML tags removed. */
    excerpt?: Maybe<string>;
    /** The excerpt of the article, complete with HTML formatting. */
    excerptHtml?: Maybe<string>;
    /**
     * A human-friendly unique string for the Article automatically generated from its title.
     *
     */
    handle: string;
    /** A globally-unique identifier. */
    id: string;
    /** The image associated with the article. */
    image?: Maybe<Image>;
    /** Returns a metafield found by namespace and key. */
    metafield?: Maybe<Metafield>;
    /**
     * The metafields associated with the resource matching the supplied list of namespaces and keys.
     *
     */
    metafields: Array<Maybe<Metafield>>;
    /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
    onlineStoreUrl?: Maybe<string>;
    /** The date and time when the article was published. */
    publishedAt: string;
    /** The article’s SEO information. */
    seo?: Maybe<Seo>;
    /** A categorization that a article can be tagged with. */
    tags: Array<string>;
    /** The article’s name. */
    title: string;
  };

export type OnlineStorePublishable = {
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<string>;
};

export type ArticleAuthor = {
  __typename?: "ArticleAuthor";
  /** The author's bio. */
  bio?: Maybe<string>;
  /** The author’s email. */
  email: string;
  /** The author's first name. */
  firstName: string;
  /** The author's last name. */
  lastName: string;
  /** The author's full name. */
  name: string;
};

export type Blog = HasMetafields &
  Node &
  OnlineStorePublishable & {
    __typename?: "Blog";
    /** Find an article by its handle. */
    articleByHandle?: Maybe<Article>;
    /** List of the blog's articles. */
    articles: ArticleConnection;
    /** The authors who have contributed to the blog. */
    authors: Array<ArticleAuthor>;
    /**
     * A human-friendly unique string for the Blog automatically generated from its title.
     *
     */
    handle: string;
    /** A globally-unique identifier. */
    id: string;
    /** Returns a metafield found by namespace and key. */
    metafield?: Maybe<Metafield>;
    /**
     * The metafields associated with the resource matching the supplied list of namespaces and keys.
     *
     */
    metafields: Array<Maybe<Metafield>>;
    /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
    onlineStoreUrl?: Maybe<string>;
    /** The blog's SEO information. */
    seo?: Maybe<Seo>;
    /** The blogs’s title. */
    title: string;
  };

export type ArticleConnection = {
  __typename?: "ArticleConnection";
  /** A list of edges. */
  edges: Array<ArticleEdge>;
  /** A list of the nodes contained in ArticleEdge. */
  nodes: Array<Article>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ArticleEdge = {
  __typename?: "ArticleEdge";
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of ArticleEdge. */
  node: Article;
};

export type CommentConnection = {
  __typename?: "CommentConnection";
  /** A list of edges. */
  edges: Array<CommentEdge>;
  /** A list of the nodes contained in CommentEdge. */
  nodes: Array<Comment>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type CommentEdge = {
  __typename?: "CommentEdge";
  /** A cursor for use in pagination. */
  cursor: string;
  /** The item at the end of CommentEdge. */
  node: Comment;
};

  export type Seo = {
    __typename?: 'SEO';
    /** The meta description. */
    description?: Maybe<string>;
    /** The SEO title. */
    title?: Maybe<string>;
  };

  export type Media = {
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<string>;
  /** The media content type. */
  mediaContentType: MediaContentType;
  /** The presentation for a media. */
  presentation?: Maybe<MediaPresentation>;
  /** The preview image for the media. */
  previewImage?: Maybe<Image>;
};

export type MediaContentType =
  /** An externally hosted video. */
  | 'EXTERNAL_VIDEO'
  /** A Shopify hosted image. */
  | 'IMAGE'
  /** A 3d model. */
  | 'MODEL_3D'
  /** A Shopify hosted video. */
  | 'VIDEO';

  export type MediaPresentation = Node & {
  __typename?: 'MediaPresentation';
  /** A JSON object representing a presentation view. */
  asJson?: Maybe<unknown>;
  /** A globally-unique identifier. */
  id: string;
};

export type Video = Media &
  Node & {
    __typename?: 'Video';
    /** A word or phrase to share the nature or contents of a media. */
    alt?: Maybe<string>;
    /** A globally-unique identifier. */
    id: string;
    /** The media content type. */
    mediaContentType: MediaContentType;
    /** The presentation for a media. */
    presentation?: Maybe<MediaPresentation>;
    /** The preview image for the media. */
    previewImage?: Maybe<Image>;
    /** The sources for a video. */
    sources: Array<VideoSource>;
  };

  export type VideoSource = {
  __typename?: 'VideoSource';
  /** The format of the video source. */
  format: string;
  /** The height of the video. */
  height: number;
  /** The video MIME type. */
  mimeType: string;
  /** The URL of the video. */
  url: string;
  /** The width of the video. */
  width: number;
};
