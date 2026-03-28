type TablePaginationProps = {
  totalPages: number;
  totalElements: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
};

export default function TablePagination({
  totalPages,
  totalElements,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 25, 50],
}: TablePaginationProps) {
  if (totalElements === 0) return null;

  const safeTotalPages = Math.max(totalPages, 1);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < safeTotalPages;

  return (
    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 font-medium">
            Showing page {currentPage} of {safeTotalPages} ({totalElements} total)
          </span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:border-blue-500"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(1)}
            disabled={!canGoPrev}
            className="px-3 py-2 text-gray-800 rounded-lg border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors font-bold text-sm"
          >
            ««
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!canGoPrev}
            className="px-3 py-2 text-gray-800 rounded-lg border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors font-bold text-sm"
          >
            ‹ Prev
          </button>

          <div className="flex gap-1">
            {[...Array(safeTotalPages)].map((_, idx) => {
              const page = idx + 1;
              if (
                page === 1 ||
                page === safeTotalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                        : "border-2 border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2 py-2 text-gray-400 font-bold">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!canGoNext}
            className="px-3 py-2 text-gray-800 rounded-lg border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors font-bold text-sm"
          >
            Next ›
          </button>
          <button
            onClick={() => onPageChange(safeTotalPages)}
            disabled={!canGoNext}
            className="px-3 py-2 text-gray-800 rounded-lg border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors font-bold text-sm"
          >
            »»
          </button>
        </div>
      </div>
    </div>
  );
}
