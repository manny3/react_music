const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const code = req.body.code
  console.log(code);
  const spotifyApi = new SpotifyWebApi({
    clientId: '069642f9439f4a2682aa2d5b11ae52a0',
    clientSecret: 'a4c3688b21354066b508ed661a9c8580',
    redirectUri: 'http://localhost:3000'
  })
  console.log(spotifyApi);

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch((err)=>{
      console.log(err.body);
      res.sendStatus(400)
    })
})

app.listen(3001)