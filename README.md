# Order Handling Jobs with bullmq engine

Initial project structure for an advanced BullMQ and Redis e-commerce order processing engine.

## Purpose

This project will provide a scalable foundation for asynchronous e-commerce order processing with BullMQ, Redis, MongoDB, and Express.

## Tech Stack

- Node.js
- Express
- BullMQ
- Redis 7
- MongoDB 7 with Mongoose
- CommonJS JavaScript

## Folder Structure

- `src/app.js` and `src/server.js`: Express application and server startup
- `src/config`: Environment, Redis, and database configuration placeholders
- `src/constants`: Shared queue constants
- `src/queues`: Queue definitions
- `src/producers`: Job producer modules
- `src/flows`: Job flow definitions
- `src/workers`: Worker modules
- `src/events`: Event modules
- `src/models`: Data models
- `src/controllers`: Request controllers
- `src/routes`: HTTP routes
- `src/services`: Domain service modules
- `src/utils`: Shared utilities

## Current Status

Initial project structure. Business logic and BullMQ features are not implemented yet.

## Setup

Install dependencies:

```bash
npm install
```

Start Redis and MongoDB with Docker Compose:

```bash
docker compose up -d
```

Start the API in development mode:

```bash
npm run dev
```

Start the API normally:

```bash
npm start
```

Start workers:

```bash
npm run worker
```
