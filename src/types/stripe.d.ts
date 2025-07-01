type StripeItemsType = {
  price_data: {
    currency: LiteralCurrencyLetterCodes;
    product_data: {
      name: string;
    };
    unit_amount: number;
  };
  quantity: number;
};
