/* 
  Server Entry Point
*/

import { Request, Response } from '../../support/import.types';
import { express, dotenv, morgan } from '../../support/import.modules';

dotenv.config();
const app = express();

app.use(morgan('combined'));

app.get('/alive', (req: Request, res: Response) => {
  res.status(200).send({
    message: '[DB] Alive',
  });
});

app.listen(8080, () => {
  console.log(
    '[server]: Server is running at https://localhost:8080 for db service'
  );
});
