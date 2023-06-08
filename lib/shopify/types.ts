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

/** Return type for `customerCreate` mutation. */
export type CustomerCreatePayload = {
	__typename?: 'CustomerCreatePayload';
	/** The created customer object. */
	customer?: Maybe<Customer>;
	/** The list of errors that occurred from executing the mutation. */
	customerUserErrors: Array<CustomerUserError>;
	/**
	 * The list of errors that occurred from executing the mutation.
	 * @deprecated Use `customerUserErrors` instead.
	 */
	userErrors: Array<UserError>;
};

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type Customer = HasMetafields & {
	__typename?: 'Customer';
	/** Indicates whether the customer has consented to be sent marketing material via email. */
	acceptsMarketing: Scalars['Boolean'];
	/** A list of addresses for the customer. */
	addresses: MailingAddressConnection;
	/** The date and time when the customer was created. */
	createdAt: Scalars['DateTime'];
	/** The customer’s default address. */
	defaultAddress?: Maybe<MailingAddress>;
	/** The customer’s name, email or phone number. */
	displayName: Scalars['String'];
	/** The customer’s email address. */
	email?: Maybe<Scalars['String']>;
	/** The customer’s first name. */
	firstName?: Maybe<Scalars['String']>;
	/** A unique identifier for the customer. */
	id: Scalars['ID'];
	/** The customer's most recently updated, incomplete checkout. */
	lastIncompleteCheckout?: Maybe<Checkout>;
	/** The customer’s last name. */
	lastName?: Maybe<Scalars['String']>;
	/** Returns a metafield found by namespace and key. */
	metafield?: Maybe<Metafield>;
	/**
	 * The metafields associated with the resource matching the supplied list of namespaces and keys.
	 *
	 */
	metafields: Array<Maybe<Metafield>>;
	/** The number of orders that the customer has made at the store in their lifetime. */
	numberOfOrders: Scalars['UnsignedInt64'];
	/** The orders associated with the customer. */
	orders: OrderConnection;
	/** The customer’s phone number. */
	phone?: Maybe<Scalars['String']>;
	/**
	 * A comma separated list of tags that have been added to the customer.
	 * Additional access scope required: unauthenticated_read_customer_tags.
	 *
	 */
	tags: Array<Scalars['String']>;
	/** The date and time when the customer information was updated. */
	updatedAt: Scalars['DateTime'];
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Color: string;
	DateTime: string;
	Decimal: string;
	HTML: string;
	JSON: unknown;
	URL: string;
	UnsignedInt64: string;
};

/** Represents an error that happens during execution of a customer mutation. */
export type CustomerUserError = DisplayableError & {
	__typename?: 'CustomerUserError';
	/** The error code. */
	code?: Maybe<CustomerErrorCode>;
	/** The path to the input field that caused the error. */
	field?: Maybe<Array<Scalars['String']>>;
	/** The error message. */
	message: Scalars['String'];
};

/** Represents an error in the input of a mutation. */
export type UserError = DisplayableError & {
	__typename?: 'UserError';
	/** The path to the input field that caused the error. */
	field?: Maybe<Array<Scalars['String']>>;
	/** The error message. */
	message: Scalars['String'];
};

/** A filter used to view a subset of products in a collection matching a specific variant option. */
export type VariantOptionFilter = {
	/** The name of the variant option to filter on. */
	name: Scalars['String'];
	/** The value of the variant option to filter on. */
	value: Scalars['String'];
};

/**
 * An auto-generated type for paginating through multiple MailingAddresses.
 *
 */
export type MailingAddressConnection = {
	__typename?: 'MailingAddressConnection';
	/** A list of edges. */
	edges: Array<MailingAddressEdge>;
	/** A list of the nodes contained in MailingAddressEdge. */
	nodes: Array<MailingAddress>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

/** Represents a mailing address for customers and shipping. */
export type MailingAddress = Node & {
	__typename?: 'MailingAddress';
	/** The first line of the address. Typically the street address or PO Box number. */
	address1?: Maybe<Scalars['String']>;
	/**
	 * The second line of the address. Typically the number of the apartment, suite, or unit.
	 *
	 */
	address2?: Maybe<Scalars['String']>;
	/**
	 * The name of the city, district, village, or town.
	 *
	 */
	city?: Maybe<Scalars['String']>;
	/**
	 * The name of the customer's company or organization.
	 *
	 */
	company?: Maybe<Scalars['String']>;
	/**
	 * The name of the country.
	 *
	 */
	country?: Maybe<Scalars['String']>;
	/**
	 * The two-letter code for the country of the address.
	 *
	 * For example, US.
	 *
	 * @deprecated Use `countryCodeV2` instead.
	 */
	countryCode?: Maybe<Scalars['String']>;
	/**
	 * The two-letter code for the country of the address.
	 *
	 * For example, US.
	 *
	 */
	countryCodeV2?: Maybe<CountryCode>;
	/** The first name of the customer. */
	firstName?: Maybe<Scalars['String']>;
	/** A formatted version of the address, customized by the provided arguments. */
	formatted: Array<Scalars['String']>;
	/** A comma-separated list of the values for city, province, and country. */
	formattedArea?: Maybe<Scalars['String']>;
	/** A globally-unique identifier. */
	id: Scalars['ID'];
	/** The last name of the customer. */
	lastName?: Maybe<Scalars['String']>;
	/** The latitude coordinate of the customer address. */
	latitude?: Maybe<Scalars['Float']>;
	/** The longitude coordinate of the customer address. */
	longitude?: Maybe<Scalars['Float']>;
	/**
	 * The full name of the customer, based on firstName and lastName.
	 *
	 */
	name?: Maybe<Scalars['String']>;
	/**
	 * A unique phone number for the customer.
	 *
	 * Formatted using E.164 standard. For example, _+16135551111_.
	 *
	 */
	phone?: Maybe<Scalars['String']>;
	/** The region of the address, such as the province, state, or district. */
	province?: Maybe<Scalars['String']>;
	/**
	 * The two-letter code for the region.
	 *
	 * For example, ON.
	 *
	 */
	provinceCode?: Maybe<Scalars['String']>;
	/** The zip or postal code of the address. */
	zip?: Maybe<Scalars['String']>;
};

/** A container for all the information required to checkout items and pay. */
export type Checkout = Node & {
	__typename?: 'Checkout';
	/** The gift cards used on the checkout. */
	appliedGiftCards: Array<AppliedGiftCard>;
	/**
	 * The available shipping rates for this Checkout.
	 * Should only be used when checkout `requiresShipping` is `true` and
	 * the shipping address is valid.
	 *
	 */
	availableShippingRates?: Maybe<AvailableShippingRates>;
	/** The identity of the customer associated with the checkout. */
	buyerIdentity: CheckoutBuyerIdentity;
	/** The date and time when the checkout was completed. */
	completedAt?: Maybe<Scalars['DateTime']>;
	/** The date and time when the checkout was created. */
	createdAt: Scalars['DateTime'];
	/** The currency code for the checkout. */
	currencyCode: CurrencyCode;
	/** A list of extra information that is added to the checkout. */
	customAttributes: Array<Attribute>;
	/** Discounts that have been applied on the checkout. */
	discountApplications: DiscountApplicationConnection;
	/** The email attached to this checkout. */
	email?: Maybe<Scalars['String']>;
	/** A globally-unique identifier. */
	id: Scalars['ID'];
	/** A list of line item objects, each one containing information about an item in the checkout. */
	lineItems: CheckoutLineItemConnection;
	/** The sum of all the prices of all the items in the checkout. Duties, taxes, shipping and discounts excluded. */
	lineItemsSubtotalPrice: MoneyV2;
	/** The note associated with the checkout. */
	note?: Maybe<Scalars['String']>;
	/** The resulting order from a paid checkout. */
	order?: Maybe<Order>;
	/** The Order Status Page for this Checkout, null when checkout is not completed. */
	orderStatusUrl?: Maybe<Scalars['URL']>;
	/** The amount left to be paid. This is equal to the cost of the line items, taxes, and shipping, minus discounts and gift cards. */
	paymentDue: MoneyV2;
	/**
	 * The amount left to be paid. This is equal to the cost of the line items, duties, taxes, and shipping, minus discounts and gift cards.
	 * @deprecated Use `paymentDue` instead.
	 */
	paymentDueV2: MoneyV2;
	/**
	 * Whether or not the Checkout is ready and can be completed. Checkouts may
	 * have asynchronous operations that can take time to finish. If you want
	 * to complete a checkout or ensure all the fields are populated and up to
	 * date, polling is required until the value is true.
	 *
	 */
	ready: Scalars['Boolean'];
	/** States whether or not the fulfillment requires shipping. */
	requiresShipping: Scalars['Boolean'];
	/** The shipping address to where the line items will be shipped. */
	shippingAddress?: Maybe<MailingAddress>;
	/**
	 * The discounts that have been allocated onto the shipping line by discount applications.
	 *
	 */
	shippingDiscountAllocations: Array<DiscountAllocation>;
	/** Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object. */
	shippingLine?: Maybe<ShippingRate>;
	/** The price at checkout before shipping and taxes. */
	subtotalPrice: MoneyV2;
	/**
	 * The price at checkout before duties, shipping, and taxes.
	 * @deprecated Use `subtotalPrice` instead.
	 */
	subtotalPriceV2: MoneyV2;
	/** Whether the checkout is tax exempt. */
	taxExempt: Scalars['Boolean'];
	/** Whether taxes are included in the line item and shipping line prices. */
	taxesIncluded: Scalars['Boolean'];
	/** The sum of all the duties applied to the line items in the checkout. */
	totalDuties?: Maybe<MoneyV2>;
	/** The sum of all the prices of all the items in the checkout, including taxes and duties. */
	totalPrice: MoneyV2;
	/**
	 * The sum of all the prices of all the items in the checkout, including taxes and duties.
	 * @deprecated Use `totalPrice` instead.
	 */
	totalPriceV2: MoneyV2;
	/** The sum of all the taxes applied to the line items and shipping lines in the checkout. */
	totalTax: MoneyV2;
	/**
	 * The sum of all the taxes applied to the line items and shipping lines in the checkout.
	 * @deprecated Use `totalTax` instead.
	 */
	totalTaxV2: MoneyV2;
	/** The date and time when the checkout was last updated. */
	updatedAt: Scalars['DateTime'];
	/** The url pointing to the checkout accessible from the web. */
	webUrl: Scalars['URL'];
};

/**
 * An auto-generated type for paginating through multiple Orders.
 *
 */
export type OrderConnection = {
	__typename?: 'OrderConnection';
	/** A list of edges. */
	edges: Array<OrderEdge>;
	/** A list of the nodes contained in OrderEdge. */
	nodes: Array<Order>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** The total count of Orders. */
	totalCount: Scalars['UnsignedInt64'];
};

/** Represents an error in the input of a mutation. */
export type DisplayableError = {
	/** The path to the input field that caused the error. */
	field?: Maybe<Array<Scalars['String']>>;
	/** The error message. */
	message: Scalars['String'];
};

/** Represents a web address. */
export type Domain = {
	__typename?: 'Domain';
	/** The host name of the domain (eg: `example.com`). */
	host: Scalars['String'];
	/** Whether SSL is enabled or not. */
	sslEnabled: Scalars['Boolean'];
	/** The URL of the domain (eg: `https://example.com`). */
	url: Scalars['URL'];
};

/** Possible error codes that can be returned by `CustomerUserError`. */
export type CustomerErrorCode =
	/** Customer already enabled. */
	| 'ALREADY_ENABLED'
	/** Input email contains an invalid domain name. */
	| 'BAD_DOMAIN'
	/** The input value is blank. */
	| 'BLANK'
	/** Input contains HTML tags. */
	| 'CONTAINS_HTML_TAGS'
	/** Input contains URL. */
	| 'CONTAINS_URL'
	/** Customer is disabled. */
	| 'CUSTOMER_DISABLED'
	/** The input value is invalid. */
	| 'INVALID'
	/** Multipass token is not valid. */
	| 'INVALID_MULTIPASS_REQUEST'
	/** Address does not exist. */
	| 'NOT_FOUND'
	/** Input password starts or ends with whitespace. */
	| 'PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE'
	/** The input value is already taken. */
	| 'TAKEN'
	/** Invalid activation token. */
	| 'TOKEN_INVALID'
	/** The input value is too long. */
	| 'TOO_LONG'
	/** The input value is too short. */
	| 'TOO_SHORT'
	/** Unidentified customer. */
	| 'UNIDENTIFIED_CUSTOMER';

/**
 * An auto-generated type which holds one MailingAddress and a cursor during pagination.
 *
 */
export type MailingAddressEdge = {
	__typename?: 'MailingAddressEdge';
	/** A cursor for use in pagination. */
	cursor: Scalars['String'];
	/** The item at the end of MailingAddressEdge. */
	node: MailingAddress;
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

/** Details about the gift card used on the checkout. */
export type AppliedGiftCard = Node & {
	__typename?: 'AppliedGiftCard';
	/** The amount that was taken from the gift card by applying it. */
	amountUsed: MoneyV2;
	/**
	 * The amount that was taken from the gift card by applying it.
	 * @deprecated Use `amountUsed` instead.
	 */
	amountUsedV2: MoneyV2;
	/** The amount left on the gift card. */
	balance: MoneyV2;
	/**
	 * The amount left on the gift card.
	 * @deprecated Use `balance` instead.
	 */
	balanceV2: MoneyV2;
	/** A globally-unique identifier. */
	id: Scalars['ID'];
	/** The last characters of the gift card. */
	lastCharacters: Scalars['String'];
	/** The amount that was applied to the checkout in its currency. */
	presentmentAmountUsed: MoneyV2;
};
