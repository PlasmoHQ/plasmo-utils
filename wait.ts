import { stdout } from "process"

import { cLog } from "./logging"

export const wait = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration))

export async function exitCountDown(duration: number) {
  for (let i = duration; i > 0; i--) {
    stdout.write(
      `${"🔴 EXIT".padEnd(
        9
      )} | This program will terminate in ${i} seconds...\r`
    )
    await wait(1000)
  }
  stdout?.clearLine(0)
  cLog("🔴 EXIT", `👋 Good bye and have a great day!`)
}
