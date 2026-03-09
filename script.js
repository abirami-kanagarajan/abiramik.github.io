let recognition;
let recordedText = "";

// START RECORDING
function startRecording(){

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(!SpeechRecognition){
alert("Speech recognition not supported in this browser. Use Google Chrome.");
return;
}

recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = true;
recognition.interimResults = true;

recordedText = "";

recognition.start();

document.getElementById("speechText").innerText = "Listening...";

recognition.onresult = function(event){

let transcript = "";

for(let i=0;i<event.results.length;i++){
transcript += event.results[i][0].transcript;
}

recordedText = transcript;

document.getElementById("speechText").innerText = recordedText;

};

recognition.onerror = function(event){
console.log("Speech error:",event.error);
};

}


// STOP RECORDING
function stopRecording(){

if(recognition){
recognition.stop();
document.getElementById("speechText").innerText = recordedText;
}

}


// GET AI FEEDBACK
async function getFeedback(){

const apiKey = document.getElementById("apiKey").value;

if(!apiKey){
alert("Please paste your OpenAI API key");
return;
}

if(recordedText==""){
alert("Please record your speech first");
return;
}

document.getElementById("aiResponse").innerText="Analyzing...";

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+apiKey
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[

{
role:"system",
content:"You are an English communication coach. Correct grammar, give professional version, and provide speaking improvement tips."
},

{
role:"user",
content:recordedText
}

]

})

});

const data = await response.json();

document.getElementById("aiResponse").innerText =
data.choices[0].message.content;

}



// GENERATE QUESTION
async function generateQuestion(){

const apiKey = document.getElementById("apiKey").value;

if(!apiKey){
alert("Please enter API key");
return;
}

document.getElementById("question").innerText="Generating question...";

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+apiKey
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[

{
role:"system",
content:"Generate a simple English speaking practice question for placement students."
}

]

})

});

const data = await response.json();

document.getElementById("question").innerText =
data.choices[0].message.content;

}
