import chalk from 'chalk';
import {SignJWT} from 'jose';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import {v4 as uuid} from 'uuid';

export const enterpriseOidcTokenUri =
  'https://login.jackhenry.com/a/oidc-provider/api/v0/token';

export const signJWT = async (clientId, privateKeyPath) => {
  const jwtPayload = {
    jti: uuid(),
    aud: enterpriseOidcTokenUri,
    sub: clientId,
    iss: clientId,
    exp: Math.floor(Date.now() / 1000) + 60,
  };

  process.stdout.write(
    `${chalk.green('Client JWT payload:')} ${JSON.stringify(jwtPayload, null, 2)}\n`,
  );

  const privateKeyContents = await fs.readFile(privateKeyPath, {
    encoding: 'utf8',
  });
  const privateKey = crypto.createPrivateKey({
    key: privateKeyContents,
    format: 'pem',
    encoding: 'utf8',
  });

  /** @type {string} */
  const clientAssertion = await new SignJWT(jwtPayload)
    .setProtectedHeader({alg: 'PS256'})
    .sign(privateKey);

  process.stdout.write(
    `${chalk.green('Signed client JWT:')} ${clientAssertion}\n`,
  );
  process.stdout.write(
    chalk.grey('\nYou can inspect the JWT at ') +
      chalk.underline.yellow('https://jwt.io/') +
      '\n\n',
  );

  return clientAssertion;
};
