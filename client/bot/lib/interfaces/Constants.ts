/**
 * @description Interface for {@link Constants} used throughout the bot.
 * @interface Constants
 */
/**
 * @description RSS feed for XCKD ({@link https://xkcd.com/info.0.json https://xkcd.com/info.0.json}).
 * @name Constants#rssFeedXkcd
 * @type {string}
 */
/**
 * @description URL for XKCD ({@link https://xkcd.com https://xkcd.com}).
 * @name Constants#urlXkcd
 * @type {string}
 */
/**
 * @description URL for APoD ({@link https://apod.nasa.gov/apod/astropix.html https://apod.nasa.gov/apod/astropix.html}).
 * @name Constants#urlApod
 * @type {string}
 */
/**
 * @description Base URL for APoD Images ({@link https://apod.nasa.gov/apod/ https://apod.nasa.gov/apod/}).
 * @name Constants#urlApodImgBase
 * @type {string}
 */
/**
 * @description URL for random APoD ({@link https://apod.nasa.gov/apod/ap https://apod.nasa.gov/apod/ap}).
 * @name Constants#urlApodRandom
 * @type {string}
 */

export default interface Constants {
	// bot info
	embedColorBase: string;

	// rss feeds
	rssFeedXkcd: string;

	// urls
	urlXkcd: string;
	urlApod: string;
	urlApodImgBase: string;
	urlApodRandom: string;
}
