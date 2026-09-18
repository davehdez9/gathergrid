import Link from "next/link";

const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <nav
      className="flex items-center justify-center gap-3"
      aria-label="Pagination"
    >
      {page > 1 ? (
        <Link
          href={`/activities?page=${page - 1}`}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-400 hover:bg-gray-50"
        >
          ← Previous
        </Link>
      ) : (
        <span className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-400">
          ← Previous
        </span>
      )}

      <span className="px-2 text-sm font-medium text-gray-600">
        Page{" "}
        <span className="font-bold text-gray-900">
          {page}
        </span>{" "}
        of{" "}
        <span className="font-bold text-gray-900">
          {totalPages}
        </span>
      </span>

      {page < totalPages ? (
        <Link
          href={`/activities?page=${page + 1}`}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-400 hover:bg-gray-50"
        >
          Next →
        </Link>
      ) : (
        <span className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-400">
          Next →
        </span>
      )}
    </nav>
  );
};

export default Pagination;