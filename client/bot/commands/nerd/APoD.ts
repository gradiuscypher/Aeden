import { Command, Message } from '@yamdbf/core';
import { MessageEmbed } from 'discord.js';

import Util from '../../lib/Util';

export default class APoD extends Command {
	public constructor() {
		super({
			name: 'apod',
			desc: "NASA's Astronomy Picture of the Day",
			usage: '<prefix>apod <Argument>?',
			ratelimit: '1/3m',
			info:
				'This command will return the latest APoD or a random one from the archive.\n\n' +
				'Argument information below...\n\n' +
				'r       : Random APoD\n\n' +
				'*Running the command without an argument returns returns the most recent APoD.',
			group: 'nerd',
			guildOnly: false
		});
	}

	public async action(message: Message, args: string[]): Promise<void> {
		const isRandom: boolean = args[0] === 'r';

		await Util.fetchApod(isRandom)
			.then(
				(embed: MessageEmbed): void => {
					message.channel.send(embed);
				}
			)
			.catch(
				(): void => {
					message.channel.send(`There was an error retrieving the APoD.`);
				}
			);
	}
}
