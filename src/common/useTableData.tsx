"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

export function useTableData<T>(
  fetchData: () => Promise<T[]> | T[],
  searchFieldsInput: (NestedKeyOf<T> | keyof T)[],
  filterField?: keyof T
) {
  const searchFields = useRef(searchFieldsInput); // ✅ prevent re-renders
  const [rawData, setRawData] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const itemsPerPage = 10;

  const getNestedValue = useCallback((obj: any, path: string) => {
    return path.split(".").reduce((o, p) => (o || {})[p], obj);
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchData();
      setRawData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load data"));
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    let result = [...rawData];

    if (searchQuery) {
      const lowerSearch = searchQuery.toLowerCase();
      result = result.filter((item) =>
        searchFields.current.some((field) => {
          const value =
            typeof field === "string" && field.includes(".")
              ? getNestedValue(item, field)
              : item[field as keyof T];
          return String(value ?? "")
            .toLowerCase()
            .includes(lowerSearch);
        })
      );
    }

    if (statusFilter && filterField) {
      result = result.filter((item) => item[filterField] === statusFilter);
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, rawData, filterField, getNestedValue]);

  const { paginatedData, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    return { paginatedData, totalPages };
  }, [filteredData, currentPage]);

  return {
    paginatedData,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchQuery,
    setStatusFilter,
    isLoading,
    error,
    reload: loadData,
    rawData,
    filteredData,
  };
}
