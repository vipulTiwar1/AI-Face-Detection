const express = require("express");
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const salt = bcrypt.genSaltSync(10);

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'database',
        database: 'SmartBrain'
    }
});
const clarifaiSetUp = (input) => {
    const PAT = 'f6f492a5a344452a88398c62954a6671';
    const USER_ID = 'tushar_17';
    const APP_ID = 'First';
    // const MODEL_ID = 'face-detection';
    const IMAGE_URL = input;
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    return requestOptions;
  }
//   console.log(knex.select('*')
//   .from('users'));

app.use(express.json());
app.use(cors());


app.get('/', (request, response) => {

})
app.post('/signin', (request, response) => {

    const { email, password } = request.body;

    

       if(!email||!password)
        return response.status(400).json("Wrong Credentials");

    knex('login').where({ email: email }).select('hash')
        .then(details => {
            // console.log(details[0].hash);

            const isValid = bcrypt.compareSync(password, details[0].hash);

            if (isValid === true) {

                knex('users')
                    .where({ email: email })
                    .returning('*')
                    .then(data =>{ 
                        console.log(data);
                      response.json(data[0])
                     } );

            }

            else {
                response.status(400).json("Wrong credentials..");
            }



        })
        .catch(err => response.status(400).json("Wrong credentials.."));




})

app.post('/register', (request, response) => {

    const { name, email, password } = request.body;


    const hash = bcrypt.hashSync(password, salt);

    // Using trx as a query builder:
    knex.transaction(function (trx) {

        trx.insert(
            {
                email: email,
                hash: hash
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {

                trx.insert({
                    name: name,
                    email: loginEmail[0].email,
                    joined: new Date()
                })
                    .into('users')
                    .returning('*')
                    .then(user => response.json(user[0]));

            })
            .then(trx.commit)
            .catch(trx.rollback)

    })
        .catch(err => response.status(400).json("Unable to register"));

})

app.get('/profile/:id', (request, response) => {

    const { id } = request.params;

    knex.select('*').from('users').where({ id: id })
        .then(users => {

            if (users.length)
                response.json(users[0]);

            else
                response.status(400).json("Not found");
        });

})

app.put('/image', (request, response) => {

    const { id } = request.body;
    knex('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(item => {

            if (item.length)
                response.json(item[0].entries);

            else
                response.status(400).json("No");
        });


})

app.post('/detectfaces',(request,response)=>{
   
      const {url}=request.body;

      fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", clarifaiSetUp(url))
      .then(response => response.json())
      .then(result=>{
        //   console.log(result.outputs[0].data);
          let obj=result.outputs[0].data
       
             const empty=Object.keys(obj).length === 0;
        
             if (empty)
        response.status(400).json("No face found");
      

        else
        response.json(result);
       

      })
      .catch(err=>response.status(400).json("Internal Server Error"));
        
    

})

app.listen(3000, () => {
    console.log("hiii")
})