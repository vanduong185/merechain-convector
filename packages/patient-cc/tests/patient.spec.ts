// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Patient, PatientController } from '../src';

describe('Patient', () => {
  let adapter: MockControllerAdapter;
  let patientCtrl: ConvectorControllerClient<PatientController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    patientCtrl = ClientFactory(PatientController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'PatientController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Patient({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await patientCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Patient>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});