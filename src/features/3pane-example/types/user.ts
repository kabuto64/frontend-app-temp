export type UserStatus = "active" | "inactive" | "pending";
export type UserRole = "admin" | "user" | "guest";
export type Department = "sales" | "engineering" | "marketing" | "hr";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  department: Department;
  status: UserStatus;
  joinDate: string;
  lastLogin: string;
  salary: number;
}
