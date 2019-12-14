import * as yup from "yup";

import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import { Practitioner } from '../models/practitioner.model';
import { Participant } from "../models/participant.model";

@Controller('practitioner')
export class PractitionerController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Practitioner)
    practitioner: Practitioner
  ) {
    let exists = await Practitioner.getOne(practitioner.id);

    if (exists && exists.id) {
      throw new Error('There is a practitioner registered with that Id already');
    }

    practitioner.msp = this.tx.identity.getMSPID();
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

    let admin = await this.findAdminOrg();

    if (!admin || !admin.identities) {
      throw new Error('No admin identity has been registered yet');
    }
    
    const adminActiveIdentity = admin.identities.filter(identity => identity.status === true)[0];

    if (this.sender !== adminActiveIdentity.fingerprint) {
      throw new Error(`admin not active`);
    }

    if (admin.msp != existing.msp) {
      throw new Error(`Admin ${admin.msp} can not get practitioner of ${existing.msp}`);
    }

    return existing;
  }

  @Invokable()
  public async getByEmail(
    @Param(yup.string())
    email: string
  ) {
    let query = await Practitioner.query(Practitioner, {
      selector: {
        "type": "io.worldsibu.merechain.practitioner",
        email: {
          "$eq": email
        }
      }
    });

    const practitioner = query[0];

    if (!practitioner || !practitioner.id) {
      throw new Error(`No practitioner exists with that email ${email}`);
    }

    let admin = await this.findAdminOrg();

    const adminActiveIdentity = admin.identities.filter(identity => identity.status === true)[0];

    if (this.sender !== adminActiveIdentity.fingerprint) {
      throw new Error(`admin not active`);
    }

    if (admin.msp != practitioner.org) {
      throw new Error(`Admin ${admin.msp} can not get practitioner of ${practitioner.org}`);
    }

    return practitioner;
  }

  @Invokable()
  public async delete(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Practitioner.getOne(id);

    if (!existing || !existing.id) {
      throw new Error(`No practitioner exists with that ID ${id}`);
    }

    let admin = await this.findAdminOrg();

    const adminActiveIdentity = admin.identities.filter(identity => identity.status === true)[0];

    if (this.sender !== adminActiveIdentity.fingerprint) {
      throw new Error(`admin not active`);
    }

    if (admin.msp != existing.msp) {
      throw new Error(`Admin ${admin.msp} can not delete practitioner of ${existing.msp}`);
    }

    await existing.delete();
  }

  @Invokable()
  public async update(
    @Param(Practitioner)
    practitioner: Practitioner
  ) {
    var exists = await Practitioner.getOne(practitioner.id);

    if (!!exists && exists.id) {
      throw new Error('There is a patient registered with that Id already');
    }
    
    await exists.update(practitioner.toJSON());
  }

  public async findAdminOrg() {
    let msp = this.tx.identity.getMSPID();

    console.log(msp);

    let query = await Participant.query(Participant, {
      selector: {
        "type": "io.worldsibu.merechain.participant",
        "msp": msp,
        "role": "admin"
      }
    });

    console.log(query[0]);

    return query[0];
  }
}
