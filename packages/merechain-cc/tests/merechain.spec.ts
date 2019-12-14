// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Merechain, MerechainController } from '../src';

describe('Merechain', () => {
  let adapter: MockControllerAdapter;
  let merechainCtrl: ConvectorControllerClient<MerechainController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    merechainCtrl = ClientFactory(MerechainController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'MerechainController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Merechain({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await merechainCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Merechain>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});