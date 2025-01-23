/* eslint-disable */
// @ts-nocheck

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

interface FiduciaryPerformanceData {
  name: string;
  totalPregnancies: number;
  activePregnancies: number;
  riskyCases: number;
  maternalMortality: number;
  infantMortality: number;
  complicationRate: number;
  avgPrenatalVisits: number;
  satisfaction: number;
  riskManagementScore: number;
  trendsHistory: number[];
  status: "Excellent" | "Good" | "Needs Improvement";
  wearableAdoption: number;
  dataQualityScore: number;
  anomalyDetectionRate: number;
  earlyWarningTriggers: number;
  compositeMetrics: {
    cqi: { score: number; trend: number };
    dqi: { score: number; trend: number };
    mhs: { score: number; trend: number };
    ihs: { score: number; trend: number };
  };
  region: string;
}

interface RegionalMetrics {
  region: string;
  month: string;
  maternalMortality: number;
  infantMortality: number;
  institutionalDeliveries: number;
  prenatalCare: number;
}

interface TrendMetrics {
  month: string;
  maternalMortality: number;
  infantMortality: number;
  institutionalDeliveries: number;
  prenatalCare: number;
  highRiskCases: number;
  complicationRate: number;
  avgVisitsPerCase: number;
}

interface MaternalWearableMetrics {
  timestamp: string;
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  bloodOxygen: number;
  temperature: number;
  sleepHours: number;
  dailySteps: number;
  hemoglobinLevels: number;
  glucoseLevels: number;
  stressLevel: number;
  movementActivity: number;
  weightGain: number;
  hydrationLevel: number;
}

interface InfantWearableMetrics {
  timestamp: string;
  birthWeight: number;
  currentWeight: number;
  temperature: number;
  heartRate: number;
  respiratoryRate: number;
  bloodOxygen: number;
  sleepDuration: number;
  movementIntensity: number;
  feedingFrequency: number;
  cryingPatterns: number;
  jaundiceLevel: number;
  growthPercentile: number;
}

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

const fiduciaryData: FiduciaryPerformanceData[] = [
  {
    name: "Arogya Health Trust",
    totalPregnancies: 1250,
    activePregnancies: 850,
    riskyCases: 95,
    maternalMortality: 0.8,
    infantMortality: 2.1,
    complicationRate: 4.2,
    avgPrenatalVisits: 8.5,
    satisfaction: 92,
    riskManagementScore: 95,
    trendsHistory: [92, 93, 95, 94, 95, 96, 95, 95],
    status: "Excellent",
    wearableAdoption: 80,
    dataQualityScore: 90,
    anomalyDetectionRate: 95,
    earlyWarningTriggers: 10,
    compositeMetrics: {
      cqi: { score: 8.5, trend: 0.3 },
      dqi: { score: 9.2, trend: 0.4 },
      mhs: { score: 7.8, trend: 6 },
      ihs: { score: 5.1, trend: 8 },
    },
    region: "North District",
  },
  {
    name: "Swasthya Foundation",
    totalPregnancies: 980,
    activePregnancies: 720,
    riskyCases: 82,
    maternalMortality: 1.2,
    infantMortality: 2.8,
    complicationRate: 5.1,
    avgPrenatalVisits: 7.8,
    satisfaction: 88,
    riskManagementScore: 88,
    trendsHistory: [85, 86, 87, 88, 88, 89, 88, 88],
    status: "Good",
    wearableAdoption: 70,
    dataQualityScore: 85,
    anomalyDetectionRate: 80,
    earlyWarningTriggers: 5,
    compositeMetrics: {
      cqi: { score: 8.8, trend: 0.5 },
      dqi: { score: 9.0, trend: 0.3 },
      mhs: { score: 8.2, trend: 0.5 },
      ihs: { score: 5.1, trend: 8 },
    },
    region: "South District",
  },
  // Add more fiduciaries...
];

const regionalData: RegionalMetrics[] = [
  {
    region: "North District",
    month: "2024-01",
    maternalMortality: 1.2,
    infantMortality: 2.5,
    institutionalDeliveries: 92,
    prenatalCare: 88,
  },
  {
    region: "South District",
    month: "2024-01",
    maternalMortality: 1.0,
    infantMortality: 2.2,
    institutionalDeliveries: 95,
    prenatalCare: 90,
  },
  {
    region: "East District",
    month: "2024-01",
    maternalMortality: 1.4,
    infantMortality: 2.8,
    institutionalDeliveries: 88,
    prenatalCare: 85,
  },
  {
    region: "West District",
    month: "2024-01",
    maternalMortality: 1.1,
    infantMortality: 2.4,
    institutionalDeliveries: 93,
    prenatalCare: 89,
  },
];

// Add trend data
const nationalTrends = [
  {
    month: "2023-08",
    maternalMortality: 1.5,
    infantMortality: 2.9,
    institutionalDeliveries: 88,
    prenatalCare: 84,
    highRiskCases: 15,
  },
  {
    month: "2023-09",
    maternalMortality: 1.4,
    infantMortality: 2.8,
    institutionalDeliveries: 89,
    prenatalCare: 85,
    highRiskCases: 14,
  },
  // Add more months...
  {
    month: "2024-01",
    maternalMortality: 1.2,
    infantMortality: 2.5,
    institutionalDeliveries: 92,
    prenatalCare: 88,
    highRiskCases: 12,
  },
];

const trendData: TrendMetrics[] = [
  {
    month: "2023-07",
    maternalMortality: 1.6,
    infantMortality: 3.0,
    institutionalDeliveries: 87,
    prenatalCare: 83,
    highRiskCases: 16,
    complicationRate: 5.2,
    avgVisitsPerCase: 7.8,
  },
  // ... existing months ...
  {
    month: "2024-01",
    maternalMortality: 1.2,
    infantMortality: 2.5,
    institutionalDeliveries: 92,
    prenatalCare: 88,
    highRiskCases: 12,
    complicationRate: 4.1,
    avgVisitsPerCase: 8.5,
  },
];

// Add wearable trend data
const nationalWearableTrends = [
  {
    month: "2023-10",
    maternalHealth: {
      avgHemoglobin: 11.8,
      lowHemoglobinCases: 120,
      avgBloodPressure: 118,
      hypertensionCases: 85,
    },
    infantHealth: {
      avgWeight: 3.2,
      lowWeightCases: 45,
      avgHeartRate: 128,
      healthyDeliveries: 92,
    },
    wearableAdoption: 75,
    dataQuality: 88,
  },
  // Add more months...
  {
    month: "2024-01",
    maternalHealth: {
      avgHemoglobin: 12.1,
      lowHemoglobinCases: 95,
      avgBloodPressure: 116,
      hypertensionCases: 65,
    },
    infantHealth: {
      avgWeight: 3.3,
      lowWeightCases: 35,
      avgHeartRate: 130,
      healthyDeliveries: 95,
    },
    wearableAdoption: 85,
    dataQuality: 92,
  },
];

// Add complete composite metrics data
const compositeMetrics: QualityIndex = {
  cqi: {
    name: "Care Quality Index",
    components: [
      {
        metric: "Delivery Outcomes",
        weight: 0.25,
        score: 8.5,
        trend: 0.3,
        rawData: [
          { outcome: "Normal Delivery", percentage: 72 },
          { outcome: "C-Section", percentage: 28 },
          { outcome: "Complications", percentage: 4.2 },
        ],
      },
      {
        metric: "Prenatal Care Adherence",
        weight: 0.2,
        score: 7.8,
        trend: 0.5,
        rawData: [
          { visit: "First Trimester", adherence: 92 },
          { visit: "Second Trimester", adherence: 88 },
          { visit: "Third Trimester", adherence: 85 },
        ],
      },
      {
        metric: "Patient Satisfaction",
        weight: 0.15,
        score: 8.2,
        trend: 0.2,
        rawData: [
          { aspect: "Care Quality", rating: 8.5 },
          { aspect: "Communication", rating: 8.0 },
          { aspect: "Facility", rating: 8.1 },
        ],
      },
      {
        metric: "Complication Management",
        weight: 0.2,
        score: 7.5,
        trend: 0.4,
        rawData: [
          { type: "Early Detection", rate: 85 },
          { type: "Timely Intervention", rate: 92 },
          { type: "Resolution Success", rate: 88 },
        ],
      },
      {
        metric: "Timely Interventions",
        weight: 0.2,
        score: 8.0,
        trend: 0.3,
        rawData: [
          { type: "Emergency Response", time: "15min" },
          { type: "Risk Assessment", time: "24hrs" },
          { type: "Follow-up", time: "48hrs" },
        ],
      },
    ],
    score: 6.1,
    trend: 1,
    rawData: {
      deliveryOutcomes: 92,
      prenatalAdherence: 88,
      patientSatisfaction: 85,
      complicationRates: 4.2,
      readmissionRates: 2.1,
      timelyInterventions: 95,
    },
  },
  dqi: {
    name: "Data Quality Index",
    components: [
      {
        metric: "Data Completeness",
        weight: 0.25,
        score: 9.2,
        trend: 0.4,
        rawData: [
          { field: "Patient Demographics", complete: 98 },
          { field: "Clinical Data", complete: 95 },
          { field: "Follow-ups", complete: 92 },
        ],
      },
      {
        metric: "Manufacturer Complaints",
        weight: 0.25,
        score: 9.0,
        trend: 0.3,
        rawData: [
          { type: "Total Complaints Registered", accuracy: 99 },
          { type: "Incorrect Data Compltaints Registered", accuracy: 98 },
          { type: "Complaint Resolution Ratio", accuracy: 97 },
        ],
      },
      {
        metric: "Data Accuracy",
        weight: 0.25,
        score: 9.0,
        trend: 0.3,
        rawData: [
          { type: "Vital Signs", accuracy: 99 },
          { type: "Lab Results", accuracy: 98 },
          { type: "Medications", accuracy: 97 },
        ],
      },
      {
        metric: "Data Timeliness",
        weight: 0.2,
        score: 8.8,
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
        score: 9.1,
        trend: 0.2,
        rawData: [
          { check: "Cross-validation", rate: 96 },
          { check: "Format Compliance", rate: 98 },
          { check: "Standard Terms", rate: 95 },
        ],
      },
      {
        metric: "Data Validity",
        weight: 0.15,
        score: 9.3,
        trend: 0.3,
        rawData: [
          { type: "Range Checks", pass: 99 },
          { type: "Logic Rules", pass: 97 },
          { type: "Relationship Checks", pass: 98 },
        ],
      },
    ],
    score: 7.1,
    trend: 5,
    rawData: {
      completeness: 95,
      accuracy: 97,
      timeliness: 92,
      consistency: 94,
      validity: 96,
    },
  },
  mhs: {
    name: "Maternal Health Score",
    score: 7.8,
    trend: 6,
    components: [
      {
        metric: "Vital Signs Stability",
        weight: 0.3,
        score: 8.8,
        trend: 0.4,
        rawData: [
          { parameter: "Blood Pressure", normal: 92 },
          { parameter: "Heart Rate", normal: 95 },
          { parameter: "Temperature", normal: 98 },
        ],
      },
      {
        metric: "Risk Assessment",
        weight: 0.25,
        score: 8.5,
        trend: 0.3,
        rawData: [
          { risk: "Preeclampsia", rate: 3.2 },
          { risk: "Gestational Diabetes", rate: 4.5 },
          { risk: "Anemia", rate: 5.1 },
        ],
      },
      {
        metric: "Care Compliance",
        weight: 0.25,
        score: 8.2,
        trend: 0.5,
        rawData: [
          { type: "Medication Adherence", rate: 92 },
          { type: "Visit Attendance", rate: 88 },
          { type: "Diet Plan", rate: 85 },
        ],
      },
      {
        metric: "Mental Wellbeing",
        weight: 0.2,
        score: 8.0,
        trend: 0.2,
        rawData: [
          { aspect: "Stress Levels", score: 7.8 },
          { aspect: "Sleep Quality", score: 8.2 },
          { aspect: "Emotional Support", score: 8.0 },
        ],
      },
    ],
    rawData: {
      hemoglobinLevels: [11.2, 11.5, 11.8, 12.0],
      bloodPressure: [120, 80, 118, 78],
      glucoseLevels: [95, 98, 92, 94],
      prenatalVisits: 8,
      riskAssessments: 4,
    },
  },
  ihs: {
    name: "Infant Health Score",
    score: 5.1,
    trend: 8,
    components: [
      {
        metric: "Growth Parameters",
        weight: 0.3,
        score: 8.9,
        trend: 0.4,
        rawData: [
          { parameter: "Weight", percentile: 65 },
          { parameter: "Length", percentile: 70 },
          { parameter: "Head Circumference", percentile: 68 },
        ],
      },
      {
        metric: "Development Milestones",
        weight: 0.25,
        score: 9.0,
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
        score: 8.8,
        trend: 0.2,
        rawData: [
          { vital: "Heart Rate", normal: 96 },
          { vital: "Respiratory Rate", normal: 95 },
          { vital: "Temperature", normal: 98 },
        ],
      },
      {
        metric: "Feeding Patterns",
        weight: 0.2,
        score: 8.5,
        trend: 0.3,
        rawData: [
          { aspect: "Frequency", status: "Regular" },
          { aspect: "Volume", status: "Adequate" },
          { aspect: "Technique", status: "Good" },
        ],
      },
    ],
    rawData: {
      birthWeight: 3.2,
      growthRate: [0.2, 0.25, 0.22, 0.23],
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

// Add regional composite metrics data
const regionalCompositeData = [
  {
    region: "North District",
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
    providers: 45,
    totalCases: 2850,
  },
  {
    region: "South District",
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
    providers: 52,
    totalCases: 3120,
  },
  {
    region: "East District",
    cqi: 7.5,
    dqi: 7.8,
    mhs: 7.2,
    ihs: 7.6,
    trend: {
      cqi: 0.2,
      dqi: 0.5,
      mhs: 0.3,
      ihs: 0.4,
    },
    providers: 38,
    totalCases: 2450,
  },
  {
    region: "West District",
    cqi: 8.0,
    dqi: 8.1,
    mhs: 7.6,
    ihs: 7.8,
    trend: {
      cqi: 0.4,
      dqi: 0.2,
      mhs: 0.5,
      ihs: 0.2,
    },
    providers: 48,
    totalCases: 2980,
  },
];

// Add composite metrics trends data
const compositeMetricsTrends = [
  {
    month: "2023-08",
    cqi: 7.2,
    dqi: 7.5,
    mhs: 7.0,
    ihs: 7.3,
    providers: {
      total: 175,
      performing: 145,
    },
    cases: {
      total: 11200,
      highRisk: 1250,
    },
  },
  {
    month: "2023-09",
    cqi: 7.4,
    dqi: 7.6,
    mhs: 7.2,
    ihs: 7.4,
    providers: {
      total: 178,
      performing: 152,
    },
    cases: {
      total: 11400,
      highRisk: 1180,
    },
  },
  {
    month: "2023-10",
    cqi: 7.5,
    dqi: 7.8,
    mhs: 7.3,
    ihs: 7.6,
    providers: {
      total: 180,
      performing: 158,
    },
    cases: {
      total: 11600,
      highRisk: 1120,
    },
  },
  {
    month: "2023-11",
    cqi: 7.7,
    dqi: 7.9,
    mhs: 7.5,
    ihs: 7.7,
    providers: {
      total: 183,
      performing: 165,
    },
    cases: {
      total: 11800,
      highRisk: 1050,
    },
  },
  {
    month: "2023-12",
    cqi: 7.8,
    dqi: 8.1,
    mhs: 7.6,
    ihs: 7.8,
    providers: {
      total: 185,
      performing: 170,
    },
    cases: {
      total: 12000,
      highRisk: 980,
    },
  },
  {
    month: "2024-01",
    cqi: 8.0,
    dqi: 8.2,
    mhs: 7.8,
    ihs: 8.0,
    providers: {
      total: 188,
      performing: 175,
    },
    cases: {
      total: 12200,
      highRisk: 920,
    },
  },
];

// Add provider-level composite metrics data
const providerCompositeData = [
  {
    providerId: "P001",
    name: "Dr. Priya Sharma",
    region: "North District",
    specialization: "Obstetrics",
    metrics: {
      cqi: { score: 8.5, trend: 0.4 },
      dqi: { score: 8.8, trend: 0.3 },
      mhs: { score: 8.2, trend: 0.5 },
      ihs: { score: 8.4, trend: 0.4 },
    },
    cases: {
      total: 245,
      active: 180,
      highRisk: 28,
    },
    performance: {
      patientSatisfaction: 92,
      adherenceRate: 95,
      complicationRate: 3.2,
    },
  },
  // Add more providers...
];

// Add historical composite metrics data
const historicalCompositeData = {
  yearly: [
    {
      year: 2022,
      quarters: [
        {
          quarter: "Q1",
          cqi: 7.0,
          dqi: 7.2,
          mhs: 6.8,
          ihs: 7.1,
        },
        {
          quarter: "Q2",
          cqi: 7.2,
          dqi: 7.4,
          mhs: 7.0,
          ihs: 7.3,
        },
        {
          quarter: "Q3",
          cqi: 7.4,
          dqi: 7.6,
          mhs: 7.2,
          ihs: 7.5,
        },
        {
          quarter: "Q4",
          cqi: 7.6,
          dqi: 7.8,
          mhs: 7.4,
          ihs: 7.7,
        },
      ],
      average: {
        cqi: 7.3,
        dqi: 7.5,
        mhs: 7.1,
        ihs: 7.4,
      },
    },
    {
      year: 2023,
      quarters: [
        {
          quarter: "Q1",
          cqi: 7.7,
          dqi: 7.9,
          mhs: 7.5,
          ihs: 7.8,
        },
        {
          quarter: "Q2",
          cqi: 7.8,
          dqi: 8.0,
          mhs: 7.6,
          ihs: 7.9,
        },
        {
          quarter: "Q3",
          cqi: 7.9,
          dqi: 8.1,
          mhs: 7.7,
          ihs: 8.0,
        },
        {
          quarter: "Q4",
          cqi: 8.0,
          dqi: 8.2,
          mhs: 7.8,
          ihs: 8.1,
        },
      ],
      average: {
        cqi: 7.85,
        dqi: 8.05,
        mhs: 7.65,
        ihs: 7.95,
      },
    },
  ],
  yearOverYear: {
    growth: {
      cqi: 7.5,
      dqi: 7.3,
      mhs: 7.7,
      ihs: 7.4,
    },
    improvement: {
      cqi: true,
      dqi: true,
      mhs: true,
      ihs: true,
    },
  },
};

// Add the MetricDrilldown component
export function MetricDrilldown({ metric, data }) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  // Function to get raw data based on selected component
  const getComponentRawData = (component: CompositeScore) => {
    if (!component.rawData) return null;

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(component.rawData[0]).map((key) => (
              <TableHead key={key} className="capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {component.rawData.map((item, index) => (
            <TableRow key={index}>
              {Object.values(item).map((value, i) => (
                <TableCell key={i}>
                  {typeof value === "number"
                    ? value.toFixed(1) + (value <= 100 ? "%" : "")
                    : value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer">
          <div className="text-2xl font-bold">{data.score}/10</div>
          <p className="text-xs text-muted-foreground">
            {data.trend >= 0 ? "+" : ""}
            {data.trend}% from last quarter
          </p>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{metric}</SheetTitle>
          <SheetDescription>
            Detailed breakdown of composite score
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Component Weights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Score Components</CardTitle>
              <CardDescription>
                Click on a component to see detailed data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Weighted Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.components.map((component) => (
                    <TableRow
                      key={component.metric}
                      className={`cursor-pointer hover:bg-muted/50 ${
                        selectedComponent === component.metric ? "bg-muted" : ""
                      }`}
                      onClick={() =>
                        setSelectedComponent(
                          selectedComponent === component.metric
                            ? null
                            : component.metric
                        )
                      }
                    >
                      <TableCell>{component.metric}</TableCell>
                      <TableCell>
                        {(component.weight * 100).toFixed(0)}%
                      </TableCell>
                      <TableCell>{component.score.toFixed(1)}</TableCell>
                      <TableCell>
                        <span
                          className={
                            component.trend >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {component.trend >= 0 ? "+" : ""}
                          {component.trend}%
                        </span>
                      </TableCell>
                      <TableCell>
                        {(component.weight * component.score).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Dynamic Raw Data Section */}
          {selectedComponent && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedComponent} - Raw Data
                </CardTitle>
                <CardDescription>
                  Detailed metrics and measurements
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getComponentRawData(
                  data.components.find((c) => c.metric === selectedComponent)!
                )}
              </CardContent>
            </Card>
          )}

          {/* Overall Raw Data */}
          {!selectedComponent && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Aggregate Metrics</CardTitle>
                <CardDescription>
                  Overall performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(data.rawData).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell className="capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </TableCell>
                        <TableCell>
                          {Array.isArray(value) ? value.join(", ") : value}
                        </TableCell>
                        <TableCell>
                          {typeof value === "number" && value <= 100 ? "%" : ""}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Add FiduciaryMetricsDrilldown component that reuses MetricDrilldown
function FiduciaryMetricsDrilldown({
  fiduciary,
}: {
  fiduciary: FiduciaryPerformanceData;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <TableRow className="cursor-pointer hover:bg-muted/50">
          {/* Keep existing table row content */}
          <TableCell className="font-medium">{fiduciary.name}</TableCell>
          <TableCell>{fiduciary.region}</TableCell>
          <TableCell>{fiduciary.compositeMetrics.cqi.score}</TableCell>
          <TableCell>{fiduciary.compositeMetrics.dqi.score}</TableCell>
          <TableCell>{fiduciary.compositeMetrics.mhs.score}</TableCell>
          <TableCell>{fiduciary.compositeMetrics.ihs.score}</TableCell>
          <TableCell>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                fiduciary.status === "Excellent"
                  ? "bg-green-100 text-green-800"
                  : fiduciary.status === "Good"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {fiduciary.status}
            </span>
          </TableCell>
        </TableRow>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">
            {fiduciary.name} - Composite Metrics Analysis
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
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

          {/* Add trend analysis at the bottom */}
          <Card>
            <CardHeader>
              <CardTitle>Composite Metrics Trends</CardTitle>
              <CardDescription>6-month trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
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
                    <Tooltip />
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
      </SheetContent>
    </Sheet>
  );
}

export function GovernmentDashboard() {
  return (
    <div className="w-full min-h-screen p-4">
      <div className="mx-auto">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="fiduciaries">Fiduciary Performance</TabsTrigger>
            <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Active Pregnancies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,850</div>
                  <p className="text-xs text-muted-foreground">
                    +2.5% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Maternal Mortality Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2%</div>
                  <p className="text-xs text-muted-foreground">
                    -0.3% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Institutional Deliveries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">
                    +3% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Wearable Program Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">
                    +10% from last quarter
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Trends</CardTitle>
                  <CardDescription>Key metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={nationalTrends}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="maternalMortality"
                          stroke="hsl(var(--primary))"
                          name="Maternal Mortality"
                        />
                        <Line
                          type="monotone"
                          dataKey="infantMortality"
                          stroke="hsl(var(--destructive))"
                          name="Infant Mortality"
                        />
                        <Line
                          type="monotone"
                          dataKey="highRiskCases"
                          stroke="hsl(var(--warning))"
                          name="High Risk Cases"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Care Quality Metrics</CardTitle>
                  <CardDescription>
                    Delivery and prenatal care rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={nationalTrends}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="institutionalDeliveries"
                          stroke="hsl(var(--primary))"
                          name="Institutional Deliveries"
                        />
                        <Line
                          type="monotone"
                          dataKey="prenatalCare"
                          stroke="hsl(var(--secondary))"
                          name="Prenatal Care"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

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

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Maternal Health Indicators</CardTitle>
                  <CardDescription>
                    Key metrics from wearable devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={nationalWearableTrends}>
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
                        <YAxis
                          yAxisId="left"
                          domain={[8, 14]}
                          label="Hemoglobin (g/dL)"
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          domain={[0, 200]}
                          label="Cases"
                        />
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
                          yAxisId="left"
                          type="monotone"
                          dataKey="maternalHealth.avgHemoglobin"
                          stroke="hsl(var(--primary))"
                          name="Avg Hemoglobin"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="maternalHealth.lowHemoglobinCases"
                          stroke="hsl(var(--destructive))"
                          name="Low Hemoglobin Cases"
                          strokeWidth={2}
                          dot={{ r: 4 }}
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
                  <CardTitle>Infant Health Metrics</CardTitle>
                  <CardDescription>
                    Growth and vital trends across regions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={nationalWearableTrends}>
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
                        <YAxis
                          yAxisId="left"
                          domain={[2, 5]}
                          label="Weight (kg)"
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          domain={[0, 100]}
                          label="Cases"
                        />
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
                          yAxisId="left"
                          type="monotone"
                          dataKey="infantHealth.avgWeight"
                          stroke="hsl(var(--primary))"
                          name="Avg Weight"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="infantHealth.lowWeightCases"
                          stroke="hsl(var(--destructive))"
                          name="Low Weight Cases"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Program Effectiveness</CardTitle>
                <CardDescription>
                  Wearable adoption and data quality trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={nationalWearableTrends}>
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
                      <YAxis domain={[50, 100]} label="Percentage (%)" />
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
                        dataKey="wearableAdoption"
                        stroke="hsl(var(--primary))"
                        name="Wearable Adoption"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="dataQuality"
                        stroke="hsl(var(--secondary))"
                        name="Data Quality"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <ReferenceLine
                        y={90}
                        stroke="green"
                        strokeDasharray="3 3"
                        label="Target"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fiduciaries" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average CQI Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.8/10</div>
                  <p className="text-xs text-muted-foreground">
                    +0.5 from last quarter
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average DQI Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.1/10</div>
                  <p className="text-xs text-muted-foreground">
                    +5 from last quarter
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average MHS Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.8/10</div>
                  <p className="text-xs text-muted-foreground">
                    +6 from last quarter
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average IHS Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5.1/10</div>
                  <p className="text-xs text-muted-foreground">
                    +8 from last quarter
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Fiduciary Performance Matrix</CardTitle>
                <CardDescription>
                  Comprehensive metrics by fiduciary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fiduciary Name</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>CQI</TableHead>
                      <TableHead>DQI</TableHead>
                      <TableHead>MHS</TableHead>
                      <TableHead>IHS</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fiduciaryData.map((fiduciary) => (
                      <FiduciaryMetricsDrilldown
                        key={fiduciary.name}
                        fiduciary={fiduciary}
                      />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Add Regional Performance Section */}
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance Analysis</CardTitle>
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
                      <Bar dataKey="mhs" fill="hsl(var(--accent))" name="MHS" />
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

            {/* Add Trend Analysis Section */}
            <Card>
              <CardHeader>
                <CardTitle>Composite Metrics Trends</CardTitle>
                <CardDescription>
                  6-month trend analysis of key metrics
                </CardDescription>
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
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Mortality Rates</CardTitle>
                  <CardDescription>
                    Maternal and infant mortality by region
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={regionalData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="region" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="maternalMortality"
                          fill="hsl(var(--primary))"
                          name="Maternal Mortality"
                        />
                        <Bar
                          dataKey="infantMortality"
                          fill="hsl(var(--destructive))"
                          name="Infant Mortality"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Care Coverage</CardTitle>
                  <CardDescription>
                    Institutional deliveries and prenatal care by region
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={regionalData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="region" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar
                          dataKey="institutionalDeliveries"
                          fill="hsl(var(--primary))"
                          name="Institutional Deliveries"
                        />
                        <Bar
                          dataKey="prenatalCare"
                          fill="hsl(var(--secondary))"
                          name="Prenatal Care"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    6-Month Mortality Change
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">-25%</div>
                  <p className="text-xs text-muted-foreground">
                    Maternal mortality reduction
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Institutional Delivery Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">+5.7%</div>
                  <p className="text-xs text-muted-foreground">
                    Increase in hospital births
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Risk Management Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">-25%</div>
                  <p className="text-xs text-muted-foreground">
                    Reduction in high-risk cases
                  </p>
                </CardContent>
              </Card>
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
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mortality Rate Trends</CardTitle>
                  <CardDescription>
                    6-month maternal and infant mortality analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
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
                        <YAxis />
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
                          dataKey="maternalMortality"
                          stroke="hsl(var(--primary))"
                          name="Maternal Mortality"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="infantMortality"
                          stroke="hsl(var(--destructive))"
                          name="Infant Mortality"
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
                  <CardTitle>Risk and Complications</CardTitle>
                  <CardDescription>
                    Trend analysis of high-risk cases and complications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
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
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
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
                          yAxisId="left"
                          type="monotone"
                          dataKey="highRiskCases"
                          stroke="hsl(var(--warning))"
                          name="High Risk Cases"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="complicationRate"
                          stroke="hsl(var(--destructive))"
                          name="Complication Rate"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Care Quality Indicators</CardTitle>
                <CardDescription>
                  Comprehensive view of prenatal care and institutional delivery
                  trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
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
                      <YAxis yAxisId="left" domain={[70, 100]} />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[6, 10]}
                      />
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
                        yAxisId="left"
                        type="monotone"
                        dataKey="institutionalDeliveries"
                        stroke="hsl(var(--primary))"
                        name="Institutional Deliveries %"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="prenatalCare"
                        stroke="hsl(var(--secondary))"
                        name="Prenatal Care Coverage %"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="avgVisitsPerCase"
                        stroke="hsl(var(--accent))"
                        name="Avg Visits per Case"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
