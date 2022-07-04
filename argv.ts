export const getNonFlagArgvs = (cmd: string) =>
  process.argv
    .filter((arg) => !arg.startsWith("--"))
    .slice(process.argv.indexOf(cmd) + 1)
