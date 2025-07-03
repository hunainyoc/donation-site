import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppealCard from "@/components/AppealCard";
import Navigation from "@/components/Navigation";
import { mockAppeals } from "@/data/mockAppeals";
import { Heart, Users, Globe, ArrowRight } from "lucide-react";

export default function Index() {
  const featuredAppeals = mockAppeals.filter((appeal) => appeal.featured);
  const urgentAppeals = mockAppeals
    .filter((appeal) => appeal.urgency === "critical")
    .slice(0, 1);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Make a Difference
              <span className="block text-primary">One Donation at a Time</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Join thousands of compassionate people making real change in the
              world. Every donation, no matter the size, creates ripples of hope
              and transformation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/appeals">
                <Button size="lg" className="h-12 px-8">
                  Start Donating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-3xl font-bold text-foreground">
                  $2.4M+
                </h3>
                <p className="text-muted-foreground">Total Donations</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="mt-4 text-3xl font-bold text-foreground">
                  15,000+
                </h3>
                <p className="text-muted-foreground">Lives Impacted</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-3xl font-bold text-foreground">25+</h3>
                <p className="text-muted-foreground">Countries Served</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Urgent Appeals */}
      {urgentAppeals.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge
                variant="destructive"
                className="mb-4 px-3 py-1 text-sm font-medium"
              >
                URGENT
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Critical Appeals
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                These appeals need immediate attention. Your donation can make
                an urgent difference.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-1">
              {urgentAppeals.map((appeal) => (
                <div key={appeal.id} className="mx-auto max-w-md">
                  <AppealCard appeal={appeal} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Appeals */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured Appeals
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Discover impactful causes that are making a difference around the
              world.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredAppeals.slice(0, 3).map((appeal) => (
              <AppealCard key={appeal.id} appeal={appeal} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/appeals">
              <Button variant="outline" size="lg">
                View All Appeals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-primary to-primary/80">
            <CardContent className="px-6 py-12 text-center sm:px-12">
              <h2 className="text-3xl font-bold text-primary-foreground">
                Ready to Make an Impact?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
                Join our community of changemakers and start making a difference
                today.
              </p>
              <div className="mt-8">
                <Link to="/appeals">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-12 px-8 text-primary"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
