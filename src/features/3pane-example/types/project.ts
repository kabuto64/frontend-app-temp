export type ProjectStatus =
  | "planning"
  | "planned"
  | "in_progress"
  | "completed"
  | "on_hold";

// 優先度のユニオン型
export type PriorityLevel = "low" | "medium" | "high" | "critical";

// リスクレベルのユニオン型
export type RiskLevel = "low" | "medium" | "high";

// プロジェクトのメインの型
export interface Project {
  id: number;
  projectNumber: string;
  projectName: string;
  projectManager: string;
  lastUpdated: string; // ISO 8601 format: "YYYY-MM-DD"
  startDate: string; // ISO 8601 format: "YYYY-MM-DD"
  endDate: string; // ISO 8601 format: "YYYY-MM-DD"
  status: ProjectStatus;
  budget: number;
  priority: PriorityLevel;
  department: string;
  description: string;
  teamSize: number;
  clientName: string;
  riskLevel: RiskLevel;
}
