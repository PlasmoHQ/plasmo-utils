import { argv } from "./argv"
import { getEnv } from "./env"

const flagSet = new Set(argv)

export const hasFlag = (flag: string) => flagSet.has(flag)

const flagMap: Record<string, string> = argv
  .filter((arg) => arg.startsWith("--") && arg.includes("="))
  .map((arg) => arg.split("="))
  .reduce((map, [key, value]) => {
    map[key] = value
    return map
  }, {})

export const getFlag = (flag: string) => flagMap[flag]

// print result only
export const dryRun = hasFlag("--dry-run")

export const isVerbose = () =>
  hasFlag("--verbose") || getEnv()["VERBOSE"] === "true"

export const verbose = isVerbose()

export const flagsHelp = `
    Options:
      --dry-run - run without making any changes
      --verbose - print run log
`
