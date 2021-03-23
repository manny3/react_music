const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUrl: 'http://localhost:3000',
    clientId: '069642f9439f4a2682aa2d5b11ae52a0',
    clientSecret: 'a4c3688b21354066b508ed661a9c8580'
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch(()=>{
      res.sendStatus(400)
    })
})