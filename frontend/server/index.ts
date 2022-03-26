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

app.get('*', (req, res) => res.sendFile(path.join(cwd, 'dist/index.html')));

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});
