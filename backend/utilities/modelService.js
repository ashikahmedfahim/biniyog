module.exports.queryOptions = (req) => {
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const limit = 20;
    const offset = parseInt((page - 1) * limit);
    const order = req.query.order ? req.query.order : "updated_at";
    const direction = req.query.direction ? req.query.direction : "desc";
    let queryOptions = {};
    queryOptions.limit = limit;
    queryOptions.offset = offset;
    queryOptions.order = [[`${order}`, `${direction}`]];
    queryOptions.distinct = true;
    return queryOptions;
};

module.exports.successResponse = (res, code, data, message = null) => {
    res.status(code).json({
        status: "success",
        data,
        message,
    });
};

module.exports.errorResponse = (res, code, message) => {
    res.status(code).json({
        status: "error",
        message,
    });
};