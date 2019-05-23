import { Guild } from '@yamdbf/core';
import { Message, TextChannel } from 'discord.js';

import MessageData from '../../../shared/lib/interfaces/MessageData';

/**
 * @module Util
 * @description Utility class containing static methods.
 */
export default class Util {
	/**
	 * @static
	 * @method removeInvalidMessages
	 * @description Method to remove any messages that are invalid, or that have been deleted from a guild.
	 * @param {string | number} s - The string to check.
	 * @returns {boolean} Is the string numerical?
	 */
	public static async removeInvalidMessages(
		editableMessages: MessageData[],
		guild: Guild
	): Promise<MessageData[]> {
		const array: MessageData[] = [];

		if (!editableMessages) return editableMessages;

		await editableMessages.forEach(async (m): Promise<void> => {
			if (!m.channelId) return;
			if (!m.messageId) return;

			const channel: TextChannel | undefined = (await guild.channels.get(
				m.channelId
			)) as TextChannel;
			const message: Message | undefined = channel
				? await channel.messages.get(m.messageId)
				: undefined;

			if (message) array.push(m);
		});

		return array;
	}
}
