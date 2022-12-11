export const getEnv = () =>
  typeof globalThis.process !== "undefined" ? globalThis.process.env : {}

const DEFAULT_ENV_REGEX = /\$([\w+]+)/gm

export const injectEnv = (
  code: string,
  _env = getEnv(),
  envRegex = DEFAULT_ENV_REGEX
) => code.replace(envRegex, (match, g1) => _env[g1] || match)
