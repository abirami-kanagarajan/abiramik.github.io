let recognition;
let recordedText = "";

// START RECORDING
function startRecording(){

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = true;

recordedText = "";

recognition.start();

recognition.onresult = function(event){

let transcript = event.results[event.results.length - 1][0].transcript;

recordedText += transcript + " ";

document.getElementById("speechText").innerText = recordedText;

};

}


// STOP RECORDING
function stopRecording(){

if(recognition){
recognition.stop();
}

}


// GET AI FEEDBACK
async function getFeedback(){

const apiKey = document.getElementById("apiKey").value;

if(!apiKey){

alert("Please enter OpenAI API key");

return;

}

document.getElementById("aiResponse").innerText="Analyzing speech...";

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
content:"You are an English communication coach. Improve grammar, provide a professional interview version, explain mistakes and give speaking confidence tips."
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



// GENERATE INTERVIEW QUESTION
async function generateQuestion(){

const apiKey = document.getElementById("apiKey").value;

if(!apiKey){

alert("Please enter API key");

return;

}

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
content:"Generate one simple placement interview question for students to practice speaking."
}

]

})

});

const data = await response.json();

document.getElementById("question").innerText =
data.choices[0].message.content;

}
