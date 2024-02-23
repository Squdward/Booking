import { RequestConfig } from "../../../../types/api";
import { IAuthor } from "../../../../types/author";
import { api } from "../../instanse";

const AuthorRequest = {
    getAll: ():RequestConfig<IAuthor[]> => api.get('author')
}


export {AuthorRequest}