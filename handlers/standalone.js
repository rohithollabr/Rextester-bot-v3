'use strict';

const { standalone } = require("../symbols");

module.exports = (ctx, next) => {
    ctx[standalone] = true;
    return next();
};
