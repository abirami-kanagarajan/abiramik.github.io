let recognition;

function startListening(){

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = true;
recognition.interimResults = true;

let finalTranscript = "";

recognition.start();

recognition.onresult = function(event){

let interimTranscript = "";

for(let i = event.resultIndex; i < event.results.length; i++){

let transcript = event.results[i][0].transcript;

if(event.results[i].isFinal){

finalTranscript += transcript;

document.getElementById("speechText").innerText = finalTranscript;

// SEND SPEECH TO AI
sendToAI(finalTranscript);

}else{

interimTranscript += transcript;

}

}

document.getElementById("speechText").innerText =
finalTranscript + interimTranscript;

};

recognition.onerror = function(event){
console.log("Speech recognition error:", event.error);
};

}



async function sendToAI(text){

const apiKey = document.getElementById("apiKey").value;

if(!apiKey){
alert("Please enter OpenAI API key");
return;
}

document.getElementById("aiResponse").innerText = "Analyzing your speech...";

try{

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + apiKey
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[
{
role:"system",
content:"You are an English communication coach helping students improve spoken English for placements. Correct grammar, give a professional version, explain mistakes and give speaking confidence tips."
},
{
role:"user",
content:text
}
]

})

});

const data = await response.json();

if(data.error){
document.getElementById("aiResponse").innerText =
"API Error: " + data.error.message;
return;
}

document.getElementById("aiResponse").innerText =
data.choices[0].message.content;

}catch(error){

document.getElementById("aiResponse").innerText =
"Connection error: " + error;

}

}
