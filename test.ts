import {exec} from "child_process";
import {promisify} from "util";
import {expect} from "chai";

async function runCommandWithArgs(args: string[]): Promise<boolean>{
  const childProcPromise = promisify(exec)(["node", "dist/index.js", ...args].join(" "))
  try {
    await childProcPromise;
  } catch (e: any) {
    return false;
  }
  return true;

}
describe("github-copy-secrets tests", () => {
  it("should not run with no arguments", () => expect(runCommandWithArgs([])).to.eventually.equal(false))
})
