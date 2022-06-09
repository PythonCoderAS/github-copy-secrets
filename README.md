# github-copy-secrets

Copy given secrets to a repository.

## Usage

```
  Description
    Copy secrets from a directory into a GitHub repository.

  Usage
    $ github-copy-secrets <secretsDirectory> <owner> <repository> [options]

  Options
    -t, --token      GitHub token
    -l, --list       List secrets that will be copied.
    -v, --version    Displays current version
    -h, --help       Displays this message
```

`secretsDirectory` is a directory containing secrets to be copied. Secret files are plaintext files in the directory.
Files starting with a `.` are ignored. When applying the secret, the extension is stripped from the secret name.
