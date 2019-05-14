import { Router } from 'express';
import { Logger, logger } from '@yamdbf/core';
import Method from '../lib/enums/Method';

import ApiConfig from '../lib/interfaces/api/ApiConfig';
import config = require('../client/api-config.json');

import * as cors from 'cors';
import * as parser from 'body-parser';
import * as compression from 'compression';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AccessControl = require('express-ip-access-control');

/**
 * @module Handlers
 * @description Middleware handler containing methods to apply Authentication, CORS, JSON body parsing, compression.  Also contains endpoint and routing.
 */
export default class Handlers {
	@logger('AedenAPI')
	private readonly logger: Logger;
	private apiConfig: ApiConfig = config;

	/**
	 * @method BodyRequestParsing
	 * @description Handler for JSON parsing a body.
	 * @param {Router} router The {Router} to apply JSON body parsing to.
	 */
	public BodyRequestParsing = (router: Router): void => {
		router.use(parser.urlencoded({ extended: true }));
		router.use(parser.json());
	};

	/**
	 * @method Compression
	 * @description Handler for compression.
	 * @param {Router} router The {Router} to apply compression to.
	 */
	public Compression = (router: Router): void => {
		router.use(compression());
	};

	/**
	 * @method Cors
	 * @description Handler for Cross-Origin Resource Sharing (CORS).
	 * @param {Router} router The {Router} to apply Cross-Origin Resource Sharing to.
	 */
	public Cors = (router: Router): void  => {
		router.use(cors({
			methods: [
				Method.DELETE,
				Method.GET,
				Method.POST,
				Method.PUT
			],
			allowedHeaders: [
				'Accept',
				'Content-Type',
				'Origin',
				'X-Requested-With'
			]})
		);
	};

	/**
	 * @method Whitelist
	 * @description Handler for whitelisting IPs.
	 * @param {Router} router The {Router} to whitelist IP addresses for.
	 */
	public Whitelist = (router: Router): void => {
		const options = {
			mode: 'allow',
			denys: [],
			allows: this.apiConfig.whitelist,
			forceConnectionAddress: false,
			log: (clientIp: string, access: string) => {
				if(!access)
					this.logger.log(`${clientIp} denied.`);
			},
			statusCode: 401,
			redirectTo: '',
			message: 'Unauthorized access...'
		}

		router.use(AccessControl(options));
	}
}
