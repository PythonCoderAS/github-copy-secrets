/**
 * Common types for the cli tool.
 */

export interface CliOptions {
  token?: string;
  /**
   * When provided with no value, defaults to Boolean `true`.
   */
  list?: string | boolean;
}
