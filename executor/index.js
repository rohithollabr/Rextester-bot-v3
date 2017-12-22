'use strict';

// @ts-ignore
const langs = require('./langs.json');

// @ts-ignore
const CompilerArgs = require('./compiler-args.json');

const defaults = {
    url: 'http://rextester.com/rundotnet/api',
};

class RextesterExecutor {
    constructor(options={}) {
        this.options = Object.assign({}, defaults, options);
        Object.freeze(this.options);
        Object.freeze(this);
    }

    /**
     * @param {string} lang
     * @returns {number[]}
     */
    resolveLang(lang) {
        const resolved = langs[lang.toLowerCase()];
        if (typeof resolved === 'number') {
            return [ resolved ];
        } else {
            return [];
        }
    }

    /**
     * @param {Object} form
     * @param {(String|Number)} form.LanguageChoice
     * @param {String} form.Program
     * @param {?String} form.Input
     * @param {?String} [form.CompilerArgs]
     */
    execute(form) {
        const { request, url } = this.options;
        const { LanguageChoice } = form;
        form.CompilerArgs = form.CompilerArgs || CompilerArgs[LanguageChoice];
        return request({ form, json: true, method: 'POST', url });
    }
}

module.exports = RextesterExecutor;
