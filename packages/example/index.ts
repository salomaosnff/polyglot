// import { Polyglot, PolyglotDictionary, pluralMessage } from '@polyglot.js/core';

// type AppMessages = {
//   'validation.required'(_: Polyglot, field: string): string
//   'count'?(_: Polyglot, count: number): string
// }

// const pt = new PolyglotDictionary({
//   'validation.required': (_, field) => `O campo ${field} é obrigatório.`,
//   count: pluralMessage([
//     (_, count) => 'Nenhum item',
//     (_, count) => 'Um item',
//     (_, count) => `${count} itens`,
//   ]),
// } as AppMessages);

// const en = new PolyglotDictionary({
//   'validation.required': (_, field) => `The field ${field} is required.`,
//   count: pluralMessage([
//     (_, count) => 'No items',
//     (_, count) => 'One item',
//     (_, count) => `${count} items`,
//   ]), 
// } as AppMessages);

// en.getMessage('validation.required');

// const i18n = new Polyglot({
//   dictionaries: {
//     pt,
//     en,
//   },
//   active: [
//     'en',
//     'pt',
//   ],
// });

// console.log(i18n.t('count', -1));

import pt_BR from './locales/pt-BR.yml'

console.log(pt_BR)