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

@Controller('patient')
export class PatientController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Patient.getOne(id);

    if (!existing || !existing.id) {
      throw new Error(`No patient exists with that ID ${id}`);
    }

    return existing;
  }

  @Invokable()
  public async getByEmail(
    @Param(yup.string())
    email: string
  ) {
    var query = await Patient.query(Patient, {
      selector: {
        "type": "io.worldsibu.merechain.patient",
        email: {
          "$eq": email
        }
      }
    });

    const patient = query[0];

    if (!patient || !patient.id) {
      throw new Error(`No patient exists with that email ${email}`);
    }

    return patient;
  }

  @Invokable()
  public async create(
    @Param(Patient)
    patient: Patient
  ) {
    var exists = await Patient.getOne(patient.id);

    if (exists && exists.id) {
      throw new Error('There is a patient registered with that Id already');
    }

    patient.msp = this.tx.identity.getMSPID();
    
    await patient.save();
  }

  @Invokable()
  public async update(
    @Param(Patient)
    patient: Patient
  ) {
    var exists = await Patient.getOne(patient.id);

    if (!!exists && exists.id) {
      throw new Error('There is a patient registered with that Id already');
    }
    
    await exists.update(patient.toJSON());
  }

  /**
   * Patient grants the permission for practitioner
   * @param practitionerID 
   * @param patientID 
   */
  @Invokable()
  public async grantPermission(
    @Param(yup.string())
    practitionerID: string,
    @Param(yup.string())
    patientID: string
  ) {
    let prac = await Practitioner.getOne(practitionerID);

    if (!prac || !prac.id) {
      throw new Error(`No practitioner found with id ${practitionerID}`);
    }

    let patient = await Patient.getOne(patientID);

    if (!patient || !patient.id) {
      throw new Error(`No patient found with id ${patientID}`);
    }

    if (!patient.permisions) {
      patient.permisions = [practitionerID];
    } else {
      if (patient.permisions.indexOf(practitionerID) < 0) patient.permisions.push(practitionerID);
      else {
        throw new Error(`Practitioner ${practitionerID} already has had permission from patient ${patientID}`);
      }
    }

    await patient.save();
  }

  /**
   * patient revokes the permission from practitioner
   * @param practitionerID 
   * @param patientID 
   */
  @Invokable()
  public async revokePermission(
    @Param(yup.string())
    practitionerID: string,
    @Param(yup.string())
    patientID: string
  ) {
    let prac = await Practitioner.getOne(practitionerID);

    if (!prac || !prac.id) {
      throw new Error(`No practitioner found with id ${practitionerID}`);
    }

    let patient = await Patient.getOne(patientID);

    if (!patient || !patient.id) {
      throw new Error(`No patient found with id ${patientID}`);
    }

    if (!patient.permisions) {
      throw new Error(`Patient ${patientID} has empty permission`);
    }

    var index = patient.permisions.indexOf(practitionerID);
    if (index >= 0) {
      patient.permisions.splice(index, 1);
    } else {
      throw new Error(`Practitioner ${practitionerID} has not had permission from patient ${patientID} yet`);
    }

    await patient.save();
  }

  /**
   * Check permission of practitioner to see patient profile
   * @param patient 
   * @param practitionerID 
   */
  public checkPermission(
    @Param(Patient.schema())
    patient: Patient,
    @Param(yup.string)
    practitionerID: string
  ) {
    var permissions = patient.permisions;

    if (!permissions) return false;

    return (permissions.indexOf(practitionerID) >= 0);
  }
}
