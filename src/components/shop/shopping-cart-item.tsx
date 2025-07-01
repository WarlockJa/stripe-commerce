import { Button } from "@/components/ui/button";
import { convertFromCents } from "@/lib/convert-from-cents";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  item: CartItem;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onRemoveItem: () => void;
}

export default function ShoppingCartItem({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}: CartItemProps) {
  return (
    <div className="flex items-center space-x-4 py-4 border-b border-border/50 last:border-b-0">
      <div className="flex-shrink-0">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg bg-muted"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-foreground truncate">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
        <p className="text-sm font-medium text-foreground mt-2">
          ${convertFromCents(item.priceCent)}
        </p>
      </div>

      <div className="flex flex-col items-end space-y-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemoveItem}
          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onDecreaseQuantity}
            className="h-7 w-7 p-0"
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>

          <span className="mx-2 min-w-[2rem] text-center text-sm font-medium">
            {item.quantity}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={onIncreaseQuantity}
            className="h-7 w-7 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <p className="text-sm font-semibold text-foreground">
          ${convertFromCents(item.priceCent) * item.quantity}
        </p>
      </div>
    </div>
  );
}
