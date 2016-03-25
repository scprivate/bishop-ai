var $q = require('q');
var watson = require('watson-developer-cloud');

var configuration = require('./../ai/configuration');
var TTS = require('./../ai/tts');

var TTSWatson = function () {
    TTS.call(this);
    this.engine = watson.text_to_speech({
        version: 'v1',
        username: configuration.settings.tts.watson.username,
        password: configuration.settings.tts.watson.password
    });

    this.voices = [
        {
            "name": "en-US_AllisonVoice",
            "language": "en-US",
            "customizable": true,
            "gender": "female",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/en-US_AllisonVoice",
            "description": "Allison: American English female voice."
        },
        {
            "name": "en-US_LisaVoice",
            "language": "en-US",
            "customizable": true,
            "gender": "female",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/en-US_LisaVoice",
            "description": "Lisa: American English female voice."
        },
        {
            "name": "en-US_MichaelVoice",
            "language": "en-US",
            "customizable": true,
            "gender": "male",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/en-US_MichaelVoice",
            "description": "Michael: American English male voice."
        },
        {
            "name": "en-GB_KateVoice",
            "language": "en-GB",
            "customizable": false,
            "gender": "female",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/en-GB_KateVoice",
            "description": "Kate: British English female voice."
        },
        {
            "name": "fr-FR_ReneeVoice",
            "language": "fr-FR",
            "customizable": false,
            "gender": "female",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/fr-FR_ReneeVoice",
            "description": "Renee: French (français) female voice."
        },
        {
            "name": "de-DE_BirgitVoice",
            "language": "de-DE",
            "customizable": false,
            "gender": "female",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/de-DE_BirgitVoice",
            "description": "Birgit: Standard German of Germany (Standarddeutsch) female voice."
        },
        {
            "name": "de-DE_DieterVoice",
            "language": "de-DE",
            "customizable": false,
            "gender": "male",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/de-DE_DieterVoice",
            "description": "Dieter: Standard German of Germany (Standarddeutsch) male voice."
        },
        {
            "name": "it-IT_FrancescaVoice",
            "language": "it-IT",
            "customizable": false,
            "gender": "female",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/it-IT_FrancescaVoice",
            "description": "Francesca: Italian (italiano) female voice."
        },
        {
            "name": "ja-JP_EmiVoice",
            "language": "ja-JP",
            "customizable": false,
            "gender": "female",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/ja-JP_EmiVoice",
            "description": "Emi: Japanese (日本語) female voice."
        },
        {
            "name": "pt-BR_IsabelaVoice",
            "language": "pt-BR",
            "customizable": false,
            "gender": "female",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/pt-BR_IsabelaVoice",
            "description": "Isabela: Brazilian Portuguese (português brasileiro) female voice."
        },
        {
            "name": "es-ES_EnriqueVoice",
            "language": "es-ES",
            "customizable": false,
            "gender": "male",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/es-ES_EnriqueVoice",
            "description": "Enrique: Castilian Spanish (español castellano) male voice."
        },
        {
            "name": "es-ES_LauraVoice",
            "language": "es-ES",
            "customizable": false,
            "gender": "female",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/es-ES_LauraVoice",
            "description": "Laura: Castilian Spanish (español castellano) female voice."
        },
        {
            "name": "es-US_SofiaVoice",
            "language": "es-US",
            "customizable": false,
            "gender": "female",
            "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/es-US_SofiaVoice",
            "description": "Sofia: North American Spanish (español norteamericano) female voice."
        }
    ];
    this.voice = configuration.settings.tts.watson.voice || this.voices[0].name;
};

TTSWatson.prototype = Object.create(TTS.prototype);
TTSWatson.prototype.constructor = TTS;

TTSWatson.prototype.getStream = function (text) {
    var dfd = $q.defer();
    var transcript = this.engine.synthesize({
        text: text,
        voice: this.voice,
        accept: 'audio/wav'
    });
    dfd.resolve(transcript);

    return dfd.promise;
};

module.exports = TTSWatson;