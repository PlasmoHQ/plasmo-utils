export const env =
  typeof globalThis.process !== "undefined" ? globalThis.process.env : {}

const DEFAULT_ENV_REGEX = /\$([\w+]+)/gm

export const injectEnv = (
  code: string,
  _env = env,
  envRegex = DEFAULT_ENV_REGEX
) => code.replace(envRegex, (match, g1) => _env[g1] || match)
