import AedenDiscordClient from '../client/AedenDiscordClient';
import MessageData from '../lib/interfaces/api/MessageData';

import { Handler, Request, Response } from 'express';
import { Guild, TextChannel, Message } from 'discord.js';
import { GuildStorage } from '@yamdbf/core';

/**
 * @namespace message
 * @description Message endpoints for Aeden's API server.
 *
 * @memberof API
 */
export default class MessageEndPoints {
	private discordClient: AedenDiscordClient;

	public constructor(client: AedenDiscordClient) {
		this.discordClient = client;
	}

	/**
	 * @method deleteMessage
	 * @description API endpoint to delete a message within a guild channel.
	 * @returns {Handler}
	 *
	 * @example Usage
	 * PUT /api/message/deleteMessage
	 *
	 * @example Body`
	 * {
	 *	"guildId": "248917791627804673",
	 *	"channelId": "351408294952304641",
	 *	"messageId": "577525490739445770"
	 * }
	 *
	 * @example Success
	 * { success: true, message: `Message deleted.` }
	 *
	 * @example Error
	 * { success: false, message: `<error message>` }
	 *
	 * @memberof API.message
	 */
	public deleteMessage: Handler = async (
		req: Request,
		res: Response
	): Promise<Response> => {
		const data: MessageData = req.body;
		let error = false;
		let errorMessage = '';

		if (!data) {
			error = true;
			errorMessage = `No message data provided.\n`;
		}
		if (!data.guildId) {
			error = true;
			errorMessage = `No guild ID provided.\n`;
		}
		if (!data.channelId) {
			error = true;
			errorMessage = `No channel ID provided\n.`;
		}
		if (!data.messageId) {
			error = true;
			errorMessage = `No message ID provided\n.`;
		}

		if (error)
			return res.status(404).send({ success: false, message: errorMessage });

		const guild: Guild | undefined = this.discordClient.guilds.get(
			data.guildId
		);

		if (!guild)
			return res
				.status(404)
				.send({ success: false, message: `Guild not found.` });

		const channel: TextChannel | undefined = (await guild.channels.get(
			data.channelId!
		)) as TextChannel;

		if (!channel)
			return res
				.status(404)
				.send({ success: false, message: `Channel not found.` });
		const message: Message | undefined = (await channel.messages.get(
			data.messageId!
		)) as Message;

		if (!message)
			return res
				.status(404)
				.send({ success: false, message: `Message not found.` });
		message.delete();

		return res.status(200).send({ success: true, message: `Message deleted.` });
	};

	/**
	 * @method createMessage
	 * @description API endpoint to create a message within a guild channel.
	 * @returns {Handler}
	 *
	 * @example Usage
	 * POST /api/message/createMessage
	 *
	 * @example Body
	 * {
	 *	"guildId": "248917791627804673",
	 *	"channelId": "351408294952304641",
	 *	"messageId": "577525490739445770",
	 *	"messageTitle": "Test Message Title",
	 *	"messageContent": "Test message content.",
	 *	"hasEmbed": false
	 * }
	 *
	 * @example Success
	 * { success: true, message: `Message created.` }
	 *
	 * @example Errors
	 * { success: false, message: `<error message>` }
	 *
	 * @memberof API.message
	 */
	public createMessage: Handler = async (
		req: Request,
		res: Response
	): Promise<Response> => {
		const data: MessageData = req.body;
		if (!data.guildId)
			return res
				.status(400)
				.send({ success: false, message: `No guild ID provided.` });
		if (!data.channelId)
			return res
				.status(400)
				.send({ success: false, message: `No channel ID provided.` });

		const guild: Guild | undefined = this.discordClient.guilds.get(
			data.guildId
		);
		const guildStorage: GuildStorage | undefined = await this.discordClient.storage.guilds.get(data.guildId);

		if (!guild)
			return res
				.status(404)
				.send({ success: false, message: `Guild not found.` });

		const channel: TextChannel | undefined = (await guild.channels.get(
			data.channelId
		)) as TextChannel;

		if (!channel)
			return res
				.status(404)
				.send({ success: false, message: `Channel not found.` });
		if (!guildStorage)
			return res
				.status(500)
				.send({
					success: false,
					message: `There is no guild storage present for the specified guild.`
				});

		let editableMessages: MessageData[] = await guildStorage.get(
			`EDITABLE_MESSAGES`
		);
		const message: Message = (await channel.send(
			data.messageContent
		)) as Message;
		const editableMessage: MessageData = {
			guildId: data.guildId,
			messageId: message.id,
			channelId: channel.id,
			messageTitle: data.messageTitle
		};

		if (editableMessages) editableMessages.push(editableMessage);
		else editableMessages = [editableMessage] as MessageData[];

		await guildStorage.set(`EDITABLE_MESSAGES`, editableMessages);

		return res.status(200).send({ success: true, message: `Message created.` });
	};

	/**
	 * @method updateMessage
	 * @description API endpoint to update a message within a guild channel.
	 * @returns {Handler}
	 *
	 * @example Usage
	 * PUT /api/message/updateMessage
	 *
	 * @example Body
	 * {
	 *	"guildId": "248917791627804673",
	 *	"channelId": "351408294952304641",
	 *	"messageId": "577525490739445770",
	 *	"messageTitle": "Test Message Title",
	 *	"messageContent": "Test message content.",
	 *	"hasEmbed": false
	 * }
	 *
	 * @example Success
	 * { success: true, message: `Message updated.` }
	 *
	 * @example Error
	 * { success: false, message: `<error message>` }
	 *
	 * @memberof API.message
	 */
	public updateMessage: Handler = async (
		req: Request,
		res: Response
	): Promise<Response> => {
		const data: MessageData = req.body;
		if (!data.guildId)
			return res
				.status(400)
				.send({ success: false, message: `No guild ID provided.` });
		if (!data.channelId)
			return res
				.status(400)
				.send({ success: false, message: `No channel ID provided.` });
		if (!data.messageId)
			return res
				.status(400)
				.send({ success: false, message: `No message ID provided.` });

		const guild: Guild | undefined = this.discordClient.guilds.get(
			data.guildId
		);

		if (!guild)
			return res
				.status(404)
				.send({ success: false, message: `Guild not found.` });
		const channel: TextChannel | undefined = (await guild.channels.get(
			data.channelId
		)) as TextChannel;

		if (!channel)
			return res
				.status(404)
				.send({ success: false, message: `Channel not found.` });
		const message: Message | undefined = (await channel.messages.get(
			data.messageId
		)) as Message;

		if (!message)
			return res
				.status(404)
				.send({ success: false, message: `Message not found.` });
		message.edit(data.messageContent);

		return res.status(200).send({ success: true, message: `Message updated.` });
	};
}
