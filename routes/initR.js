const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const movies = require('../initR.json');

router.get('/', (req, res) => {
    res.json(movies);
});


router.put('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { url, usuario, code, status } = req.body;
    if (id && url && usuario && code && status) {
        _.each(movies, (movie, i) => {
            if (movie.id === id) {
                movie.url = url;
                movie.usuario = usuario;
                movie.code = code;
                movie.status = status;

            }
        });
        res.json(movies);
    } else {
        res.status(500).json({error: 'There was an error. put'});
    }
});

function verifyToken(req, res, next){
     const bearerHeader =  req.headers['authorization'];

     if(typeof bearerHeader !== 'undefined'){
          const bearerToken = bearerHeader.split(" ")[1];
          req.token  = bearerToken;
       const token = req.token;
       
const mySecretKey = process.env['SECRET_KEY'];
       if(token){
         jwt.verify(token, mySecretKey, (error, decoded)=>{
           if(error){
             return res.json({
               error: true,
               message: "Token invalid or expired"
             })
           }else{
             
             next();
             
           }
         })
       }
      // console.log(mySecretKey);
          
     }else{
       
         res.sendStatus(403);
     }
}



module.exports = router;