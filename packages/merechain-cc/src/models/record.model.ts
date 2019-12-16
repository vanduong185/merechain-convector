import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Record extends ConvectorModel<Record>{
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.merechain.record';

  /**
   * the owner of record: patient
   */
  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public patientID: string;

  /**
   * the creator of record: practitioner
   */
  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public practitionerID: string;

  @Required()
  @Validate(yup.string())
<<<<<<< HEAD
  public name: string;

  @Required()
  @Validate(yup.string())
=======
>>>>>>> 359a517fa3c5fa992439c632df7ab0bac78af293
  public content: string;

  @ReadOnly()
  @Required()
  @Validate(yup.number())
  public createdDate: number;

  @Required()
  @Validate(yup.number())
  public updatedDate: number;
}
