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
    const tokens='03bcab55e165cc450ddf4893d252b5a900cff622';
    const pipeline = new CdkPipeline(this, 'Pipeline', {
      pipelineName: 'ServerlessPipelineDemo',
      cloudAssemblyArtifact,

      // Checkout source from GitHub
      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: 'Source',
        owner: 'inesmahj',
        repo: 'my-pipeline',
        
        oauthToken: cdk.SecretValue.secretsManager('github-new-tokens'),
        output: sourceArtifact,
      }),
      // For synthesize we use the default NPM synth
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        // We override the default install command to prepare our lambda too
        installCommand: 'npm ci && npm ci --prefix lambda',
        // As we may need Docker we create a privileged container
        environment: {
          privileged: true,
        },
      }),
    });
  }
}
