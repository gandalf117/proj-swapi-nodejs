import { formatResults } from "../utils/utilsService";
import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3000 });

const SWAPI_PAGE_LIMIT = 10;

export const fetchItems = async (cacheKey: string, entity: string, total: number): Promise<any> => {
    try {
        const cachedData = cache.get(cacheKey) as Map<number, Object>;

        if (cachedData) {
            console.log(`Cache hit for ${entity}`);
            return cachedData;
        }

        // get total pages as an array
        const totalPages = Array.from({ length: Math.ceil(total / SWAPI_PAGE_LIMIT) }, (_, index) => index + 1);

        /*
            Important: we need to fetch the whole entity dataset and put it in memory
            otherwise querying and filtering is going to return only partial results.
            Entity datasets are less than 100 records and this approach is viable.
            If entity datasets were too big then we would have fetched them in portions.
        */
        const urls = totalPages.map(page => `${process.env.SWAPI_BASE_URL}${entity}/?page=${page}`);
        console.log(`Fetching fresh data for ${entity}`);

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
        const allPageResults = formatResults(validResponses.map(response => response.data.results).flat());

        // Set the cache with the new response
        cache.set(cacheKey, allPageResults);

        return allPageResults;
    } catch (error) {
        console.error(`Error fetching ${cacheKey}:`, error);
        throw new Error("Failed to fetch data");
    }
};
