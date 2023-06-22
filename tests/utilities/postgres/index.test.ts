import mockPg from './index.mock';

import { ErrorMessage, DbTable, DbTenancy } from '../../../src/constants';
import {
  createTable,
  deleteRecords,
  deleteTable,
  insertRecord,
  retrieveRecords,
  setTenancy,
  updateRecords,
} from '../../../src/utilities/postgres';

const accessToken = '<<ACCESS_TOKEN>>';
const idToken = '<<ID_TOKEN>>';

describe('Create Table', () => {
  beforeEach(() => {
    mockPg.client.query.mockReset();
  });

  test('failure', async () => {
    const expected = new Error('OMG');
    mockPg.client.query.mockRejectedValueOnce(expected);
    try {
      await createTable(DbTable.TABLE, {});
      // throw exception if the function call never fail
      expect(1).toBe(0);
    } catch {
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith('CREATE TABLE IF NOT EXISTS table ();');
    }
  });

  test('success', async () => {
    const expected = { rowCount: 0, rows: [] };
    mockPg.client.query.mockResolvedValueOnce(expected);
    try {
      const columns = {
        access_token: 'TEXT NOT NULL',
        id_token: 'TEXT NOT NULL',
        username: 'TEXT NOT NULL PRIMARY KEY',
        uuid: 'VARCHAR(40) NOT NULL DEFAULT gen_random_uuid()',
      };
      const result = await createTable(DbTable.TABLE, columns);
      expect(result).toStrictEqual(expected);
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith(
        'CREATE TABLE IF NOT EXISTS table ("access_token" TEXT NOT NULL, "id_token" TEXT NOT NULL, "username" TEXT NOT NULL PRIMARY KEY, "uuid" VARCHAR(40) NOT NULL DEFAULT gen_random_uuid());'
      );
    } catch {
      // throw exception if the function call fails
      expect(1).toBe(0);
    }
  });
});

describe('Delete Table', () => {
  beforeEach(() => {
    mockPg.client.query.mockReset();
  });

  test('failure', async () => {
    const expected = new Error('OMG');
    mockPg.client.query.mockRejectedValueOnce(expected);
    try {
      await deleteTable(DbTable.TABLE);
      // throw exception if the function call never fail
      expect(1).toBe(0);
    } catch {
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith('DROP TABLE table;');
    }
  });

  test('success', async () => {
    const expected = { rowCount: 0, rows: [] };
    mockPg.client.query.mockResolvedValueOnce(expected);
    try {
      const result = await deleteTable(DbTable.TABLE);
      expect(result).toStrictEqual(expected);
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith('DROP TABLE table;');
    } catch {
      // throw exception if the function call fails
      expect(1).toBe(0);
    }
  });
});

describe('Delete Records', () => {
  beforeEach(() => {
    mockPg.client.query.mockReset();
  });

  test('failure', async () => {
    const expected = new Error('OMG');
    mockPg.client.query.mockRejectedValueOnce(expected);
    try {
      await deleteRecords(DbTable.TABLE);
      // throw exception if the function call never fail
      expect(1).toBe(0);
    } catch {
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith('DELETE FROM table;', undefined);
    }
  });

  test('success', async () => {
    const expected = { rowCount: 0, rows: [] };
    mockPg.client.query.mockResolvedValueOnce(expected);
    try {
      const constraints = 'username = $1';
      const values = ['kewee'];
      const result = await deleteRecords(DbTable.TABLE, constraints, values);
      expect(result).toStrictEqual(expected);
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith('DELETE FROM table WHERE username = $1;', values);
    } catch {
      // throw exception if the function call fails
      expect(1).toBe(0);
    }
  });
});

describe('Insert Records', () => {
  const username = 'USERNAME';
  const columns = {
    access_token: `'${accessToken}'`,
    id_token: `'${idToken}'`,
    username: `'${username}'`,
  };

  beforeEach(() => {
    mockPg.client.query.mockReset();
  });

  test('failure - malform query', async () => {
    try {
      await insertRecord(DbTable.TABLE, {});
      // throw exception if the function call never fail
      expect(1).toBe(0);
    } catch (err) {
      expect(mockPg.client.query).toHaveBeenCalledTimes(0);
      expect((err as Error).message).toBe(ErrorMessage.MALFORM_INSERT_QUERY);
    }
  });

  test('failure - rejected', async () => {
    const expected = new Error('OMG');
    mockPg.client.query.mockRejectedValueOnce(expected);
    try {
      await insertRecord(DbTable.TABLE, columns);
      // throw exception if the function call never fail
      expect(1).toBe(0);
    } catch {
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith(
        `INSERT INTO table (access_token, id_token, username) VALUES ('${accessToken}', '${idToken}', '${username}');`
      );
    }
  });

  test('success', async () => {
    const expected = { rowCount: 0, rows: [] };
    mockPg.client.query.mockResolvedValueOnce(expected);
    try {
      const result = await insertRecord(DbTable.TABLE, columns);
      expect(result).toStrictEqual(expected);
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith(
        `INSERT INTO table (access_token, id_token, username) VALUES ('${accessToken}', '${idToken}', '${username}');`
      );
    } catch {
      // throw exception if the function call fails
      expect(1).toBe(0);
    }
  });
});

describe('Retrieve Records', () => {
  beforeEach(() => {
    mockPg.client.query.mockReset();
  });

  test('failure', async () => {
    const expected = new Error('OMG');
    mockPg.client.query.mockRejectedValueOnce(expected);
    try {
      await retrieveRecords(DbTable.TABLE);
      // throw exception if the function call never fail
      expect(1).toBe(0);
    } catch {
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith('SELECT * FROM table;', undefined);
    }
  });

  test('success', async () => {
    const expected = { rowCount: 0, rows: [] };
    mockPg.client.query.mockResolvedValueOnce(expected);
    try {
      const constraints = 'username = $1';
      const values = ['kewee'];
      const result = await retrieveRecords(DbTable.TABLE, constraints, values);
      expect(result).toStrictEqual(expected);
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith(
        'SELECT * FROM table WHERE username = $1;',
        values
      );
    } catch {
      // throw exception if the function call fails
      expect(1).toBe(0);
    }
  });
});

describe('Setup Tenancy', () => {
  beforeEach(() => {
    mockPg.client.query.mockReset();
  });

  test('failure', async () => {
    const expected = new Error('OMG');
    mockPg.client.query.mockRejectedValueOnce(expected);
    try {
      await setTenancy(DbTenancy.TENANT);
      // throw exception if the function call never fail
      expect(1).toBe(0);
    } catch {
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith(
        'CREATE SCHEMA IF NOT EXISTS tenant;SET search_path TO tenant;'
      );
    }
  });

  test('success', async () => {
    const expected = { rowCount: 0, rows: [] };
    mockPg.client.query.mockResolvedValueOnce(expected);
    try {
      await setTenancy(DbTenancy.TENANT);
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith(
        'CREATE SCHEMA IF NOT EXISTS tenant;SET search_path TO tenant;'
      );
    } catch (err) {
      // throw exception if the function call fails
      expect(1).toBe(0);
    }
  });
});

describe('Update Records', () => {
  const username = 'USERNAME';
  const columns = {
    access_token: `'${accessToken}'`,
    id_token: `'${idToken}'`,
    username: `'${username}'`,
  };

  beforeEach(() => {
    mockPg.client.query.mockReset();
  });

  test('failure', async () => {
    const expected = new Error('OMG');
    mockPg.client.query.mockRejectedValueOnce(expected);
    try {
      await updateRecords(DbTable.TABLE, columns);
      // throw exception if the function call never fail
      expect(1).toBe(0);
    } catch {
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith(
        `UPDATE table SET access_token = '${accessToken}', id_token = '${idToken}', username = '${username}';`,
        undefined
      );
    }
  });

  test('success', async () => {
    const expected = { rowCount: 0, rows: [] };
    mockPg.client.query.mockResolvedValueOnce(expected);
    try {
      const constraints = 'username = $1';
      const values = ['kewee'];
      const result = await updateRecords(DbTable.TABLE, columns, constraints, values);
      expect(result).toStrictEqual(expected);
      expect(mockPg.client.query).toHaveBeenCalledTimes(1);
      expect(mockPg.client.query).toBeCalledWith(
        `UPDATE table SET access_token = '${accessToken}', id_token = '${idToken}', username = '${username}' WHERE username = $1;`,
        values
      );
    } catch (err) {
      // throw exception if the function call fails
      expect(1).toBe(0);
    }
  });
});
