import chalk from 'chalk';
import querystring from 'querystring';
import fetch from 'node-fetch';
import {enterpriseOidcTokenUri, signJWT} from './sign-jwt.js';

export const clientAssertion = async (clientId, privateKeyPath, scopes) => {
  // Obtain an access token to call banno apis
  const jwt = await signJWT(clientId, privateKeyPath);
  if (Array.isArray(scopes)) {
    scopes = scopes.join(' ');
  }
  const tokenPayload = {
    client_assertion: jwt,
    client_assertion_type:
      'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    grant_type: 'client_credentials',
    scope: scopes,
  };
  process.stdout.write(
    `To obtain an access token, make a POST to the ${chalk.yellow('https://login.jackhenry.com/a/oidc-provider/api/v0/token')} endpoint.
Include a content-type header of ${chalk.yellow('application/x-www-form-urlencoded')}.
${chalk.green('Request body:')}
${querystring.stringify(tokenPayload)}\n`,
  );

  fetch(enterpriseOidcTokenUri, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify(tokenPayload),
  })
    .then((res) => {
      if (!res.ok) {
        process.stderr.write(
          `${chalk.red('Token POST error: ' + res.status)} ${JSON.stringify(res.headers.raw, null, 2)}\n`,
        );
        console.log(res.headers);
      }
      return res.json();
    })
    .then((data) => {
      process.stdout.write(
        `\n${chalk.green('Token POST response:')} ${JSON.stringify(data, null, 2)}\n`,
      );
    });
};
