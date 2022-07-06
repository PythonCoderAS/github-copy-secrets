import { expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { runScript } from "subprocess-test-utils";

use(chaiAsPromised);

async function runCommandWithArgs(args: string[]): Promise<boolean> {
  return runScript("node", ["dist/index.js", ...args]);
}

describe("github-copy-secrets tests", () => {
  it("should not run with no arguments", () =>
    expect(runCommandWithArgs([])).to.eventually.equal(false));
});
