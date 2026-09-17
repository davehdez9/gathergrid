import Link from 'next/link';

const Pagination = ({ page, pageSize, totalItems }) => {
    const totalPages = Math.ceil(totalItems / pageSize)

    return (
        <div>
            {page > 1 && (
                <Link href={`/activities?page=${page - 1}`}>
                    Previous
                </Link>
            )}

            <span>
                Page {page} of {totalPages}
            </span>

            {page < totalPages && (
                <Link href={`/activities?page=${page + 1}`}>
                    Next
                </Link>
            )}
        </div>
    )
}

export default Pagination;
