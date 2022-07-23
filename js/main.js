const apiKey = "HKvi5vMfMbITUJitY7cCocMFP4BaTzfsAIYnqQtV";
const title = document.querySelector('h1');
const apod = document.querySelector('img');
const explainToMe = document.querySelector('p');
let video = document.querySelector('iframe');
let myDate = document.querySelector('input');
const defaultDate = document.querySelector('input').value;
myDate.onchange = myApod;

defaultValues();

function defaultValues(){
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${defaultDate}`)
.then(function(response){
  return response.json();
})
.then(data => {
  console.log(data);
  title.innerText = data.title;
  apod.src = data.url;
  apod.alt = "Space";
  explainToMe.innerText = data.explanation;
})

.catch(error =>{
  console.log(`Error: ${error}`);
})
}


function myApod(){
fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${myDate.value}`)
.then(function(response){
  return response.json();
})
.then(data => {
  console.log(data);
  if(data.code == 400){
    defaultValues();
    alert(data.msg);
  }
  if(data.media_type != "image"){
    apod.classList.add('hideIt');
    video.src = data.url;
    video.classList.remove('hideIt');
  }
  else{
    apod.classList.remove('hideIt');
    video.classList.add('hideIt');
  }
  title.innerText = data.title;
  apod.src = data.url;
  apod.alt = "Space";
  explainToMe.innerText = data.explanation;
})

.catch(error =>{
  console.log(`Error: ${error}`);
})
}
