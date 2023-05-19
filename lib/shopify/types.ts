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
  headerMenu: ShopifyHeaderMenu;
  footerMenu: ShopifyFooterMenu;
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

export type ShopifyLayoutOperation = {
  data: {
    shop: Shop;
  };
  variables: {
    headerMenuHandle: string;
    footerMenuHandle: string;
  };
};
