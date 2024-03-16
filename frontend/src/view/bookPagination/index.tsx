import { Pagination, PaginationRootProps } from "@mantine/core"
import { $pagination, setPage } from "../../pages/books/model"
import { useUnit } from "effector-react"

const BookPagination = () => {
    const [pagination, onChangePage] = useUnit([$pagination, setPage])
    
    if(pagination.totalPages === 1 ) return 

    const onChangeHandler:PaginationRootProps['onChange'] = (page) =>{
        if(page != pagination.page) {
            onChangePage(page)
        }
    }
    
    return (
        <Pagination
            value={+pagination.page}
            total={+pagination.totalPages}
            onChange={onChangeHandler}
            size={'lg'}
        />
    )
}

export {BookPagination}