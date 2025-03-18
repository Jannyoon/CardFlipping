import * as msw from "msw";
const {setupWorker} = msw;
//import { setupWorker } from 'msw';

import { handlers } from './handler';
 
export const worker = setupWorker(...handlers);