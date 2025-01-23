import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@/types";

const roles = [
  {
    value: "fiduciary" as const,
    label: "Fiduciary",
    description: "Oversee and orchestrate the healthcare system",
  },
  {
    value: "agent" as const,
    label: "Agent",
    description: "Support the patient health's agent",
  },
  {
    value: "government" as const,
    label: "Regulator",
    description: "Oversee and evaluate the care fiduciary performance",
  },
] as const;

interface RoleSwitcherProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  return (
    <Select value={currentRole} onValueChange={onRoleChange}>
      <SelectTrigger className="w-[250px]">
        <SelectValue>
          <div className="flex items-center gap-2">
            {roles.find((r) => r.value === currentRole)?.label || "Select role"}
            {/* <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" /> */}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            <div className="flex items-center gap-2">
              <div>
                <div className="font-medium">{role.label}</div>
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
