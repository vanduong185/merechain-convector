import * as yup from "yup";

import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import { Patient } from '../models/patient.model';
import { Practitioner } from "../models/practitioner.model";
import { Record } from "../models/record.model";
import { PatientController } from "./patient.controller";

@Controller('record')
export class RecordController extends ConvectorController<ChaincodeTx> {

  @Invokable()
  public async create(
    @Param(Record)
    record: Record
  ) {
    // Check practitioner existing
    let prac = await Practitioner.getOne(record.practitionerID);

    if (!prac || !prac.id) {
      throw new Error(`No practitioner found with id ${record.practitionerID}`);
    }

    // check patient existing
    let patient = await Patient.getOne(record.patientID);

    if (!patient || !patient.id) {
      throw new Error(`No person found with id ${record.patientID}`);
    }

    const patientCtrl = new PatientController();

    // check permission of practitioner to access patient profile
    if (!patientCtrl.checkPermission(patient, record.practitionerID)) {
      throw new Error(`Practitioner ${record.practitionerID} doesn't have permission from patient ${patient.id}`);
    }
    
    // check record existing
    let recordExisting = await Record.getOne(record.id);

    if (recordExisting && recordExisting.id) {
      throw new Error(`Medical record ${record.id} is already created`);
    }

    await record.save();
  }

  @Invokable()
  public async update(
    @Param(Record)
    record: Record
  ) {
    // Check practitioner existing
    let prac = await Practitioner.getOne(record.practitionerID);

    if (!prac || !prac.id) {
      throw new Error(`No practitioner found with id ${record.practitionerID}`);
    }

    // check patient existing
    let patient = await Patient.getOne(record.patientID);

    if (!patient || !patient.id) {
      throw new Error(`No person found with id ${record.patientID}`);
    }

    const patientCtrl = new PatientController();

    // check permission of practitioner to access patient profile
    if (!patientCtrl.checkPermission(patient, record.practitionerID)) {
      throw new Error(`Practitioner ${record.practitionerID} doesn't have permission from patient ${patient.id}`);
    }

    // check record existing
    let recordExisting = await Record.getOne(record.id);

    if (!recordExisting) {
      throw new Error(`Medical record ${record.id} is not existing`);
    }

    await recordExisting.update(
      {
        content: record.content,
        updatedDate: record.updatedDate
      }
    );
  }

  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    // check if patient exists
    let existing = await Record.getOne(id);

    if (!existing || !existing.id) {
      throw new Error(`No record found with id ${id}`);
    }

    return existing;
  }

  @Invokable()
  public async getByPatientID(
    @Param(yup.string())
    patientID: string
  ) {
    // check if patient exists
    let patient = await Patient.getOne(patientID);

    if (!patient || !patient.id) {
      throw new Error(`No person found with id ${patientID}`);
    }

    var listRecord = await Record.query(Record, {
      selector: {
        patientID: patientID
      }
    });

    return listRecord;
  }

  @Invokable()
  public async getByPatientIDAndPracID(
    @Param(yup.string())
    patientID: string,
    @Param(yup.string())
    pracID: string
  ) {
    // check if patient exists
    let patient = await Patient.getOne(patientID);

    if (!patient || !patient.id) {
      throw new Error(`No person found with id ${patientID}`);
    }

    const patientCtrl = new PatientController();

    // check permission of practitioner to access patient profile
    if (!patientCtrl.checkPermission(patient, pracID)) {
      throw new Error(`Practitioner ${pracID} doesn't have permission from patient ${patient.id}`);
    }

    var listRecord = await Record.query(Record, {
      selector: {
        patientID: patientID,
        practitionerID: pracID
      }
    });

    return listRecord;
  }
}
