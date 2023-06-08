// import {useLocation, useFetchers, useMatches} from '@remix-run/react';
// import {
//   AnalyticsEventName,
//   getClientBrowserParameters,
//   sendShopifyAnalytics,
//   ShopifyAddToCartPayload,
//   ShopifyPageViewPayload,
//   useShopifyCookies,
// } from '@shopify/hydrogen';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
// import {CartAction, I18nLocale} from '../lib/type';
import { useShopifyCookies } from './useShopifyCookies';
import {
	CartAction,
	I18nLocale,
	ShopifyAddToCartPayload,
	ShopifyPageViewPayload,
} from '@/lib/shopify/types';
import {
	getClientBrowserParameters,
	sendShopifyAnalytics,
} from '@/lib/shopify/analytics';
import { AnalyticsEventName } from '@/lib/const';

export function useAnalytics(hasUserConsent: boolean, locale: I18nLocale) {
	useShopifyCookies({ hasUserConsent });
	const pathname = usePathname();

	const pageAnalytics = {
		currency: locale.currency,
		acceptedLanguage: locale.language,
		hasUserConsent,
	};

	// Page view analytics
	// We want useEffect to execute only when location changes
	// which represents a page view
	useEffect(() => {
		const payload: ShopifyPageViewPayload = {
			...getClientBrowserParameters(),
			...pageAnalytics,
			shopId: process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID as string,
		};

		sendShopifyAnalytics({
			eventName: AnalyticsEventName.PAGE_VIEW,
			payload,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	// Add to cart analytics
	//   const cartData = useDataFromFetchers({
	//     formDataKey: 'cartAction',
	//     formDataValue: CartAction.ADD_TO_CART,
	//     dataKey: 'analytics',
	//   }) as unknown as ShopifyAddToCartPayload;
	//   if (cartData) {
	//     const addToCartPayload: ShopifyAddToCartPayload = {
	//       ...getClientBrowserParameters(),
	//       ...pageAnalytics,
	//       ...cartData,
	//     };

	//     sendShopifyAnalytics({
	//       eventName: AnalyticsEventName.ADD_TO_CART,
	//       payload: addToCartPayload,
	//     });
	//   }
}
