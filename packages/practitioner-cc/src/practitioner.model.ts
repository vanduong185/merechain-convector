import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Practitioner extends ConvectorModel<Practitioner> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.merechain.practitioner';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public email: string;

  @Required()
  @Validate(yup.string())
  public password: string;

  @Validate(yup.string())
  public org: string;

  @Required()
  @Validate(yup.string())
  public workplace: string;
}
