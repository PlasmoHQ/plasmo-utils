const flagSet = new Set(process.argv)

export const hasFlag = (flag: string) => flagSet.has(flag)

// print result only
export const dryRun = hasFlag("--dry-run")

export const verbose = hasFlag("--verbose")

export const flagsHelp = `
    Options:
      --dry-run - run without making any changes
      --verbose - print run log
`
