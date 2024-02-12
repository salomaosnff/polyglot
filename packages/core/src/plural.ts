import { Polyglot } from './polyglot';
import { MessageParameters, PolyglotMessage } from './types';

/**
 * Creates a plural message from a list of messages.
 * @param messages The list of messages.
 * @returns The plural message.
 * @example
 * const i18n = new Polyglot({
 *   en: {
 *     items_count: pluralMessage([
 *       () => 'No items.',
 *       () => 'One item.',
 *       (count) => `${count} items.`,
 *     ]),
 *   },
 * });
 * 
 * console.log(i18n.t('en', 'items_count', 0)); // => 'No items.'
 */
export function pluralMessage<M extends PolyglotMessage<[count: number, ...args: any[]]>[]>(messages: M): PolyglotMessage<MessageParameters<M[number]>> {
  return (polyglot: Polyglot, count: number, ...args: any[]) => {
    const message = messages[count] ?? messages[messages.length - 1];

    if (typeof message === 'function') {
      return message(polyglot, count, ...args);
    }

    console.warn(`[Polyglot.js] Missing plural message for count "${count}".`);

    return message;
  }; 
}