import * as yup from "yup";

import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import { Practitioner } from './practitioner.model';
import { Participant } from "participant-cc";

@Controller('practitioner')
export class PractitionerController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Practitioner)
    practitioner: Practitioner
  ) {
    let exists = await Practitioner.getOne(practitioner.id);

    if (!!exists && exists.id) {
      throw new Error('There is a practitioner registered with that Id already');
    }

    let admin = await Participant.getOne('admin');

    if (!admin || !admin.identities) {
      throw new Error('No admin identity has been registered yet');
    }

    const adminActiveIdentity = admin.identities.filter(identity => identity.status === true)[0];

    if (this.sender !== adminActiveIdentity.fingerprint) {
      throw new Error(`Just the admin - ID=admin - can create people - requesting organization was ${this.sender}`);
    }

    await practitioner.save();
  }

  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Practitioner.getOne(id);
    if (!existing || !existing.id) {
      throw new Error(`No practitioner exists with that ID ${id}`);
    }
    return existing;
  }
}