import { PolyglotMessage } from '@polyglot.js/core';
import { PolyglotDictionaryObject } from '@polyglot.js/core';
import { pluralMessage, flattenMessages } from '@polyglot.js/core';
import type { FlattenMessages,Polyglot, PolyglotDictionary } from '@polyglot.js/core';

export interface JsonDictionary {
  [key: string]: string | JsonDictionary;
}

export function parseMessage(msg: string) {
  const msgs: string[] = msg.split(/(?<!\\)\|/g);

  return msgs.length > 1 ? pluralMessage(msgs.map((msg) => createMessage(msg))) : createMessage(msgs[0]);
}

function createMessage(msg: string) {
  return (_: Polyglot, ...args: any[]) => {
    return msg.replaceAll(/(?<!\\){(.+?)}/g, (match, p) => {
      const arg = /^\d+$/.test(p) ? args[parseInt(p)] : args.at(-1)?.[p];

      return arg === undefined ? match : arg;
    });
  };
}

export function parse<Dictionary extends PolyglotDictionaryObject>(dictionary: JsonDictionary): FlattenMessages<Dictionary> {
  const parsed = {} as any;

  for (const [
    key,
    value,
  ] of Object.entries(dictionary)) {
    parsed[key] = typeof value === 'string' ? parseMessage(value) : parse(value);
  }

  return flattenMessages(parsed) as any;
}