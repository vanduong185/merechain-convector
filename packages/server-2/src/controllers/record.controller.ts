import { Router, Request, Response } from 'express';
import { RecordControllerBackEnd } from '../convector';
import { Record } from 'merechain-cc';
import * as uuid from "uuid";

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    var { patientID, practitionerID, name, content } = req.body;

    const id = uuid();
    const createdDate = Date.now();
    const updatedDate = Date.now();

    const record = new Record({ id, patientID, practitionerID, name, content, createdDate, updatedDate });

    await RecordControllerBackEnd.create(record);

    console.log(record.toJSON());
    
    res.send(
      {
        status: "ok",
        data: {}
      }
    );
  } catch (err) {
    console.log(JSON.stringify(err));
    res.send(
      {
        status: "fail",
        msg: JSON.stringify(err)
      }
    );
  }
});

router.get('/getByPatientID/:patientID', async (req: Request, res: Response) => {
  try {
    var { patientID } = req.params;

    const record = await RecordControllerBackEnd.getByPatientID(patientID);
    
    res.send(
      {
        status: "ok",
        data: {
          record
        }
      }
    );
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(err);
  }
});

router.get('/getByPatientIDPracID', async (req: Request, res: Response) => {
  try {
    var { patientID, practitionerID } = req.query;

    console.log(patientID, practitionerID);

    const record = await RecordControllerBackEnd.getByPatientIDAndPracID(patientID, practitionerID);
    
    res.send(
      {
        status: "ok",
        data: {
          record
        }
      }
    );
  } catch (err) {
    console.log(JSON.stringify(err));
    res.send(
      {
        status: "fail",
        msg: JSON.stringify(err)
      }
    );
  }
});

export const RecordExpressController: Router = router;
