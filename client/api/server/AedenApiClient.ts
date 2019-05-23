import AedenDiscordClient from '../../bot/user/AedenDiscordClient';
import Api from '../endpoints';
import Handlers from '../middleware/Handlers';
import Middleware from '../middleware/Apply';

import { Logger, logger } from '@yamdbf/core';
import { Wrapper } from '../lib/types/Wrapper';

import * as express from 'express';
import * as helmet from 'helmet';

/**
 * @class AedenApiClient
 * @description This class represents an instance of the {@link AedenApiClient}.
 */
export class AedenApiClient {
	@logger('AedenAPI')
	private readonly logger: Logger;
	private static instance: AedenApiClient;
	private handlers: Handlers;
	private middleware: Middleware;
	public server: express.Express;

	public constructor() {
		this.server = express();
		this.server.use(helmet());

		this.handlers = new Handlers();
		this.middleware = new Middleware();
	}

	/**
	 * @method instance
	 * @description Method to return an instance of the {@link AedenApiClient}.
	 * @returns {AedenApiClient}
	 *
	 * @memberof AedenApiClient
	 */
	public static _instance(): AedenApiClient {
		return AedenApiClient.instance || new AedenApiClient();
	}

	/**
	 * @method init
	 * @description Method to initialize and instance of {@link AedenApiClient}.
	 * @param {AedenDiscordClient} discordClient The Discord client that the {@link AedenApiClient} interacts with.
	 *
	 * @memberof AedenApiClient
	 */
	public init(discordClient: AedenDiscordClient): AedenApiClient {
		const middleware: Wrapper[] = [
			this.handlers.Whitelist,
			this.handlers.BodyRequestParsing,
			this.handlers.Cors,
			this.handlers.Compression
		];

		this.middleware.Apply(middleware, this.server);
		this.middleware.Routes(new Api(discordClient).endpoints, this.server);

		this.server.listen(
			3000,
			(): void => {
				this.logger.info(`Server listening on port 3000`);
			}
		);

		return this;
	}

	/**
	 * @async
	 * @method _kill
	 * @description Kills the server.
	 *
	 * @memberof AedenApiClient
	 */
	public async kill(): Promise<void> {
		/** cease all motor functions... */
		process.exit(100);
	}
}
