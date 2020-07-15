Telegram bot for executing snippets of code.

Rewrite of my https://bitbucket.org/GingerPlusPlus/rextester-bot.

At this point, the "official" deploy is running at [@rextester_alt_bot],
but I'll move it to the main username, [@rextester_bot], as soon as it's ready.

## Configuration and launch ##

### Development ###

You have to install dependencies fist by running `npm install`.

You can launch the bot via `npm start` or `micro-bot` (if installed globally).

You have to pass the token by environment variable `BOT_TOKEN`
or via `-t <token>` option to `telegraf`.

Set `NODE_ENV` to `development`
to enable showing tracebacks in bot's replies in case of an error
(the tracebacks can't be seen otherwise).


### Production ##

Set `BOT_DOMAIN` variable to use WebHook.

Bot should be deployable out of the box into heroku.com
(of course, you have to set `BOT_TOKEN`, and `BOT_DOMAIN`).

[Roadmap]


[@rextester_alt_bot]: https://t.me/rextester_alt_bot
[@rextester_bot]: https://t.me/rextester_bot
[Roadmap]: https://github.com/wojpawlik/Rextester-bot-v3/projects/1
