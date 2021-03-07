"use strict";
// const fs = require('fs');
// const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
/**
La funcion syncRecognize, es la funcion que se usa para realizar la petición
que realizara el analisis
*/
function syncRecognize() {
  return __awaiter(this, void 0, void 0, function* () {
    // Se importa las librerias que se usan en esta función
    const speech = require('@google-cloud/speech').v1p1beta1;
    const docx = require("docx");
    const fs = require('fs');
    // Se crea el cliente con la credenciales generada en formato json
    const client = new speech.SpeechClient({
      keyFilename: 'visio.json'
    });
    /**
     * Constantes que se usan para realizarla peitción
     */
    // filename se usa cuando el audio a nalizar es un archivo local
    //const filename = './assets/1614735767236output.mp3';
    //encoding; sirve para identificar el estandar de codificación de audio 
    const encoding = 'MPEG';
    // Especifica la tasa de muestreo (en hercios) del audio suministrado
    const sampleRateHertz = 48000;
    //Contiene el idioma + la región/configuración regional que
    //se usará para el reconocimiento de voz del audio suministrado.
    const languageCode = 'es-ES';
    const WordConfidence = false;
    // Para auio largos se usa link en formato gs con umetodo asincrono 
    //audio de 43 min
    const gcsUri = 'gs://my-almacenamiento/1614735767236output.mp3';
    //audio de 16 min
    //const gcsUri = 'gs://my-almacenamiento/16.mp3';
    //Audio de prueba corto
    //const gcsUri = 'gs://my-almacenamiento/mix_08s.mp3';
    const model = 'video';
    const config = {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode,
      alternativeLanguageCodes: ['es-CO', 'es-EC', 'en-US'],
      useEnhanced: true,
      //model: model,
      //modificacion e intervencion de locutores
      enableSpeakerDiarization: true,
      diarizationSpeakerCount: 6,
      enableWordConfidence: WordConfidence,
      enableWordTimeOffsets: true,
    };
    const audio = {
      uri: gcsUri,
    };
    const request = {
      config: config,
      audio: audio,
    };
    // El archivo word se guarda con el nombre en el siguiente formato
    // fechaActual+-analisis+.docx
    const date = new Date();
    const nombre = '-analisis'
    const exte = '.docx';
    const suma = date + nombre + exte;
    console.log(suma);
    const [operation] = yield client.longRunningRecognize(request);
    // Obtenga una representación de Promise del resultado final del trabajo
    const [response] = yield operation.promise();
    var aux = '';
    var flag;
    var aux1 = '';
    var flag1;
    var aux2 = '';
    var flag2;
    var aux3 = '';
    var flag3;
    response.results.forEach(result => {
      console.log(`Transcription: ${result.alternatives[0].transcript}`);
      aux = aux + '\n' + (`Transcription: ${result.alternatives[0].transcript}`) + '\n';
      result.alternatives[0].words.forEach(wordInfo => {
        const startSecs =
          `${wordInfo.startTime.seconds}` +
          '.' +
          wordInfo.startTime.nanos / 100000000;
        const endSecs =
          `${wordInfo.endTime.seconds}` +
          '.' +
          wordInfo.endTime.nanos / 100000000;

        const resultado = response.results[response.results.length - 1];
        const wordsI = resultado.alternatives[0].words;
        wordsI.forEach(a =>

          aux3 =(a.speakerTag),

        );
        //console.log(`Word: ${wordInfo.word}`);
        //console.log(`\t ${startSecs} secs - ${endSecs} secs`);
        aux2 = aux2 + (`Word: ${wordInfo.word}, speakerTag: ${aux3}`)
          + '\n\t' + (` ${startSecs} secs - ${endSecs} secs`) + '\n';
        //aux3 = aux3 + '\n\t' + (` ${startSecs} secs - ${endSecs} secs`) + '\n';
      });
    });
    aux1 = aux1 + aux2 + '\n';
    flag = aux;
    flag1 = aux1;
    console.log(flag);
    console.log(flag1);
    //flag2 = aux2;
    //var flag3 = aux1 + "\t" + aux2;
    const doc = new docx.Document();
    doc.addSection({
      properties: {},
      children: [
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: flag,
              break: 1,
              border: {
                top: {
                  color: "auto",
                  space: 6,
                  value: "single",
                  size: 6,
                },
                bottom: {
                  color: "auto",
                  space: 6,
                  value: "single",
                  size: 6,
                },
              }
            }),
          ],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: flag1,
              break: 1,
              border: {
                top: {
                  color: "auto",
                  space: 6,
                  value: "single",
                  size: 6,
                },
                bottom: {
                  color: "auto",
                  space: 6,
                  value: "single",
                  size: 6,
                },
              }

            }),

          ],
        }),
      ],
    });
    docx.Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(suma, buffer);
      console.log("Document created successfully");
    });
  })
}
syncRecognize();
