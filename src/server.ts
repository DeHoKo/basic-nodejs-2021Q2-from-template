import { PORT } from './common/config';
import app from './app';
import DB from './db';

const run = async() => {
  await DB();

  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
};

run();
