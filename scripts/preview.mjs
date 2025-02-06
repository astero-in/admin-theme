import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from './utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function preview() {
  try {
    const app = express();
    const port = process.env.PORT || 3000;

    // Serve static files from dist root for assets
    app.use(express.static(path.join(__dirname, '../dist')));

    // Add this before the server start
// app.use((req, res) => {
//   res.status(404).send('Page not found');
// });


    // Handle root path - redirect to pages/index.html
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/pages/index.html'));
    });

    // // Handle other pages
    // app.get('/:page', (req, res) => {
    //   res.sendFile(path.join(__dirname, `../dist/pages/${req.params.page}.html`));
    // });

    // Start server
    app.listen(port, () => {
      log('====== Preview server started ======', 'info');
      log(`🚀 Preview running at http://localhost:${port}`, 'info');
      log('====== Press Ctrl+C to stop ======', 'info');
    });

  } catch (error) {
    log('❌ Preview server failed to start!', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// Auto-start if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  preview();
}
