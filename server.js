const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./permission/is_auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);


const db = 'mongodb://localhost/bankingDatabase';
mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true
    }
).then(() => console.log("Connected"))
 .catch(err => console.log(err));

app.listen(4008);
  










































































// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const graphQLServer = require('express-graphql');
// const { buildSchema } = require('graphql');
// const app = express();

// app.use(bodyParser.json());
// const urlEndPoint = 'https://api.chucknorris.io/jokes/';

// let chucknorrisJokes = [];
// axios.get(`${urlEndPoint}categories`).then((response) => {
//     if(response){
//         const data = response.data;
//         data.forEach((element) => {
//             chucknorrisJokes.push(element);
//         });        
//     }
// });

// let category = {}
// getCategory = (args) => {
//     axios.get(`${urlEndPoint}/random?category=${args}`).then((response) => {
//         if(response){
//           category = response.data;
//         }
//     });
// }

// app.use('/graphql', graphQLServer({
//     schema: buildSchema(`

//         type categoryQuery {
//             categories: [String]
//             created_at: String
//             icon_url: String
//             id: String
//             updated_at: String
//             url: String
//             value: String
//         } 

//         type rootQueries {
//             categories: [String!]!
//             category(name: String!): categoryQuery
//         }

//         schema {
//             query: rootQueries
//         }
//     `),
//     rootValue: {
//         categories: () => {
//             return chucknorrisJokes
//         },
//         category: (args) => {
//             const category_name = args.name;
//             getCategory(category_name);
//             if(Object.entries(category).length !== 0){
//               return category
//             } 
//         }
//     },
//     graphiql: true
// }));


// app.listen(3001);