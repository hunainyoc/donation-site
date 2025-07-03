import { Appeal } from "@shared/api";

export const mockAppeals: Appeal[] = [
  {
    id: "1",
    title: "Emergency Water Crisis Relief",
    description:
      "Providing clean water access to communities affected by severe drought. Every dollar helps build wells and water filtration systems.",
    category: "Emergency Relief",
    imageUrl:
      "https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=800&h=600&fit=crop",
    goal: 50000,
    raised: 32500,
    urgency: "critical",
    featured: true,
    location: "East Africa",
    createdAt: "2024-01-15T00:00:00Z",
    endDate: "2024-02-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Education for Every Child",
    description:
      "Building schools and providing educational resources in underserved communities. Help us ensure every child has access to quality education.",
    category: "Education",
    imageUrl:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop",
    goal: 75000,
    raised: 48200,
    urgency: "medium",
    featured: true,
    location: "Southeast Asia",
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "3",
    title: "Medical Supplies for Remote Clinics",
    description:
      "Delivering essential medical supplies and equipment to remote healthcare facilities serving vulnerable populations.",
    category: "Healthcare",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    goal: 30000,
    raised: 18750,
    urgency: "high",
    featured: false,
    location: "South America",
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "4",
    title: "Disaster Relief Fund",
    description:
      "Rapid response fund for natural disasters, providing immediate shelter, food, and medical aid to affected communities.",
    category: "Emergency Relief",
    imageUrl:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    goal: 100000,
    raised: 67500,
    urgency: "high",
    featured: true,
    location: "Multiple Regions",
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "5",
    title: "Sustainable Agriculture Initiative",
    description:
      "Supporting local farmers with sustainable farming techniques and equipment to improve food security and livelihoods.",
    category: "Agriculture",
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    goal: 40000,
    raised: 22100,
    urgency: "medium",
    featured: false,
    location: "West Africa",
    createdAt: "2024-01-25T00:00:00Z",
  },
  {
    id: "6",
    title: "Mental Health Support Program",
    description:
      "Providing mental health counseling and support services to trauma survivors and at-risk youth in conflict zones.",
    category: "Healthcare",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    goal: 25000,
    raised: 14300,
    urgency: "low",
    featured: false,
    location: "Middle East",
    createdAt: "2024-01-30T00:00:00Z",
  },
];
