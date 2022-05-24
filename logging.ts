import { verbose } from "./flags"

export const cLog = (prefix = "", ...args: any[]) =>
  console.log(prefix.padEnd(9), "|", ...args)

/**
 * Appendix logging
 */
export const aLog = (...args: any[]) => cLog("", ...args)

/**
 * Success logging
 */
export const sLog = (...args: any[]) => cLog(`🟢 DONE`, ...args)

/**
 * Error logging
 */
export const eLog = (...args: any[]) =>
  console.error(`🔴 ERROR`.padEnd(9), "|", ...args)

/**
 * Info logging
 */
export const iLog = (...args: any[]) => cLog(`🔵 INFO`, ...args)

/**
 * Warning log
 */
export const wLog = (...args: any[]) => cLog(`🟠 WARN`, ...args)

let verboseStep = 0

/**
 * Verbose logging
 */
export const vLog = (...args: any[]) =>
  verbose && cLog(`🟡 STEP ${verboseStep++}`, ...args)

/**
 * Verbose table
 */
export const vTable = (tableData: any, props?: string[]) =>
  verbose && console.table(tableData, props)
