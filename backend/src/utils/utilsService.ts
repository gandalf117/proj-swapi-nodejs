interface ResultItem {
    url: string;
}

function extractIdFromURL(url: string): number | null {
    const match = url.match(/\/(\d+)\/$/);
    return match ? parseInt(match[1], 10) : null;
}

// Converts the array of objects structure to a more easily accessible one
export const formatResults = (results: ResultItem[]): Map<number, ResultItem> => {
    return new Map(results.map(item => {
        const id = extractIdFromURL(item.url);
        if (id === null) {
            console.log(`Important: The following item couldn't be stored, because it has no id: ${item.url}`);
        }
        return id !== null ? [id, item] : null;
    }).filter(entry => entry !== null) as [number, ResultItem][]);
};
