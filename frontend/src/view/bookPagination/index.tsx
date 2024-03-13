import { Pagination } from "@mantine/core"
import { $pagination, setPage } from "../../pages/books/model"
import { useUnit } from "effector-react"

const BookPagination = () => {
    const [pagination, onChangePage] = useUnit([$pagination, setPage])

    return (
        <Pagination
            total={+pagination.totalPages}
            onChange={onChangePage}
            size={'lg'}
        />
    )
}

export {BookPagination}