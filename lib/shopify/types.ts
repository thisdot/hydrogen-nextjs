import { FiltersQueryParams } from '@/app/collections/[collectionHandle]/page';
import { CollectionHero } from '@/components/Hero';

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

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
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

export type Collection = HasMetafields &
	Node &
	OnlineStorePublishable & {
		__typename?: 'Collection';
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
	__typename?: 'ProductConnection';
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
	__typename?: 'ProductEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of ProductEdge. */
	node: Product;
};

export type Filter = {
	__typename?: 'Filter';
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
	| 'BOOLEAN'
	/** A list of selectable values. */
	| 'LIST'
	/** A range of prices. */
	| 'PRICE_RANGE';

export type FilterValue = {
	__typename?: 'FilterValue';
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
	__typename?: 'Metafield';
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
	__typename?: 'MetafieldReferenceConnection';
	/** A list of edges. */
	edges: Array<MetafieldReferenceEdge>;
	/** A list of the nodes contained in MetafieldReferenceEdge. */
	nodes: Array<MetafieldReference>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

export type MetafieldReferenceEdge = {
	__typename?: 'MetafieldReferenceEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of MetafieldReferenceEdge. */
	node: MetafieldReference;
};

export type Article = HasMetafields &
	Node &
	OnlineStorePublishable & {
		__typename?: 'Article';
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
	__typename?: 'ArticleAuthor';
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
		__typename?: 'Blog';
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
	__typename?: 'ArticleConnection';
	/** A list of edges. */
	edges: Array<ArticleEdge>;
	/** A list of the nodes contained in ArticleEdge. */
	nodes: Array<Article>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

export type ArticleEdge = {
	__typename?: 'ArticleEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of ArticleEdge. */
	node: Article;
};

export type CommentConnection = {
	__typename?: 'CommentConnection';
	/** A list of edges. */
	edges: Array<CommentEdge>;
	/** A list of the nodes contained in CommentEdge. */
	nodes: Array<Comment>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

export type CommentEdge = {
	__typename?: 'CommentEdge';
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

export type CollectionConnection = {
	__typename?: 'CollectionConnection';
	/** A list of edges. */
	edges: Array<CollectionEdge>;
	/** A list of the nodes contained in CollectionEdge. */
	nodes: Array<Collection>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

export type CollectionEdge = {
	__typename?: 'CollectionEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of CollectionEdge. */
	node: Collection;
};

export type ShopifyHomePageSeoOperation = {
	data: {
		shop: HomeSeoData;
		hero: CollectionHero;
	};
	variables: {
		handle: string;
		country?: string;
		language?: string;
	};
};

export interface HomeSeoData {
	shop: {
		name: string;
		description: string;
	};
}

export type ShopifyFeaturedProductOperation = {
	data: {
		products: ProductConnection;
	};
	variables: {
		country?: string;
		language?: string;
	};
};

export type ShopifyFeaturedCollectionOperation = {
	data: {
		collections: CollectionConnection;
	};
	variables: {
		country?: string;
		language?: string;
	};
};

export type ShopifyHeroOperation = {
	data: {
		hero: CollectionHero;
	};
	variables: {
		handle: string;
		country?: string;
		language?: string;
	};
};

export type ShopifyCartOperation = {
	data: {
		cart: ShopifyCart;
	};
	variables: {
		cartId: string;
	};
};

export type ShopifyCreateCartOperation = {
	data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
	data: {
		cartLinesAdd: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lines: {
			merchandiseId: string;
			quantity: number;
		}[];
	};
};

export type ShopifyRemoveFromCartOperation = {
	data: {
		cartLinesRemove: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lineIds: string[];
	};
};

export type ShopifyUpdateCartOperation = {
	data: {
		cartLinesUpdate: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lines: {
			id: string;
			merchandiseId: string;
			quantity: number;
		}[];
	};
};

export type ShopifyCart = {
	id: string;
	checkoutUrl: string;
	cost: {
		subtotalAmount: Money;
		totalAmount: Money;
		totalTaxAmount: Money;
	};
	lines: Connection<CartItem>;
	totalQuantity: number;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
	lines: CartItem[];
};

export type CartItem = {
	id: string;
	quantity: number;
	cost: {
		totalAmount: Money;
	};
	merchandise: {
		id: string;
		title: string;
		selectedOptions: {
			name: string;
			value: string;
		}[];
		product: Product;
	};
};

export type ShopifyCollectionProducts = {
	data: {
		collections: CollectionConnection;
		collection: Collection;
	};
	variables: {
		handle: string;
		pageBy: number;
		cursor: string | null;
		filters: FiltersQueryParams;
		sortKey: string;
		reverse?: boolean;
	};
};
export type InputMaybe<T> = Maybe<T>;

export type AttributeInput = {
	/** Key or name of the attribute. */
	key: string;
	/** Value of the attribute. */
	value: string;
};

export type CartLineInput = {
	/** An array of key-value pairs that contains additional information about the merchandise line. */
	attributes?: InputMaybe<Array<AttributeInput>>;
	/** The identifier of the merchandise that the buyer intends to purchase. */
	merchandiseId: string;
	/** The quantity of the merchandise. */
	quantity?: InputMaybe<number>;
	/** The identifier of the selling plan that the merchandise is being purchased with. */
	sellingPlanId?: InputMaybe<string>;
};

export type ShopifyProductOperation = {
	data: { product: ShopifyProduct; shop: Shop };
	variables: {
		handle: string;
		selectedOptions: any[];
	};
};

export type ShopifyProductRecommendationsOperation = {
	data: {
		recommended: Product[];
		additional: ProductConnection;
	};
	variables: {
		productId: string;
		count?: number;
	};
};

export type CartCost = {
  __typename?: 'CartCost';
  /** The estimated amount, before taxes and discounts, for the customer to pay at checkout. The checkout charge amount doesn't include any deferred payments that'll be paid at a later date. If the cart has no deferred payments, then the checkout charge amount is equivalent to `subtotalAmount`. */
  checkoutChargeAmount: Money;
  /** The amount, before taxes and cart-level discounts, for the customer to pay. */
  subtotalAmount: Money;
  /** Whether the subtotal amount is estimated. */
  subtotalAmountEstimated: boolean;
  /** The total amount for the customer to pay. */
  totalAmount: Money;
  /** Whether the total amount is estimated. */
  totalAmountEstimated: boolean;
  /** The duty amount for the customer to pay at checkout. */
  totalDutyAmount?: Maybe<Money>;
  /** Whether the total duty amount is estimated. */
  totalDutyAmountEstimated: boolean;
  /** The tax amount for the customer to pay at checkout. */
  totalTaxAmount?: Maybe<Money>;
  /** Whether the total tax amount is estimated. */
  totalTaxAmountEstimated: boolean;
};

export type CartType = HasMetafields &
  Node & {
    __typename?: 'Cart';
    /** An attribute associated with the cart. */
    attribute?: Maybe<Attribute>;
    /** The attributes associated with the cart. Attributes are represented as key-value pairs. */
    attributes: Array<Attribute>;
    /** Information about the buyer that is interacting with the cart. */
    buyerIdentity: CartBuyerIdentity;
    /** The URL of the checkout for the cart. */
    checkoutUrl: string;
    /** The estimated costs that the buyer will pay at checkout. The costs are subject to change and changes will be reflected at checkout. The `cost` field uses the `buyerIdentity` field to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing). */
    cost: CartCost;
    /** The date and time when the cart was created. */
    createdAt: string;
    /**
     * The delivery groups available for the cart, based on the buyer identity default
     * delivery address preference or the default address of the logged-in customer.
     *
     */
    deliveryGroups: CartDeliveryGroupConnection;
    /** The discounts that have been applied to the entire cart. */
    discountAllocations: Array<
      | CartAutomaticDiscountAllocation
      | CartCodeDiscountAllocation
      | CartCustomDiscountAllocation
    >;
    /**
     * The case-insensitive discount codes that the customer added at checkout.
     *
     */
    discountCodes: Array<CartDiscountCode>;
    /**
     * The estimated costs that the buyer will pay at checkout.
     * The estimated costs are subject to change and changes will be reflected at checkout.
     * The `estimatedCost` field uses the `buyerIdentity` field to determine
     * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing).
     *
     * @deprecated Use `cost` instead.
     */
    estimatedCost: CartEstimatedCost;
    /** A globally-unique identifier. */
    id: string;
    /** A list of lines containing information about the items the customer intends to purchase. */
    lines: BaseCartLineConnection;
    /** Returns a metafield found by namespace and key. */
    metafield?: Maybe<Metafield>;
    /**
     * The metafields associated with the resource matching the supplied list of namespaces and keys.
     *
     */
    metafields: Array<Maybe<Metafield>>;
    /** A note that is associated with the cart. For example, the note can be a personalized message to the buyer. */
    note?: Maybe<string>;
    /** The total number of items in the cart. */
    totalQuantity: number;
    /** The date and time when the cart was updated. */
    updatedAt: string;
  };

  export type Attribute = {
  __typename?: 'Attribute';
  /** Key or name of the attribute. */
  key: string;
  /** Value of the attribute. */
  value?: string;
};

export type CartBuyerIdentity = {
  __typename?: 'CartBuyerIdentity';
  /** The country where the buyer is located. */
  countryCode?: Maybe<CountryCode>;
  /** The customer account associated with the cart. */
  customer?: Maybe<Customer>;
  /**
   * An ordered set of delivery addresses tied to the buyer that is interacting with the cart.
   * The rank of the preferences is determined by the order of the addresses in the array. Preferences
   * can be used to populate relevant fields in the checkout flow.
   *
   */
  deliveryAddressPreferences: Array<DeliveryAddress>;
  /** The email address of the buyer that is interacting with the cart. */
  email?: Maybe<string>;
  /** The phone number of the buyer that is interacting with the cart. */
  phone?: Maybe<string>;
  /**
   * A set of wallet preferences tied to the buyer that is interacting with the cart.
   * Preferences can be used to populate relevant payment fields in the checkout flow.
   *
   */
  walletPreferences: Array<string>;
};

export type CountryCode =
  /** Ascension Island. */
  | 'AC'
  /** Andorra. */
  | 'AD'
  /** United Arab Emirates. */
  | 'AE'
  /** Afghanistan. */
  | 'AF'
  /** Antigua & Barbuda. */
  | 'AG'
  /** Anguilla. */
  | 'AI'
  /** Albania. */
  | 'AL'
  /** Armenia. */
  | 'AM'
  /** Netherlands Antilles. */
  | 'AN'
  /** Angola. */
  | 'AO'
  /** Argentina. */
  | 'AR'
  /** Austria. */
  | 'AT'
  /** Australia. */
  | 'AU'
  /** Aruba. */
  | 'AW'
  /** Åland Islands. */
  | 'AX'
  /** Azerbaijan. */
  | 'AZ'
  /** Bosnia & Herzegovina. */
  | 'BA'
  /** Barbados. */
  | 'BB'
  /** Bangladesh. */
  | 'BD'
  /** Belgium. */
  | 'BE'
  /** Burkina Faso. */
  | 'BF'
  /** Bulgaria. */
  | 'BG'
  /** Bahrain. */
  | 'BH'
  /** Burundi. */
  | 'BI'
  /** Benin. */
  | 'BJ'
  /** St. Barthélemy. */
  | 'BL'
  /** Bermuda. */
  | 'BM'
  /** Brunei. */
  | 'BN'
  /** Bolivia. */
  | 'BO'
  /** Caribbean Netherlands. */
  | 'BQ'
  /** Brazil. */
  | 'BR'
  /** Bahamas. */
  | 'BS'
  /** Bhutan. */
  | 'BT'
  /** Bouvet Island. */
  | 'BV'
  /** Botswana. */
  | 'BW'
  /** Belarus. */
  | 'BY'
  /** Belize. */
  | 'BZ'
  /** Canada. */
  | 'CA'
  /** Cocos (Keeling) Islands. */
  | 'CC'
  /** Congo - Kinshasa. */
  | 'CD'
  /** Central African Republic. */
  | 'CF'
  /** Congo - Brazzaville. */
  | 'CG'
  /** Switzerland. */
  | 'CH'
  /** Côte d’Ivoire. */
  | 'CI'
  /** Cook Islands. */
  | 'CK'
  /** Chile. */
  | 'CL'
  /** Cameroon. */
  | 'CM'
  /** China. */
  | 'CN'
  /** Colombia. */
  | 'CO'
  /** Costa Rica. */
  | 'CR'
  /** Cuba. */
  | 'CU'
  /** Cape Verde. */
  | 'CV'
  /** Curaçao. */
  | 'CW'
  /** Christmas Island. */
  | 'CX'
  /** Cyprus. */
  | 'CY'
  /** Czechia. */
  | 'CZ'
  /** Germany. */
  | 'DE'
  /** Djibouti. */
  | 'DJ'
  /** Denmark. */
  | 'DK'
  /** Dominica. */
  | 'DM'
  /** Dominican Republic. */
  | 'DO'
  /** Algeria. */
  | 'DZ'
  /** Ecuador. */
  | 'EC'
  /** Estonia. */
  | 'EE'
  /** Egypt. */
  | 'EG'
  /** Western Sahara. */
  | 'EH'
  /** Eritrea. */
  | 'ER'
  /** Spain. */
  | 'ES'
  /** Ethiopia. */
  | 'ET'
  /** Finland. */
  | 'FI'
  /** Fiji. */
  | 'FJ'
  /** Falkland Islands. */
  | 'FK'
  /** Faroe Islands. */
  | 'FO'
  /** France. */
  | 'FR'
  /** Gabon. */
  | 'GA'
  /** United Kingdom. */
  | 'GB'
  /** Grenada. */
  | 'GD'
  /** Georgia. */
  | 'GE'
  /** French Guiana. */
  | 'GF'
  /** Guernsey. */
  | 'GG'
  /** Ghana. */
  | 'GH'
  /** Gibraltar. */
  | 'GI'
  /** Greenland. */
  | 'GL'
  /** Gambia. */
  | 'GM'
  /** Guinea. */
  | 'GN'
  /** Guadeloupe. */
  | 'GP'
  /** Equatorial Guinea. */
  | 'GQ'
  /** Greece. */
  | 'GR'
  /** South Georgia & South Sandwich Islands. */
  | 'GS'
  /** Guatemala. */
  | 'GT'
  /** Guinea-Bissau. */
  | 'GW'
  /** Guyana. */
  | 'GY'
  /** Hong Kong SAR. */
  | 'HK'
  /** Heard & McDonald Islands. */
  | 'HM'
  /** Honduras. */
  | 'HN'
  /** Croatia. */
  | 'HR'
  /** Haiti. */
  | 'HT'
  /** Hungary. */
  | 'HU'
  /** Indonesia. */
  | 'ID'
  /** Ireland. */
  | 'IE'
  /** Israel. */
  | 'IL'
  /** Isle of Man. */
  | 'IM'
  /** India. */
  | 'IN'
  /** British Indian Ocean Territory. */
  | 'IO'
  /** Iraq. */
  | 'IQ'
  /** Iran. */
  | 'IR'
  /** Iceland. */
  | 'IS'
  /** Italy. */
  | 'IT'
  /** Jersey. */
  | 'JE'
  /** Jamaica. */
  | 'JM'
  /** Jordan. */
  | 'JO'
  /** Japan. */
  | 'JP'
  /** Kenya. */
  | 'KE'
  /** Kyrgyzstan. */
  | 'KG'
  /** Cambodia. */
  | 'KH'
  /** Kiribati. */
  | 'KI'
  /** Comoros. */
  | 'KM'
  /** St. Kitts & Nevis. */
  | 'KN'
  /** North Korea. */
  | 'KP'
  /** South Korea. */
  | 'KR'
  /** Kuwait. */
  | 'KW'
  /** Cayman Islands. */
  | 'KY'
  /** Kazakhstan. */
  | 'KZ'
  /** Laos. */
  | 'LA'
  /** Lebanon. */
  | 'LB'
  /** St. Lucia. */
  | 'LC'
  /** Liechtenstein. */
  | 'LI'
  /** Sri Lanka. */
  | 'LK'
  /** Liberia. */
  | 'LR'
  /** Lesotho. */
  | 'LS'
  /** Lithuania. */
  | 'LT'
  /** Luxembourg. */
  | 'LU'
  /** Latvia. */
  | 'LV'
  /** Libya. */
  | 'LY'
  /** Morocco. */
  | 'MA'
  /** Monaco. */
  | 'MC'
  /** Moldova. */
  | 'MD'
  /** Montenegro. */
  | 'ME'
  /** St. Martin. */
  | 'MF'
  /** Madagascar. */
  | 'MG'
  /** North Macedonia. */
  | 'MK'
  /** Mali. */
  | 'ML'
  /** Myanmar (Burma). */
  | 'MM'
  /** Mongolia. */
  | 'MN'
  /** Macao SAR. */
  | 'MO'
  /** Martinique. */
  | 'MQ'
  /** Mauritania. */
  | 'MR'
  /** Montserrat. */
  | 'MS'
  /** Malta. */
  | 'MT'
  /** Mauritius. */
  | 'MU'
  /** Maldives. */
  | 'MV'
  /** Malawi. */
  | 'MW'
  /** Mexico. */
  | 'MX'
  /** Malaysia. */
  | 'MY'
  /** Mozambique. */
  | 'MZ'
  /** Namibia. */
  | 'NA'
  /** New Caledonia. */
  | 'NC'
  /** Niger. */
  | 'NE'
  /** Norfolk Island. */
  | 'NF'
  /** Nigeria. */
  | 'NG'
  /** Nicaragua. */
  | 'NI'
  /** Netherlands. */
  | 'NL'
  /** Norway. */
  | 'NO'
  /** Nepal. */
  | 'NP'
  /** Nauru. */
  | 'NR'
  /** Niue. */
  | 'NU'
  /** New Zealand. */
  | 'NZ'
  /** Oman. */
  | 'OM'
  /** Panama. */
  | 'PA'
  /** Peru. */
  | 'PE'
  /** French Polynesia. */
  | 'PF'
  /** Papua New Guinea. */
  | 'PG'
  /** Philippines. */
  | 'PH'
  /** Pakistan. */
  | 'PK'
  /** Poland. */
  | 'PL'
  /** St. Pierre & Miquelon. */
  | 'PM'
  /** Pitcairn Islands. */
  | 'PN'
  /** Palestinian Territories. */
  | 'PS'
  /** Portugal. */
  | 'PT'
  /** Paraguay. */
  | 'PY'
  /** Qatar. */
  | 'QA'
  /** Réunion. */
  | 'RE'
  /** Romania. */
  | 'RO'
  /** Serbia. */
  | 'RS'
  /** Russia. */
  | 'RU'
  /** Rwanda. */
  | 'RW'
  /** Saudi Arabia. */
  | 'SA'
  /** Solomon Islands. */
  | 'SB'
  /** Seychelles. */
  | 'SC'
  /** Sudan. */
  | 'SD'
  /** Sweden. */
  | 'SE'
  /** Singapore. */
  | 'SG'
  /** St. Helena. */
  | 'SH'
  /** Slovenia. */
  | 'SI'
  /** Svalbard & Jan Mayen. */
  | 'SJ'
  /** Slovakia. */
  | 'SK'
  /** Sierra Leone. */
  | 'SL'
  /** San Marino. */
  | 'SM'
  /** Senegal. */
  | 'SN'
  /** Somalia. */
  | 'SO'
  /** Suriname. */
  | 'SR'
  /** South Sudan. */
  | 'SS'
  /** São Tomé & Príncipe. */
  | 'ST'
  /** El Salvador. */
  | 'SV'
  /** Sint Maarten. */
  | 'SX'
  /** Syria. */
  | 'SY'
  /** Eswatini. */
  | 'SZ'
  /** Tristan da Cunha. */
  | 'TA'
  /** Turks & Caicos Islands. */
  | 'TC'
  /** Chad. */
  | 'TD'
  /** French Southern Territories. */
  | 'TF'
  /** Togo. */
  | 'TG'
  /** Thailand. */
  | 'TH'
  /** Tajikistan. */
  | 'TJ'
  /** Tokelau. */
  | 'TK'
  /** Timor-Leste. */
  | 'TL'
  /** Turkmenistan. */
  | 'TM'
  /** Tunisia. */
  | 'TN'
  /** Tonga. */
  | 'TO'
  /** Turkey. */
  | 'TR'
  /** Trinidad & Tobago. */
  | 'TT'
  /** Tuvalu. */
  | 'TV'
  /** Taiwan. */
  | 'TW'
  /** Tanzania. */
  | 'TZ'
  /** Ukraine. */
  | 'UA'
  /** Uganda. */
  | 'UG'
  /** U.S. Outlying Islands. */
  | 'UM'
  /** United States. */
  | 'US'
  /** Uruguay. */
  | 'UY'
  /** Uzbekistan. */
  | 'UZ'
  /** Vatican City. */
  | 'VA'
  /** St. Vincent & Grenadines. */
  | 'VC'
  /** Venezuela. */
  | 'VE'
  /** British Virgin Islands. */
  | 'VG'
  /** Vietnam. */
  | 'VN'
  /** Vanuatu. */
  | 'VU'
  /** Wallis & Futuna. */
  | 'WF'
  /** Samoa. */
  | 'WS'
  /** Kosovo. */
  | 'XK'
  /** Yemen. */
  | 'YE'
  /** Mayotte. */
  | 'YT'
  /** South Africa. */
  | 'ZA'
  /** Zambia. */
  | 'ZM'
  /** Zimbabwe. */
  | 'ZW'
  /** Unknown Region. */
  | 'ZZ';

  export type Customer = HasMetafields & {
    __typename?: 'Customer';
    /** Indicates whether the customer has consented to be sent marketing material via email. */
    acceptsMarketing: boolean;
    /** A list of addresses for the customer. */
    addresses: MailingAddressConnection;
    /** The date and time when the customer was created. */
    createdAt: string;
    /** The customer’s default address. */
    defaultAddress?: Maybe<MailingAddress>;
    /** The customer’s name, email or phone number. */
    displayName: string;
    /** The customer’s email address. */
    email?: Maybe<string>;
    /** The customer’s first name. */
    firstName?: Maybe<string>;
    /** A unique identifier for the customer. */
    id: string;
    /** The customer's most recently updated, incomplete checkout. */
    lastIncompleteCheckout?: Maybe<Checkout>;
    /** The customer’s last name. */
    lastName?: Maybe<string>;
    /** Returns a metafield found by namespace and key. */
    metafield?: Maybe<Metafield>;
    /**
     * The metafields associated with the resource matching the supplied list of namespaces and keys.
     *
     */
    metafields: Array<Maybe<Metafield>>;
    /** The number of orders that the customer has made at the store in their lifetime. */
    numberOfOrders: string;
    /** The orders associated with the customer. */
    orders: OrderConnection;
    /** The customer’s phone number. */
    phone?: Maybe<string>;
    /**
     * A comma separated list of tags that have been added to the customer.
     * Additional access scope required: unauthenticated_read_customer_tags.
     *
     */
    tags: Array<string>;
    /** The date and time when the customer information was updated. */
    updatedAt: string;
  };