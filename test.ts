import { exec } from "child_process";
import { promisify } from "util";
import { expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);

async function runCommandWithArgs(args: string[]): Promise<boolean> {
  const childProcPromise = promisify(exec)(
    ["node", "dist/index.js", ...args].join(" ")
  );
  try {
    await childProcPromise;
  } catch (e: unknown) {
    return false;
  }

  return true;
}

describe("github-copy-secrets tests", () => {
  it("should not run with no arguments", () =>
    expect(runCommandWithArgs([])).to.eventually.equal(false));
});
