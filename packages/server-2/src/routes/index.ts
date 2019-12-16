import * as express from "express";
import { Response, Request , Error} from "express";
import { ParticipantExpressController, PractitionerExpressController, PatientExpressController, RecordExpressController } from '../controllers';
import * as ejwt from "express-jwt";
import { SECRET } from "../env";

const app: express.Application = express();

app.get("/", async (req: Request, res: Response) => {
  res.send({
    msg: "Merechain !"
  })
})

// app.use(
//   ejwt({ secret: SECRET }).unless({
//     path: [
//       '/',
//       '/patient/signup',
//       '/patient/login',
//       '/practitioner/login',
//     ],
//   }),
// );

// app.use(async (err: Error, req: Request, res: Response) => {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401).send('Missing authentication credentials.');
//   }
// });

app.use('/participant', ParticipantExpressController);
app.use('/practitioner', PractitionerExpressController);
app.use('/patient', PatientExpressController);
app.use('/record', RecordExpressController);

export const Routes: express.Application = app;
