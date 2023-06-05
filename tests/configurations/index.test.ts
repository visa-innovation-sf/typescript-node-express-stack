import config from '../../src/configurations';

describe('configurations', () => {
  test('No environment is specified', () => {
    expect(config).toBeDefined();
  });
});
