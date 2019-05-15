import { AedenDiscordClient } from '../client/AedenDiscordClient';
import { GuildEndPoints, MessageEndPoints } from './EndPoints';

import EndPoints from '../lib/enums/EndPoints';
import Method from '../lib/enums/Method';
import Route from '../lib/interfaces/Route';

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

		this.endpoints = [{
			path: EndPoints.isAedenHere,
			method: Method.GET,
			handler: this.guild.isAedenHere
		}, {
			path: EndPoints.getEditableMessages,
			method: Method.GET,
			handler: this.guild.getEditableMessages
		}, {
			path: EndPoints.getEmojis,
			method: Method.GET,
			handler: this.guild.getEmojis
		}, {
			path: EndPoints.createMessage,
			method: Method.POST,
			handler: this.message.createMessage
		}, {
			path: EndPoints.updateMessage,
			method: Method.PUT,
			handler: this.message.updateMessage
		}, {
			path: EndPoints.deleteMessage,
			method: Method.DELETE,
			handler: this.message.deleteMessage
		}];
	}
}
