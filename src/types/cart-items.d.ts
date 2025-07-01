interface StoreItem {
  itemId: number;
  name: string;
  description: string;
  priceCent: number;
  image: string;
}

interface CartItem extends StoreItem {
  quantity: number;
}
