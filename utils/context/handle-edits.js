'use strict';

const SuperContext = require('telegraf/core/context');


class ContextHandlingEdits extends SuperContext {
    constructor(update, tg, options) {
        const message = update.message || update.edited_message;
        super({ message }, tg, options);
    }

    reply(content, options={}) {
        const reply_to_message_id = this.message.message_id;
        const newOptions = { reply_to_message_id, ...options };
        return super.reply(content, newOptions);
    }
}

module.exports = ContextHandlingEdits;
