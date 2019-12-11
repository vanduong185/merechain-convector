import * as yup from "yup";

import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import { Patient, MedicalRecord } from './patient.model';
import { Participant } from "participant-cc";
import { Practitioner } from "practitioner-cc";

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
  public async create(
    @Param(Patient)
    patient: Patient
  ) {
    console.log("hello");
    
    let exists = await Patient.getOne(patient.id);

    if (!!exists && exists.id) {
      throw new Error('There is a patient registered with that Id already');
    }

    let admin = await Participant.getOne('admin');

    if (!admin || !admin.identities) {
      throw new Error('No admin identity has been registered yet');
    }

    const adminActiveIdentity = admin.identities.filter(identity => identity.status === true)[0];

    if (this.sender !== adminActiveIdentity.fingerprint) {
      throw new Error(`Just the admin - ID=admin - can create people - requesting organization was ${this.sender}`);
    }

    await patient.save();
  }

  @Invokable()
  public async addMedicalRecord (
    @Param(yup.string())
    patientID: string,
    @Param(MedicalRecord.schema())
    medicalRecord: MedicalRecord
  ) {
    // Check if the "stated" participant as certifier of the attribute is actually the one making the request
    let participant = await Participant.getOne(medicalRecord.certifierID);
    
    if (!participant || !participant.identities) {
      throw new Error(`No participant found with id ${medicalRecord.certifierID}`);
    }
    
    // Check if the "stated" practitioner as creator of the medical record is actually the one making the request
    let prac = await Practitioner.getOne(medicalRecord.creatorID);

    if (!prac || !prac.id) {
      throw new Error(`No practitioner found with id ${medicalRecord.creatorID}`);
    }
    
    // check participant identity, certificate
    const participantActiveIdentity = participant.identities.filter(
      identity => identity.status === true)[0];

    if (this.sender !== participantActiveIdentity.fingerprint) {
      throw new Error(`Requester identity cannot sign with the current certificate ${this.sender}. This means that the user requesting the tx and the user set in the param certifierId do not match`);
    }

    // check if patient exists
    let patient = await Patient.getOne(patientID);

    if (!patient || !patient.id) {
      throw new Error(`No person found with id ${patientID}`);
    }
    
    // check permission of practitioner from patient
    if (!this.checkPermission(patient, prac.id)) {
      throw new Error(`Practitioner ${prac.id} doesnt have permission from patient ${patient.id}`);
    }

    if (!patient.medicalRecords) {
      patient.medicalRecords = [];
    }
    
    // check if patient has medical record already created
    let exists = patient.medicalRecords.find(med => med.id === medicalRecord.id);

    if (exists) {
      throw new Error(`Medical record ${medicalRecord.id} is already created`);
    } else {
      patient.medicalRecords.push(medicalRecord)
    }

    await patient.save();
  }

  /**
   * Patient grants the permission for practitioner
   * @param practitionerID 
   * @param patientID 
   */
  @Invokable()
  public async grantPermission (
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
      if ( patient.permisions.indexOf(practitionerID) < 0) patient.permisions.push(practitionerID);
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
  public async revokePermission (
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

    patient.save();
  }

  /**
   * Check permission of practitioner to see patient profile
   * @param patient 
   * @param practitionerID 
   */
  public checkPermission (
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
