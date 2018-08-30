import { Pool } from 'pg';

const dbConnection = process.env.DATABASE_URL || 'localhost://postgres:2geda4my99@localhost:5432/askUs';

// const dbConnection = {
//   Host: 'ec2-23-21-236-249.compute-1.amazonaws.com',
//   User: 'ehxudtpcxeogvl',
//   SSL: true,
//   Database: 'd3s5uivsbggcf5',
//   Password: '3861600c6074f952ce4de7e01b603c22de734ccebd6754703bd67c854fda86f0',
// };

const pool = new Pool({
  connectionString: dbConnection,
});


export default pool;
