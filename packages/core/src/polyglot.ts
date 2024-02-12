import { ActiveDictionaryOf, DictionariesOf, MessageParameters, MessagesOf, PickDictionaryOf, PickMessageOf, PolyglotOptions } from './types';
/**
 * Represents a polyglot instance with its dictionaries.
 */
export class Polyglot<const InstanceOptions extends PolyglotOptions = any> {
  /** Current options of the instance. */
  options: InstanceOptions;

  constructor(options: InstanceOptions) {
    this.options = options;
  }

  /**
   * Checks if the given value is a polyglot instance.
   * @param value The value to check.
   * @returns The result of the check.
   */
  static is(value: any): value is Polyglot {
    return value instanceof Polyglot;
  }

  /**
   * Gets a dictionary from the instance.
   * @param dictionaryId The dictionary id.
   * @returns The dictionary if found, `undefined` otherwise.
   */
  getDictionary<Id extends string & keyof DictionariesOf<InstanceOptions>>(dictionaryId: Id): PickDictionaryOf<InstanceOptions, Id> | undefined {
    return this.options.dictionaries[dictionaryId] as any;
  }

  /**
   * Gets a translation message from the instance from the active dictionary or the fallback dictionaries.
   * @param key The key of the message.
   * @returns The message function if found in the active dictionary or the fallback dictionaries, key as message otherwise.
   */
  getMessage<Key extends string & keyof MessagesOf<ActiveDictionaryOf<InstanceOptions>>>(key: Key): PickMessageOf<ActiveDictionaryOf<InstanceOptions>, Key> | (() => Key) {
    for (const dictionary of this.options.active) {
      if (typeof dictionary !== 'string') {
        continue;
      }

      const message: any = this.getDictionary(dictionary)?.getMessage(key);

      if (message) {
        return message;
      }
    }

    console.warn(`[Polyglot.js] warning: missing translation for key "${key}" in dictionaries "${this.options.active.join('", "')}". Returning key as message.`);

    return () => key;
  }

  /**
   * Translates a message from the active dictionary or the fallback dictionaries.
   * @param key The key of the message.
   * @param args The arguments to pass to the message function.
   * @returns The translated message if found in the active dictionary or the fallback dictionaries, key as message otherwise.
   */
  translate<Key extends string & keyof MessagesOf<ActiveDictionaryOf<InstanceOptions>>>(key: Key, ...args: MessageParameters<PickMessageOf<ActiveDictionaryOf<InstanceOptions>, Key>>): string {
    for (const dictionary of this.options.active) {
      if (typeof dictionary !== 'string') {
        continue;
      }

      const message: any = this.getDictionary(dictionary)?.getMessage(key)?.(this, ...args);

      if (message) {
        return message;
      }
    }

    console.warn(`[Polyglot.js] warning: missing translation for key "${key}" in dictionaries "${this.options.active.join('", "')}". Returning key as message.`);

    return key;
  }

  /**
   * Alias of `translate`.
   * @see translate
   */
  t<Key extends string & keyof MessagesOf<ActiveDictionaryOf<InstanceOptions>>>(key: Key, ...args: MessageParameters<PickMessageOf<ActiveDictionaryOf<InstanceOptions>, Key>>): string {
    return this.translate(key, ...args);
  }

  /**
   * Clones the instance.
   */
  clone(): Polyglot<InstanceOptions> {
    return new Polyglot({ ...this.options });
  }

  withActiveDictionaries<Id extends Array<string & keyof DictionariesOf<InstanceOptions>>>(dictionaryIds: Id): Polyglot<Omit<InstanceOptions, 'active'> & {
    active: Id
  }> {
    return new Polyglot({
      ...this.options,
      active: dictionaryIds,
    });
  }
}