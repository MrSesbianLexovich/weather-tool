import dotenv from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const filename = fileURLToPath(import.meta.url);

export const dirName = dirname(filename);

dotenv.config({ quiet: true, path: resolve(dirName, '../../.env') });

export const TIMEOUT = parseInt(process.env.TIMEOUT) || 5000;
export const REPORTS_DIR = process.env.REPORTS_DIR || 'reports';
export const BASE_URL_GEOCODING = process.env.BASE_URL_GEOCODING;
export const BASE_URL_FORECAST = process.env.BASE_URL_FORECAST;
