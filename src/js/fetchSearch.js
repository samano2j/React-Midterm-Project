import axios from 'axios'
import { configPath } from './configPath'

export const fetchSearch = async (searchItem, addMore = 0) => {
    const url = configPath.BaseAPIPath
    const params = {
        'filter[text]': searchItem,
        'page[limit]': 20,
        'page[offset]': addMore
    }

    const { data: animeData } = await axios.get(url, { params })

    return animeData
}