const { Router } = require('express');
const { Configuration, OpenAIApi } = require("openai");
const { body, query, validationResult } = require("express-validator");
const reCaptchaV3 = require('recaptchav3bypass');
const camara = require('../Camara.json');
const jwt = require("jsonwebtoken");
const _ = require('underscore');
const { generate, verifyToken, Recaptcha } = require('../Mis-modulos/moduloUno.js'); 

const configuration = new Configuration({
        apiKey: "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",
})
const openai = new OpenAIApi(configuration);

const router = new Router();
const mySecretKey = process.env['SECRET_KEY'];
const user = process.env['SECRET_USERS'];
const passw = process.env['SECRET_PASSWORD'];


async function generateResponse(prompt) {
  const response = await openai.createCompletion({
    prompt: prompt,
    model: "text-davinci-003",
    top_p: 1,
    temperature: 0.5,
    max_tokens: 1024,
    frequency_penalty: 0.2,
    presence_penalty: 0,
  });
  return response.data.choices[0].text;
}

async function classifyIntent(prompt) {
  const response = await openai.createCompletion({
    prompt: prompt,
    model: "text-davinci-003",
    temperature: 0.5,
    max_tokens: 1024,
  });
  return response.data.choices[0].text;
}

router.get("/chat", Recaptcha, [ query("prompt").isString().trim().escape() ], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const prompt = escape(req.query.prompt);
  let responseText;
  try {
    const intent = classifyIntent(prompt);
    if (intent === "saludo") {
      responseText = "Hola, ¿cómo puedo ayudarte hoy?";
    } else if (intent === "despedida") {
      responseText = "¡Hasta luego! ¡Que tengas un buen día!";
    } else {
      responseText = await generateResponse(prompt);
    }
  } catch (err) {
          console.log(err)
    responseText = "Lo siento, hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.";
  }
  console.log(responseText);
  res.send(`${responseText}`);
});



router.post('/writeToken', (req, res) => {
  const { usu, pass } = req.body;
  if (usu === user && pass === passw) {
    jwt.sign({ users: user, password: passw, generate }, mySecretKey, { expiresIn: '60s' }, (err, token) => {
      res.json({
        error: false,
        token
      });
    })

  } else {
    res.send("<h1>Error usuario or password</h1>");
  }

})



router.post('/BypassV3/', (req, res) =>{
  
  const { url_anchor } = req.body
  
  new reCaptchaV3(url_anchor).get_recaptcha_token().then(response => {
  res.json({Recaptchav3_response:response})
    });
  
})



router.get('/camara', (req, res) =>{
  const ejemplo = { nombre:"mauro", status:"true"}
           res.json(camara); 
   })

 router.put('/camara/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { urlHome, urlDashboard } = req.body;
   console.log(req.body)
    if (id && urlHome && urlDashboard) {
      _.each(camara, (cam, i) => {
        if (cam.id === id) {
          cam.urlHome = urlHome;
          cam.urlDashboard = urlDashboard;
          
          
        }
        
      });
      res.json(camara);
    } else {
      res.status(500).json({ error: 'There was an error. put' });
    }
  });










module.exports = router;