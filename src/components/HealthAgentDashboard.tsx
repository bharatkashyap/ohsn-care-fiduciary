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
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const patients = [
  {
    name: "Priyanka Desai",
    age: 28,
    riskLevel: "medium",
    lastCheckup: "2024-01-15",
    nextCheckup: "2024-02-15",
  },
  {
    name: "Kavita Sharma",
    age: 32,
    riskLevel: "high",
    lastCheckup: "2024-01-20",
    nextCheckup: "2024-02-03",
  },
  {
    name: "Anjali Reddy",
    age: 25,
    riskLevel: "low",
    lastCheckup: "2024-01-18",
    nextCheckup: "2024-02-18",
  },
];

// Update the patient health history data
const patientHealthHistory = {
  medications: [
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2023-12-01",
      adherence: 95,
    },
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2023-11-15",
      adherence: 88,
    },
  ],
  conditions: [
    {
      condition: "Type 2 Diabetes",
      diagnosedDate: "2023-10-15",
      status: "Active",
      severity: "Moderate",
    },
    {
      condition: "Hypertension",
      diagnosedDate: "2023-11-01",
      status: "Active",
      severity: "Mild",
    },
  ],
  appointments: [
    {
      date: "2024-01-15",
      type: "Regular Checkup",
      provider: "Dr. Sneha Kumar",
      notes: "Blood pressure stable",
      outcome: "Positive",
    },
    {
      date: "2023-12-01",
      type: "Diabetes Follow-up",
      provider: "Dr. Priya Mehta",
      notes: "Adjusted medication",
      outcome: "Needs Monitoring",
    },
  ],
  vitalTrends: [
    {
      date: "2023-11-01",
      glucose: 142,
      systolic: 130,
      diastolic: 85,
      weight: 65,
      heartRate: 72,
    },
    {
      date: "2023-12-01",
      glucose: 136,
      systolic: 128,
      diastolic: 84,
      weight: 64,
      heartRate: 70,
    },
    {
      date: "2024-01-01",
      glucose: 128,
      systolic: 125,
      diastolic: 82,
      weight: 63.5,
      heartRate: 68,
    },
    {
      date: "2024-02-01",
      glucose: 122,
      systolic: 122,
      diastolic: 80,
      weight: 63,
      heartRate: 68,
    },
  ],
};

// Update the PatientDetailsDrawer component with better styling
function PatientDetailsDrawer({ patient }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          View History
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">
            {patient.name}'s Health History
          </SheetTitle>
          <div className="flex items-center gap-2 mt-2">
            <div
              className={`px-2 py-1 rounded-full text-sm ${
                patient.riskLevel === "high"
                  ? "bg-red-100 text-red-800"
                  : patient.riskLevel === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {patient.riskLevel.charAt(0).toUpperCase() +
                patient.riskLevel.slice(1)}{" "}
              Risk
            </div>
            <div className="text-sm text-muted-foreground">
              Age: {patient.age}
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-8">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              Current Medications
            </h3>
            <div className="space-y-3">
              {patientHealthHistory.medications.map((med, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 bg-card hover:bg-accent transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{med.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {med.dosage} - {med.frequency}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div
                        className={`px-2 py-1 rounded-full text-center ${
                          med.adherence >= 90
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {med.adherence}% Adherence
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              Medical Conditions
            </h3>
            <div className="space-y-3">
              {patientHealthHistory.conditions.map((condition, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 bg-card hover:bg-accent transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{condition.condition}</div>
                      <div className="text-sm text-muted-foreground">
                        Diagnosed: {condition.diagnosedDate}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div
                        className={`px-2 py-1 rounded-full text-center ${
                          condition.severity === "Mild"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {condition.severity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              Recent Appointments
            </h3>
            <div className="space-y-3">
              {patientHealthHistory.appointments.map((apt, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 bg-card hover:bg-accent transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{apt.type}</div>
                      <div className="text-sm text-muted-foreground">
                        {apt.date} - {apt.provider}
                      </div>
                      <div className="text-sm mt-1">{apt.notes}</div>
                    </div>
                    <div className="text-sm">
                      <div
                        className={`px-2 py-1 rounded-full text-center ${
                          apt.outcome === "Positive"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {apt.outcome}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function HealthAgentDashboard() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen p-4">
      <div className="max-w-[1440px] mx-auto">
        <Tabs defaultValue="patients" className="space-y-4">
          <TabsList>
            <TabsTrigger value="patients">My Patients</TabsTrigger>
            <TabsTrigger value="vitals">Patient Vitals</TabsTrigger>
          </TabsList>
          <TabsContent value="patients" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800">
                    Active Sentinel Alerts
                  </CardTitle>
                  <CardDescription className="text-red-700">
                    Immediate attention required for these cases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-red-800">
                            Critical Anemia Alert - Hemoglobin Drop
                          </p>
                          <p className="text-sm text-red-600">
                            Patient: Priya Sharma | Hb Level: 8.5 g/dL
                          </p>
                        </div>
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                          Critical
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-orange-800">
                            Low Fetal Movement Alert
                          </p>
                          <p className="text-sm text-orange-600">
                            Patient: Anjali Patel | Last 6 hours
                          </p>
                        </div>
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
                          Warning
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Patients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    High Risk Patients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    -1 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Follow-ups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Due this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Patient Satisfaction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">
                    +2% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Patient List</CardTitle>
                <CardDescription>
                  Overview of all patients under your care
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Last Checkup</TableHead>
                      <TableHead>Next Checkup</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.name}>
                        <TableCell className="font-medium">
                          {patient.name}
                        </TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              patient.riskLevel === "high"
                                ? "bg-red-100 text-red-800"
                                : patient.riskLevel === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {patient.riskLevel}
                          </span>
                        </TableCell>
                        <TableCell>{patient.lastCheckup}</TableCell>
                        <TableCell>{patient.nextCheckup}</TableCell>
                        <TableCell>
                          <PatientDetailsDrawer patient={patient} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="vitals" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Patient Selection</CardTitle>
                <CardDescription className="text-xs">
                  Search and select a patient to view their vital trends
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Select
                    value={selectedPatient.name}
                    onValueChange={(value) => {
                      const patient = patients.find((p) => p.name === value);
                      if (patient) setSelectedPatient(patient);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Search and select a patient..." />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="flex items-center px-3 pb-2">
                        <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Type a name..."
                          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {filteredPatients.length > 0 ? (
                          filteredPatients.map((patient) => (
                            <SelectItem
                              key={patient.name}
                              value={patient.name}
                              className="cursor-pointer"
                            >
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">
                                  {patient.name}
                                </span>
                                <span>•</span>
                                <span>Age: {patient.age}</span>
                                <span>•</span>
                                <span
                                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                    patient.riskLevel === "high"
                                      ? "bg-red-100 text-red-800"
                                      : patient.riskLevel === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {patient.riskLevel} Risk
                                </span>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <div className="py-6 text-center text-sm text-muted-foreground">
                            No patients found
                          </div>
                        )}
                      </div>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {Object.entries(
                patientHealthHistory.vitalTrends[
                  patientHealthHistory.vitalTrends.length - 1
                ]
              )
                .filter(([key]) => key !== "date")
                .map(([key, value]) => (
                  <Card key={key}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {value}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {key === "weight"
                            ? "kg"
                            : key === "heartRate"
                            ? "bpm"
                            : key === "glucose"
                            ? "mg/dL"
                            : "mmHg"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {/* Add trend indicators */}
                        {key === "glucose"
                          ? "-14 from last month"
                          : key === "systolic"
                          ? "-8 from last month"
                          : key === "weight"
                          ? "-2kg from last month"
                          : ""}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Blood Pressure Trends
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Systolic and diastolic pressure measurements over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={patientHealthHistory.vitalTrends}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" fontSize={11} />
                        <YAxis
                          fontSize={11}
                          domain={[60, 160]}
                          ticks={[60, 80, 100, 120, 140, 160]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            fontSize: "12px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="systolic"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          name="Systolic"
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="diastolic"
                          stroke="hsl(var(--secondary))"
                          strokeWidth={2}
                          name="Diastolic"
                          dot={{ r: 3 }}
                        />
                        {/* Add reference lines for normal ranges */}
                        <ReferenceLine
                          y={120}
                          stroke="hsl(var(--primary))"
                          strokeDasharray="3 3"
                          opacity={0.5}
                        />
                        <ReferenceLine
                          y={80}
                          stroke="hsl(var(--secondary))"
                          strokeDasharray="3 3"
                          opacity={0.5}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Blood Glucose Trends
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Blood glucose measurements with target range indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={patientHealthHistory.vitalTrends}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" fontSize={11} />
                        <YAxis
                          fontSize={11}
                          domain={[80, 160]}
                          ticks={[80, 100, 120, 140, 160]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            fontSize: "12px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="glucose"
                          stroke="hsl(var(--warning))"
                          strokeWidth={2}
                          name="Glucose"
                          dot={{ r: 3 }}
                        />
                        {/* Add reference area for normal range */}
                        <ReferenceArea
                          y1={80}
                          y2={120}
                          fill="hsl(var(--success))"
                          fillOpacity={0.1}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Weight Trends</CardTitle>
                  <CardDescription className="text-xs">
                    Patient weight measurements with BMI indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={patientHealthHistory.vitalTrends}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" fontSize={11} />
                        <YAxis fontSize={11} domain={[55, 75]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            fontSize: "12px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="weight"
                          stroke="hsl(var(--success))"
                          strokeWidth={2}
                          name="Weight (kg)"
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Heart Rate Trends</CardTitle>
                  <CardDescription className="text-xs">
                    Resting heart rate measurements with range indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={patientHealthHistory.vitalTrends}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" fontSize={11} />
                        <YAxis
                          fontSize={11}
                          domain={[50, 90]}
                          ticks={[50, 60, 70, 80, 90]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            fontSize: "12px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="heartRate"
                          stroke="hsl(var(--destructive))"
                          strokeWidth={2}
                          name="Heart Rate (bpm)"
                          dot={{ r: 3 }}
                        />
                        {/* Add reference area for normal range */}
                        <ReferenceArea
                          y1={60}
                          y2={80}
                          fill="hsl(var(--success))"
                          fillOpacity={0.1}
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
