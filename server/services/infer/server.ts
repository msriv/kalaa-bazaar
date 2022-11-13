/* 
  Server Entry Point
*/
import { Request, Response } from '../../support/import.types';
import { express, dotenv, morgan } from '../../support/import.modules';

dotenv.config();
const app = express();

app.use(morgan('dev'));

app.get('/alive', (req: Request, res: Response) => {
  res.status(200).send({
    message: '[Infer] Alive',
  });
});

app.listen(5000, () => {
  console.log(
    '[server]: Server is running at https://localhost:5000 for infer service'
  );
});
