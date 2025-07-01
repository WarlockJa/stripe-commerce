import { ITEMS } from "./cart-items";

type CartActionAdd = {
  type: "addNewCartItem";
  item: {
    itemId: number;
    quantity: number;
  };
};

type CartActionIncQuant = {
  type: "incQuantCartItem";
  item: {
    itemId: number;
  };
};

type CartActionDecQuant = {
  type: "decQuantCartItem";
  item: {
    itemId: number;
  };
};

type CartActionDelete = {
  type: "deleteCartItem";
  item: {
    itemId: number;
  };
};

type CartActionClear = {
  type: "clearCart";
};

export type CartAction =
  | CartActionAdd
  | CartActionDelete
  | CartActionIncQuant
  | CartActionDecQuant
  | CartActionClear;

export default function cartReducer(items: CartItem[], action: CartAction) {
  let theItem: CartItem | undefined;

  switch (action.type) {
    case "addNewCartItem":
      if (items.find((item) => item.itemId === action.item.itemId)) {
        return items.map((item) =>
          item.itemId === action.item.itemId
            ? { ...item, quantity: item.quantity++ }
            : item
        );
      }

      const storeItem = ITEMS.find(
        (item) => item.itemId === action.item.itemId
      );

      if (!storeItem) return items;

      const newItem: CartItem = {
        itemId: action.item.itemId,
        quantity: action.item.quantity,
        name: storeItem.name,
        description: storeItem.description,
        priceCent: storeItem.priceCent,
        image: storeItem.image,
      };
      return [...items, newItem];

    case "incQuantCartItem":
      theItem = items.find((item) => item.itemId === action.item.itemId);
      console.log("TEST: ", theItem ? theItem.quantity + 1 : "fail");
      return items.map((item) =>
        item.itemId === action.item.itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "decQuantCartItem":
      theItem = items.find((item) => item.itemId === action.item.itemId);
      console.log(
        "TEST: ",
        theItem ? (theItem.quantity > 1 ? theItem.quantity - 1 : 1) : "fail"
      );
      return items.map((item) =>
        item.itemId === action.item.itemId
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
            }
          : item
      );

    case "deleteCartItem":
      return items.filter((item) => item.itemId !== action.item.itemId);

    case "clearCart":
      return [];

    default:
      throw new Error("unknown action type");
  }
}
