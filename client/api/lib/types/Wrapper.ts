/**
 * @ignore
 * @typedef {Wrapper} Wrapper
 * @description A wrapper for {@link Route Routes}.
 */

import { Router } from 'express';

export type Wrapper = (router: Router) => void;
