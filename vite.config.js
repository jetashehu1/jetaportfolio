import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/** Serves /api/instagram during `vite dev` using the same handler as production. */
function instagramDevApi(env) {
  return {
    name: 'instagram-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/instagram', async (req, res) => {
        const { default: handler } = await import('./api/instagram.js');
        await handler(req, res, env);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), instagramDevApi(env)],
  };
});
