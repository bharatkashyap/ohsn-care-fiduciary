export type Role = "fiduciary" | "health-agent" | "government";

export interface HealthMetric {
  date: string;
  value: number;
}

export interface AgentPerformance {
  agentId: string;
  name: string;
  activePatients: number;
  riskyPatients: number;
  followupRate: number;
  patientSatisfaction: number;
}

export interface GeographicMetric {
  district: string;
  totalPatients: number;
  activeAgents: number;
  healthcareProviders: number;
  averageRiskScore: number;
}

export interface PatientData {
  id: string;
  name: string;
  age: number;
  riskLevel: "low" | "medium" | "high";
  lastCheckup: string;
  nextCheckup: string;
  vitalTrends: {
    bp: HealthMetric[];
    glucose: HealthMetric[];
    weight: HealthMetric[];
  };
}
