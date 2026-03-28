import React, { useEffect, useMemo, useState } from "react";
import AttendanceDashboard from "./components/AttendanceDashboard";
import {
  attendanceService,
  type AttendanceDashboardData,
  type AttendanceSummary,
} from "../../services/attendance.service";

const defaultSummary: AttendanceSummary = {
  totalEmployees: 0,
  present: 0,
  absent: 0,
  late: 0,
  workFromHome: 0,
  onLeave: 0,
  halfDay: 0,
};

const defaultDashboard: AttendanceDashboardData = {
  summary: defaultSummary,
  departments: [],
  recentActivity: [],
  lateArrivals: [],
  absentees: [],
  weeklyTrend: [],
};

const normalizeDashboard = (
  data: AttendanceDashboardData | null | undefined,
): AttendanceDashboardData => {
  if (!data) return defaultDashboard;

  return {
    summary: { ...defaultSummary, ...data.summary },
    departments: Array.isArray(data.departments) ? data.departments : [],
    recentActivity: Array.isArray(data.recentActivity) ? data.recentActivity : [],
    lateArrivals: Array.isArray(data.lateArrivals) ? data.lateArrivals : [],
    absentees: Array.isArray(data.absentees) ? data.absentees : [],
    weeklyTrend: Array.isArray(data.weeklyTrend) ? data.weeklyTrend : [],
  };
};

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [viewMode, setViewMode] = useState("today");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [attendanceData, setAttendanceData] =
    useState<AttendanceDashboardData>(defaultDashboard);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await attendanceService.getDashboard({
          date: selectedDate || undefined,
        });
        if (isMounted) {
          setAttendanceData(normalizeDashboard(data));
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load attendance");
          setAttendanceData(defaultDashboard);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  const filteredData = useMemo(() => {
    if (filterDepartment === "all") return attendanceData;
    const normalize = (value: string | null | undefined) =>
      value?.toLowerCase() ?? "";
    const target = filterDepartment.toLowerCase();

    return {
      ...attendanceData,
      departments: attendanceData.departments.filter(
        (dept) => normalize(dept.name) === target,
      ),
      recentActivity: attendanceData.recentActivity.filter(
        (activity) => normalize(activity.department) === target,
      ),
      lateArrivals: attendanceData.lateArrivals.filter(
        (arrival) => normalize(arrival.department) === target,
      ),
      absentees: attendanceData.absentees.filter(
        (absentee) => normalize(absentee.department) === target,
      ),
    };
  }, [attendanceData, filterDepartment]);

  return (
    <AttendanceDashboard
      data={filteredData}
      selectedDate={selectedDate}
      onSelectedDateChange={setSelectedDate}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      filterDepartment={filterDepartment}
      onFilterDepartmentChange={setFilterDepartment}
      isLoading={isLoading}
      error={error}
    />
  );
}
