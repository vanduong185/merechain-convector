import { Router, Request, Response } from 'express';
import { PatientControllerBackEnd, InitServerIdentity, PractitionerControllerBackEnd } from '../convector';
import { Patient } from 'merechain-cc';
import * as uuid from "uuid";
import { print } from 'util';

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

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password, birthyear, address } = req.body;

    const id = uuid();

    console.log(id);

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

    res.send(
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

    res.send(
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

router.get("/permitedPrac/:patientID", async (req: Request, res: Response) => {
  try {
    const { patientID } = req.params;

    const data = await PatientControllerBackEnd.get(patientID);

    var patient = JSON.parse(JSON.stringify(data));

    var listPrac = [];

    if (patient._permisions != null) {
      console.log(patient._permisions[0]);
      for (var i = 0; i < patient._permisions.length; i++) {
        console.log(patient._permisions[i]);

        try {
          var prac = await PractitionerControllerBackEnd.get(patient._permisions[i]);
          console.log(prac);

          listPrac.push(prac);
        } catch (error) {
          continue;
        }
      }
    }

    res.send(listPrac);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(err);
  }
});

export const PatientExpressController: Router = router;
