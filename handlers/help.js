'use strict';

const Tf = require('micro-bot');

// @ts-ignore
const pkg = require('../package.json');

const helpText = ({ me }) => `Execute code.

Usage: \`/<language> <code> [/stdin <stdin>]\`

Inline mode:
\`@${me} <language> <code> [/stdin <stdin>]\`

Line breaks and indentation are supported.

I'll also try to execute files pm'ed to me.

See list of supported programming /languages.

Version: \`${pkg.version}\`.
Powered by rextester.com.
`;

const helpHandler = ctx => {
    const inline_keyboard = [ [
        // XXX use pkg.bugs.url instead?
        { text: "Official group", url: "telegram.me/Rextesters" },
        { text: "Repository", url: pkg.repository.url },
        { text: "Rate", url: `https://telegram.me/storebot?start=${ctx.me}` },
    ] ];

    const reply_markup = { inline_keyboard };

    return ctx.replyWithMarkdown(helpText(ctx), { reply_markup });
};

module.exports = Tf.command([ 'help', 'start' ], helpHandler);
