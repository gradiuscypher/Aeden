/**
 * @ignore
 * @interface ApiConfig
 * @name Config:API
 * @description Interface for {@link Config:API} file.
 */
/**
 * @name Config:API#whitelist
 * @description Array of allowed IPs.
 * @type {string[]}
 */

export default interface ApiConfig {
	whitelist: string[];
};
