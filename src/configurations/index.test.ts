import config from '.';

describe('configurations', () => {
  test('No environment is specified', () => {
    expect(config).toBeDefined();
  });
});
