import { PolyglotDictionaryObject } from './types';

/**
 * Represents a locale with its dictionary.
 * @param code The locale code.
 * @param dictionary The dictionary of translation messages.
 * @template T The type of the dictionary.
 */
export class PolyglotDictionary<T extends PolyglotDictionaryObject = PolyglotDictionaryObject> {
  constructor(
    public readonly dictionary: T,
  ) { }

  /**
   * Checks if the given value is a locale.
   * @param value The value to check.
   * @returns The result of the check.
   */
  static is(value: any): value is PolyglotDictionary {
    return value instanceof PolyglotDictionary;
  }

  /**
   * Gets a translation message from the dictionary.
   * @param key The key of the message.
   * @returns The message function.
   */
  getMessage<K extends keyof T>(key: K): T[K] {
    return this.dictionary[key];
  }

  /**
   * Creates a new dictionary with the given messages.
   * @param dictionary The dictionary of translation messages to merge.
   * @returns A new dictionary with the given messages.
   * @template U The type of the dictionary to merge.
   */
  withMessages<U extends PolyglotDictionaryObject>(dictionary: U): PolyglotDictionary<Omit<T, keyof U> & U> {
    return new PolyglotDictionary({
      ...this.dictionary,
      ...dictionary,
    });
  }

  /**
   * Clones the locale.
   * @returns A new locale with the same dictionary.
   * @template U The type of the dictionary to merge.
   */
  clone(): PolyglotDictionary<T> {
    return new PolyglotDictionary(this.dictionary);
  }
}