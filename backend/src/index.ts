import { app } from './app';
import { AppDataSource } from './data-source';
import { PORT } from './settings';

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.log(err);
  });
