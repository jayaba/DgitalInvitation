import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getCalendarFile } from './src/utils/date.js';

/**
 * Writes the "add to calendar" file (wedding.ics) from the wedding details,
 * so it is a real file on the site. Phones and Outlook open a real file
 * reliably, which they do not for one embedded in a link.
 */
function calendarFile() {
  const fileName = 'wedding.ics';
  return {
    name: 'wedding-calendar-file',
    // while developing: answer requests for the file directly
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const ics = getCalendarFile();
        if (!ics || !request.url?.split('?')[0].endsWith(`/${fileName}`)) return next();
        response.setHeader('Content-Type', 'text/calendar; charset=utf-8');
        response.end(ics);
      });
    },
    // when building: add it to the published site
    generateBundle() {
      const ics = getCalendarFile();
      if (ics) this.emitFile({ type: 'asset', fileName, source: ics });
    },
  };
}

// A relative base ('./') makes the built site work from any sub-path,
// so it runs on GitHub Pages (https://<user>.github.io/<repo>/) whatever
// the repository is called, with nothing to edit here.
export default defineConfig({
  base: './',
  plugins: [react(), calendarFile()],
});
