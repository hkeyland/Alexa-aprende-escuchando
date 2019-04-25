const Alexa = require('ask-sdk');


const { DynamoDbPersistenceAdapter } = require('ask-sdk-dynamodb-persistence-adapter');
const persistenceAdapter = new DynamoDbPersistenceAdapter({
  tableName: 'aask1',
  createTable: true
});


/*-------------
        ABRE LA SKILL
----------------*/
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    const speechOutput = '¡Hola, bienvenido a Aprende Jugando!';
     
    return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(HELP_REPROMPT)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: require('./welcome.json'),
                datasources: {
                    "bodyTemplate6Data": {
                        "type": "object",
                        "objectId": "bt6Sample",
                        "backgroundImage": {
                            "contentDescription": null,
                            "smallSourceUrl": null,
                            "largeSourceUrl": null,
                            "sources": [
                                {
                                    "url": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/cielo2.jpg",
                                    "size": "small",
                                    "widthPixels": 0,
                                    "heightPixels": 0
                                },
                                {
                                    "url": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/cielo2.jpg",
                                    "size": "large",
                                    "widthPixels": 0,
                                    "heightPixels": 0
                                }
                            ]
                        },
                        "image": {
                            "contentDescription": null,
                            "smallSourceUrl": null,
                            "largeSourceUrl": null,
                            "sources": [
                                {
                                    "url": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/cielo2.jpg",
                                    "size": "small",
                                    "widthPixels": 0,
                                    "heightPixels": 0
                                },
                                {
                                    "url": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/cielo2.jpg",
                                    "size": "large",
                                    "widthPixels": 0,
                                    "heightPixels": 0
                                }
                            ]
                        },
                        "textContent": {
                            "primaryText": {
                                "type": "PlainText",
                                "text": "Bienvenido a Aprende Jugando"
                            }
                        },
                        "logoUrl": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/aprende_logo.png",
                        "hintText": "Puedes decir, \"Alexa, empieza una ronda\""
                    }
                }
            })
            .getResponse();
  },
};


/*-------------
        INICIA UNA RONDA DE PREGUNTAS
----------------*/
const RondaIntententHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'RondaIntentent';
  },
  handle(handlerInput) {
    return new Promise((resolve, reject) => {
      handlerInput.attributesManager.getPersistentAttributes()
        .then((attributes) => {
          const speechText = 'aka la bateria';
          
          console.log(attributes);
          
          attributes.datax="Datos aka";
          
          attributes.position = {
            'direction': 'north',
          };
          attributes.usuario = {
            'usuario': 'Beto',
          };

        
    
          
          handlerInput.attributesManager.setPersistentAttributes(attributes);
          handlerInput.attributesManager.savePersistentAttributes();

          resolve(handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(SKILL_NAME, speechText)
            .getResponse());
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};


/*-------------
        MUESTRA EL MAPA
----------------*/
const MapShowIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'MapShowIntent';
  },
  handle(handlerInput) {
   
    const speechOutput = 'Aquí tienes el mapa';

    return handlerInput.responseBuilder
            .speak(`${speechOutput}. ¿Qué mas necesitas?`)
            .reprompt('¿qué mas necesitas?')
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: require('./mapa.json'),
                datasources: {
                    "listTemplate1Metadata": {
                        "type": "object",
                        "objectId": "lt1Metadata",
                        "backgroundImage": {
                            "contentDescription": null,
                            "smallSourceUrl": null,
                            "largeSourceUrl": null,
                            "sources": [
                                {
                                    "url": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/cielo2.jpg",
                                    "size": "small",
                                    "widthPixels": 0,
                                    "heightPixels": 0
                                },
                                {
                                    "url": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/cielo2.jpg",
                                    "size": "large",
                                    "widthPixels": 0,
                                    "heightPixels": 0
                                }
                            ]
                        },
                        "title": "Aprende Jugando - Mapa",
                        "logoUrl": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/aprende_logo.png"
                    },
                    "listTemplate1ListData": {
                        "type": "list",
                        "listId": "lt1Sample",
                        "totalNumberOfItems": 3,
                        "listPage": {
                            "listItems": [
                                {
                                    "listItemIdentifier": "selva",
                                    "ordinalNumber": 1,
                                    "textContent": {
                                        "primaryText": {
                                            "type": "PlainText",
                                            "text": "Selva"
                                        },
                                        "secondaryText": {
                                            "type": "PlainText",
                                            "text": "6 rondas"
                                        },
                                        "tertiaryText": {
                                            "type": "PlainText",
                                            "text": "60 monedas"
                                        }
                                    },
                                    "image": {
                                        "contentDescription": null,
                                        "smallSourceUrl": null,
                                        "largeSourceUrl": null,
                                        "sources": [
                                            {
                                                "url": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/selva.png",
                                                "size": "small",
                                                "widthPixels": 0,
                                                "heightPixels": 0
                                            },
                                            {
                                                "url": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/selva.png",
                                                "size": "large",
                                                "widthPixels": 0,
                                                "heightPixels": 0
                                            }
                                        ]
                                    },
                                    "token": "selva"
                                },
                                {
                                    "listItemIdentifier": "manglar",
                                    "ordinalNumber": 2,
                                    "textContent": {
                                        "primaryText": {
                                            "type": "PlainText",
                                            "text": "Manglar"
                                        },
                                        "secondaryText": {
                                            "type": "RichText",
                                            "text": "6 rondas"
                                        },
                                        "tertiaryText": {
                                            "type": "PlainText",
                                            "text": "70 monedas"
                                        }
                                    },
                                    "image": {
                                        "contentDescription": null,
                                        "smallSourceUrl": null,
                                        "largeSourceUrl": null,
                                        "sources": [
                                            {
                                                "url": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/manglar_2.png",
                                                "size": "small",
                                                "widthPixels": 0,
                                                "heightPixels": 0
                                            },
                                            {
                                                "url": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/manglar_2.png",
                                                "size": "large",
                                                "widthPixels": 0,
                                                "heightPixels": 0
                                            }
                                        ]
                                    },
                                    "token": "manglar"
                                },
                                {
                                    "listItemIdentifier": "desierto",
                                    "ordinalNumber": 3,
                                    "textContent": {
                                        "primaryText": {
                                            "type": "PlainText",
                                            "text": "Desierto"
                                        },
                                        "secondaryText": {
                                            "type": "RichText",
                                            "text": "6 rondas"
                                        },
                                        "tertiaryText": {
                                            "type": "PlainText",
                                            "text": "60 monedas"
                                        }
                                    },
                                    "image": {
                                        "contentDescription": null,
                                        "smallSourceUrl": null,
                                        "largeSourceUrl": null,
                                        "sources": [
                                            {
                                                "url": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/desierto_2.png",
                                                "size": "small",
                                                "widthPixels": 0,
                                                "heightPixels": 0
                                            },
                                            {
                                                "url": "https://s3.us-east-2.amazonaws.com/prueba-angelmuve/desierto_2.png",
                                                "size": "large",
                                                "widthPixels": 0,
                                                "heightPixels": 0
                                            }
                                        ]
                                    },
                                    "token": "desierto"
                                }
                            ]
                        }
                    }
                }
            })
            .getResponse();
  },
};

/*-------------
        AGREGA USUARIO AL JUEGO
----------------*/
const AgregaUsuarioIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'AgregaUsuarioIntent';
  },
 async handle(handlerInput) {
    const attributes = await handlerInput.attributesManager.getPersistentAttributes();
    
    const userName = handlerInput.requestEnvelope.request.intent.slots.user.value;
    
    console.log("Checando valores para "+userName);
    
    console.log(attributes);
    if(attributes.usuarios){
      //Existen usuarios, checa si no es el mismo
      if(attributes.usuarios.includes(userName)){
        //console.log("no puedes agregarlo ya hay uno igual"); 
        let speechText = 'No puedes agregar a '+userName+', intenta jugar con él o ingresa otro nombre. Para jugar con '+userName+' di: jugar como '+userName+'.';
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(SKILL_NAME, speechText)
        .getResponse();
      }
      else{
        //console.log("no es el mismo puedes agregar a la lista");
        var listUsers = attributes.usuarios;
        listUsers.push(userName); 
        attributes.usuarios = listUsers;
        let speechText = 'El usuario '+userName+' se ha agregado, ahora puedes jugar con él. Para jugar di: jugar como '+userName+'.';
        //SAVE
        handlerInput.attributesManager.setPersistentAttributes(attributes);
        await handlerInput.attributesManager.savePersistentAttributes();
        //RESPONSE
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(SKILL_NAME, speechText)
        .getResponse();
      }
    }
    else{
      console.log("0000 sin regsitros agrega sin pex");
      attributes.usuarios = [userName];
      let speechText = 'El usuario '+userName+' se ha agregado, ahora puedes jugar con él. Para jugar di: jugar como '+userName+'.';
      //SAVE
      handlerInput.attributesManager.setPersistentAttributes(attributes);
      await handlerInput.attributesManager.savePersistentAttributes();
      //RESPONSE
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
    }
    //SIMPLE WITHOUT IF
    //handlerInput.attributesManager.setPersistentAttributes(attributes);
    //await handlerInput.attributesManager.savePersistentAttributes();
    /*return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
      */
  },
};

/*-------------
        USA EL USUARIO X PARA JUGAR
----------------*/
const JugarComoIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'JugarComoIntent';
  },
  async handle(handlerInput) {
    const attributes = await handlerInput.attributesManager.getPersistentAttributes();
    const userName = handlerInput.requestEnvelope.request.intent.slots.user.value;
    const speechText="nada";
    
    //Sesiones
    const sess = handlerInput.attributesManager.getSessionAttributes();
    if(sess.userName==userName){
      const speechText='Ya seleccionaste al usuario '+userName+', para empezar el juego di: Inicia una ronda de preguntas.';
      
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
    }
    else{
      //No se ha seclecciona aun un user
      if(attributes.usuarios.includes(userName)){
        //Si esta agregado
        const speechText='Bienvenido '+userName+', ahora puedes iniciar el juego, para empezar di: Inicia una ronda de preguntas. ';
        const sess = handlerInput.attributesManager.getSessionAttributes();
        sess.userName=userName;
        //RESPONSE
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(SKILL_NAME, speechText)
        .getResponse();
      }
      else{
        //No esta gregado
        const speechText='No existe el usuario '+userName+', antes de jugar debes agregarlo, para ello di: Agrega a '+userName+'.';
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(SKILL_NAME, speechText)
        .getResponse();
      
      }
    }
    
  },
};




/*-------------
        MAGICK ERROR
----------------*/
const NoTeEntendiIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'NoTeEntendiIntent';
  },
  handle(handlerInput) {
   
    const speechOutput = 'No entendi lo que dijiste, puedes pedirme ayuda para dercirte que puedes hacer';

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt('aka repromt')
      .withSimpleCard(SKILL_NAME, speechOutput)
      .getResponse();
  },
};


/*-------------
        ALEXAS
----------------*/
const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};
const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};


/*STATIC DATA*/

const SKILL_NAME = 'Aprende y escucha';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'mesaje de ayuda';
const HELP_REPROMPT = 'msg reprompt';
const STOP_MESSAGE = 'adios';

const data = [
  'A year on Mercury is just 88 days long.',
  'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
];

//const skillBuilder = Alexa.SkillBuilders.standard();
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    // list of the handlers
  )
  .withPersistenceAdapter(persistenceAdapter) // <--
  .addErrorHandlers(ErrorHandler)
  .lambda();


exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler, //Apertura de la skill
    AgregaUsuarioIntentHandler, //Agrega usuarios
    JugarComoIntentHandler,//cambia de jugador
    MapShowIntentHandler, //mustra avance en el juego
    RondaIntententHandler,//Inicia ronda de preguntas
    NoTeEntendiIntentHandler,//cualquier cosa que diga el usuario y no entienda
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
