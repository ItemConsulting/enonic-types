declare global {
  interface XpLibraries {
    "/lib/xp/testing": typeof import("./index");
  }
}

/**
 * Load a file from path.
 */
export function load(path: string): string;

/**
 * Run script.
 */
export function runScript(path: string): void;

/**
 * Mock a library for require.
 */
export function mock(path: string, object: unknown): void;

/**
 * Assert that the value is true.
 */
export function assertTrue(actual: boolean, message?: string): void;

/**
 * Assert that the value is false.
 */
export function assertFalse(actual: boolean, message?: string): void;

/**
 * Assert that the expected == actual.
 */
export function assertEquals<A extends Primitive | null>(expected: A, actual: A, message?: string): void;

/**
 * Assert that the expected != actual.
 */
export function assertNotEquals<A extends Primitive | null>(expected: A, actual: A, message?: string): void;

/**
 * Assert that the JSON expected == actual.
 */
export function assertJson<A>(expected: A, actual: A, message?: string): void;

/**
 * Assert that the JSON expected == actual.
 */
export function assertJsonEquals<A>(expected: A, actual: A, message?: string): void;

/**
 * Assert null.
 */
export function assertNull(value: unknown, message?: string): void;

/**
 * Assert not null.
 */
export function assertNotNull(value: unknown, message?: string): void;

export type Primitive = string | number | bigint | boolean | undefined | symbol;
