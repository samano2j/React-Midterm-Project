import axios from 'axios'
import { configPath } from './configPath'

export const fetchSuggestion = async (searchItem) => {
    const url = configPath.BaseAPIPath
    const params = {
        'filter[text]': searchItem,
        'page[limit]': 4,
        'page[offset]': 0
    }

    const { data: animeData } = await axios.get(url, { params })

    return animeData
}