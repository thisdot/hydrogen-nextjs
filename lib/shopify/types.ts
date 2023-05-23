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
