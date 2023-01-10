export interface CustomerCart {
  id: number;
  quantity: number;
  relationtoproduct: Product;
}

export interface Product {
  productId: number;
  productName: string;
  global: boolean;
  senderFee: number;
  senderFeePercentage: number;
  denominationType: string;
  recipientCurrencyCode: string;
  minRecipientDenomination: null;
  maxRecipientDenomination: null;
  senderCurrencyCode: string;
  minSenderDenomination: null;
  maxSenderDenomination: null;
  fixedRecipientDenominations: number[];
  fixedSenderDenominations: number[];
  fixedRecipientToSenderDenominationsMap: {
    [key: string]: number;
  };
  logoUrls: string[];
  brand: { brandId: number; brandName: string };
  country: {
    isoName: string;
    name: string;
    flagUrl: string;
  };
  redeemInstruction: {
    concise: string;
    verbose: string;
  };
  img: string;
  description: string;
  available: boolean;
  code: string;
  type: string;
  name: string;
  countryCode: string;
  chi_pvd: string;
}
