#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PipelineStack } from '../lib/my-pipeline-stack';

const app = new cdk.App();
new PipelineStack(app, 'ServerlessPipelineDemo', {
  env: {
    account: '299776909111',
    region: 'eu-central-1',
  }
});

app.synth();
