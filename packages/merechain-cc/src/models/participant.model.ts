import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';

export class x509Identities extends ConvectorModel<x509Identities>{
  @ReadOnly()
  public readonly type = 'io.worldsibu.merechain.x509identity';

  @Validate(yup.boolean())
  @Required()
  status: boolean;
  @Validate(yup.string())
  @Required()
  fingerprint: string;
}


export class Participant extends ConvectorModel<Participant> {
  @ReadOnly()
  public readonly type = 'io.worldsibu.merechain.participant';

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public name: string;

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public role: string;

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public msp: string;

  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;
}
