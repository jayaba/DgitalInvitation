import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// A relative base ('./') makes the built site work from any sub-path,
// so it runs on GitHub Pages (https://<user>.github.io/<repo>/) whatever
// the repository is called, with nothing to edit here.
export default defineConfig({
  base: './',
  plugins: [react()],
});
