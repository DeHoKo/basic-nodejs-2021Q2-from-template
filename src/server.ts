import { PORT } from './common/config';
import app from './app';
import DB from './db';
import { createUser, getAll } from './resources/users/user.service';

const run = async () => {
  await DB();

  app.listen(PORT, async () => {
    const users = await getAll();
    if (!users.some(user => user.login === 'admin')) {
      await createUser({
        name: 'admin',
        login: 'admin',
        password: 'admin',
      });
    }
    console.log(`App is running on http://localhost:${PORT}`);
  });
};

run();
