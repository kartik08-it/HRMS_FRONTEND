import { ENDPOINTS } from "../api/endpoint";
import { http } from "../api/http";

export type AttendanceSummary = {
  totalEmployees: number;
  present: number;
  absent: number;
  late: number;
  workFromHome: number;
  onLeave: number;
  halfDay: number;
};

export type AttendanceDepartment = {
  name: string;
  present: number;
  absent: number;
  late: number;
  total: number;
};

export type AttendanceActivity = {
  id: number | string;
  employee: string;
  action: string;
  time: string;
  status: "on-time" | "late" | "absent" | string;
  department: string;
};

export type AttendanceLateArrival = {
  name: string;
  department: string;
  checkIn: string;
  delay: string;
};

export type AttendanceAbsentee = {
  name: string;
  department: string;
  reason: string;
  approved: boolean;
};

export type AttendanceWeeklyTrend = {
  day: string;
  present: number;
  absent: number;
  late: number;
};

export type AttendanceDashboardData = {
  summary: AttendanceSummary;
  departments: AttendanceDepartment[];
  recentActivity: AttendanceActivity[];
  lateArrivals: AttendanceLateArrival[];
  absentees: AttendanceAbsentee[];
  weeklyTrend: AttendanceWeeklyTrend[];
};

const buildDashboardQuery = (params?: { date?: string }) => {
  if (!params?.date) return "";
  const query = new URLSearchParams();
  query.set("date", params.date);
  return query.toString();
};

export const attendanceService = {
  getDashboard: (params?: { date?: string }) => {
    const query = buildDashboardQuery(params);
    const endpoint = query
      ? `${ENDPOINTS.ATTENDANCE_DASHBOARD}?${query}`
      : ENDPOINTS.ATTENDANCE_DASHBOARD;
    return http.get<AttendanceDashboardData>(endpoint);
  },
};
