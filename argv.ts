import { argv } from "process"

export const getNonFlagArgvs = (cmd: string) =>
  argv.filter((arg) => !arg.startsWith("--")).slice(argv.indexOf(cmd) + 1)
