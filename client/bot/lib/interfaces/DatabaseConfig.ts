/**
 * @ignore
 * @interface DatabaseConfig
 * @name Config:Database
 * @description Interface for {@link Config:Database} file.
 */
/**
 * @name Config:Database#username
 * @description Username for postgres database server.
 * @type {string}
 */
/**
 * @name Config:Database#password
 * @description Password for postgres database server.
 * @type {string}
 */
/**
 * @name Config:Database#server
 * @description Postgres server url.
 * @type {string}
 */
/**
 * @name Config:Database#port
 * @description Postgres server port.
 * @type {string}
 */
/**
 * @name Config:Database#database
 * @description Postgres database to connect to.
 * @type {string}
 */

export default interface DatabaseConfig {
	username: string;
	password: string;
	server: string;
	port: string;
	database: string;
}
