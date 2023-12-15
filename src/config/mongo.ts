import dotenv from "dotenv";
dotenv.config();


const username = process.env.ATALS_USERNAME;
const password = process.env.ATALS_PASSWORD;
const atals_connection = process.env.ATALS_CONNECTION;
const atals_db = process.env.ATALS_DB;

export const atlas_uri = `mongodb+srv://${username}:${password}@${atals_connection}/${atals_db}`;