import { RequestConfig } from "../../../../types/api";
import { IAuthor } from "../../../../types/author";
import { api } from "../../instanse";

const AuthorRequest = {
    getAll: ():RequestConfig<IAuthor[]> => api.get('author'),
    getOne: async (id: IAuthor['_id']):RequestConfig<IAuthor> => await api.get(`author/${id}`)
}


export {AuthorRequest}