import { AedenDiscordClient } from '../client/AedenDiscordClient';
import { GuildStorage } from '@yamdbf/core';
import { Guild, GuildMember, GuildEmojiStore } from 'discord.js';
import { Handler, Request, Response } from 'express';

import Util from '../utils/'
import MessageData from '../lib/interfaces/api/MessageData';

/**
 * @namespace get
 * @description GET endpoints for Aeden's API server.
 *
 * @memberof API
 */
export default class GET {
	public discordClient: AedenDiscordClient;

	public constructor(client: AedenDiscordClient) {
		this.discordClient = client;
	}

	/**
	 * @method isAedenHere
	 * @description API endpoint to return True/False based on Aeden's presence within a specified Discord Guild/Server.
	 * @returns {Handler}
	 *
	 * @example Usage
	 * GET /api/guild/isAedenHere/<guildId>
	 *
	 * @example Success
	 * { success: true, presence: true }
	 * { success: true, presence: false }
	 *
	 * @example Error
	 * { success: false, message: `<error message>`, data: [] }
	 *
	 * @memberof API.get
	 */
	public isAedenHere: Handler = async (req: Request, res: Response): Promise<Response> => {
		const guild: Guild | undefined = this.discordClient.guilds.get(req.params.id);

		if (!this.discordClient.user) return res.status(200).send({ success: false, message: `Bot client user not found.` });
		if (!guild) return res.status(200).send({ success: false, message: `Guild not found.` });

		const isHere: GuildMember | undefined = (guild as Guild).members.get(this.discordClient.user.id);

		return (isHere instanceof GuildMember)
			? res.status(200).send({ success: true, presence: true })
			: res.status(200).send({ success: true, presence: false });
	}

	/**
	 * @method getEditableMessages
	 * @description API endpoint to return a list of messages that Aeden can edit for a specified guild.
	 * @returns {Handler}
	 *
	 * @example Usage
	 * GET /api/guild/getEditableMessages/<guildId>
	 *
	 * @example Success
	 * { success: true, message: `List of editable messages is in the <data> property.`, data: [] }
	 * { success: true, message: `No editable messages found.`, data: [] }
	 *
	 * @example Error
	 * { success: false, message: `<error message>`, data: [] }
	 *
	 * @memberof API.get
	 */
	public getEditableMessages: Handler = async (req: Request, res: Response): Promise<Response> => {
		const guild: Guild | undefined = await this.discordClient.guilds.get(req.params.id);
		const guildStorage: GuildStorage | undefined = await this.discordClient.storage.guilds.get(req.params.id);
		let editableMessages: MessageData[] = (guildStorage)
			? await guildStorage.get(`EDITABLE_MESSAGES`)
			: undefined;
		
		if (!guild) return res.status(200).send({ success: false, message: `Guild not found.`, data: [] });
		if (!guildStorage) return res.status(200).send({ success: false, message: `GuildStorage not found.`, data: [] });

		editableMessages = await Util.removeInvalidMessages(editableMessages, guild);

		await guildStorage.set(`EDITABLE_MESSAGES`, editableMessages);

		return (editableMessages)
			? res.status(200).send({ success: true, message: `List of editable messages is in the <data> property.`, data: editableMessages })
			: res.status(200).send({ success: true, message: `No editable messages found.`, data: [] });
	}

	/**
	 * @method getEmojis
	 * @description API endpoint to return a list of custom emoji for a specified guild.
	 * @returns {Handler}
	 *
	 * @example Usage
	 * GET /api/guild/getEmojis/<guildId>
	 *
	 * @example Success
	 * { success: true, message: `List of emoji is in the <data> property.`, data: [] }
	 * { success: true, message: `No custom emoji found.`, data: [] }
	 *
	 * @example Error
	 * { success: false, message: `<error message>` }
	 *
	 * @memberof API.get
	 */
	public getEmojis: Handler = async (req: Request, res: Response): Promise<Response> => {
		const guild: Guild | undefined = await this.discordClient.guilds.get(req.params.id);
		if (!guild) return res.status(200).send({ success: false, message: `Guild not found.` });

		const emojiList: GuildEmojiStore = guild.emojis;

		if (emojiList.size > 0)
			return res.status(200).send({ success: true, message: `List of emoji is in the <data> property.`, data: emojiList });
		
		return res.status(200).send({ success: true, message: `No custom emoji found.`, data: [] });
	}
}