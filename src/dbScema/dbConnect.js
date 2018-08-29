import { Pool } from 'pg';

// const dbConnection = process.env.DB_CONNECTION_URL || 'localhost://postgres:2geda4my99@localhost:5432/askUs';
const dbConnection = 'postgres://ehxudtpcxeogvl:3861600c6074f952ce4de7e01b603c22de734ccebd6754703bd67c854fda86f0@ec2-23-21-236-249.compute-1.amazonaws.com:5432/d3s5uivsbggcf5';


const pool = new Pool({
  connectionString: dbConnection,
});


export default pool;
