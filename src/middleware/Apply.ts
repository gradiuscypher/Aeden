import { Router } from 'express';
import { Wrapper } from '../lib/types/Wrapper';
import Route from '../lib/interfaces/Route';

/**
 * @module Middleware
 * @description Methods to apply middleware and routing.
 */
export default class Middleware {
	/**
	 * @method Apply
	 * @description Method to apply middleware and/or authentication.
	 * @param {Wrapper[]} middleware The wrapped array of middleware or authentication to apply to the {@link AedenApiClient} instance.
	 * @param {Router} router The {Router} to apply the wrapped array of middleware  or authentication to.
	 *
	 * @example
	 * new Handler().Apply([...Handler], Router)
	 */
	public Apply = (middleware: Wrapper[], router: Router): void => {
		middleware.forEach((mw): void => {
			mw(router);
		});
	};

	/**
	 * @method Routes
	 * @description Method to apply routes.
	 * @param {Route[]} routes The array of {@link Route Routes} to apply to the {@link AedenApiClient} instance.
	 * @param {Router} router The {Router} to apply the {@link Route Routes} to.
	 *
	 * @example
	 * new Handler().Routes([...Route], Router)
	 */
	public Routes = (routes: Route[], router: Router): void => {
		routes.forEach((route): void => {
			(router as Router)[route.method](route.path, route.handler);
		});
	};
}
