import { Pool } from 'pg';

import config from '../configurations';
import { DbTenancy, ErrorMessage } from '../constants';

const pool = new Pool(config.aws.rds);

export async function createTable(name: string, columns: { [key: string]: unknown }) {
  const details = Object.keys(columns).reduce((prev, curr) => {
    return prev ? `${prev}, "${curr}" ${columns[curr]}` : `"${curr}" ${columns[curr]}`;
  }, '');
  const query = `CREATE TABLE IF NOT EXISTS ${name} (${details});`;
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    client.release();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteTable(name: string) {
  const query = `DROP TABLE ${name};`;
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    client.release();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteRecords(tableName: string, constraints?: string, values?: any[]) {
  const query = constraints
    ? `DELETE FROM ${tableName} WHERE ${constraints};`
    : `DELETE FROM ${tableName};`;
  try {
    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function insertRecord(tableName: string, columns: { [key: string]: unknown }) {
  const keys = Object.keys(columns).join(', ');
  const values = Object.values(columns).join(', ');
  if (!keys) {
    throw new Error(ErrorMessage.MALFORM_INSERT_QUERY);
  }
  const query = `INSERT INTO ${tableName} (${keys}) VALUES (${values});`;
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    client.release();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function retrieveRecords(tableName: string, constraints?: string, values?: any[]) {
  const query = constraints
    ? `SELECT * FROM ${tableName} WHERE ${constraints};`
    : `SELECT * FROM ${tableName};`;
  try {
    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function setTenancy(name: DbTenancy) {
  const query = `CREATE SCHEMA IF NOT EXISTS ${name};SET search_path TO ${name};`;
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    client.release();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateRecords(
  tableName: string,
  updates: { [key: string]: unknown },
  constraints?: string,
  values?: any[]
) {
  const details = Object.keys(updates).reduce((prev, curr) => {
    return prev ? `${prev}, ${curr} = ${updates[curr]}` : `${curr} = ${updates[curr]}`;
  }, '');
  const query = constraints
    ? `UPDATE ${tableName} SET ${details} WHERE ${constraints};`
    : `UPDATE ${tableName} SET ${details};`;
  try {
    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();
    return result;
  } catch (error) {
    throw error;
  }
}

export default pool;
