import { Stack, StackProps, Construct, SecretValue } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import * as cdk from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';



export class PipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StageProps) {
    super(scope, id, props);

    // Create CodePipeline artifact to hold source code from repo
    const sourceArtifact = new codepipeline.Artifact();
    // Create CodePipeline artifact to hold synthesized cloud assembly
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    // Create the CDK pipeline
    const pipeline = new CdkPipeline(this, 'Pipeline', {
      pipelineName: 'ServerlessPipelineDemo',
      cloudAssemblyArtifact,


    });
  }
}
