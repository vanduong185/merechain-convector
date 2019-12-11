
import { Router, Request, Response } from 'express';
import { PractitionerControllerBackEnd, InitServerIdentity } from '../convector';
import { Practitioner, PractitionerController } from 'practitioner-cc';

const router: Router = Router();

// Check if the server identity has been enrolled successfully
InitServerIdentity();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    res.send(await PractitionerControllerBackEnd.get(id));
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(err);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { id, name, email, password, workplace } = req.body;

    const practitioner = new Practitioner({ id, name, email, password, workplace });

    console.log(practitioner.toJSON());

    await PractitionerControllerBackEnd.create(practitioner);

    res.status(201).send();
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(err);
  }
});

export const PractitionerExpressController: Router = router;
