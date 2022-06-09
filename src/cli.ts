import * as sade from "sade";
import handler from "./handler";

const { version } = require("../package.json");

const cli = sade(
  "github-copy-secrets <secretsDirectory> <owner> <repository>",
  true
)
  .version(version)
  .describe("Copy secrets from a directory into a GitHub repository.")
  .option("-t, --token", "GitHub token")
  .option("-l, --list", "List secrets that will be copied.")
  .action(handler);

export default cli;
