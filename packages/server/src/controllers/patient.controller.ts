import { Router, Request, Response } from 'express';
import { PatientControllerBackEnd, InitServerIdentity } from '../convector';
import { Patient } from 'patient-cc';

const router: Router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    res.send(await PatientControllerBackEnd.get(id));
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(err);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { id, name, email, password, birthyear, address } = req.body;

    const patient = new Patient({ id, name, email, password, birthyear, address });

    console.log(patient.toJSON());

    await PatientControllerBackEnd.create(patient);

    res.status(201).send();
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(err);
  }
});

export const PatientExpressController: Router = router;
