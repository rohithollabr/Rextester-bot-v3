'use strict';

const TelegrafContext = require('telegraf/core/context');

const updateTypes = [
    'callback_query',
    'channel_post',
    'chosen_inline_result',
    'edited_channel_post',
    'edited_message',
    'inline_query',
    'shipping_query',
    'pre_checkout_query',
    'message'
];

const updateMessageSubTypes = [
    'voice',
    'video_note',
    'video',
    'venue',
    'text',
    'supergroup_chat_created',
    'successful_payment',
    'sticker',
    'pinned_message',
    'photo',
    'new_chat_title',
    'new_chat_photo',
    'new_chat_members',
    'migrate_to_chat_id',
    'migrate_from_chat_id',
    'location',
    'left_chat_member',
    'invoice',
    'group_chat_created',
    'game',
    'document',
    'delete_chat_photo',
    'contact',
    'channel_chat_created',
    'audio'
];

/**
 * Bypasses TelegrafContext's constructor to not bind the methods,
 * which allows overridden methods to be called by the inherited ones.
 */
function UnboundTelegrafContext(update, tg, options) {
    this.tg = tg;
    this.update = update;
    this.options = options;

    if ('message' in this.update) {
        this.updateType = 'message';
        this.updateSubTypes = updateMessageSubTypes
            .filter((key) => key in this.update.message);
    } else {
        this.updateType = updateTypes.find((key) => key in this.update);
        this.updateSubTypes = [];
    }
}

UnboundTelegrafContext.prototype = TelegrafContext.prototype;

module.exports = UnboundTelegrafContext;
