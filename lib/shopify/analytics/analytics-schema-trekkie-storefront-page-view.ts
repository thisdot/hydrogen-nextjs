import { ShopifyAppId } from "@/lib/const";
import {
  ShopifyMonorailEvent,
  ShopifyMonorailPayload,
  ShopifyPageViewPayload,
} from "../types";
import { addDataIf, parseGid, schemaWrapper } from "./analytics-utils";
import { buildUUID } from "./cookies-utils";

const SCHEMA_ID = "trekkie_storefront_page_view/1.4";
const OXYGEN_DOMAIN = "myshopify.dev";

export function pageView(
  payload: ShopifyPageViewPayload
): ShopifyMonorailEvent[] {
  const pageViewPayload = payload;
  const { id, resource } = parseGid(pageViewPayload.resourceId);
  const resourceType = resource ? resource.toLowerCase() : undefined;
  return [
    schemaWrapper(
      SCHEMA_ID,
      addDataIf(
        {
          pageType: pageViewPayload.pageType,
          customerId: pageViewPayload.customerId,
          resourceType,
          resourceId: parseInt(id),
        },
        formatPayload(pageViewPayload)
      )
    ),
  ];
}

function formatPayload(
  payload: ShopifyPageViewPayload
): ShopifyMonorailPayload {
  return {
    appClientId: payload.shopifySalesChannel
      ? ShopifyAppId[payload.shopifySalesChannel]
      : ShopifyAppId.headless,
    isMerchantRequest: isMerchantRequest(payload.url),
    hydrogenSubchannelId: payload.storefrontId || "0",

    isPersistentCookie: payload.hasUserConsent,
    uniqToken: payload.uniqueToken,
    visitToken: payload.visitToken,
    microSessionId: buildUUID(),
    microSessionCount: 1,

    url: payload.url,
    path: payload.path,
    search: payload.search,
    referrer: payload.referrer,
    title: payload.title,

    shopId: parseInt(parseGid(payload.shopId).id),
    currency: payload.currency,
    contentLanguage: payload.acceptedLanguage || "en",
  };
}

function isMerchantRequest(url: string): boolean {
  if (typeof url !== "string") {
    return false;
  }
  const hostname = new URL(url).hostname;
  if (hostname.indexOf(OXYGEN_DOMAIN) !== -1 || hostname === "localhost") {
    return true;
  }
  return false;
}
