import { neon } from "@neondatabase/serverless-client";

import "dotenv/config";

// CREATE sql connection using DB URL from .env file   
export const sql = neon(process.env.DATABASE_URL);