import { Pool } from 'pg';

const dbConnection = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: dbConnection,
});


export default pool;
