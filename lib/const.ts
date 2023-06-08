export const PAGE_BY = 8;
export const BLOG_HANDLE = 'Journal';
export const SHOPIFY_Y = '_shopify_y';
export const SHOPIFY_S = '_shopify_s';

export const ShopifySalesChannel: ShopifySalesChannel = {
	hydrogen: 'hydrogen',
	headless: 'headless',
} as const;

export interface ShopifySalesChannel {
	/** Shopify Hydrogen sales channel */
	hydrogen: 'hydrogen';
	/** Shopify Headless sales channel */
	headless: 'headless';
}

export const AnalyticsEventName: AnalyticsEventName = {
	PAGE_VIEW: 'PAGE_VIEW',
	ADD_TO_CART: 'ADD_TO_CART',
} as const;

interface AnalyticsEventName {
	/** Page view */
	PAGE_VIEW: 'PAGE_VIEW';
	/** Add to cart */
	ADD_TO_CART: 'ADD_TO_CART';
}

export const ShopifyAppId = {
	hydrogen: '6167201',
	headless: '12875497473',
} as const;
