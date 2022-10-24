let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let notFound = document.querySelector(".not_found");
let defBox = document.querySelector(".def");
let audioBox = document.querySelector(".audio");
let apikey = "2e4bcd5f-7616-4087-8b30-35a16120dbae";
searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    //Get Input Data

//Clear

audioBox.innerHTML="";
notFound.innerText="";
defBox.innerText="";

    let word = input.value;
    // Call Api
    if (word == "") {
        alert("Word is required");
        return;
    }
    getData(word);
})

async function getData(word) {
    // 2e4bcd5f-7616-4087-8b30-35a16120dbae
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`);
    const data = await response.json();

    // if empty result
    if (!data.length) {
        notFound.innerText="No result found"
        return;
    }
   // if result is suggestion
   if(typeof data[0]=="string"){
let heading=document.createElement('p');
heading.innerText="Did you mean ?";
notFound.appendChild(heading);
data.forEach(element => {
    let suggestion=document.createElement('span');
    suggestion.classList.add("suggested");
    suggestion.innerText=element;
    notFound.appendChild(suggestion);
})
return;
   }
   // Result found

   let defination=data[0].shortdef[0];
    defBox.innerText=defination;
    console.log(data);

    // Sound
    const soundName=data[0].hwi.prs[0].sound.audio;
    if(soundName){
        renderSound(soundName);
    }

}
function renderSound(soundName){
    // https://media.merriam-webster.com/soundc11
    let subFolder=soundName.charAt(0);
    let soundSrc=`https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${apikey}`;
    let aud=document.createElement("audio");
    aud.src=soundSrc;
    aud.controls=true;
    audioBox.appendChild(aud);

}