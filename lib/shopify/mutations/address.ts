export const REMOVE_ADDRESS = `#graphql
mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
  customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
    customerUserErrors {
        code
        field
        message
      }
    deletedCustomerAddressId
  }
}
`;
