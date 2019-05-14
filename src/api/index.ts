import { AedenDiscordClient } from '../client/AedenDiscordClient';
import { GET, POST, PUT } from './EndPoints';

import EndPoints from '../lib/enums/EndPoints';
import Method from '../lib/enums/Method';
import Route from '../lib/interfaces/Route';

/**
 * @namespace API
 * @description This class represents an instance of {@link Route Routes}, all of the API server endpoints.
 */
export default class API {
	private discordClient: AedenDiscordClient;

	private GET: GET;
	private POST: POST;
	private PUT: PUT;

	public endpoints: Route[];

	public constructor(client: AedenDiscordClient) {
		this.discordClient = client;

		this.GET = new GET(this.discordClient);
		this.POST = new POST(this.discordClient);
		this.PUT = new PUT(this.discordClient);

		this.endpoints = [{
			path: EndPoints.isAedenHere,
			method: Method.GET,
			handler: this.GET.isAedenHere
		}, {
			path: EndPoints.getEditableMessages,
			method: Method.GET,
			handler: this.GET.getEditableMessages
		}, {
			path: EndPoints.getEmojis,
			method: Method.GET,
			handler: this.GET.getEmojis
		}, {
			path: EndPoints.createMessage,
			method: Method.POST,
			handler: this.POST.createMessage
		}, {
			path: EndPoints.updateMessage,
			method: Method.PUT,
			handler: this.PUT.updateMessage
		}];
	}
}
