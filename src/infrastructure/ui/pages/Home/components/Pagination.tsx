import React from 'react'

interface Props {
  usePagination: {
    previousPage: () => void
    nextPage: () => void
    actualPage: number
    goToPage: (page: number) => void
    totalPages: number
    setTotalPages: React.Dispatch<React.SetStateAction<number>>
  }
}

const Pagination: React.FC<Props> = ({ usePagination }) => {
  const { actualPage, goToPage, totalPages, previousPage, nextPage } = usePagination

  return (
    <ul className="pagination">
      <li className={`page-item ${actualPage === 1 ? 'disabled' : ''}`}>
        <a className="page-link" onClick={previousPage}>
          Previous
        </a>
      </li>
      {Array.from(new Array(totalPages)).map((_, index) => {
        const page = index + 1
        return (
          <li key={`page-${page}`} className={`page-item ${actualPage === page ? 'active' : ''}`} aria-current="page">
            <a
              className="page-link"
              onClick={(e: any) => {
                goToPage(+e.target.outerText)
              }}
            >
              {page}
            </a>
          </li>
        )
      })}
      <li className={`page-item ${actualPage === totalPages ? 'disabled' : ''}`}>
        <a className="page-link" onClick={nextPage}>
          Next
        </a>
      </li>
    </ul>
  )
}

export default Pagination
