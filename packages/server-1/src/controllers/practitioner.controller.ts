
import { Router, Request, Response } from 'express';
import { PractitionerControllerBackEnd, InitServerIdentity, PatientControllerBackEnd } from '../convector';
import { Practitioner, PractitionerController } from 'merechain-cc';

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

router.post('/login', async (req: Request, res: Response) => {
  try {
    var { email , password } = req.body;

    var practitioner = await PractitionerControllerBackEnd.getByEmail(email);

    console.log(practitioner.toJSON());

    if (practitioner.password == password) {
      res.status(201).send({
        status: "ok",
        data: {
          practitioner
        }
      });
    }
    else {
      res.status(201).send({
        status: "fail",
        data: {}
      });
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).send(error);
  }
});

// router.post('/addMedicalRecord', async (req: Request, res: Response) => {
//   try {
//     var { patientId, record } = req.body;
    
//     const mere = new MedicalRecord(record);

//     await PatientControllerBackEnd.addMedicalRecord(patientId, mere);

//     res.status(201).send({
//       status: "ok",
//       data: {}
//     });
//   } catch (err) {
//     console.log(JSON.stringify(err));
//     res.status(500).send(err);
//   }
// });

// router.post('/updateMedicalRecord', async (req: Request, res: Response) => {
//   try {
//     var { patientId, record } = req.body;
    
//     const mere = new MedicalRecord(record);

//     await PatientControllerBackEnd.updateMedicalRecord(patientId, mere);

//     res.status(201).send(
//       {
//         status: "ok",
//         data: {}
//       }
//     );
//   } catch (err) {
//     console.log(JSON.stringify(err));
//     res.status(500).send(err);
//   }
// });

export const PractitionerExpressController: Router = router;
