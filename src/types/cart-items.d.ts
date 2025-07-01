// for testing purposes
// harcoding names so they can be connected with prices created in Stripe
// in prod prices should be created along side of the local DB
type ItemNames = "car" | "flowers";

interface StoreItem {
  itemId: number;
  name: ItemNames;
  description: string;
  priceCent: number;
  image: string;
}

interface CartItem extends StoreItem {
  quantity: number;
}
