async function syncRecognizeGCS(
    gcsUri,
    encoding,
    sampleRateHertz,
    languageCode
  ) {
    // [START speech_transcribe_sync_gcs]
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');
  
    // Creates a client
    const client = new speech.SpeechClient();
  
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    //const gcsUri = 'gs://my-bucket/audio.raw';
    const gcsUri ='https://storage.googleapis.com/my-almacenamiento/1614735767236output.mp3';
    https://storage.googleapis.com/my-almacenamiento/1614735767236output.mp3
    https://storage.googleapis.com/my-almacenamiento/1614735767236output.mp3

   gs://my-almacenamiento/1614735767236output.mp3
    // const encoding = 'Encoding of the audio file, e.g. LINEAR16';
    // const sampleRateHertz = 16000;
    // const languageCode = 'BCP-47 language code, e.g. en-US';
  
    const config = {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode,
    };
    const audio = {
      uri: gcsUri,
    };
  
    const request = {
      config: config,
      audio: audio,
    };
  
    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log('Transcription: ', transcription);
    // [END speech_transcribe_sync_gcs]
  }
  



  function syncRecognize() {
    return __awaiter(this, void 0, void 0, function* () {
        // [START speech_transcribe_sync]
        // Imports the Google Cloud client library
        
        
        const fs = require('fs');
        const speech = require('@google-cloud/speech').v1p1beta1;
        // Creates a client
        const client = new speech.SpeechClient({
            keyFilename: 'visio.json'
          });
        /**
         * TODO(developer): Uncomment the following lines before running the sample.
         */
        //const filename = './assets/1614735767236output.mp3';
        const encoding = 'MPEG';
        const sampleRateHertz = 48000;
        const languageCode = 'es-ES';
        const WordConfidence = false;
        const gcsUri ='gs://my-almacenamiento/1614735767236output.mp3';
        const config = {
            encoding: encoding,
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode,
            //modificacion e intervencion de locutores
            enableSpeakerDiarization: true,
            diarizationSpeakerCount: 6,
            enableWordConfidence: WordConfidence
        };
        const audio = {
            //content: fs.readFileSync(filename).toString('base64'),
            uri: gcsUri,
            

        };
        
        const request = {
            config: config,
            audio: audio
        };
        const [response] =  yield client.recognize(request);
        const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
        const confidence = response.results.map((result) => result.alternatives[0].confidence).join(`\n`);
        console.log(`Transcription: ${transcription} \nConfidence: ${confidence}`);
        console.log('Speaker Diarization:');
        const result = response.results[response.results.length - 1];
        const wordsInfo = result.alternatives[0].words;
        wordsInfo.forEach(a =>
  console.log(` word: ${a.word}, speakerTag: ${a.speakerTag}`)
);
    });
}


async function transcribeContextClasses() {
  //const gcsUri = 'gs://my-almacenamiento/1614735767236output.mp3';
  const gcsUri = 'gs://my-almacenamiento/export_ofoct.com.mp3';
  const audio = {
      uri: gcsUri,
  };

  // SpeechContext: to configure your speech_context see:
  // https://cloud.google.com/speech-to-text/docs/reference/rpc/google.cloud.speech.v1#speechcontext
  // Full list of supported phrases(class tokens) here:
  // https://cloud.google.com/speech-to-text/docs/class-tokens
  const speechContext = {
      phrases: ['$TIME'],
  };

  // RecognitionConfig: to configure your encoding and sample_rate_hertz, see:
  // https://cloud.google.com/speech-to-text/docs/reference/rpc/google.cloud.speech.v1#recognitionconfig
  const WordConfidence = false;
  const config = {
      encoding: 'MPEG',
      sampleRateHertz: 48000,
      languageCode: 'en-ES',
      speechContexts: [speechContext],
      enableSpeakerDiarization: true,
      diarizationSpeakerCount: 6,
      enableWordConfidence: WordConfidence


  };

  const request = {
      config: config,
      audio: audio,
  };

  // Detects speech in the audio file.
  const [response] = await client.recognize(request);
  response.results.forEach((result, index) => {
      const transcript = result.alternatives[0].transcript;
      console.log('-'.repeat(20));
      console.log(`First alternative of result ${index}`);
      console.log(`Transcript: ${transcript}`);

  });
}

transcribeContextClasses();

const fs = require('fs');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const filename = 'Local path to audio file, e.g. /path/to/audio.raw';
// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
// const sampleRateHertz = 16000;
// const languageCode = 'BCP-47 language code, e.g. en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: false, // If you want interim results, set this to true
};

// Stream the audio to the Google Cloud Speech API
const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', data => {
    console.log(
      `Transcription: ${data.results[0].alternatives[0].transcript}`
    );
  });

// Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
fs.createReadStream(filename).pipe(recognizeStream);


doc.addSection({
  properties: {},
  children: [
      new docx.Paragraph({
          children: [
              new docx.TextRun("Hello World"),
              new docx.TextRun({
                  text: "Foo Bar",
                  bold: true,
              }),
              new docx.TextRun({
                  text: "\tGithub is the best",
                  bold: true,
              }),
          ],
      }),
  ],
});






const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
var anali="";
var analisis;
anali='\n'+anali+transcription;
analisis=anali;
console.log(`Transcription: ${transcription}`);
console.log('Speaker Diarization:');

const result = response.results[response.results.length - 1];
const wordsInfo = result.alternatives[0].words;
var aux ='';
var flag;
wordsInfo.forEach(a =>
console.log(` word: ${a.word}, speakerTag: ${a.speakerTag}`));
wordsInfo.forEach(a =>

aux=aux+'/\n/'+(` word: ${a.word}, speakerTag: ${a.speakerTag}`)+'/\n/',

);
flag=aux;

const doc = new docx.Document();
doc.addSection({
properties: {},
children: [
new docx.Paragraph({
  children: [
    new docx.TextRun({
    text:analisis,
    break:1}),
    new docx.TextRun({
      text:flag,
      break: 1,
    }),
],
}),
],
});



docx.Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(suma, buffer);
  console.log("Document created successfully");

});
});