'use strict';

const R = require('ramda');

const executor = require('../executor');

const stringUtils = require('../utils/string');
const { languageRegex, displayError, format } = require('../utils/misc');
const { commandRegex } = require('../utils/telegraf');

const { standalone } = require('../symbols');


const regex = stringUtils.regex('six') `^/
    (?<lang> ${languageRegex})
    (?<username> @\w+)?
    \s+
    (?<Program> .+?)
    (?:
        \s+
        /stdin
        \s+
        (?<Input> .+)
    )?
$`;


const handler = async (ctx, next) => {
    const { lang, Program, Input } = ctx.match;

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

    return executor.execute({ Input, LanguageChoice, Program })
        .then(format)
        .then(ctx.replyWithHTML)
        .catch(R.pipe(displayError, ctx.reply));
};

module.exports = commandRegex(regex, handler);
