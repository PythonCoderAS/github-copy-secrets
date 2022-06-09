import "dotenv/config";

/**
 * Gets a boolean from a string inputs. A string is considered false if it is the following strings:
 * - "false"
 * - "f"
 * - "no"
 * - "n"
 * - "0"
 * - "off"
 *
 * All other values are true.
 * @param value The string to convert to a boolean.
 * @returns A boolean value.
 */
export function getBooleanFromString(value?: string | null): boolean {
  switch (value?.toLowerCase()) {
    default:
      return true;

    case "false":
    case "f":
    case "no":
    case "n":
    case "0":
    case "off":
    case null:
    case undefined:
      return false;
  }
}

/**
 * Gets a token from the environment or a command line argument.
 * @param tokenInput The value of the command line argument, if any.
 * @returns The token.
 * @todo Refactor out into own package.
 */
export function getToken(tokenInput?: string | null): string | null {
  if (tokenInput) {
    return tokenInput;
  }

  if (process.env.GITHUB_TOKEN) {
    return process.env.GITHUB_TOKEN;
  }

  return null;
}
