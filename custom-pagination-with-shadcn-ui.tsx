"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { getEngToBn } from "@/utils/get-en-to-bn";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  onPageChange?: (page: number) => void;
  className?: string;
}

export default function CustomPagination({
  currentPage,
  totalPages,
  basePath = "",
  onPageChange,
  className,
}: CustomPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const getHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${basePath}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      router.push(getHref(page));
    }
  };

  const getPages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);

      if (start > 1) pages.push(1);
      if (start > 2) pages.push("ellipsis-start");

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages - 1) pages.push("ellipsis-end");
      if (end < totalPages) pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getHref(Math.max(currentPage - 1, 1))}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {pages.map((page, index) => {
          if (typeof page === "string" && page.includes("ellipsis"))
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );

          return (
            <PaginationItem key={index}>
              <PaginationLink
                href={getHref(page as number)}
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page as number);
                }}
                className={
                  page === currentPage ? "pointer-events-none opacity-50 font-light" : "font-light"
                }
              >
                {getEngToBn(page)}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={getHref(Math.min(currentPage + 1, totalPages))}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
