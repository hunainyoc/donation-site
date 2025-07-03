import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import DonationWidget from "@/components/DonationWidget";
import Navigation from "@/components/Navigation";
import { mockAppeals } from "@/data/mockAppeals";
import {
  MapPin,
  Clock,
  Users,
  Calendar,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react";

export default function AppealDetail() {
  const { id } = useParams<{ id: string }>();
  const appeal = mockAppeals.find((a) => a.id === id);

  if (!appeal) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Appeal Not Found
            </h1>
            <p className="mt-2 text-muted-foreground">
              The appeal you're looking for doesn't exist.
            </p>
            <Link to="/appeals">
              <Button className="mt-4">Back to Appeals</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/appeals"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Appeals
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={appeal.imageUrl}
                alt={appeal.title}
                className="h-64 w-full object-cover sm:h-80"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className={urgencyColors[appeal.urgency]}>
                  {appeal.urgency.charAt(0).toUpperCase() +
                    appeal.urgency.slice(1)}
                </Badge>
                {appeal.featured && (
                  <Badge
                    variant="secondary"
                    className="bg-accent text-accent-foreground"
                  >
                    Featured
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <Button size="sm" variant="secondary">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Title and Meta */}
            <div className="mt-6">
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                {appeal.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{appeal.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{appeal.category}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Created{" "}
                    {new Date(appeal.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {daysLeft && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {daysLeft > 0
                        ? `${daysLeft} days left`
                        : "Campaign ended"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Progress</h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    ${appeal.raised.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    of ${appeal.goal.toLocaleString()} goal
                  </div>
                </div>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{progressPercentage.toFixed(1)}% funded</span>
                <span>
                  {Math.ceil(Math.random() * 150 + 50).toLocaleString()}{" "}
                  supporters
                </span>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About This Appeal</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {appeal.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  This initiative represents more than just a fundraising
                  campaign—it's a lifeline for communities in need. Your support
                  directly translates into tangible improvements in people's
                  lives, whether through access to clean water, educational
                  resources, medical care, or emergency relief.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Every donation, regardless of size, contributes to a larger
                  movement of positive change. We maintain complete transparency
                  in how funds are used and provide regular updates on the
                  impact your contribution is making.
                </p>
              </div>
            </div>

            {/* Impact Section */}
            <div className="mt-8 p-6 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Heart className="mr-2 h-5 w-5 text-primary" />
                Your Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$25</div>
                  <div className="text-sm text-muted-foreground">
                    Provides clean water for 1 person for a month
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$50</div>
                  <div className="text-sm text-muted-foreground">
                    Supplies educational materials for 5 children
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$100</div>
                  <div className="text-sm text-muted-foreground">
                    Funds emergency medical care for a family
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <DonationWidget appeal={appeal} showProgress={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
