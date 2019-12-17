import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

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

  @Validate(yup.number())
  public birthyear: number;

  @Validate(yup.string())
  public address: string;

  @Validate(yup.string())
  public msp: string;

  /**
   * list practitionerId has permission to see patient profile
   */
  @Validate(yup.array(yup.string()))
  public permisions: Array<string>;
}
