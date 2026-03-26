import { useEffect, useRef, useState } from "react";
import { employeeService, type EmployeeRecord } from "../../../services/employee.service";

export type PageMeta = {
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
};

export const useEmployeeList = () => {
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const prevSearchTermRef = useRef(searchTerm);
  const prevItemsPerPageRef = useRef(itemsPerPage);
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    totalPages: 0,
    totalElements: 0,
    pageNumber: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchChanged = prevSearchTermRef.current !== searchTerm;
    const sizeChanged = prevItemsPerPageRef.current !== itemsPerPage;

    if ((searchChanged || sizeChanged) && currentPage !== 1) {
      setCurrentPage(1);
      return;
    }

    prevSearchTermRef.current = searchTerm;
    prevItemsPerPageRef.current = itemsPerPage;

    let isMounted = true;

    const fetchEmployees = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await employeeService.getEmployees({
          page: Math.max(currentPage - 1, 0),
          size: itemsPerPage,
          search: searchTerm,
        });
        if (!isMounted) return;
        setEmployees(response.content ?? []);
        setPageMeta({
          totalPages: response.totalPages ?? 0,
          totalElements: response.totalElements ?? 0,
          pageNumber: response.number ?? 0,
          pageSize: response.size ?? itemsPerPage,
        });
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Failed to load employees");
        setEmployees([]);
        setPageMeta({
          totalPages: 0,
          totalElements: 0,
          pageNumber: 0,
          pageSize: itemsPerPage,
        });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchEmployees();

    return () => {
      isMounted = false;
    };
  }, [currentPage, itemsPerPage, searchTerm]);

  return {
    employees,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    pageMeta,
    isLoading,
    error,
  };
};
