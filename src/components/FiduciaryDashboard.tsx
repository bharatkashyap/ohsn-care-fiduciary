import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MetricDrilldown } from "./GovernmentDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
} from "recharts";
import { SparkLineChart } from "@tremor/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface AgentPerformanceData {
  name: string;
  patientSatisfaction: number;
  responseRate: number;
  retentionRate: number;
  retentionHistory: number[];
  totalPatients: number;
  activePatients: number;
  aggregateRating: number;
  riskManagementScore: number;
  status: "Active" | "On Leave" | "Training";
}

interface RiskManagementData {
  month: string;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
}

interface GeographicData {
  month: string;
  northRegion: number;
  southRegion: number;
  eastRegion: number;
  westRegion: number;
}

interface ProviderRatingData {
  rating: string;
  count: number;
}

interface ProviderPerformanceData {
  name: string;
  rating: number;
  waitTime: number;
  complaints: number;
  status: "Excellent" | "Good" | "Needs Improvement";
}

interface RegionalPerformanceData {
  region: string;
  providers: number;
  agents: number;
  avgProviderRating: number;
  avgAgentRating: number;
  patientCount: number;
  riskScore: number;
  satisfaction: number;
}

interface OverviewMetrics {
  month: string;
  patientCount: number;
  agentCount: number;
  riskScore: number;
  satisfaction: number;
}

// Add wearable data types and constants
const maternalWearableData = [
  {
    timestamp: "2024-01-15T00:00",
    heartRate: 82,
    bloodPressure: { systolic: 118, diastolic: 75 },
    bloodOxygen: 98,
    temperature: 36.8,
    sleepHours: 7.5,
    dailySteps: 4500,
    hemoglobinLevels: 11.8,
    glucoseLevels: 95,
    stressLevel: 3,
    movementActivity: 65,
    weightGain: 8.2,
    hydrationLevel: 85,
  },
  {
    timestamp: "2024-01-15T06:00",
    heartRate: 78,
    bloodPressure: { systolic: 115, diastolic: 72 },
    bloodOxygen: 99,
    temperature: 36.7,
    sleepHours: 0,
    dailySteps: 800,
    hemoglobinLevels: 11.7,
    glucoseLevels: 92,
    stressLevel: 2,
    movementActivity: 25,
    weightGain: 8.2,
    hydrationLevel: 82,
  },
  {
    timestamp: "2024-01-15T12:00",
    heartRate: 88,
    bloodPressure: { systolic: 120, diastolic: 78 },
    bloodOxygen: 98,
    temperature: 37.0,
    sleepHours: 0,
    dailySteps: 3200,
    hemoglobinLevels: 11.6,
    glucoseLevels: 105,
    stressLevel: 4,
    movementActivity: 75,
    weightGain: 8.2,
    hydrationLevel: 78,
  },
  {
    timestamp: "2024-01-15T18:00",
    heartRate: 85,
    bloodPressure: { systolic: 122, diastolic: 80 },
    bloodOxygen: 97,
    temperature: 37.1,
    sleepHours: 0,
    dailySteps: 6500,
    hemoglobinLevels: 11.5,
    glucoseLevels: 98,
    stressLevel: 5,
    movementActivity: 45,
    weightGain: 8.3,
    hydrationLevel: 75,
  },
  {
    timestamp: "2024-01-15T21:00",
    heartRate: 92,
    bloodPressure: { systolic: 125, diastolic: 82 },
    bloodOxygen: 96,
    temperature: 37.2,
    sleepHours: 2,
    dailySteps: 7200,
    hemoglobinLevels: 8.5,
    glucoseLevels: 110,
    stressLevel: 6,
    movementActivity: 30,
    weightGain: 8.3,
    hydrationLevel: 72,
  },
];

const infantWearableData = [
  {
    timestamp: "2024-01-15T00:00",
    birthWeight: 3.2,
    currentWeight: 3.5,
    temperature: 36.8,
    heartRate: 125,
    respiratoryRate: 35,
    bloodOxygen: 98,
    sleepDuration: 2.5,
    movementIntensity: 45,
    feedingFrequency: 3,
    cryingPatterns: 2,
    jaundiceLevel: 2.5,
    growthPercentile: 65,
  },
  {
    timestamp: "2024-01-15T06:00",
    birthWeight: 3.2,
    currentWeight: 3.5,
    temperature: 36.9,
    heartRate: 130,
    respiratoryRate: 38,
    bloodOxygen: 99,
    sleepDuration: 3,
    movementIntensity: 20,
    feedingFrequency: 2,
    cryingPatterns: 1,
    jaundiceLevel: 2.4,
    growthPercentile: 65,
  },
  {
    timestamp: "2024-01-15T12:00",
    birthWeight: 3.2,
    currentWeight: 3.5,
    temperature: 37.0,
    heartRate: 128,
    respiratoryRate: 36,
    bloodOxygen: 97,
    sleepDuration: 1.5,
    movementIntensity: 15,
    feedingFrequency: 1,
    cryingPatterns: 3,
    jaundiceLevel: 2.3,
    growthPercentile: 66,
  },
  {
    timestamp: "2024-01-15T18:00",
    birthWeight: 3.2,
    currentWeight: 3.5,
    temperature: 37.1,
    heartRate: 132,
    respiratoryRate: 40,
    bloodOxygen: 98,
    sleepDuration: 2,
    movementIntensity: 25,
    feedingFrequency: 3,
    cryingPatterns: 2,
    jaundiceLevel: 2.2,
    growthPercentile: 66,
  },
];

const maternalAlertThresholds = {
  hemoglobin: {
    critical: 9.0,
    warning: 11.0,
  },
  heartRate: {
    high: 100,
    low: 60,
  },
  bloodPressure: {
    systolicHigh: 140,
    systolicLow: 90,
    diastolicHigh: 90,
    diastolicLow: 60,
  },
  bloodOxygen: {
    critical: 95,
    warning: 97,
  },
  temperature: {
    high: 37.8,
    low: 36.0,
  },
  movementActivity: {
    low: 20,
  },
  hydrationLevel: {
    low: 70,
  },
};

const infantAlertThresholds = {
  heartRate: {
    high: 160,
    low: 80,
  },
  respiratoryRate: {
    high: 45,
    low: 25,
  },
  temperature: {
    high: 37.5,
    low: 36.5,
  },
  movementIntensity: {
    low: 20,
  },
  feedingGap: {
    max: 4,
  },
  weightGain: {
    min: 0.15,
  },
  jaundiceLevel: {
    critical: 3.0,
  },
};

const agentPerformanceData: AgentPerformanceData[] = [
  {
    name: "Priya Reddy",
    patientSatisfaction: 98,
    responseRate: 95,
    retentionRate: 94,
    retentionHistory: [92, 93, 94, 94, 95, 94, 96, 94],
    totalPatients: 120,
    activePatients: 112,
    aggregateRating: 4.8,
    riskManagementScore: 95,
    status: "Active",
  },
  {
    name: "Dr. Anjali Singh",
    patientSatisfaction: 96,
    responseRate: 92,
    retentionRate: 91,
    retentionHistory: [88, 90, 89, 91, 92, 91, 90, 91],
    totalPatients: 115,
    activePatients: 105,
    aggregateRating: 4.6,
    riskManagementScore: 92,
    status: "Active",
  },
  {
    name: "Dr. Deepa Kumar",
    patientSatisfaction: 94,
    responseRate: 88,
    retentionRate: 89,
    retentionHistory: [85, 86, 88, 87, 89, 88, 89, 89],
    totalPatients: 108,
    activePatients: 96,
    aggregateRating: 4.4,
    riskManagementScore: 88,
    status: "Active",
  },
  {
    name: "Dr. Meera Reddy",
    patientSatisfaction: 92,
    responseRate: 90,
    retentionRate: 88,
    retentionHistory: [84, 85, 86, 88, 87, 88, 89, 88],
    totalPatients: 95,
    activePatients: 84,
    aggregateRating: 4.3,
    riskManagementScore: 86,
    status: "On Leave",
  },
];

const riskManagementData: RiskManagementData[] = [
  {
    month: "Jan",
    highRisk: 24,
    mediumRisk: 45,
    lowRisk: 31,
  },
  {
    month: "Feb",
    highRisk: 22,
    mediumRisk: 43,
    lowRisk: 35,
  },
  {
    month: "Mar",
    highRisk: 19,
    mediumRisk: 42,
    lowRisk: 39,
  },
];

const geographicData: GeographicData[] = [
  {
    month: "Jan",
    northRegion: 85,
    southRegion: 78,
    eastRegion: 82,
    westRegion: 80,
  },
  {
    month: "Feb",
    northRegion: 87,
    southRegion: 80,
    eastRegion: 84,
    westRegion: 82,
  },
  {
    month: "Mar",
    northRegion: 89,
    southRegion: 82,
    eastRegion: 86,
    westRegion: 84,
  },
];

const providerRatingsData: ProviderRatingData[] = [
  { rating: "5★", count: 12 },
  { rating: "4★", count: 18 },
  { rating: "3★", count: 6 },
  { rating: "2★", count: 3 },
  { rating: "1★", count: 1 },
];

const providerPerformanceData: ProviderPerformanceData[] = [
  {
    name: "Aashirwad Hospital",
    rating: 4.8,
    waitTime: 22,
    complaints: 2,
    status: "Excellent",
  },
  {
    name: "Lifeline Medical Center",
    rating: 4.5,
    waitTime: 25,
    complaints: 4,
    status: "Good",
  },
  {
    name: "City Care Hospital",
    rating: 4.2,
    waitTime: 30,
    complaints: 6,
    status: "Good",
  },
  {
    name: "Wellness Clinic",
    rating: 3.8,
    waitTime: 35,
    complaints: 8,
    status: "Needs Improvement",
  },
];

const regionalPerformanceData: RegionalPerformanceData[] = [
  {
    region: "North Region",
    providers: 12,
    agents: 45,
    avgProviderRating: 4.5,
    avgAgentRating: 4.7,
    patientCount: 850,
    riskScore: 22,
    satisfaction: 92,
  },
  {
    region: "South Region",
    providers: 10,
    agents: 38,
    avgProviderRating: 4.3,
    avgAgentRating: 4.5,
    patientCount: 720,
    riskScore: 25,
    satisfaction: 88,
  },
  {
    region: "East Region",
    providers: 8,
    agents: 32,
    avgProviderRating: 4.6,
    avgAgentRating: 4.8,
    patientCount: 680,
    riskScore: 20,
    satisfaction: 94,
  },
  {
    region: "West Region",
    providers: 8,
    agents: 30,
    avgProviderRating: 4.4,
    avgAgentRating: 4.6,
    patientCount: 600,
    riskScore: 23,
    satisfaction: 90,
  },
];

const overviewData: OverviewMetrics[] = [
  {
    month: "Jan",
    patientCount: 2450,
    agentCount: 132,
    riskScore: 26.5,
    satisfaction: 88,
  },
  {
    month: "Feb",
    patientCount: 2670,
    agentCount: 138,
    riskScore: 25.2,
    satisfaction: 90,
  },
  {
    month: "Mar",
    patientCount: 2850,
    agentCount: 145,
    riskScore: 24.5,
    satisfaction: 92,
  },
];

// Update provider composite data to represent institutions
const providerCompositeData = [
  {
    providerId: "H001",
    name: "Aashirwad Maternity Hospital",
    type: "Tertiary Care Hospital",
    metrics: {
      cqi: { score: 8.5, trend: 0.4 },
      dqi: { score: 8.8, trend: 0.3 },
      mhs: { score: 8.2, trend: 0.5 },
      ihs: { score: 8.4, trend: 0.4 },
    },
    cases: {
      total: 845,
      active: 380,
      highRisk: 18,
    },
    performance: {
      patientSatisfaction: 92,
      adherenceRate: 95,
      complicationRate: 3.2,
    },
    facilities: {
      nicu: true,
      bloodBank: true,
      operatingRooms: 4,
      icuBeds: 12,
    },
  },
  {
    providerId: "H002",
    name: "Lifeline Women's Hospital",
    type: "Secondary Care Hospital",
    metrics: {
      cqi: { score: 8.2, trend: 0.3 },
      dqi: { score: 8.5, trend: 0.4 },
      mhs: { score: 8.0, trend: 0.3 },
      ihs: { score: 8.1, trend: 0.5 },
    },
    cases: {
      total: 620,
      active: 265,
      highRisk: 42,
    },
    performance: {
      patientSatisfaction: 90,
      adherenceRate: 93,
      complicationRate: 3.5,
    },
    facilities: {
      nicu: true,
      bloodBank: true,
      operatingRooms: 3,
      icuBeds: 8,
    },
  },
  {
    providerId: "H003",
    name: "Mother Care Medical Center",
    type: "Primary Care Center",
    metrics: {
      cqi: { score: 7.8, trend: 0.5 },
      dqi: { score: 8.0, trend: 0.3 },
      mhs: { score: 7.5, trend: 0.4 },
      ihs: { score: 7.7, trend: 0.3 },
    },
    cases: {
      total: 420,
      active: 185,
      highRisk: 18,
    },
    performance: {
      patientSatisfaction: 88,
      adherenceRate: 90,
      complicationRate: 4.1,
    },
    facilities: {
      nicu: false,
      bloodBank: false,
      operatingRooms: 1,
      icuBeds: 4,
    },
  },
  {
    providerId: "H004",
    name: "City Maternity Center",
    type: "Secondary Care Hospital",
    metrics: {
      cqi: { score: 7.9, trend: 0.4 },
      dqi: { score: 8.1, trend: 0.3 },
      mhs: { score: 7.8, trend: 0.5 },
      ihs: { score: 7.9, trend: 0.4 },
    },
    cases: {
      total: 580,
      active: 245,
      highRisk: 38,
    },
    performance: {
      patientSatisfaction: 89,
      adherenceRate: 91,
      complicationRate: 3.8,
    },
    facilities: {
      nicu: true,
      bloodBank: true,
      operatingRooms: 2,
      icuBeds: 6,
    },
  },
];

// Add regional composite trends
const regionalCompositeData = [
  {
    region: "North Zone",
    cqi: 7.8,
    dqi: 8.2,
    mhs: 7.5,
    ihs: 7.9,
    trend: {
      cqi: 0.3,
      dqi: 0.4,
      mhs: 0.2,
      ihs: 0.5,
    },
    providers: 12,
    totalCases: 850,
  },
  {
    region: "South Zone",
    cqi: 8.1,
    dqi: 7.9,
    mhs: 7.8,
    ihs: 8.2,
    trend: {
      cqi: 0.5,
      dqi: 0.3,
      mhs: 0.4,
      ihs: 0.3,
    },
    providers: 15,
    totalCases: 920,
  },
  // Add more regions...
];

// Add composite metrics trends
const compositeMetricsTrends = [
  {
    month: "2023-08",
    cqi: 7.2,
    dqi: 7.5,
    mhs: 7.0,
    ihs: 7.3,
    providers: {
      total: 45,
      performing: 38,
    },
    cases: {
      total: 2800,
      highRisk: 320,
    },
  },
  // Add more months...
  {
    month: "2024-01",
    cqi: 8.0,
    dqi: 8.2,
    mhs: 7.8,
    ihs: 8.0,
    providers: {
      total: 52,
      performing: 48,
    },
    cases: {
      total: 3200,
      highRisk: 280,
    },
  },
];

// Add the composite metrics data structure
interface CompositeScore {
  metric: string;
  weight: number;
  score: number;
  trend: number;
  rawData: unknown;
}

interface QualityIndex {
  cqi: {
    name: "Care Quality Index";
    components: CompositeScore[];
    score: number;
    trend: number;
    rawData: {
      deliveryOutcomes: number;
      prenatalAdherence: number;
      patientSatisfaction: number;
      complicationRates: number;
      readmissionRates: number;
      timelyInterventions: number;
    };
  };
  dqi: {
    name: "Data Quality Index";
    components: CompositeScore[];
    score: number;
    trend: number;
    rawData: {
      completeness: number;
      accuracy: number;
      timeliness: number;
      consistency: number;
      validity: number;
    };
  };
  mhs: {
    name: "Maternal Health Score";
    components: CompositeScore[];
    score: number;
    trend: number;
    rawData: {
      hemoglobinLevels: number[];
      bloodPressure: number[];
      glucoseLevels: number[];
      prenatalVisits: number;
      riskAssessments: number;
    };
  };
  ihs: {
    name: "Infant Health Score";
    components: CompositeScore[];
    score: number;
    trend: number;
    rawData: {
      birthWeight: number;
      growthRate: number[];
      immunizationStatus: string;
      developmentMarkers: string[];
      feedingPatterns: string[];
    };
  };
}

// Add the composite metrics data
const compositeMetrics: QualityIndex = {
  cqi: {
    name: "Care Quality Index",
    score: 8.2,
    trend: 0.4,
    components: [
      {
        metric: "Delivery Outcomes",
        weight: 0.25,
        score: 8.5,
        trend: 0.3,
        rawData: [
          { outcome: "Normal Delivery", percentage: 75 },
          { outcome: "C-Section", percentage: 25 },
          { outcome: "Complications", percentage: 3.8 },
        ],
      },
      {
        metric: "Prenatal Care Adherence",
        weight: 0.2,
        score: 8.0,
        trend: 0.5,
        rawData: [
          { visit: "First Trimester", adherence: 94 },
          { visit: "Second Trimester", adherence: 90 },
          { visit: "Third Trimester", adherence: 88 },
        ],
      },
      {
        metric: "Patient Satisfaction",
        weight: 0.15,
        score: 8.4,
        trend: 0.2,
        rawData: [
          { aspect: "Care Quality", rating: 8.6 },
          { aspect: "Communication", rating: 8.2 },
          { aspect: "Facility", rating: 8.4 },
        ],
      },
      {
        metric: "Complication Management",
        weight: 0.2,
        score: 7.8,
        trend: 0.4,
        rawData: [
          { type: "Early Detection", rate: 88 },
          { type: "Timely Intervention", rate: 94 },
          { type: "Resolution Success", rate: 90 },
        ],
      },
      {
        metric: "Timely Interventions",
        weight: 0.2,
        score: 8.2,
        trend: 0.3,
        rawData: [
          { type: "Emergency Response", time: "12min" },
          { type: "Risk Assessment", time: "24hrs" },
          { type: "Follow-up", time: "48hrs" },
        ],
      },
    ],
    rawData: {
      deliveryOutcomes: 94,
      prenatalAdherence: 90,
      patientSatisfaction: 88,
      complicationRates: 3.8,
      readmissionRates: 1.8,
      timelyInterventions: 96,
    },
  },
  dqi: {
    name: "Data Quality Index",
    score: 8.5,
    trend: 0.3,
    components: [
      {
        metric: "Data Completeness",
        weight: 0.25,
        score: 8.8,
        trend: 0.4,
        rawData: [
          { field: "Patient Demographics", complete: 96 },
          { field: "Clinical Data", complete: 94 },
          { field: "Follow-ups", complete: 90 },
        ],
      },
      {
        metric: "Data Accuracy",
        weight: 0.25,
        score: 8.6,
        trend: 0.3,
        rawData: [
          { type: "Vital Signs", accuracy: 98 },
          { type: "Lab Results", accuracy: 97 },
          { type: "Medications", accuracy: 96 },
        ],
      },
      {
        metric: "Data Timeliness",
        weight: 0.2,
        score: 8.4,
        trend: 0.5,
        rawData: [
          { event: "Real-time Updates", within: "5min" },
          { event: "Daily Reports", within: "24hrs" },
          { event: "Weekly Analysis", within: "7days" },
        ],
      },
      {
        metric: "Data Consistency",
        weight: 0.15,
        score: 8.2,
        trend: 0.2,
        rawData: [
          { check: "Cross-validation", rate: 94 },
          { check: "Format Compliance", rate: 96 },
          { check: "Standard Terms", rate: 92 },
        ],
      },
      {
        metric: "Data Validity",
        weight: 0.15,
        score: 8.5,
        trend: 0.3,
        rawData: [
          { type: "Range Checks", pass: 98 },
          { type: "Logic Rules", pass: 96 },
          { type: "Relationship Checks", pass: 97 },
        ],
      },
    ],
    rawData: {
      completeness: 94,
      accuracy: 96,
      timeliness: 90,
      consistency: 92,
      validity: 94,
    },
  },
  mhs: {
    name: "Maternal Health Score",
    score: 8.0,
    trend: 0.5,
    components: [
      {
        metric: "Vital Signs Stability",
        weight: 0.3,
        score: 8.4,
        trend: 0.4,
        rawData: [
          { parameter: "Blood Pressure", normal: 94 },
          { parameter: "Heart Rate", normal: 96 },
          { parameter: "Temperature", normal: 98 },
        ],
      },
      {
        metric: "Risk Assessment",
        weight: 0.25,
        score: 7.8,
        trend: 0.3,
        rawData: [
          { risk: "Preeclampsia", rate: 2.8 },
          { risk: "Gestational Diabetes", rate: 4.2 },
          { risk: "Anemia", rate: 4.8 },
        ],
      },
      {
        metric: "Care Compliance",
        weight: 0.25,
        score: 7.6,
        trend: 0.5,
        rawData: [
          { type: "Medication Adherence", rate: 94 },
          { type: "Visit Attendance", rate: 90 },
          { type: "Diet Plan", rate: 88 },
        ],
      },
      {
        metric: "Mental Wellbeing",
        weight: 0.2,
        score: 8.2,
        trend: 0.2,
        rawData: [
          { aspect: "Stress Levels", score: 8.0 },
          { aspect: "Sleep Quality", score: 8.4 },
          { aspect: "Emotional Support", score: 8.2 },
        ],
      },
    ],
    rawData: {
      hemoglobinLevels: [11.5, 11.8, 12.0, 12.2],
      bloodPressure: [118, 78, 120, 80],
      glucoseLevels: [92, 95, 90, 94],
      prenatalVisits: 9,
      riskAssessments: 5,
    },
  },
  ihs: {
    name: "Infant Health Score",
    score: 8.3,
    trend: 0.4,
    components: [
      {
        metric: "Growth Parameters",
        weight: 0.3,
        score: 8.5,
        trend: 0.4,
        rawData: [
          { parameter: "Weight", percentile: 68 },
          { parameter: "Length", percentile: 72 },
          { parameter: "Head Circumference", percentile: 70 },
        ],
      },
      {
        metric: "Development Milestones",
        weight: 0.25,
        score: 8.6,
        trend: 0.3,
        rawData: [
          { milestone: "Motor Skills", achieved: "On Track" },
          { milestone: "Response", achieved: "Advanced" },
          { milestone: "Feeding", achieved: "Normal" },
        ],
      },
      {
        metric: "Vital Signs",
        weight: 0.25,
        score: 8.4,
        trend: 0.2,
        rawData: [
          { vital: "Heart Rate", normal: 95 },
          { vital: "Respiratory Rate", normal: 94 },
          { vital: "Temperature", normal: 98 },
        ],
      },
      {
        metric: "Feeding Patterns",
        weight: 0.2,
        score: 7.8,
        trend: 0.3,
        rawData: [
          { aspect: "Frequency", status: "Regular" },
          { aspect: "Volume", status: "Adequate" },
          { aspect: "Technique", status: "Good" },
        ],
      },
    ],
    rawData: {
      birthWeight: 3.3,
      growthRate: [0.22, 0.25, 0.23, 0.24],
      immunizationStatus: "Up to Date",
      developmentMarkers: [
        "Motor: Normal",
        "Response: Advanced",
        "Social: Normal",
      ],
      feedingPatterns: ["Regular", "Good Latch", "Adequate Volume"],
    },
  },
};

// Add ProviderMetricsDrilldown component
function ProviderMetricsDrilldown({
  provider,
}: {
  provider: (typeof providerCompositeData)[0];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <TableRow className="cursor-pointer hover:bg-muted/50">
          <TableCell className="font-medium">{provider.name}</TableCell>
          <TableCell>{provider.type}</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {provider.metrics.cqi.score.toFixed(1)}
              </span>
              <span
                className={`text-xs ${
                  provider.metrics.cqi.trend >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ({provider.metrics.cqi.trend >= 0 ? "+" : ""}
                {provider.metrics.cqi.trend}%)
              </span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {provider.metrics.dqi.score.toFixed(1)}
              </span>
              <span
                className={`text-xs ${
                  provider.metrics.dqi.trend >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ({provider.metrics.dqi.trend >= 0 ? "+" : ""}
                {provider.metrics.dqi.trend}%)
              </span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {provider.metrics.mhs.score.toFixed(1)}
              </span>
              <span
                className={`text-xs ${
                  provider.metrics.mhs.trend >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ({provider.metrics.mhs.trend >= 0 ? "+" : ""}
                {provider.metrics.mhs.trend}%)
              </span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {provider.metrics.ihs.score.toFixed(1)}
              </span>
              <span
                className={`text-xs ${
                  provider.metrics.ihs.trend >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ({provider.metrics.ihs.trend >= 0 ? "+" : ""}
                {provider.metrics.ihs.trend}%)
              </span>
            </div>
          </TableCell>
          <TableCell>{provider.cases.active}</TableCell>
          <TableCell>
            <div className="flex flex-col gap-1 text-xs">
              <span>NICU: {provider.facilities.nicu ? "✓" : "✗"}</span>
              <span>
                Blood Bank: {provider.facilities.bloodBank ? "✓" : "✗"}
              </span>
              <span>ORs: {provider.facilities.operatingRooms}</span>
              <span>ICU Beds: {provider.facilities.icuBeds}</span>
            </div>
          </TableCell>
          <TableCell>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                provider.cases.highRisk / provider.cases.active > 0.15
                  ? "bg-red-100 text-red-800"
                  : provider.cases.highRisk / provider.cases.active > 0.1
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {(
                (provider.cases.highRisk / provider.cases.active) *
                100
              ).toFixed(1)}
              % High Risk
            </span>
          </TableCell>
        </TableRow>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">
            {provider.name} - Performance Analysis
          </SheetTitle>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-muted-foreground">
              {provider.type}
            </span>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Composite Metrics */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Care Quality Index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MetricDrilldown
                  metric="Care Quality Index"
                  data={compositeMetrics.cqi}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Data Quality Index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MetricDrilldown
                  metric="Data Quality Index"
                  data={compositeMetrics.dqi}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Maternal Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MetricDrilldown
                  metric="Maternal Health Score"
                  data={compositeMetrics.mhs}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Infant Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MetricDrilldown
                  metric="Infant Health Score"
                  data={compositeMetrics.ihs}
                />
              </CardContent>
            </Card>
          </div>

          {/* Facility Information */}
          <Card>
            <CardHeader>
              <CardTitle>Facility Details</CardTitle>
              <CardDescription>Infrastructure and capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Infrastructure</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Operating Rooms</span>
                      <span>{provider.facilities.operatingRooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ICU Beds</span>
                      <span>{provider.facilities.icuBeds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NICU</span>
                      <span>
                        {provider.facilities.nicu
                          ? "Available"
                          : "Not Available"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Blood Bank</span>
                      <span>
                        {provider.facilities.bloodBank
                          ? "Available"
                          : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Patient Satisfaction</span>
                      <span>{provider.performance.patientSatisfaction}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Adherence Rate</span>
                      <span>{provider.performance.adherenceRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Complication Rate</span>
                      <span>{provider.performance.complicationRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Profile Analysis</CardTitle>
              <CardDescription>
                Case distribution and risk metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {provider.cases.total}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Cases
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {provider.cases.active}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Cases
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {provider.cases.highRisk}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    High Risk Cases
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function FiduciaryDashboard() {
  return (
    <div className="w-full min-h-screen p-4">
      <div className="mx-auto">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">Agent Performance</TabsTrigger>
            <TabsTrigger value="geographic">Geographic Data</TabsTrigger>
            <TabsTrigger value="providers">Provider Performance</TabsTrigger>
            <TabsTrigger value="wearables">Wearable Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="agents" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Top Performing Agent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Priya Reddy</div>
                  <p className="text-xs text-muted-foreground">
                    98% Patient Satisfaction
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2 hrs</div>
                  <p className="text-xs text-muted-foreground">
                    -0.8 hrs from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Patient Retention Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">
                    +2% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Health Agents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">145</div>
                  <p className="text-xs text-muted-foreground">
                    +12 from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Performance Overview</CardTitle>
                  <CardDescription>
                    Detailed performance metrics for all health agents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Agent Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">
                          Active Patients
                        </TableHead>
                        <TableHead>Patient Retention</TableHead>
                        <TableHead className="text-right">
                          Response Rate
                        </TableHead>
                        <TableHead className="text-right">Risk Score</TableHead>
                        <TableHead className="text-right">Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agentPerformanceData.map((agent) => (
                        <TableRow key={agent.name}>
                          <TableCell className="font-medium">
                            {agent.name}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                agent.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : agent.status === "On Leave"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {agent.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {agent.activePatients}/{agent.totalPatients}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-24">
                                <SparkLineChart
                                  data={agent.retentionHistory}
                                  categories={["Value"]}
                                  index={agent.retentionHistory.map((_, i) =>
                                    i.toString()
                                  )}
                                  colors={["emerald"]}
                                  className="h-8"
                                  showAnimation={false}
                                  showTooltip={false}
                                  showGradient={false}
                                  minimalist
                                />
                              </div>
                              <span className="text-sm font-medium">
                                {agent.retentionRate}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {agent.responseRate}%
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                agent.riskManagementScore >= 90
                                  ? "bg-green-100 text-green-800"
                                  : agent.riskManagementScore >= 85
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {agent.riskManagementScore}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= agent.aggregateRating
                                        ? "text-yellow-400"
                                        : "text-gray-200"
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="font-medium">
                                {agent.aggregateRating.toFixed(1)}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Agent Performance Metrics</CardTitle>
                  <CardDescription>
                    Key performance indicators across all agents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={agentPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="patientSatisfaction"
                          fill="hsl(var(--primary))"
                          name="Patient Satisfaction"
                        />
                        <Bar
                          dataKey="responseRate"
                          fill="hsl(var(--secondary))"
                          name="Response Rate"
                        />
                        <Bar
                          dataKey="retentionRate"
                          fill="hsl(var(--accent))"
                          name="Retention Rate"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="geographic" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {regionalPerformanceData.map((region) => (
                <Card key={region.region}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {region.region}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Providers
                        </span>
                        <span className="font-medium">{region.providers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Agents
                        </span>
                        <span className="font-medium">{region.agents}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Patients
                        </span>
                        <span className="font-medium">
                          {region.patientCount}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Health Metrics</CardTitle>
                  <CardDescription>
                    Health outcomes and engagement across regions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={geographicData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="northRegion"
                          stroke="hsl(var(--primary))"
                          name="North Region"
                        />
                        <Line
                          type="monotone"
                          dataKey="southRegion"
                          stroke="hsl(var(--secondary))"
                          name="South Region"
                        />
                        <Line
                          type="monotone"
                          dataKey="eastRegion"
                          stroke="hsl(var(--accent))"
                          name="East Region"
                        />
                        <Line
                          type="monotone"
                          dataKey="westRegion"
                          stroke="hsl(var(--destructive))"
                          name="West Region"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Performance Comparison</CardTitle>
                  <CardDescription>
                    Provider and agent ratings by region
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={regionalPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="region" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Bar
                          dataKey="avgProviderRating"
                          fill="hsl(var(--primary))"
                          name="Avg Provider Rating"
                        />
                        <Bar
                          dataKey="avgAgentRating"
                          fill="hsl(var(--secondary))"
                          name="Avg Agent Rating"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Regional Analysis</CardTitle>
                <CardDescription>
                  Comprehensive performance metrics by region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Region</TableHead>
                      <TableHead>Providers</TableHead>
                      <TableHead>Agents</TableHead>
                      <TableHead>Provider Rating</TableHead>
                      <TableHead>Agent Rating</TableHead>
                      <TableHead>Patients</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Satisfaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {regionalPerformanceData.map((region) => (
                      <TableRow key={region.region}>
                        <TableCell className="font-medium">
                          {region.region}
                        </TableCell>
                        <TableCell>{region.providers}</TableCell>
                        <TableCell>{region.agents}</TableCell>
                        <TableCell>
                          {region.avgProviderRating.toFixed(1)}/5
                        </TableCell>
                        <TableCell>
                          {region.avgAgentRating.toFixed(1)}/5
                        </TableCell>
                        <TableCell>{region.patientCount}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              region.riskScore < 22
                                ? "bg-green-100 text-green-800"
                                : region.riskScore < 25
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {region.riskScore}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              region.satisfaction >= 90
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {region.satisfaction}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="providers" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Top Rated Provider
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Aashirwad Hospital</div>
                  <p className="text-xs text-muted-foreground">
                    4.8/5 Patient Rating
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Wait Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">22 min</div>
                  <p className="text-xs text-muted-foreground">
                    -5 min from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Patient Complaints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    -4 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Providers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">38</div>
                  <p className="text-xs text-muted-foreground">
                    +3 from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Provider Ratings Distribution</CardTitle>
                  <CardDescription>
                    Patient satisfaction ratings across providers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={providerRatingsData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="rating" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="count"
                          fill="hsl(var(--primary))"
                          name="Number of Providers"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Provider Performance Metrics</CardTitle>
                  <CardDescription>
                    Key performance indicators by provider
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Provider Name</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Wait Time</TableHead>
                        <TableHead>Complaints</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {providerPerformanceData.map((provider) => (
                        <TableRow key={provider.name}>
                          <TableCell className="font-medium">
                            {provider.name}
                          </TableCell>
                          <TableCell>{provider.rating}/5</TableCell>
                          <TableCell>{provider.waitTime} min</TableCell>
                          <TableCell>{provider.complaints}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                provider.status === "Excellent"
                                  ? "bg-green-100 text-green-800"
                                  : provider.status === "Good"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {provider.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="wearables" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Maternal Health Indicators</CardTitle>
                  <CardDescription>
                    Real-time wearable data trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={maternalWearableData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="timestamp" />
                        <YAxis
                          yAxisId="left"
                          domain={[8, 14]}
                          label="Hemoglobin (g/dL)"
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          domain={[60, 180]}
                          label="Heart Rate (bpm)"
                        />
                        <Tooltip />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="hemoglobinLevels"
                          stroke="hsl(var(--primary))"
                          name="Hemoglobin"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="heartRate"
                          stroke="hsl(var(--destructive))"
                          name="Heart Rate"
                          strokeWidth={2}
                          dot={false}
                        />
                        <ReferenceLine
                          y={11}
                          yAxisId="left"
                          stroke="red"
                          strokeDasharray="3 3"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity & Sleep Patterns</CardTitle>
                  <CardDescription>24-hour monitoring data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={maternalWearableData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="timestamp" />
                        <YAxis
                          yAxisId="left"
                          domain={[0, 10000]}
                          label="Steps"
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          domain={[0, 12]}
                          label="Sleep (hrs)"
                        />
                        <Tooltip />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="dailySteps"
                          stroke="hsl(var(--primary))"
                          name="Steps"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="sleepHours"
                          stroke="hsl(var(--secondary))"
                          name="Sleep"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Infant Growth Metrics</CardTitle>
                  <CardDescription>
                    Weight and growth percentile tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={infantWearableData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="timestamp" />
                        <YAxis
                          yAxisId="left"
                          domain={[2, 5]}
                          label="Weight (kg)"
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          domain={[0, 100]}
                          label="Percentile"
                        />
                        <Tooltip />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="currentWeight"
                          stroke="hsl(var(--primary))"
                          name="Weight"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="growthPercentile"
                          stroke="hsl(var(--secondary))"
                          name="Growth Percentile"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vital Signs Monitoring</CardTitle>
                  <CardDescription>
                    Real-time infant health indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={infantWearableData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="timestamp" />
                        <YAxis
                          yAxisId="left"
                          domain={[60, 180]}
                          label="Heart Rate (bpm)"
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          domain={[20, 60]}
                          label="Resp Rate"
                        />
                        <Tooltip />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="heartRate"
                          stroke="hsl(var(--primary))"
                          name="Heart Rate"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="respiratoryRate"
                          stroke="hsl(var(--destructive))"
                          name="Respiratory Rate"
                          strokeWidth={2}
                          dot={false}
                        />
                        <ReferenceLine
                          y={160}
                          yAxisId="left"
                          stroke="red"
                          strokeDasharray="3 3"
                        />
                        <ReferenceLine
                          y={80}
                          yAxisId="left"
                          stroke="red"
                          strokeDasharray="3 3"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Care Quality Index
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MetricDrilldown
                    metric="Care Quality Index"
                    data={compositeMetrics.cqi}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Data Quality Index
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MetricDrilldown
                    metric="Data Quality Index"
                    data={compositeMetrics.dqi}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Maternal Health Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MetricDrilldown
                    metric="Maternal Health Score"
                    data={compositeMetrics.mhs}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Infant Health Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MetricDrilldown
                    metric="Infant Health Score"
                    data={compositeMetrics.ihs}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Provider Performance Matrix */}
            <Card>
              <CardHeader>
                <CardTitle>Provider Performance Matrix</CardTitle>
                <CardDescription>
                  Composite metrics by healthcare provider
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institution Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>CQI</TableHead>
                      <TableHead>DQI</TableHead>
                      <TableHead>MHS</TableHead>
                      <TableHead>IHS</TableHead>
                      <TableHead>Active Cases</TableHead>
                      <TableHead>Facilities</TableHead>
                      <TableHead>Risk Profile</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {providerCompositeData.map((provider) => (
                      <ProviderMetricsDrilldown
                        key={provider.providerId}
                        provider={provider}
                      />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Regional Analysis */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Performance</CardTitle>
                  <CardDescription>Composite metrics by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={regionalCompositeData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="region" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Bar
                          dataKey="cqi"
                          fill="hsl(var(--primary))"
                          name="CQI"
                        />
                        <Bar
                          dataKey="dqi"
                          fill="hsl(var(--secondary))"
                          name="DQI"
                        />
                        <Bar
                          dataKey="mhs"
                          fill="hsl(var(--accent))"
                          name="MHS"
                        />
                        <Bar
                          dataKey="ihs"
                          fill="hsl(var(--warning))"
                          name="IHS"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Metric Trends</CardTitle>
                  <CardDescription>6-month trend analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={compositeMetricsTrends}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis
                          dataKey="month"
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("en-US", {
                              month: "short",
                            });
                          }}
                        />
                        <YAxis domain={[0, 10]} />
                        <Tooltip
                          labelFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            });
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="cqi"
                          stroke="hsl(var(--primary))"
                          name="CQI"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="dqi"
                          stroke="hsl(var(--secondary))"
                          name="DQI"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="mhs"
                          stroke="hsl(var(--accent))"
                          name="MHS"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="ihs"
                          stroke="hsl(var(--warning))"
                          name="IHS"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
