import { Client, ListenerUtil, LogLevel } from '@yamdbf/core';
import { AedenApiClient } from '../../api/server/AedenApiClient';

import DiscordConfig from '../lib/interfaces/Config';
import config = require('./config.json');

const { once } = ListenerUtil;

/**
 * @class AedenDiscordClient
 * @description This class represents the heart of Aeden.
 * @extends Client
 */
export default class AedenDiscordClient extends Client {
	public readonly config: DiscordConfig;
	private apiServer: AedenApiClient;

	public constructor() {
		super({
			token: config.token,
			owner: config.owner,
			statusText: config.status,
			commandsDir: './commands',
			disableBase: [
				'eval',
				'eval:ts',
				'ping',
				'setlang',
				'setprefix',
				'shortcuts'
			],
			logLevel: LogLevel.DEBUG,
			readyText: 'Ready\u0007',
			ratelimit: '10/1m',
			pause: true
		});
		this.config = config;
	}

	/**
	 * @async
	 * @method _onPause
	 * @description Listener for the `pause` event.
	 * @listens pause
	 *
	 * @memberof AedenDiscordClient
	 */
	@once('pause')
	public async _onPause(): Promise<void> {
		/** Ensure Aeden's default prefix is always `.` */
		await this.setDefaultSetting('prefix', '.');

		this.emit('continue');
	}

	/**
	 * @async
	 * @method _onClientReady
	 * @description Listener for the `clientReady` event.
	 * @listens clientReady
	 *
	 * @memberof AedenDiscordClient
	 */
	@once('clientReady')
	public async _onClientReady(): Promise<void> {
		this.apiServer = new AedenApiClient().init(this);
	}

	/**
	 * @async
	 * @method _onDisconnect
	 * @description Listener for the `disconnect` event.
	 * @listens disconnect
	 *
	 * @memberof AedenDiscordClient
	 */
	@once('disconnect')
	public async _onDisconnect(): Promise<void> {
		/** cease all motor functions... */
		this.apiServer.kill();
		process.exit(100);
	}
}
