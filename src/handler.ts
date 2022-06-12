import { Octokit } from "@octokit/rest";
import { stat, readdir, readFile } from "fs/promises";
import filterAsync from "node-filter-async";
import { crypto_box_seal } from "libsodium-wrappers";
import { getBooleanFromString, getToken } from "./utils";
import { CliOptions } from "./types";

export default async function handler(
  secretsDirectory: string,
  owner: string,
  repository: string,
  opts: CliOptions
): Promise<void> {
  const listOn =
    typeof opts.list === "boolean"
      ? opts.list
      : getBooleanFromString(opts.list);
  const token = getToken(opts.token);
  if (!token) {
    console.error("A token is required!");
    process.exit(1);
  }

  const octokit = new Octokit({
    auth: token,
    userAgent: "github-copy-secrets",
  });
  const files = await filterAsync(
    await readdir(secretsDirectory),
    async (file) =>
      !file.startsWith(".") &&
      (await stat(`${secretsDirectory}/${file}`)).isFile()
  );
  const secretData = await Promise.all(
    files.map(async (file) => ({
      // Removes file extension
      name: file.replace(/\.[^/.]+$/, ""),
      value: await readFile(`${secretsDirectory}/${file}`),
    }))
  );
  if (listOn) {
    console.log(`Copying ${secretData.length} secrets:`);
    secretData.forEach((secret) => {
      console.log(secret.name);
    });
  }

  const { key, key_id: keyId } = (
    await octokit.actions.getRepoPublicKey({
      owner,
      repo: repository,
    })
  ).data;
  const keyBytes = Buffer.from(key, "base64");
  await Promise.all(
    secretData.map(async (secret) => {
      const sealed = crypto_box_seal(secret.value, keyBytes);
      const encrypted = Buffer.from(sealed).toString("base64");
      await octokit.rest.actions.createOrUpdateRepoSecret({
        owner,
        repo: repository,
        secret_name: secret.name,
        encrypted_value: encrypted,
        keyId,
      });
    })
  );
}
