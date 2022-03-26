import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Ok' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
