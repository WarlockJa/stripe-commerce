"use client";

import { Loader2, ShoppingCartIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useCart, useCartDispatch } from "../cart/cart-provider";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import ShoppingCartItem from "./shopping-cart-item";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { createCheckoutAction } from "../cart/stripe-payment-actions";
import { useRouter } from "next/navigation";

export default function ShoppingCart() {
  const cartItems = useCart();
  const dispatch = useCartDispatch();

  const router = useRouter();

  const cartItemsCount = cartItems.reduce(
    (sum, cur) => (sum += cur.quantity),
    0
  );

  const total =
    cartItems.reduce((sum, cur) => (sum += cur.priceCent * cur.quantity), 0) /
    100;

  const { execute, status } = useServerAction(createCheckoutAction, {
    onError({ err }) {
      toast.dismiss();
      toast.error(err.message ?? "Failed to create payment");
    },

    onSuccess({ data }) {
      // toast.info("OK");
      router.push(data);
    },
  });

  // DEV ACTIONS
  // const { execute: createPriceExecute, status: createPriceStatus } =
  //   useServerAction(createPriceAction, {
  //     onError({ err }) {
  //       toast.dismiss();
  //       // TODO translate
  //       toast.error(err.message ?? "Failed to create prices");
  //     },

  //     onSuccess({ data }) {
  //       // TODO translate
  //       toast.info("Prices Created");
  //       // router.push(data);
  //     },
  //   });
  // const { execute: listPriceExecute, status: listPriceStatus } =
  //   useServerAction(listPricesAction, {
  //     onError({ err }) {
  //       toast.dismiss();
  //       // TODO translate
  //       toast.error(err.message ?? "Failed to list prices");
  //     },

  //     onSuccess({ data }) {
  //       // TODO translate
  //       toast.info("Prices Listed");
  //       // router.push(data);
  //     },
  //   });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="relative h-12 px-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
          Cart
          {cartItemsCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold"
            >
              {cartItemsCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg p-8">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Shopping Cart</span>
            {cartItemsCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {cartItemsCount} {cartItemsCount === 1 ? "item" : "items"}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cartItemsCount === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCartIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground">
                  Add some items to get started!
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-0">
                  {cartItems.map((item) => (
                    <ShoppingCartItem
                      key={item.itemId}
                      item={item}
                      onIncreaseQuantity={() =>
                        dispatch({ type: "incQuantCartItem", item })
                      }
                      onDecreaseQuantity={() =>
                        dispatch({ type: "decQuantCartItem", item })
                      }
                      onRemoveItem={() =>
                        dispatch({ type: "deleteCartItem", item })
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="border-t border-border/50 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch({ type: "clearCart" })}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    Clear Cart
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${total}</span>
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-12 text-base font-semibold"
                    disabled={status === "pending"}
                    onClick={() =>
                      execute(
                        cartItems.map((item) => ({
                          name: item.name,
                          priceCent: item.priceCent,
                          quantity: item.quantity,
                        }))
                      )
                    }
                  >
                    {status === "pending" ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Checkout"
                    )}
                  </Button>

                  {/* DEV BUTTONS used to create Stripe prices */}
                  {/* <Button
                    size="lg"
                    className="w-full h-12 text-base font-semibold"
                    disabled={createPriceStatus === "pending"}
                    onClick={() => createPriceExecute()}
                  >
                    {createPriceStatus === "pending" ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Create Prices"
                    )}
                  </Button>
                  <Button
                    size="lg"
                    className="w-full h-12 text-base font-semibold"
                    disabled={listPriceStatus === "pending"}
                    onClick={() => listPriceExecute()}
                  >
                    {listPriceStatus === "pending" ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "List Prices"
                    )}
                  </Button> */}
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
