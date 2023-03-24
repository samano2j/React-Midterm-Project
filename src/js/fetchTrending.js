import axios from 'axios'
import { configPath } from './configPath'

export const fetchTrending = async () => {
    const url = configPath.TrendingAPIPath
    const { data: animeData } = await axios.get(url)

    return animeData
}