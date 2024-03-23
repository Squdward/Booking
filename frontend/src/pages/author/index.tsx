import { LoadingOverlay } from "@mantine/core"
import { $isLoading } from "../../features/search/model"
import { $author } from "../../store/author/model"
import { AuthorView } from "../../view/authorView"
import { useUnit } from "effector-react"

const AuthorPage = () => {
    const [data, isLoading] = useUnit([$author, $isLoading])
    
    return (
        <section>
            <LoadingOverlay visible={isLoading}/>
            {data && <AuthorView {...data}/>}
       </section>
    )
}

export {AuthorPage}