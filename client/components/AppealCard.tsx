import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Clock, Users } from "lucide-react";
import { Appeal } from "@shared/api";

interface AppealCardProps {
  appeal: Appeal;
  className?: string;
}

export default function AppealCard({
  appeal,
  className = "",
}: AppealCardProps) {
  const progressPercentage = (appeal.raised / appeal.goal) * 100;
  const daysLeft = appeal.endDate
    ? Math.ceil(
        (new Date(appeal.endDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  const urgencyColors = {
    low: "bg-blue-100 text-blue-800 border-blue-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    critical: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <Card
      className={`group overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={appeal.imageUrl}
          alt={appeal.title}
          className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className={urgencyColors[appeal.urgency]}>
            {appeal.urgency.charAt(0).toUpperCase() + appeal.urgency.slice(1)}
          </Badge>
        </div>
        {appeal.featured && (
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-accent text-accent-foreground"
            >
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {appeal.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {appeal.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{appeal.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{appeal.category}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              ${appeal.raised.toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              of ${appeal.goal.toLocaleString()}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progressPercentage.toFixed(1)}% funded</span>
            {daysLeft && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>
                  {daysLeft > 0 ? `${daysLeft} days left` : "Campaign ended"}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link to={`/appeal/${appeal.id}`} className="w-full">
          <Button className="w-full" variant="default">
            Donate Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
