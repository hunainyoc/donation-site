import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Trash2, ArrowRight, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";

interface MiniCartProps {
  className?: string;
}

export default function MiniCart({ className = "" }: MiniCartProps) {
  const { state, removeItem, updateQuantity, getItemCount, recentlyAdded } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const itemCount = getItemCount();

  // Auto-open cart when items are recently added
  useEffect(() => {
    if (recentlyAdded && itemCount > 0) {
      setIsOpen(true);
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [recentlyAdded, itemCount]);

  const incrementQuantity = (
    appealId: string,
    amount: number,
    frequency: "onetime" | "monthly" | "yearly",
    currentQuantity: number,
  ) => {
    updateQuantity(appealId, amount, frequency, currentQuantity + 1);
  };

  const decrementQuantity = (
    appealId: string,
    amount: number,
    frequency: "onetime" | "monthly" | "yearly",
    currentQuantity: number,
  ) => {
    if (currentQuantity > 1) {
      updateQuantity(appealId, amount, frequency, currentQuantity - 1);
    }
  };

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <>
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {itemCount}
                </Badge>
                {showNotification && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap animate-in slide-in-from-bottom-2">
                    Item added!
                  </div>
                )}
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-3">
              Your Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
            </h3>

            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <>
                <ScrollArea className="max-h-64 mb-4">
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div
                        key={item.appealId}
                        className="flex gap-3 p-3 bg-muted/30 rounded-lg"
                      >
                        <img
                          src={item.appeal.imageUrl}
                          alt={item.appeal.title}
                          className="h-12 w-12 rounded object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-1 mb-1">
                            {item.appeal.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {item.appeal.category} •{" "}
                            {item.frequency === "onetime"
                              ? "One-time"
                              : item.frequency.charAt(0).toUpperCase() +
                                item.frequency.slice(1)}
                          </p>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                decrementQuantity(
                                  item.appealId,
                                  item.amount,
                                  item.frequency,
                                  item.quantity,
                                )
                              }
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-xs px-2 min-w-12 text-center">
                              {item.quantity}x ${item.amount}
                              {item.frequency !== "onetime"
                                ? `/${item.frequency.slice(0, -2)}`
                                : ""}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                incrementQuantity(
                                  item.appealId,
                                  item.amount,
                                  item.frequency,
                                  item.quantity,
                                )
                              }
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeItem(
                              item.appealId,
                              item.amount,
                              item.frequency,
                            )
                          }
                          className="text-destructive hover:text-destructive h-6 w-6 p-0 flex-shrink-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Separator className="mb-4" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg text-primary">
                      ${state.total.toFixed(2)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/cart" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Cart
                      </Button>
                    </Link>
                    <Link to="/checkout" onClick={() => setIsOpen(false)}>
                      <Button size="sm" className="w-full">
                        Checkout
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
