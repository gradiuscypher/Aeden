import AedenDiscordClient from '../../bot/user/AedenDiscordClient';
import EndPoints from '../lib/enums/EndPoints';
import Method from '../lib/enums/Method';
import Route from '../lib/interfaces/Route';

import { GuildEndPoints, MessageEndPoints } from './EndPoints';

/**
 * @namespace API
 * @description This class represents an instance of {@link Route Routes}, all of the API server endpoints.
 */
export default class API {
	private discordClient: AedenDiscordClient;

	private guild: GuildEndPoints;
	private message: MessageEndPoints;

	public endpoints: Route[];

	public constructor(client: AedenDiscordClient) {
		this.discordClient = client;

		this.guild = new GuildEndPoints(this.discordClient);
		this.message = new MessageEndPoints(this.discordClient);
		this.endpoints = new Array(6);

		this.endpoints.push({
			path: EndPoints.isAedenHere,
			method: Method.GET,
			handler: this.guild.isAedenHere
		});
		this.endpoints.push({
			path: EndPoints.getEditableMessages,
			method: Method.GET,
			handler: this.guild.getEditableMessages
		});
		this.endpoints.push({
			path: EndPoints.getEmojis,
			method: Method.GET,
			handler: this.guild.getEmojis
		});
		this.endpoints.push({
			path: EndPoints.createMessage,
			method: Method.POST,
			handler: this.message.createMessage
		});
		this.endpoints.push({
			path: EndPoints.updateMessage,
			method: Method.PUT,
			handler: this.message.updateMessage
		});
		this.endpoints.push({
			path: EndPoints.deleteMessage,
			method: Method.DELETE,
			handler: this.message.deleteMessage
		});
	}
}
