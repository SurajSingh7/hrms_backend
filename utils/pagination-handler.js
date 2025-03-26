class PaginationHandler{
    static paginate = (req) => {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        return { page, limit, skip };
    };

    static paginateReturn = (page, limit, total, currentPageTotal) => {
        const totalPages = Math.ceil(total / limit);
        const hasPrev = page > 1;
        const hasNext = page < totalPages
        return { page, limit, total, currentPageTotal, totalPages, hasPrev, hasNext };
    };
}

export default PaginationHandler;