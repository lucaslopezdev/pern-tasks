import pg from "pg";

export const pool = new pg.Pool({
    port: 5432,
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'tasksdb'
});

pool.on('connect', () => {
    console.log('Conectado a la base de datos');
});

pool.on('error', (err) => {
    console.error('Error de la base de datos:', err);
});