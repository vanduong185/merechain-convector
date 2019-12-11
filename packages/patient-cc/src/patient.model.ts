import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class MedicalRecord extends ConvectorModel<MedicalRecord>{
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.merechain.medicalrecord';

  @Required()
  public content: any;

  @Required()
  @Validate(yup.string())
  public creatorID: string;

  @Required()
  @Validate(yup.string())
  public certifierID: string;

  @Required()
  @ReadOnly()
  @Validate(yup.number())
  public issuedDate: number;

  @Required()
  @ReadOnly()
  @Validate(yup.number())
  public updatedDate: number;
}

export class Patient extends ConvectorModel<Patient> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.merechain.patient';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public email: string;

  @Required()
  @Validate(yup.string())
  public password: string;

  @Required()
  @Validate(yup.number())
  public birthyear: number;

  @Required()
  @Validate(yup.string())
  public address: string;

  @Validate(yup.array(MedicalRecord.schema()))
  public medicalRecords: Array<MedicalRecord>;

  /**
   * list practitionerId has permission to see patient profile
   */
  @Validate(yup.array(yup.string()))
  public permisions: Array<string>;
}
