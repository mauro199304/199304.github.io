

const jwt = require("jsonwebtoken");

const request = require('request');

const mySecretKey = process.env['SECRET_KEY'];

const user = process.env['SECRET_USERS'];

const passw = process.env['SECRET_PASSWORD'];



const generate = () => {

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result1 = Math.random().toString(36).substring(0, 12);



  return result1;

}







const refreshToken = function(req, res, next) {

  const token = req.cookies.Authorization;

  //res.send(token);

  if (!token) {

    // res.send(token);

    return res.status(401).end()

  }



  var payload

  try {

    payload = jwt.verify(token, mySecretKey)

  } catch (e) {

    if (e instanceof jwt.JsonWebTokenError) {

      return res.status(401).end()

    }

    return res.status(400).end()

  }



  const nowUnixSeconds = Math.round(Number(new Date()) / 1000)

  if (payload.exp - nowUnixSeconds > 50) {

    //return res.json(payload.exp - nowUnixSeconds);



    return next();

  }



  jwt.sign({ users: user, password: passw, generate }, mySecretKey, { expiresIn: '60s' }, (err, token) => {

    res.cookie("Authorization", token, {

      maxAge: 60 * 1000

    });

    //  res.end();

    //return res.redirect('/home');

    return next();

  });

  //res.send('<script>window.location.href="/home";</script>');

}







const verifyToken = function(req, res, next) {

  const bearerHeader = req.headers['authorization'];

  console.log(req.headers['authorization'])



  if (typeof bearerHeader !== 'undefined') {

    const bearerToken = bearerHeader.split(" ")[1];

    req.token = bearerToken;

    const token = req.token;





    if (token) {

      jwt.verify(token, mySecretKey, (error, decoded) => {

        if (error) {

          return res.json({

            error: true,

            message: "Token invalid or expired"

          })

        } else {



          next();



        }

      });

    }

    // console.log(mySecretKey);



  } else {



    return res.sendStatus(403);

  }

}





////// Verificación de Usuario



const verifyUsers = function (req,res,next) {

  const { usuario, password } = req.body;

  //console.log(usuario);

  if (user === usuario && password === passw) {



    jwt.sign({ users: user, password: passw, generate }, mySecretKey, { expiresIn: '60s' }, (err, token) => {

      res.cookie("Authorization", token, {

        maxAge: 60 * 1000

      });

      next();



    });





  } else {



    return res.send('<script>alert("Usuario no Autorizado");window.location.href="/";</script>');

  }



}









////// verificacion de recaptcha



const Recaptcha = function(req, ress, next) {



  var response = req.body.token;
  if(!response){
    response = req.query.token;
  }

  //console.log(response);

  const options = {

    url: `https://www.google.com/recaptcha/api/siteverify?secret=6LeZaXMhAAAAAIu3j4rVaXy5MkEFd0H1GResB8LG&response=${response}`,

    json: true

  };

  request.post(options, (err, res, body) => {

    if (err) {

      console.log(body);

      return console.log(err);

    }

    //console.log(body);

    const suces = body["success"];

    if (suces === true) {



      next();



    } else {

      return ress.send('<script> alert("Fallo la Verificacion Humana, vacio o invalido!"); window.location.href="https://my-server.maurocabrera199.repl.co/"; </script>')

    }

  });



}







module.exports = { refreshToken, generate, verifyToken, verifyUsers, Recaptcha };