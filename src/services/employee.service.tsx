import { ENDPOINTS } from "../api/endpoint";
import { http } from "../api/http";

export type EmployeeRecord = {
  id: number;
  employeeCode: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  department: string | null;
  position: string | null;
  joinDate: string | null;
  status: "active" | "inactive" | string;
  avatar: string | null;
  profileImage: string | null;
  salary: string | number | null;
  manager: string | null;
  location: string | null;
};

type ApiEmployeeRecord = {
  id: number;
  profile_image?: string | null;
  employeeCode?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  department?: string | null;
  position?: string | null;
  joinDate?: string | null;
  status?: "active" | "inactive" | string | null;
  avatar?: string | null;
  salary?: string | number | null;
  manager?: string | null;
  location?: string | null;
  profileImage?: string | null;
};

const normalizeEmployee = (employee: ApiEmployeeRecord): EmployeeRecord => ({
  id: employee.id,
  employeeCode: employee.employeeCode ?? "",
  name: employee.name ?? null,
  email: employee.email ?? null,
  phone: employee.phone ?? null,
  department: employee.department ?? null,
  position: employee.position ?? null,
  joinDate: employee.joinDate ?? null,
  status: employee.status ?? "inactive",
  avatar: employee.avatar ?? null,
  profileImage: employee.profileImage ?? employee.profile_image ?? null,
  salary: employee.salary ?? null,
  manager: employee.manager ?? null,
  location: employee.location ?? null,
});

export type CreateEmployeePayload = {
  username: string;
  password: string;
  email: string;
  phone?: string;
  joiningDate: string;
  department: string;
  designation: string;
  salary: number;
  profileType: "EMPLOYEE" | string;
  fullName: string;
  profileImage: string;
  status: string;
  manager: string;
  employeeCode?: string;
  location?: string;
  avatar?: string;
};

export type PageResponse<T> = {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
};

const buildEmployeeQuery = (params: {
  page?: number;
  size?: number;
  search?: string;
}) => {
  const query = new URLSearchParams();
  query.set("page", String(params.page ?? 0));
  query.set("size", String(params.size ?? 10));
  query.set("search", params.search ?? "");
  return query.toString();
};

const inFlightRequests = new Map<string, Promise<unknown>>();

export const employeeService = {
  getEmployees: (params: { page?: number; size?: number; search?: string }) => {
    const query = buildEmployeeQuery(params);
    const requestKey = `employees?${query}`;
    const existing = inFlightRequests.get(requestKey) as
      | Promise<PageResponse<EmployeeRecord>>
      | undefined;
    if (existing) return existing;

    const request = http
      .get<PageResponse<EmployeeRecord>>(`${ENDPOINTS.EMPLOYEES}?${query}`)
      .finally(() => {
        inFlightRequests.delete(requestKey);
      });
    inFlightRequests.set(requestKey, request);
    return request;
  },

  getEmployeeById: async (employeeId: number) => {
    const requestKey = `employee-${employeeId}`;
    const existing = inFlightRequests.get(requestKey) as
      | Promise<EmployeeRecord>
      | undefined;
    if (existing) return existing;

    const request = http
      .get<ApiEmployeeRecord>(`${ENDPOINTS.EMPLOYEES}/${employeeId}`)
      .then(normalizeEmployee)
      .finally(() => {
        inFlightRequests.delete(requestKey);
      });
    inFlightRequests.set(requestKey, request);
    return request;
  },

  addEmployee: (payload: CreateEmployeePayload) =>
    http.post<EmployeeRecord, CreateEmployeePayload>(ENDPOINTS.EMPLOYEES, payload),

  updateEmployee: (employeeId: number, payload: CreateEmployeePayload) =>
    http.put<EmployeeRecord, CreateEmployeePayload>(
      `${ENDPOINTS.EMPLOYEES}/${employeeId}`,
      payload,
    ),
};
