import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, ShoppingCart, Calendar, Clock, RotateCcw } from "lucide-react";
import { Appeal } from "@shared/api";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface DonationWidgetProps {
  appeal: Appeal;
  className?: string;
  showProgress?: boolean;
}

const presetAmounts = [10, 25, 50, 100, 250];

export default function DonationWidget({
  appeal,
  className = "",
  showProgress = true,
}: DonationWidgetProps) {
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<"onetime" | "monthly" | "yearly">(
    "onetime",
  );
  const { addItem } = useCart();

  const progressPercentage = (appeal.raised / appeal.goal) * 100;

  const handlePresetAmount = (presetAmount: number) => {
    setAmount(presetAmount);
    setCustomAmount("");
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setAmount(numValue);
    }
  };

  const handleDonate = () => {
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    addItem(appeal, amount, frequency);
    const frequencyText = frequency === "onetime" ? "one-time" : frequency;
    toast({
      title: "Added to Cart",
      description: `$${amount} ${frequencyText} donation to "${appeal.title}" added to your cart.`,
    });
  };

  const urgencyColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  };

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Make a Donation
          </CardTitle>
          <Badge className={urgencyColors[appeal.urgency]}>
            {appeal.urgency.charAt(0).toUpperCase() + appeal.urgency.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                ${appeal.raised.toLocaleString()} / $
                {appeal.goal.toLocaleString()}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {progressPercentage.toFixed(1)}% of goal reached
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium">Donation Frequency</label>
            <RadioGroup
              value={frequency}
              onValueChange={(value: "onetime" | "monthly" | "yearly") =>
                setFrequency(value)
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="onetime" id="onetime" />
                <Label
                  htmlFor="onetime"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Heart className="h-4 w-4" />
                  <span>One-time</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label
                  htmlFor="monthly"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Monthly</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label
                  htmlFor="yearly"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Yearly</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Select Amount</label>
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((presetAmount) => (
                <Button
                  key={presetAmount}
                  variant={amount === presetAmount ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePresetAmount(presetAmount)}
                  className="h-10"
                >
                  ${presetAmount}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Custom Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                className="pl-8"
                min="1"
                step="0.01"
              />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="space-y-2">
        <Button
          onClick={handleDonate}
          className="w-full h-11"
          disabled={amount <= 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add ${amount}{" "}
          {frequency === "onetime" ? "" : `/${frequency.slice(0, -2)}`} to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
