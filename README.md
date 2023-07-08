# backend

This project was created using create-payload-app using the blog template.

## 📃 Scripts Overview

The following scripts are available in the `package.json`:

- `seed`: Generate seed data for the database
- `dev`: Starts the development server with colorized output
- `build:payload`: Build payload app for production
- `build:server`: Build server for production
- `build`: Builds the app for production
- `serve`: Runs the production server
- `generate:types`: Generate TS types

## How to Use

`yarn dev` will start up your application and reload on any changes.

## API Documentation

The Swagger API documentation UI is available at `/api-docs` and in `openapi.yaml` file generated on each server
restart.

## Seeding development data

Run `yarn seed` to seed your database with development data.

> ⚠️ Warning: This will drop your database deleting all data on your local MongoDB instance!

The script will generate 2 users:
 * Admin - email: `admin@example.com` password: `Admin1234`
 * Admin - email: `editor@example.com` password: `Editor1234`

### Docker

If you have docker and docker-compose installed, you can run `docker-compose up`

To build the docker image, run `docker build -t my-tag .`

Ensure you are passing all needed environment variables when starting up your container via `--env-file` or setting them
with your deployment.

The 3 typical env vars will be `MONGODB_URI`, `PAYLOAD_SECRET`, and `PAYLOAD_CONFIG_PATH`

`docker run --env-file .env -p 3000:3000 my-tag`

