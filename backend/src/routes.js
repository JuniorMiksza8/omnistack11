const express = require('express');
const {celebrate,Segments,Joi } = require('celebrate');

const Ongcontroller = require('./controllers/OngController');

const Incidentcontroller = require('./controllers/IncidentController');

const Profilecontroller = require('./controllers/ProfileController');

const Sessioncontroller = require('./controllers/SessionController');
 
const routes = express.Router();

routes.post('/sessions',Sessioncontroller.create);

routes.post('/ongs',celebrate({
  [Segments.BODY]:Joi.object().keys({
    name : Joi.string().required(),
    email : Joi.string().required().email(),
    whatsapp : Joi.number().required().min(10).max(11),
    city : Joi.string().required(),
    uf : Joi.string().required().length(2),
  })
}),Ongcontroller.create);

routes.get('/ongs',Ongcontroller.index);

routes.post('/incidents',Incidentcontroller.create);

routes.get('/incidents',celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page : Joi.number(),
  })
}),Incidentcontroller.index);

routes.delete('/incidents/:id',celebrate({
  [Segments.PARAMS] : Joi.object().keys({
    id : Joi.number().required(),
  })
}),Incidentcontroller.delete);

routes.get('/profile',celebrate({
  [Segments.HEADERS] : Joi.object({
    authorization :  Joi.string().required(),
  }).unknown(),
}),Profilecontroller.index);

module.exports = routes;