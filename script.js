function startListening(){

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = true;       // keeps listening
recognition.interimResults = true;   // captures ongoing speech

let finalTranscript = "";

recognition.start();

recognition.onresult = function(event){

let interimTranscript = "";

for(let i = event.resultIndex; i < event.results.length; i++){

let transcript = event.results[i][0].transcript;

if(event.results[i].isFinal){
finalTranscript += transcript;
}else{
interimTranscript += transcript;
}

}

document.getElementById("speechText").innerText =
finalTranscript + interimTranscript;

};

recognition.onend = function(){

if(finalTranscript.length > 5){
sendToAI(finalTranscript);
}

};

recognition.onerror = function(event){
console.log("Speech recognition error:", event.error);
};

}
