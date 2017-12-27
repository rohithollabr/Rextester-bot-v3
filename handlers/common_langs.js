'use strict';

const { command, reply } = require('micro-bot');

const prependLangPrefix = s => `/${s}`;

const mostCommonLangs = [
    'bash',
    'c',
    'c++',
    'java',
    'js',
    'lua',
    'php',
    'python2',
    'python3',
    'ruby',
];

const replyString = `
<b>${mostCommonLangs.length} most commonly used languages available:</b>
<pre>
${mostCommonLangs.map(prependLangPrefix).join('\n')}
</pre>
See /all_languages.
`;

const handler = reply(replyString, { parse_mode: 'html' });

module.exports = command('common_languages', handler);
