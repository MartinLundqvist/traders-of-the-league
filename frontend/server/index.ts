import express from 'express';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 3000;
const cwd = process.cwd();
app.use(
  '/assets',
  express.static(path.join(cwd, 'dist/assets/'), {
    extensions: ['.js', '.css'],
  })
);

// VM health check purposes only
app.get('/healthz', (req, res) => {
  res.status(200).send({ message: 'OK' });
});

app.get('*', (req, res) => res.sendFile(path.join(cwd, 'dist/index.html')));

const server = app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});

// Manage VM operations
process.on('SIGINT', () => {
  console.log('SIGINT received, closing down server.');
  server.close(() => {
    console.log('Server closed');
  });
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing down server.');
  server.close(() => {
    console.log('Server closed');
  });
  process.exit(0);
});
