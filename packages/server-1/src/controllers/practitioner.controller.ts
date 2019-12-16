
import { Router, Request, Response } from 'express';
import { PractitionerControllerBackEnd, PatientControllerBackEnd } from '../convector';
import { Practitioner  } from 'merechain-cc';
import * as uuid from "uuid";

const router: Router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    res.send(await PractitionerControllerBackEnd.get(id));
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(err);
  }
});

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password, workplace } = req.body;

    const id = uuid();

    const practitioner = new Practitioner({ id, name, email, password, workplace });

    console.log(practitioner.toJSON());

    await PractitionerControllerBackEnd.create(practitioner);

    res.status(201).send(
      {
        status: "ok",
        data: {}
      }
    );
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(err);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    var practitioner = await PractitionerControllerBackEnd.getByEmail2(email);
    
    if (practitioner._password == password) {
      console.log("abcsd");
      res.send({
        status: "ok",
        data: {
          practitioner
        }
      });
    }
    else {
      res.send({
        status: "fail",
        data: {}
      });
    }
  } catch (error) {
    console.log("err");
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
