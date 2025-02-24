import { LocalStorageMock } from './localStorage';

describe('LocalStorageMock', () => {
  let localStorage: LocalStorageMock;

  beforeEach(() => {
    localStorage = new LocalStorageMock();
  });

  test('should store and retrieve an item', () => {
    localStorage.setItem('key', 'value');
    expect(localStorage.getItem('key')).toBe('value');
  });

  test('should return null for non-existing item', () => {
    expect(localStorage.getItem('nonExistingKey')).toBeNull();
  });

  test('should remove an item', () => {
    localStorage.setItem('key', 'value');
    localStorage.removeItem('key');
    expect(localStorage.getItem('key')).toBeNull();
  });

  test('should clear all items', () => {
    localStorage.setItem('key1', 'value1');
    localStorage.setItem('key2', 'value2');
    localStorage.clear();
    expect(localStorage.getItem('key1')).toBeNull();
    expect(localStorage.getItem('key2')).toBeNull();
    expect(localStorage.length).toBe(0);
  });

  test('should return the correct length', () => {
    expect(localStorage.length).toBe(0);
    localStorage.setItem('key1', 'value1');
    expect(localStorage.length).toBe(1);
    localStorage.setItem('key2', 'value2');
    expect(localStorage.length).toBe(2);
  });

  test('should return the correct key by index', () => {
    localStorage.setItem('key1', 'value1');
    localStorage.setItem('key2', 'value2');
    expect(localStorage.key(0)).toBe('key1');
    expect(localStorage.key(1)).toBe('key2');
    expect(localStorage.key(2)).toBeNull();
  });
});
