import { cartFragment } from "./fragments";

export const getCartQuery = `#graphql
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${cartFragment}
`;
