import { ENDPOINTS } from "../api/endpoint";
import { http } from "../api/http";

export type EmployeeRecord = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  department: string | null;
  position: string | null;
  joinDate: string | null;
  status: "active" | "inactive" | string;
  avatar: string | null;
  salary: string | number | null;
  manager: string | null;
  location: string | null;
};

export type CreateEmployeePayload = {
  username: string;
  password: string;
  email: string;
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
  phone?: string;
  location?: string;
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

export const employeeService = {
  getEmployees: (params: { page?: number; size?: number; search?: string }) => {
    const query = buildEmployeeQuery(params);
    return http.get<PageResponse<EmployeeRecord>>(
      `${ENDPOINTS.EMPLOYEES}?${query}`,
    );
  },

  addEmployee: (payload: CreateEmployeePayload) =>
    http.post<EmployeeRecord, CreateEmployeePayload>(ENDPOINTS.EMPLOYEES, payload),
};
