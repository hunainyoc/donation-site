import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import AppealCard from "@/components/AppealCard";
import Navigation from "@/components/Navigation";
import { mockAppeals } from "@/data/mockAppeals";
import { Search, Filter } from "lucide-react";

export default function Appeals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedUrgency, setSelectedUrgency] = useState<string>("all");

  const categories = ["all", ...new Set(mockAppeals.map((a) => a.category))];
  const urgencyLevels = ["all", "low", "medium", "high", "critical"];

  const filteredAppeals = mockAppeals.filter((appeal) => {
    const matchesSearch =
      appeal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appeal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appeal.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || appeal.category === selectedCategory;

    const matchesUrgency =
      selectedUrgency === "all" || appeal.urgency === selectedUrgency;

    return matchesSearch && matchesCategory && matchesUrgency;
  });

  const totalRaised = mockAppeals.reduce(
    (sum, appeal) => sum + appeal.raised,
    0,
  );
  const totalGoal = mockAppeals.reduce((sum, appeal) => sum + appeal.goal, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              All Appeals
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Browse through our collection of impactful causes and find the
              ones that resonate with you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="px-3 py-1">
                {mockAppeals.length} Active Campaigns
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                ${totalRaised.toLocaleString()} Raised
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                {((totalRaised / totalGoal) * 100).toFixed(1)}% of Total Goal
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-background/95 backdrop-blur sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search appeals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedUrgency}
                onValueChange={setSelectedUrgency}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((urgency) => (
                    <SelectItem key={urgency} value={urgency}>
                      {urgency === "all"
                        ? "All Levels"
                        : urgency.charAt(0).toUpperCase() + urgency.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Appeals Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredAppeals.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No appeals found
              </h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filters to find more appeals.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedUrgency("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-muted-foreground">
                Showing {filteredAppeals.length} of {mockAppeals.length} appeals
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredAppeals.map((appeal) => (
                  <AppealCard key={appeal.id} appeal={appeal} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
