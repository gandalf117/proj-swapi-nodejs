import { formatResults } from "../utils/utilsService";
import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 });
const SWAPI_PAGE_LIMIT = 10;


export const fetchItems = async (cacheKey: string, entity: string, count: number): Promise<any> => {
    try {
        const cachedData = cache.get(cacheKey) as Map<number, Object>;
        const cacheSize = cachedData ? cachedData.size : 0;

        if (cacheSize >= count) {
            console.log(`Cache hit for ${cacheKey}`);
            return cachedData;
        }

        // calculate which pages need to be fetched
        const alreadyFetchedPages = Math.trunc(cacheSize / SWAPI_PAGE_LIMIT);
        const needToFetchPagesCount = Math.ceil((count - cacheSize) / SWAPI_PAGE_LIMIT);
        const needToFetchPagesArr = Array.from(
            { length: needToFetchPagesCount },
            (_, index) => index + alreadyFetchedPages + 1
        );

        return await fetchPages(cacheKey, entity, needToFetchPagesArr);
    } catch (error) {
        console.error(`Error fetching ${cacheKey}:`, error);
        throw new Error("Failed to fetch data");
    }
};

export const fetchPages = async (cacheKey: string, entity: string, pages: number[]): Promise<Map<number, any>> => {
    try {
        const cachedData = cache.get(cacheKey) as Map<number, any> | undefined;

        const urls = pages.map(page => `${process.env.SWAPI_BASE_URL}${entity}/?page=${page}`);
        console.log(`Fetching fresh data for ${cacheKey}`, urls);

        // Fetch data for all URLs and handle errors
        const responses = await Promise.all(
            urls.map(async (url) => {
                try {
                    return await axios.get(url);
                } catch (error) {
                    console.error(`Error fetching URL ${url}:`, error);
                    return null; // Return null for failed requests
                }
            })
        );

        // Filter out any failed responses (null values)
        const validResponses = responses.filter(response => response !== null);
        // Extract results and format them
        const allPageResults = formatResults(validResponses.map(response => (response as any).data.results).flat());
        // Combine new results with existing cached data if applicable
        const response = cachedData ? new Map([...cachedData, ...allPageResults]) : allPageResults;

        // Set the cache with the new response
        cache.set(cacheKey, response);
        return response;
    } catch (error) {
        console.error(`Error fetching ${cacheKey}:`, error);
        throw new Error("Failed to fetch data");
    }
};
