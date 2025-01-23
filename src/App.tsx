import { useState } from "react";
import { Layout } from "@/components/Layout";
import { FiduciaryDashboard } from "@/components/FiduciaryDashboard";
import { HealthAgentDashboard } from "@/components/HealthAgentDashboard";
import { GovernmentDashboard } from "@/components/GovernmentDashboard";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { Role } from "@/types";

function App() {
  const [currentRole, setCurrentRole] = useState<Role>("government");

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              {currentRole === "fiduciary"
                ? "Monitor and manage healthcare system performance"
                : "Track and support patient care activities"}
            </p>
          </div>
          <RoleSwitcher
            currentRole={currentRole}
            onRoleChange={setCurrentRole}
          />
        </div>
        {currentRole === "fiduciary" ? (
          <FiduciaryDashboard />
        ) : currentRole === "government" ? (
          <GovernmentDashboard />
        ) : (
          <HealthAgentDashboard />
        )}
      </div>
    </Layout>
  );
}

export default App;
