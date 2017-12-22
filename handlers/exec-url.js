'use strict';

const R = require('ramda');

const executor = require('../executor');
const request = require('../utils/request');

const stringUtils = require('../utils/string');
const { languageRegex, displayError, format } = require('../utils/misc');
const { commandRegex } = require('../utils/telegraf');

const { standalone } = require('../symbols');


const regex = stringUtils.regex('six') `^
    /execUrl
    (?<username> @\w+)?
    \s+(?<lang> ${languageRegex})
    \s+(?<url> \S+)
    (?:
        \s+
        /stdin
        \s+
        (?<Input> .+)
    )?
$`;

const processUrlRegex = stringUtils.regex('six') `^
    https?:\/\/
    (?:www\.)?
    (pastebin.com|hastebin.com)
    \/([.\w]+)
$`;

/**
 * @param {string} url
 * @returns {string}
 */
function processUrl(url) {
    if (!/^http/.test(url)) {
        url = `http://${url}`;
    }

    const match = processUrlRegex.exec(url);

    if (match) {
        const [ , service, id ] = match;
        url = `https://${service}/raw/${id}`;
    }

    return url;
}

const processMatch = R.evolve({ url: processUrl });

const handler = async (ctx, next) => {
    const { lang, url, Input } = processMatch(ctx.match);

    // TODO possible duplication with handlers/main

    const langIds = await executor.resolveLang(lang);

    if (langIds.length === 0) {
        return ctx[standalone]
            ? ctx.chat.type === 'private'
                ? ctx.reply(`Unknown language: ${lang}`)
                : null
            : next();
    }

    ctx.replyWithChatAction('typing');

    const [ LanguageChoice ] = langIds;

    return request({ url })
        .then(Program => executor.execute({ Input, LanguageChoice, Program }))
        .then(format)
        .then(ctx.replyWithHTML)
        .catch(R.pipe(displayError, ctx.reply));
};

module.exports = commandRegex(regex, handler);
