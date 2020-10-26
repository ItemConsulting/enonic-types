export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | symbol;

export interface TestingLibrary {
  /**
   * Load a file from path.
   */
  load(path: string): string;

  /**
   * Run script.
   */
  runScript(path: string): void;

  /**
   * Mock a library for require.
   */
  mock(path: string, object: unknown): void;

  /**
   * Assert that the value is true.
   */
  assertTrue(actual: boolean, message?: string): void;

  /**
   * Assert that the value is false.
   */
  assertFalse(actual: boolean, message?: string): void;

  /**
   * Assert that the expected == actual.
   */
  assertEquals<A extends Primitive | null>(expected: A, actual: A, message?: string): void;

  /**
   * Assert that the expected != actual.
   */
  assertNotEquals<A extends Primitive | null>(expected: A, actual: A, message?: string): void;

  /**
   * Assert that the JSON expected == actual.
   */
  assertJson<A>(expected: A, actual: A, message?: string): void;

  /**
   * Assert that the JSON expected == actual.
   */
  assertJsonEquals<A>(expected: A, actual: A, message?: string): void;

  /**
   * Assert null.
   */
  assertNull(value: unknown, message?: string): void;


  /**
   * Assert not null.
   */
  assertNotNull(value: unknown, message?: string): void;
}
