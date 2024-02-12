import { PolyglotDictionary } from './dictionary';
import { Polyglot } from './polyglot';

/**
 * Represents a generic translation message.
 */
export type PolyglotMessage<T extends any[] = any[]> = (polyglot: Polyglot, ...args: T) => string;

export type MessageParameters<Message extends PolyglotMessage> = Message extends (polyglot: Polyglot, ...params: infer A) => string ? A : never;

/**
 * Represents a dictionary of translation messages 
 */
export type PolyglotDictionaryObject = Record<string, PolyglotMessage>;

export type MessagesOf<Dictionary> = Dictionary extends PolyglotDictionary<infer Messages> ? Messages : never;

export interface PolyglotOptions {
  /** The available dictionaries. */
  dictionaries: Record<string, PolyglotDictionary>;

  /** The fallback dictionaries. */
  active: Array<keyof this['dictionaries']>;
}

export type DictionariesOf<Options extends PolyglotOptions> = NonNullable<Options['dictionaries']>;
export type PickDictionaryOf<Options extends PolyglotOptions, Id extends keyof DictionariesOf<Options>> = NonNullable<DictionariesOf<Options>[Id]>;
export type ActiveDictionaryOf<Options extends PolyglotOptions> = PickDictionaryOf<Options, NonNullable<Options['active'][number]>>;
export type PickMessageOf<Dictionary extends PolyglotDictionary, Key extends string & keyof MessagesOf<Dictionary>> = NonNullable<MessagesOf<Dictionary>[Key]>
