# Applications

[PlanQK Applications](https://platform.planqk.de/applications) are used to interact with the services on the PlanQK Platform.

Applications hold all necessary information for a secure communication with the service.
This includes a public and secret key pair, as well as a token- and service endpoint.
The former is used for generating an Authorization token, which is required for sending requests to the latter.

The token can be requested from the platform's token endpoint by providing the client credentials,
i.e., the _Consumer Key_ and _Consumer Secret_ of your application.

1. Go to your application in the [Applications](https://platform.planqk.de/applications) section
2. Copy the curl command into your clipboard by clicking the "Copy Text" button. The command contains already the consumer key and secret encoded as Base64 string.
3. Paste and execute the command in your favorite shell.
4. The value of the property `"access_token"` contains the authorization token.

Take the following cURL command as an example:

```
curl -k -X POST https://gateway.am.platform.planqk.de/token -d "grant_type=client_credentials" -H "Authorization: Basic b2g3cWROZHBCZ0N1OGZ1dV8xMjlORkZBbnNZYTpSaGtVYndhamY4WEh6NktpOXdFZUVhVF9LdGth"
```

The response of the command reveals the authorization token:

```json
{
  "access_token": "eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUX...",
  "scope": "default",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

You need to add this token in each HTTP request to the `"Authorization: Bearer"` header field to authenticate yourself.
Then token has an expiration time, i.e., after it expired you need to obtain a new one with the curl command above.
