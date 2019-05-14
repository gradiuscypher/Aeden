import { MessageEmbed } from 'discord.js';

/**
 * @interface MessageData
 * @name MessageData
 * @description Interface for {@link MessageData}.
 */
/**
 * @name MessageData#guild_id
 * @description ID of the guild to send the message to.
 * @type {string}
 */
/**
 * @name MessageData#channel_id
 * @description ID of the channel to send the message to.
 * @type {string}
 */
/**
 * @name MessageData#content
 * @description Content of the message to send.
 * @type {string}
 */

export default interface MessageData {
	guildId: string;
	channelId?: string;
	messageId?: string;
	messageTitle?: string;
	messageContent?: string;
	hasEmbed?: boolean;
	embed?: MessageEmbed;
};
