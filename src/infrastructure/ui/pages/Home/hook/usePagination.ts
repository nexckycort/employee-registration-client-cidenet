import { useState } from 'react'

const usePagination = () => {
  const [actualPage, setActualPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const previousPage = () => {
    const newActualPage = actualPage - 1
    if (newActualPage === 0) return
    setActualPage(newActualPage)
  }

  const nextPage = () => {
    const newActualPage = actualPage + 1
    if (newActualPage > totalPages) return
    setActualPage(newActualPage)
  }

  const goToPage = (page: number) => {
    setActualPage(page)
  }
  return {
    previousPage,
    nextPage,
    actualPage,
    goToPage,
    totalPages,
    setTotalPages
  }
}

export default usePagination
