/**
 * @description Interface for {@link Route}.
 * @interface Route
 */
/**
 * @name Route#path
 * @type {string}
 */
/**
 * @name Route#method
 * @type {string}
 */
/**
 * @name Route#handler
 * @type {Handler | Handler[]}
 */

import { Handler } from 'express';

export default interface Route {
	path: string;
	method: string;
	handler: Handler | Handler[];
}
