import { Router, Request, Response } from 'express';
import { PatientControllerBackEnd, InitServerIdentity } from '../convector';
import { Patient } from 'merechain-cc';

const router: Router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    var { id } = req.params;
    res.send(await PatientControllerBackEnd.get(id));
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(err);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    var { email, password } = req.body;
    
    var patient = await PatientControllerBackEnd.getByEmail(email);

    console.log(patient._password);

    if (patient._password == password) {
      res.send({
        status: "ok",
        data: {
          patient
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
    console.log(JSON.stringify(error));
    res.status(500).send(error);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { id, name, email, password, birthyear, address } = req.body;

    const patient = new Patient({ id, name, email, password, birthyear, address });

    console.log(patient.toJSON());

    await PatientControllerBackEnd.create(patient);

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

router.post('/grantPermission', async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { patientID, practitionerID } = req.body;

    await PatientControllerBackEnd.grantPermission(practitionerID, patientID);

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
})

router.post('/revokePermission', async (req: Request, res: Response) => {
  try {
    const { patientID, practitionerID } = req.body;

    await PatientControllerBackEnd.revokePermission(practitionerID, patientID);

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
})

// router.get("/medicalrecords", async (req: Request, res: Response) => {
//   try {
//     const { patientID } = req.params;

//     let medicalrecords = await PatientControllerBackEnd.getAllMedicalRecord(patientID);

//     res.status(201).send(medicalrecords);
//   } catch (err) {
//     console.log(JSON.stringify(err));
//     res.status(500).send(err);
//   }
// });

export const PatientExpressController: Router = router;
