import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.375rem',
        marginTop: '2.5rem',
        marginBottom: '1.5rem',
      }}
    >
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        style={{
          padding: '0.5rem 0.75rem',
          opacity: currentPage <= 1 ? 0.4 : 1,
          cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
        }}
        aria-label="Previous Page"
      >
        <ChevronLeft size={16} /> Previous
      </button>

      {startPage > 1 && (
        <>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onPageChange(1)}
            style={{ minWidth: '38px', padding: '0.5rem 0.75rem' }}
          >
            1
          </button>
          {startPage > 2 && <span style={{ padding: '0 0.25rem', color: '#94a3b8' }}>...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`btn ${page === currentPage ? 'btn-primary' : 'btn-outline'}`}
          style={{ minWidth: '38px', padding: '0.5rem 0.75rem' }}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span style={{ padding: '0 0.25rem', color: '#94a3b8' }}>...</span>}
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onPageChange(totalPages)}
            style={{ minWidth: '38px', padding: '0.5rem 0.75rem' }}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        className="btn btn-outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        style={{
          padding: '0.5rem 0.75rem',
          opacity: currentPage >= totalPages ? 0.4 : 1,
          cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
        }}
        aria-label="Next Page"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
};
