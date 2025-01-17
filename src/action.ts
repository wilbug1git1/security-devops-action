import * as core from '@actions/core';
import { MsdoClient } from 'microsoft-security-devops-actions-toolkit';
import * as path from 'path';

async function run() {
    let client = new MsdoClient();

    let args: string[] = ['run'];

    let config: string = core.getInput('config');
    if (!client.isNullOrWhiteSpace(config)) {
        args.push('-c');
        args.push(config);
    }

    let policy: string = core.getInput('policy');
    if (client.isNullOrWhiteSpace(policy)) {
        policy = "GitHub";
    }

    args.push('-p');
    args.push(policy);

    let categories: string = core.getInput('categories');
    if (!client.isNullOrWhiteSpace(categories)) {
        args.push('--categories');
        args.push(categories)
    }

    let languages: string = core.getInput('languages');
    if (!client.isNullOrWhiteSpace(languages)) {
        args.push('--languages');
        args.push(languages)
    }

    args.push('--github');

    await client.run(args, 'microsoft/security-devops-action');
}

run().catch((error) => core.setFailed(error));