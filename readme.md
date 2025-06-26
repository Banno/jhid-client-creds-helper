# @jack-henry/jhid-client-creds-helper

Helper utilities for common tasks with Jack Henry ID Authentication

## Usage

`
npx @jack-henry/jhid-client-creds-helper COMMAND
`

## Installation

The npx command automatically downloads and executes the latest version on demand.
No installation steps are required.

## Supported Commands

Commands currently supported by the utility.

### sign-jwt

Create a signed JWT to use as the client_assertion.

Example:
```text
$ npx @jack-henry/jhid-client-creds-helper sign-jwt --client-id=00000000-0000-0000-0000-000000000000 --private-key=./private.pem 
```

### client-assertion

Create a signed JWT to use as the client_assertion and obtain an access_token.

Example:
```text
$ npx @jack-henry/jhid-client-creds-helper client-assertion --client-id=00000000-0000-0000-0000-000000000000 --private-key=./private.pem --scope openid 
```

## First Time Setup

This utility is run via the node `npx` command.

### Node Version

The utility requires NodeJS version 18.0.0 or later. Check your current version with `node --version`.
