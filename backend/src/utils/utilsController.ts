export const applyPagination = (
    incomingPage: number,
    incomingLimit: number,
    limitDefault: number,
    totalSize: number) => {
    let page = incomingPage || 1;
    const limit = incomingLimit || limitDefault;
    const totalPages = Math.ceil(totalSize / limit);
    // make sure the current page is not bigger than the total possible pages
    page = Math.min(page, totalPages);

    return {
        startIndex: (page - 1) * limit,
        endIndex: Math.min(page * limit, totalSize)
    }
}
