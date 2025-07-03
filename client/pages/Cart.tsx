import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export default function Cart() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (
    appealId: string,
    amount: number,
    frequency: "onetime" | "monthly" | "yearly",
    newQuantity: string,
  ) => {
    const quantity = parseInt(newQuantity);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(appealId, amount, frequency, quantity);
    }
  };

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

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
            <h1 className="mt-4 text-3xl font-bold text-foreground">
              Your Cart is Empty
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Add some appeals to your cart to get started.
            </p>
            <Link to="/appeals">
              <Button className="mt-6" size="lg">
                Browse Appeals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Your Donation Cart
          </h1>
          <p className="mt-2 text-muted-foreground">
            Review your donations before proceeding to checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.appealId}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.appeal.imageUrl}
                        alt={item.appeal.title}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-2">
                        {item.appeal.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.appeal.category} • {item.appeal.location} •{" "}
                        {item.frequency === "onetime"
                          ? "One-time"
                          : item.frequency.charAt(0).toUpperCase() +
                            item.frequency.slice(1)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-sm font-medium">
                          ${item.amount}
                          {item.frequency !== "onetime"
                            ? `/${item.frequency.slice(0, -2)}`
                            : ""}{" "}
                          each:
                        </span>
                        <div className="flex items-center gap-2">
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
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.appealId,
                                item.amount,
                                item.frequency,
                                e.target.value,
                              )
                            }
                            className="w-16 h-8 text-center"
                            min="1"
                          />
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
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          removeItem(item.appealId, item.amount, item.frequency)
                        }
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="text-lg font-semibold text-foreground">
                        ${(item.amount * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Donation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {state.items.map((item) => (
                    <div
                      key={`${item.appealId}-${item.amount}-${item.frequency}`}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground line-clamp-1">
                        {item.appeal.title} ({item.quantity}x ${item.amount}
                        {item.frequency !== "onetime"
                          ? `/${item.frequency.slice(0, -2)}`
                          : ""}
                        )
                      </span>
                      <span className="font-medium">
                        ${(item.amount * item.quantity).toFixed(2)}
                        {item.frequency !== "onetime"
                          ? `/${item.frequency.slice(0, -2)}`
                          : ""}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Processing Fee</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    ${state.total.toFixed(2)}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/checkout" className="w-full">
                  <Button className="w-full h-11" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
