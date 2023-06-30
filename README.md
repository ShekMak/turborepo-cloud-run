# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Cloudbuild Code

You can find here bellow the `cloudbuild.yaml` used during the turorial, You have to replace `GITHUB_USERNAME` by your username.

```
steps:
  - name: gcr.io/cloud-builders/docker
    args:
      - build
      - '-t'
      - >-
        gcr.io/$PROJECT_ID/github.com/GITUB_USERNAME/turborepo-cloud-run-docs-prod:$COMMIT_SHA
      - '-f'
      - apps/docs/Dockerfile
      - .
    id: Build
  - name: gcr.io/cloud-builders/docker
    args:
      - push
      - >-
        gcr.io/$PROJECT_ID/github.com/GITUB_USERNAME/turborepo-cloud-run-docs-prod:$COMMIT_SHA
    id: Push
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk:slim'
    args:
      - run
      - services
      - update
      - $_SERVICE_NAME
      - '--platform=managed'
      - >-
        --image=gcr.io/$PROJECT_ID/github.com/GITUB_USERNAME/turborepo-cloud-run-docs-prod:$COMMIT_SHA
      - >-
        --labels=managed-by=gcp-cloud-build-deploy-cloud-run,commit-sha=$COMMIT_SHA,gcb-build-id=$BUILD_ID,gcb-trigger-id=$_TRIGGER_ID
      - '--region=$_DEPLOY_REGION'
      - '--quiet'
    id: Deploy
    entrypoint: gcloud
images:
  - >-
    gcr.io/$PROJECT_ID/github.com/GITUB_USERNAME/turborepo-cloud-run-docs-prod:$COMMIT_SHA
options:
  substitutionOption: ALLOW_LOOSE
substitutions:
  _PLATFORM: managed
  _SERVICE_NAME: docs-prod
  _DEPLOY_REGION: us-central1
  _AR_HOSTNAME: us-central1-docker.pkg.dev
```
