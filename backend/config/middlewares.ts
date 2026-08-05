import type { Core } from '@strapi/strapi';

const localhostOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175',
];

/** Comma-separated list, e.g. https://your-app.vercel.app,https://ayanansari.com */
function clientOrigins(env: Core.Config.Shared.ConfigParams['env']): string[] {
  const raw = env('CLIENT_URL', '') as string;
  const fromEnv = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return [...new Set([...localhostOrigins, ...fromEnv])];
}

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: clientOrigins(env),
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
