import { constants } from "fs"
import { access, mkdir, readdir, stat } from "fs/promises"

import { vLog } from "./logging"

async function canAccessWithMode(path: string, mode: number) {
  try {
    await access(path, mode)
    return true
  } catch (err) {
    vLog(err)
    return false
  }
}

export async function isWriteable(path: string) {
  return canAccessWithMode(path, constants.W_OK)
}

export async function isReadable(path: string) {
  return canAccessWithMode(path, constants.R_OK)
}

/**
 * @returns True if readable, false otherwise
 */
export async function isAccessible(path: string) {
  return canAccessWithMode(path, constants.F_OK)
}

export async function isDirectory(path: string) {
  try {
    const pathStat = await stat(path)
    return pathStat.isDirectory()
  } catch (err) {
    vLog(err)
    return false
  }
}

export async function isFile(path: string) {
  try {
    const pathStat = await stat(path)
    return pathStat.isFile()
  } catch (err) {
    vLog(err)
    return false
  }
}

const validFileSet = new Set([
  ".DS_Store",
  ".git",
  ".gitattributes",
  ".gitignore",
  ".gitlab-ci.yml",
  ".hg",
  ".hgcheck",
  ".hgignore",
  ".idea",
  ".npmignore",
  ".travis.yml",
  "LICENSE",
  "Thumbs.db",
  "docs",
  "mkdocs.yml",
  "npm-debug.log",
  "yarn-debug.log",
  "yarn-error.log",
  ".pnpm-debug.log"
])

export async function isFolderEmpty(root: string) {
  const conflicts = (await readdir(root, { withFileTypes: true }))
    .filter((dirData) => !validFileSet.has(dirData.name))
    // Support IntelliJ IDEA-based editors
    .filter((dirData) => !/\.iml$/.test(dirData.name))

  if (conflicts.length > 0) {
    vLog(`Found conflicting contents in ${root}`)

    const data = conflicts.reduce(
      (result, dirent) =>
        `${result}\n\t${dirent.name}${dirent.isDirectory() ? "/" : ""}`,
      ""
    )

    vLog(data)

    return false
  }

  return true
}

export async function ensureWritableAndEmpty(dir: string) {
  if (!(await isWriteable(dir))) {
    vLog("Directory does not exist, creating...")
    await mkdir(dir)
  } else {
    vLog("Directory exists, checking if it is empty...")
    if (!(await isFolderEmpty(dir))) {
      throw new Error(`Directory ${dir} is not empty.`)
    }

    vLog("Checking if directory is writable...")
    if (!(await isWriteable(dir))) {
      throw new Error(`Directory ${dir} is not accesible.`)
    }
  }
}
