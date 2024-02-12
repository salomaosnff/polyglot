import { PolyglotMessage } from './types';

type FlattenMessagesKeys<T> = T extends Record<string, any> ? {
  [K in keyof T]: T[K] extends string | ((...args: any[]) => string) ? K : `${K & string}.${FlattenMessagesKeys<T[K]>}`
}[keyof T] : 'never';

type PickMessage<T, K> = K extends `${infer A}.${infer B}`
  ? A extends keyof T
  ? PickMessage<T[A], B>
  : never
  : K extends keyof T ? T[K] : never;

type ToMessage<T> = T extends (...args: any[]) => string ? T : () => string;

interface StructuredMessages {
  [key: string]: PolyglotMessage | StructuredMessages;
}

/**
 * Represents a flattened dictionary of translation messages.
 * @template T The type of the dictionary.
 * @example
 */
export type FlattenMessages<T> = {
  [K in FlattenMessagesKeys<T>]: ToMessage<PickMessage<T, K>>
}


/**
 * Flattens messages object.
 * @param messages The messages object to flatten.
 * @returns The flattened messages object.
 * @example
 * flattenMessages({
 *   foo: 'bar',
 *   baz: {
 *     qux: 'quux',
 *   },
 * });
 * // => {
 * //   foo: () => 'bar',
 * //   'baz.qux': () => 'quux',
 * // }
 */
export function flattenMessages<T extends StructuredMessages>(messages: T): FlattenMessages<T> {
  const flattenedDictionary: any = {};

  function flattenObject(obj: StructuredMessages, prefix: string = '') {
    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'object') {
        flattenObject(value, newKey);
        continue;
      }

      flattenedDictionary[newKey] = typeof value === 'function' ? value : () => value;
    }
  }

  flattenObject(messages);

  return flattenedDictionary;
}