const flagSet = new Set(process.argv)

export const hasFlag = (flag: string) => flagSet.has(flag)

const flagMap: Record<string, string> = process.argv
  .filter((arg) => arg.startsWith("--") && arg.includes("="))
  .map((arg) => arg.split("="))
  .reduce((map, [key, value]) => {
    map[key] = value
    return map
  }, {})

export const getFlag = (flag: string) => flagMap[flag]

// print result only
export const dryRun = hasFlag("--dry-run")

export const verbose = hasFlag("--verbose")

export const flagsHelp = `
    Options:
      --dry-run - run without making any changes
      --verbose - print run log
`
