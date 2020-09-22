'use strict';

const dogList = document.getElementById('dogList');
const btn = document.getElementById('addBtn');
const url = 'https://dog.ceo/api/breeds/image/random';
const options = {
  method: 'GET'
};

function fetchDog(url, options){
  return fetch(url, options)
  .then( response => response.json());
}

async function fetchDogImage(url, options){
  const DogImage = await fetchDog(url, options);
  return DogImage;
}

async function addDog(){
  for (let i = 0; i < 50; i++) {
    const newDog = await fetchDogImage(url, options);
    const dog = document.createElement('img');
    dog.src = newDog.message;
    dogList.appendChild(dog);


    const options2 = {
      threshold:0.5,
      rootMargin:'-20%'
    };
    const observer = new IntersectionObserver(callback, options2);
    const targets = document.querySelectorAll('img');
    targets.forEach(target => observer.observe(target));
    
    function callback(entries){
      entries.forEach( entry =>{
        console.log(entry);
        if(entry.isIntersecting){
          entry.target.classList.add('show');
        }
      });
    }

  }
}

window.addEventListener('load', addDog);
btn.addEventListener('click', addDog);









