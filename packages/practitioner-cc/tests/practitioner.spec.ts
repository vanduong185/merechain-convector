// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Practitioner, PractitionerController } from '../src';

describe('Practitioner', () => {
  let adapter: MockControllerAdapter;
  let practitionerCtrl: ConvectorControllerClient<PractitionerController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    practitionerCtrl = ClientFactory(PractitionerController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'PractitionerController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Practitioner({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await practitionerCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Practitioner>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});