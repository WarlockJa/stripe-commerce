"use client";

import { convertFromCents } from "@/lib/convert-from-cents";
import { ITEMS } from "../cart/cart-items";
import { useCartDispatch } from "../cart/cart-provider";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import ShoppingCart from "./shopping-cart";
import { Plus } from "lucide-react";

export default function ShopPage() {
  const dispatch = useCartDispatch();

  return (
    <main className="min-h-screen max-w-5xl mx-auto relative">
      <div className="absolute top-0 right-0 p-4">
        <ShoppingCart />
      </div>
      <ul className="grid grid-cols-3 gap-2 pt-24">
        {ITEMS.map((item) => (
          <ItemCard
            key={item.itemId}
            {...item}
            onAddToCart={() =>
              dispatch({
                type: "addNewCartItem",
                item: { itemId: item.itemId, quantity: 1 },
              })
            }
          />
        ))}
      </ul>
    </main>
  );
}

const ItemCard = ({
  name,
  priceCent,
  image,
  description,
  onAddToCart,
}: StoreItem & { onAddToCart: () => void }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-square overflow-hidden rounded-t-lg">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>

      <CardContent className="flex-1 p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
        )}
        <p className="text-xl font-bold text-foreground">
          ${convertFromCents(priceCent)}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={onAddToCart} className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
