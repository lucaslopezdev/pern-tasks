import pg from "pg";
import { PG_PORT, PG_DATABASE, PG_HOST, PG_PASSWORD, PG_USER } from './config.js'

export const pool = new pg.Pool({
    port: PG_PORT,
    host: PG_HOST,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE
});

pool.on('connect', () => {
    console.log('Conectado a la base de datos');
});

pool.on('error', (err) => {
    console.error('Error de la base de datos:', err);
});