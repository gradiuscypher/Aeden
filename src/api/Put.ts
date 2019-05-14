import { AedenDiscordClient } from '../client/AedenDiscordClient';
import { Message } from '@yamdbf/core';
import { Guild, TextChannel } from 'discord.js';
import { Handler, Request, Response } from 'express';

import MessageData from '../lib/interfaces/api/MessageData';

/**
 * @namespace put
 * @description PUT endpoints for Aeden's API server.
 *
 * @memberof API
 */
export default class PUT {
	private discordClient: AedenDiscordClient;

	public constructor(client: AedenDiscordClient) {
		this.discordClient = client;
	}

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
	 * @memberof API.put
	 */
	public updateMessage: Handler = async (req: Request, res: Response): Promise<Response> => {
		const data: MessageData = req.body;
		if (!data.guildId) return res.status(200).send({ success: false, message: `No guild ID provided.` });
		if (!data.channelId) return res.status(200).send({ success: false, message: `No channel ID provided.` });
		if (!data.messageId) return res.status(200).send({ success: false, message: `No message ID provided.` });

		const guild: Guild | undefined = this.discordClient.guilds.get(data.guildId);

		if (!guild) return res.status(200).send({ success: false, message: `Guild not found.` });
		const channel: TextChannel | undefined = await guild.channels.get(data.channelId) as TextChannel;
	
		if (!channel) return res.status(200).send({ success: false, message: `Channel not found.` });
		const message: Message | undefined = await channel.messages.get(data.messageId) as Message;

		if (!message) return res.status(200).send({ success: false, message: `Message not found.` });
		message.edit(data.messageContent);

		return res.status(200).send({ success: true, message: `Message updated.` });
	}
}