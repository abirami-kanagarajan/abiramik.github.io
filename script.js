function startListening(){

const recognition = new webkitSpeechRecognition();

recognition.lang = "en-US";

recognition.start();

recognition.onresult = function(event){

const speech = event.results[0][0].transcript;

document.getElementById("speechText").innerText = speech;

sendToAI(speech);

};

}


async function sendToAI(text){

const apiKey = document.getElementById("apiKey").value;

if(!apiKey){
alert("Please enter OpenAI API Key");
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
content:`You are an English communication coach helping college students improve speaking for placements.

Analyze the student's spoken sentence and provide:

1. Grammar corrections
2. Improved professional version
3. Explanation of mistakes
4. Pronunciation advice
5. Confidence tips
6. Fluency score out of 100

Encourage the student politely.`
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

}



async function loadQuestion(){

const apiKey = document.getElementById("apiKey").value;

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
content:"Generate one interview speaking practice question for college students."
}

]

})

});

const data = await response.json();

document.getElementById("question").innerText =
data.choices[0].message.content;

}
