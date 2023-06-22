import { Pool } from 'pg';

const client = {
  query: jest.fn(),
  release: jest.fn(),
};

const connect = jest.spyOn(Pool.prototype, 'connect');

connect.mockResolvedValue(client as never);

export default {
  client,
  pool: {
    connect,
  },
};
