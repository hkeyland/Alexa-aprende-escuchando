const Alexa = require('ask-sdk');

/*var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var db = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
*/

const { DynamoDbPersistenceAdapter } = require('ask-sdk-dynamodb-persistence-adapter');
const persistenceAdapter = new DynamoDbPersistenceAdapter({
  tableName: 'aask1',
  createTable: true
});


/*ABRE LA SKILL*/
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    const speechOutput = 'Detalles al abrir la skill';
     
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};


/*INICIA UNA RONDA*/
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

        
          
          /*attributes = {
            'mundo':"Inicio"
          };
          */
          
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

/*MAPA*/
const MapShowIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'MapShowIntent';
  },
  handle(handlerInput) {
   
    const speechOutput = 'Muestra los detalles del mapa';

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt('aka repromt')
      .withSimpleCard(SKILL_NAME, speechOutput)
      .getResponse();
  },
};


/*AGREGA USUARIO */
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

/*JUGAR COMO USUARIO */
const JugarComoIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'JugarComoIntent';
  },
  handle(handlerInput) {
    
    //SESIONS
    //const attributes = handlerInput.attributesManager.getSessionAttributes();
    //SAVE SESIONS
    //attributes.userName="Juan";
    
    
    //const echoID = handlerInput.requestEnvelope.request.requestId;
    const echoID = handlerInput.requestEnvelope.session.user.userId;
    const userName = handlerInput.requestEnvelope.request.intent.slots.user.value;


    const speechText = `Quieres jugar como ${userName} en el dispo ${echoID}. Vamos a checar si ya create el usuario, 
    si no existe se crea y guardo la sesion como este usuario
    `;
    
 
    
    //const userDynamo="Juan";
    //const deviceDynamo="AG4KFOTTZDVFSXNA5WQ4M2AHWR6CI7F6IVBEKI37GJ7XTQCHAICBV63RAZHASEU3W2KRJHSSUK2RVTLGLLDRNUCPDXOGEDK36GLQFHBU76MWPYY7VB2SOHOSNASMAV5CHJ4L3J2G66MNRL4KRRVGTA6DY35LOG6HM6KKKITW32JAE7BAB2ODH72LV343VFEXFR7CTGRQI7B7ZSA";
    
    
    //const speechOutput = 'Ok muy bien vamo a jugar con'+userDynamo;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('aka repromt')
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
      
  },
};





/*NO ENTENDI*/
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



/*DEFAULT*/
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
