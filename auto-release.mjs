import execa from "execa"
import { createRequire } from "module"
import release from "release-it"
import semver from "semver"

const require = createRequire(import.meta.url)
const { version: currentVersion } = require("./package.json")
const expectVersion = process.argv[2]

async function main() {
  if (!semver.gt(expectVersion, currentVersion)) {
    console.log(`Already up-to-date with latest version of 'expect' (${expectVersion}).`)
    process.exit()
  }

  console.log(`Found newer version of 'expect' (${expectVersion}). Publishing update...`)
  const { name, version } = await release({ increment: expectVersion })
  console.log(`Released ${name}@${version}`)

  try {
    console.log(`Creating dist-tag for @storybook/jest...`)
    const { stdout } = await execa.command(
      `npm dist-tag add ${name}@${version} @storybook/jest --otp ${process.env.NPM_TOKEN}`
    )
    console.log(stdout)
  } catch (err) {
    console.error(err)
  }
}

main()
