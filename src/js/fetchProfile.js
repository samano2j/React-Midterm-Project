import axios from 'axios'
import { configPath } from './configPath'

export const fetchProfile = async (id) => {
    const url = configPath.BaseAPIPath
    const params = {
        'filter[id]': id
    }

    const { data: animeData } = await axios.get(url, { params })

    return animeData
}