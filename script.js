let recognition;

// START SPEECH RECORDING
function startListening(){

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = true;
recognition.interimResults = true;

let finalTranscript = "";

recognition.start();

recognition.onresult = function(event){

for(let i = event.resultIndex; i < event.results.length; i++){

let transcript = event.results[i][0].transcript;

if(event.results[i].isFinal){

finalTranscript += transcript;

document.getElementById("speechText").innerText = finalTranscript;

// SEND TEXT TO AI
sendToAI(finalTranscript);

}

}

};

recognition.onerror = function(event){
console.log("Speech error:", event.error);
};

}



// SEND SPEECH TO OPENAI
async function sendToAI(text){

const apiKey = document.getElementById("apiKey").value;

if(!apiKey){
alert("Please enter OpenAI API key");
return;
}

document.getElementById("aiResponse").innerText = "Analyzing speech...";

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
content:"You are an English communication coach for placement students. Correct grammar, give a professional version, explain mistakes and provide communication improvement tips."
},
{
role:"user",
content:text
}
]

})

});

const data = await response.json();

document.getElementById("aiResponse").innerText =
data.choices[0].message.content;

}catch(error){

document.getElementById("aiResponse").innerText =
"Error connecting to AI: " + error;

}

}



// GENERATE INTERVIEW QUESTION
async function loadQuestion(){

const apiKey = document.getElementById("apiKey").value;

if(!apiKey){
alert("Please enter API key");
return;
}

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
content:"Generate one placement interview question for students."
}
]

})

});

const data = await response.json();

document.getElementById("question").innerText =
data.choices[0].message.content;

}
