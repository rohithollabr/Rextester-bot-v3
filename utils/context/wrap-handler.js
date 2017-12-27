'use strict';

const R = require('ramda');

const { bound } = require('../misc');
const { scoped } = require('../telegraf');
const { constructContext } = require('./misc');
const ContextHandlingEdits = require('./handle-edits');

const wrapHandler = scoped(R.pipe(
    constructContext(ContextHandlingEdits),
    bound,
));

module.exports = wrapHandler;
