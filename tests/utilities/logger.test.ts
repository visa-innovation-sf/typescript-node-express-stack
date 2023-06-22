import { Module } from 'module';

import { getLabel } from '../../src/utilities/logger';

describe('getLabel', () => {
  test('module with folder and/or filename', () => {
    const module = new Module('id');
    module.filename = 'root/folder/filename';
    expect(getLabel(module)).toBe('folder/filename');
  });

  test('module without folder and/or filename', () => {
    const id = 'ID';
    const module = new Module(id);
    module.filename = '';
    expect(getLabel(module)).toBe(id);
  });
});
