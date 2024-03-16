import { RequestConfig } from "../../../../types/api"
import { IGenre } from "../../../../types/genre"
import { api } from "../../instanse"

const GenreRequest = {
    getAll: ():RequestConfig<IGenre[]> => api.get('genre')
}

export {GenreRequest}