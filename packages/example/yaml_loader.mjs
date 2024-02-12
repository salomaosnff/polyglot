export function resolve(specifier, context, defaultResolver) {
  if (!/\.ya?ml$/.test(specifier)) {
    return defaultResolver(specifier, context);
  }

  return resolveYaml(specifier, context);
}

function resolveYaml(specifier, context) {
  return {
    url: specifier,
    format: undefined,
  };
}
