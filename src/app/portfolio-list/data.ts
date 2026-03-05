export interface Version {
  id: string;
  name: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  creator: string;
  lastModified: string;
  tags: Record<string, string>;
  versions: Version[];
}

export interface Dimension {
  id: string;
  name: string;
  type: "text" | "dropdown";
  options: string[];
  color: string;
}

export const DIMENSION_COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-purple-100 text-purple-800",
  "bg-green-100 text-green-800",
  "bg-amber-100 text-amber-800",
  "bg-rose-100 text-rose-800",
  "bg-teal-100 text-teal-800",
  "bg-indigo-100 text-indigo-800",
  "bg-orange-100 text-orange-800",
];

export const INITIAL_DIMENSIONS: Dimension[] = [
  {
    id: "stage",
    name: "Stage",
    type: "dropdown",
    options: ["Discovery", "Pilot", "Scaling", "Mature"],
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "department",
    name: "Department",
    type: "text",
    options: [],
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "region",
    name: "Region",
    type: "text",
    options: [],
    color: "bg-green-100 text-green-800",
  },
  {
    id: "priority",
    name: "Priority",
    type: "dropdown",
    options: ["High", "Medium", "Low"],
    color: "bg-amber-100 text-amber-800",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "Desert Canyon Logistics Platform",
    description: "Real-time fleet tracking for deliveries across arid terrain routes",
    creator: "Wile E. Coyote",
    lastModified: "2026-02-28",
    tags: { stage: "Pilot", department: "Logistics", region: "Southwest", priority: "High" },
    versions: [
      { id: "s1a", name: "Initial concept", date: "2026-01-10" },
      { id: "s1b", name: "After stakeholder review", date: "2026-02-01" },
      { id: "s1c", name: "Pilot-ready draft", date: "2026-02-28" },
    ],
  },
  {
    id: "2",
    name: "Rocket Sled Efficiency Analyzer",
    description: "ML model to optimize rocket sled fuel consumption and route timing",
    creator: "Road Runner",
    lastModified: "2026-03-01",
    tags: { stage: "Discovery", department: "R&D", priority: "Medium" },
    versions: [
      { id: "s2a", name: "v1 draft", date: "2026-02-15" },
      { id: "s2b", name: "Updated metrics", date: "2026-03-01" },
    ],
  },
  {
    id: "3",
    name: "Anvil Drop Safety Certification",
    description: "Automated compliance checker for industrial equipment safety standards",
    creator: "Foghorn Leghorn",
    lastModified: "2026-02-20",
    tags: { stage: "Scaling", department: "Compliance", region: "Northeast", priority: "High" },
    versions: [
      { id: "s3a", name: "Compliance framework v1", date: "2026-01-05" },
      { id: "s3b", name: "Audit-ready version", date: "2026-02-10" },
      { id: "s3c", name: "Post-audit revisions", date: "2026-02-20" },
    ],
  },
  {
    id: "4",
    name: "Tunnel Paint Illusion Generator",
    description: "AR tool for visualizing proposed infrastructure before construction begins",
    creator: "Wile E. Coyote",
    lastModified: "2026-03-02",
    tags: { stage: "Discovery", department: "Engineering", region: "Southwest" },
    versions: [
      { id: "s4a", name: "Proof of concept", date: "2026-03-02" },
    ],
  },
  {
    id: "5",
    name: "Birdseed Supply Chain Dashboard",
    description: "End-to-end visibility into raw materials procurement and distribution",
    creator: "Tweety Bird",
    lastModified: "2026-02-25",
    tags: { stage: "Pilot", department: "Supply Chain", region: "Midwest", priority: "Medium" },
    versions: [
      { id: "s5a", name: "Wireframes", date: "2026-01-20" },
      { id: "s5b", name: "Beta dashboard", date: "2026-02-25" },
    ],
  },
  {
    id: "6",
    name: "Cactus Farm Yield Predictor",
    description: "Satellite imagery analysis for predicting crop yields in desert agriculture",
    creator: "Yosemite Sam",
    lastModified: "2026-02-18",
    tags: { stage: "Scaling", department: "Agriculture", region: "Southwest", priority: "Low" },
    versions: [
      { id: "s6a", name: "Model v1", date: "2026-01-15" },
      { id: "s6b", name: "Accuracy improvements", date: "2026-02-05" },
      { id: "s6c", name: "Production deploy", date: "2026-02-18" },
    ],
  },
  {
    id: "7",
    name: "Roadside Cliff Alert Network",
    description: "IoT sensor network for detecting unstable cliff edges along highways",
    creator: "Road Runner",
    lastModified: "2026-03-03",
    tags: { stage: "Discovery", department: "Safety", priority: "High" },
    versions: [
      { id: "s7a", name: "Sensor spec draft", date: "2026-03-03" },
    ],
  },
  {
    id: "8",
    name: "ACME Product Recall Tracker",
    description: "Customer notification system for managing product recalls and replacements",
    creator: "Daffy Duck",
    lastModified: "2026-02-22",
    tags: { stage: "Pilot", department: "Customer Service", region: "Northeast" },
    versions: [
      { id: "s8a", name: "Initial design", date: "2026-02-01" },
      { id: "s8b", name: "Customer feedback round", date: "2026-02-22" },
    ],
  },
];
