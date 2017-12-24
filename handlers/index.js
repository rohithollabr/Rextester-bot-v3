'use strict';

const Tf = require('micro-bot');

const paths = [
    './standalone',
    './exec-url',
    './help',
    './langs',
    './main',
    './unmatched',
];

const handlers = paths.map(require);

module.exports = Tf.compose(handlers);
