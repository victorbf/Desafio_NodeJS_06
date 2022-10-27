/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Student } from "./Student";
import { client } from "./Client";
import { createStudent } from "./createStudent";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

const setupDatabase = async () => {
  await client.connect();

  await client.query(`CREATE TABLE IF NOT EXISTS ${Student.tableName} (
    id varchar(36) PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL
  );`);
}

app.listen(PORT, async () => {
	console.log(`Listening on port ${PORT}`);


	// CÓDIGO PARA ATENDER OS REQUERIMENTOS
	// R01, R02, R03, R04, R05

	await setupDatabase();

  try {
    await createStudent();
  } catch(error) {
    console.error(error);
  }
});
