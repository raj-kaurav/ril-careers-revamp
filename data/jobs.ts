import type { BusinessId } from "./businesses";

/**
 * Demo opportunities for the prototype. These are NOT live RIL vacancies; in
 * production this list comes from HireSphere via the jobs service
 * (`lib/jobs-service.ts`), which is the only module that reads this file.
 */
export type CareerStage = "student" | "experienced" | "leadership";

export type JobFunction =
  | "technology"
  | "data-ai"
  | "product"
  | "engineering"
  | "operations"
  | "research"
  | "commercial"
  | "corporate";

export type DemoJob = {
  id: string;
  title: string;
  businessId: BusinessId;
  location: string;
  function: JobFunction;
  careerStage: CareerStage;
  experience: string;
  employmentType: "Full-time" | "Internship" | "Graduate programme";
  summary: string;
  responsibilities: string[];
  skills: string[];
  /** Shown in the homepage "Opportunities worth exploring" selection. */
  featured?: boolean;
  isDemo: true;
};

export const careerStages: { value: CareerStage; label: string; description: string }[] = [
  { value: "student", label: "Students & Graduates", description: "Internships and early careers" },
  { value: "experienced", label: "Experienced Professionals", description: "2–12 years" },
  { value: "leadership", label: "Leaders & Specialists", description: "12+ years" },
];

export const jobFunctions: { value: JobFunction; label: string }[] = [
  { value: "technology", label: "Technology" },
  { value: "data-ai", label: "AI & Data" },
  { value: "product", label: "Product" },
  { value: "engineering", label: "Engineering" },
  { value: "operations", label: "Operations" },
  { value: "research", label: "Research & Development" },
  { value: "commercial", label: "Retail & Commercial" },
  { value: "corporate", label: "Corporate Functions" },
];

export const demoJobs: DemoJob[] = [
  {
    id: "senior-software-engineer",
    title: "Senior Software Engineer",
    businessId: "jio",
    location: "Navi Mumbai, Maharashtra",
    function: "technology",
    careerStage: "experienced",
    experience: "5–8 years",
    employmentType: "Full-time",
    summary: "Design and scale backend services for consumer digital platforms used across the country.",
    responsibilities: [
      "Design, build and operate high-throughput backend services",
      "Improve reliability, latency and cost across distributed systems",
      "Mentor engineers and raise the bar on code quality and reviews",
      "Partner with product and design to shape platform roadmaps",
    ],
    skills: ["Java", "Distributed systems", "Kubernetes", "Cloud"],
    featured: true,
    isDemo: true,
  },
  {
    id: "product-manager-digital",
    title: "Product Manager — Digital",
    businessId: "retail",
    location: "Bengaluru, Karnataka",
    function: "product",
    careerStage: "experienced",
    experience: "4–7 years",
    employmentType: "Full-time",
    summary: "Own discovery-to-delivery for digital commerce journeys that connect stores and online shoppers.",
    responsibilities: [
      "Own the roadmap for a core digital commerce journey",
      "Run discovery with customers, store teams and data",
      "Define success metrics and run experiments",
      "Work with engineering and design to ship iteratively",
    ],
    skills: ["Product strategy", "Experimentation", "Analytics", "E-commerce"],
    featured: true,
    isDemo: true,
  },
  {
    id: "process-engineer",
    title: "Process Engineer",
    businessId: "o2c",
    location: "Jamnagar, Gujarat",
    function: "engineering",
    careerStage: "experienced",
    experience: "3–6 years",
    employmentType: "Full-time",
    summary: "Optimise unit performance, energy efficiency and safety across large-scale processing assets.",
    responsibilities: [
      "Monitor and optimise process unit performance",
      "Lead process safety reviews and HAZOP studies",
      "Identify energy-efficiency and yield improvements",
      "Support turnarounds and capital projects",
    ],
    skills: ["Process simulation", "HAZOP", "Optimisation", "Safety"],
    featured: true,
    isDemo: true,
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    businessId: "new-energy",
    location: "Navi Mumbai, Maharashtra",
    function: "data-ai",
    careerStage: "experienced",
    experience: "2–5 years",
    employmentType: "Full-time",
    summary: "Build forecasting and optimisation models for solar, storage and manufacturing operations.",
    responsibilities: [
      "Build forecasting models for generation and demand",
      "Develop optimisation models for storage and manufacturing",
      "Productionise models with engineering teams",
      "Communicate insights to business stakeholders",
    ],
    skills: ["Python", "Machine learning", "Forecasting", "AI"],
    featured: true,
    isDemo: true,
  },
  {
    id: "ml-engineer-platforms",
    title: "Machine Learning Engineer",
    businessId: "jio",
    location: "Hyderabad, Telangana",
    function: "data-ai",
    careerStage: "experienced",
    experience: "3–6 years",
    employmentType: "Full-time",
    summary: "Ship machine-learning systems that personalise digital experiences for millions of users.",
    responsibilities: [
      "Build and deploy recommendation and ranking models",
      "Own ML pipelines from feature engineering to monitoring",
      "Improve model quality through experimentation",
      "Collaborate with product teams on AI-powered features",
    ],
    skills: ["Python", "MLOps", "Recommendation systems", "AI"],
    isDemo: true,
  },
  {
    id: "graduate-engineer-trainee",
    title: "Graduate Engineer Trainee",
    businessId: "o2c",
    location: "Jamnagar, Gujarat",
    function: "engineering",
    careerStage: "student",
    experience: "0–1 years",
    employmentType: "Graduate programme",
    summary: "Begin your engineering career with structured rotations across operations, maintenance and projects.",
    responsibilities: [
      "Rotate across operations, maintenance and projects",
      "Learn plant systems, safety practices and processes",
      "Deliver an improvement project with a mentor",
      "Build the foundation for a specialist or leadership path",
    ],
    skills: ["Chemical engineering", "Mechanical engineering", "Safety"],
    isDemo: true,
  },
  {
    id: "technology-intern",
    title: "Software Engineering Intern",
    businessId: "jio",
    location: "Navi Mumbai, Maharashtra",
    function: "technology",
    careerStage: "student",
    experience: "Students",
    employmentType: "Internship",
    summary: "Work on a real product team for a summer, shipping code that reaches real users.",
    responsibilities: [
      "Build features alongside an experienced product team",
      "Learn modern engineering practices and tooling",
      "Present your work to engineering leaders",
    ],
    skills: ["JavaScript", "Java", "Problem solving"],
    isDemo: true,
  },
  {
    id: "retail-management-trainee",
    title: "Retail Management Trainee",
    businessId: "retail",
    location: "Mumbai, Maharashtra",
    function: "commercial",
    careerStage: "student",
    experience: "0–2 years",
    employmentType: "Graduate programme",
    summary: "Learn retail from the store floor up, with a path towards store and category leadership.",
    responsibilities: [
      "Rotate across store operations, category and supply chain",
      "Lead a store team under the guidance of a mentor",
      "Use customer and sales data to improve performance",
    ],
    skills: ["Retail operations", "Customer experience", "Leadership"],
    isDemo: true,
  },
  {
    id: "supply-chain-manager",
    title: "Supply Chain Manager",
    businessId: "retail",
    location: "Delhi NCR",
    function: "operations",
    careerStage: "experienced",
    experience: "6–10 years",
    employmentType: "Full-time",
    summary: "Run a regional supply network that keeps stores and online orders moving every day.",
    responsibilities: [
      "Plan and run regional distribution operations",
      "Improve fill rates, cost and delivery performance",
      "Lead warehouse and logistics partners",
    ],
    skills: ["Supply chain", "Logistics", "Planning", "Retail"],
    isDemo: true,
  },
  {
    id: "battery-research-scientist",
    title: "Research Scientist — Energy Storage",
    businessId: "new-energy",
    location: "Jamnagar, Gujarat",
    function: "research",
    careerStage: "experienced",
    experience: "PhD + 2 years",
    employmentType: "Full-time",
    summary: "Advance cell chemistry and materials research for next-generation energy storage.",
    responsibilities: [
      "Design and run electrochemistry experiments",
      "Characterise materials and cell performance",
      "Scale promising chemistries with manufacturing teams",
    ],
    skills: ["Electrochemistry", "Materials science", "R&D", "New energy"],
    isDemo: true,
  },
  {
    id: "head-solar-manufacturing",
    title: "Head of Manufacturing Excellence",
    businessId: "new-energy",
    location: "Jamnagar, Gujarat",
    function: "operations",
    careerStage: "leadership",
    experience: "15+ years",
    employmentType: "Full-time",
    summary: "Lead manufacturing excellence across a new giga-scale clean-energy manufacturing complex.",
    responsibilities: [
      "Set the operating model for manufacturing excellence",
      "Build and lead multi-disciplinary teams",
      "Drive quality, yield and safety at scale",
    ],
    skills: ["Manufacturing", "Lean", "Leadership", "New energy"],
    isDemo: true,
  },
  {
    id: "reservoir-engineer",
    title: "Reservoir Engineer",
    businessId: "oil-gas",
    location: "Navi Mumbai, Maharashtra",
    function: "engineering",
    careerStage: "experienced",
    experience: "4–8 years",
    employmentType: "Full-time",
    summary: "Model and manage reservoirs to maximise safe, efficient recovery.",
    responsibilities: [
      "Build and maintain reservoir simulation models",
      "Plan development and production strategies",
      "Work with geoscience and drilling teams",
    ],
    skills: ["Reservoir simulation", "Petroleum engineering", "Data analysis"],
    isDemo: true,
  },
  {
    id: "content-strategy-lead",
    title: "Content Strategy Lead",
    businessId: "media",
    location: "Mumbai, Maharashtra",
    function: "commercial",
    careerStage: "experienced",
    experience: "6–10 years",
    employmentType: "Full-time",
    summary: "Shape content strategy and programming for a growing digital audience.",
    responsibilities: [
      "Define content strategy using audience insight",
      "Partner with production and marketing teams",
      "Track performance and evolve programming",
    ],
    skills: ["Content strategy", "Audience insight", "Streaming"],
    featured: true,
    isDemo: true,
  },
  {
    id: "director-strategy",
    title: "Director — Group Strategy",
    businessId: "corporate",
    location: "Mumbai, Maharashtra",
    function: "corporate",
    careerStage: "leadership",
    experience: "12+ years",
    employmentType: "Full-time",
    summary: "Shape group-level strategy and new-business initiatives with senior leadership.",
    responsibilities: [
      "Lead strategic reviews and new-business assessments",
      "Advise senior leadership on portfolio decisions",
      "Build and develop a high-performing strategy team",
    ],
    skills: ["Strategy", "Corporate finance", "Leadership"],
    featured: true,
    isDemo: true,
  },
  {
    id: "head-ai-platforms",
    title: "Head of AI Platforms",
    businessId: "jio",
    location: "Bengaluru, Karnataka",
    function: "data-ai",
    careerStage: "leadership",
    experience: "14+ years",
    employmentType: "Full-time",
    summary: "Lead the platforms and teams that bring AI into products used across India.",
    responsibilities: [
      "Set the vision for shared AI and data platforms",
      "Lead engineering and research teams",
      "Partner with business leaders on AI adoption",
    ],
    skills: ["AI", "Platform engineering", "Leadership"],
    isDemo: true,
  },
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    businessId: "corporate",
    location: "Mumbai, Maharashtra",
    function: "corporate",
    careerStage: "experienced",
    experience: "2–4 years",
    employmentType: "Full-time",
    summary: "Support planning, performance and investment decisions across the group.",
    responsibilities: [
      "Build financial models and business cases",
      "Support planning and performance reviews",
      "Analyse investment opportunities",
    ],
    skills: ["Financial modelling", "Excel", "Analytics", "Finance"],
    isDemo: true,
  },
];
