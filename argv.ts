export const getNonFlagArgvs = (cmd = process.argv[2]) =>
  process.argv
    .filter((arg) => !arg.startsWith("--"))
    .slice(process.argv.indexOf(cmd) + 1)
