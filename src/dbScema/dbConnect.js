import { Pool } from 'pg';

const dbConnection = process.env.DB_CONNECTION_URL || 'localhost://postgres:2geda4my99@localhost:5432/askUs';

const pool = new Pool({
  connectionString: dbConnection,
});


export default pool;
