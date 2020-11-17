#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MyPipelineStack } from '../lib/my-pipeline-stack';

const app = new cdk.App();
new MyPipelineStack(app, 'PipelineStackInes', {
  env: {
    account: '299776909111',
    region: 'eu-central-1',
  }
});

app.synth();
