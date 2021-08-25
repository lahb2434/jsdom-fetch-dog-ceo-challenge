console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const dogBreedsUl = document.getElementById('dog-breeds')
const dogBreedsCollection = [];
const breedDropdown = document.getElementById('breed-dropdown')

function dataFetcher(url, pageSetupFunc) {   
  fetch(url)
    .then(response => response.json())
    .then(data => pageSetupFunc(data));
};

function fetchImg(data){
  data.message.forEach( img => {
    const image = document.createElement('img');
    image.src  = img;
    document.getElementById('dog-image-container').appendChild(image);
  });
};

function fetchBreedInfo(data) {
  const dogBreeds = Object.keys(data.message)
  dogBreeds.forEach( breed => {
    postBreed(breed)
    dogBreedsCollection.push(breed);
  });
};

function postBreed(breed) {
    const li = document.createElement("li");
    li.innerHTML = breed;
    li.addEventListener("click", changeColor);
    dogBreedsUl.appendChild(li)
};
      
function changeColor(event) {
  event.target.style.color = "yellowgreen";
};


dataFetcher(imgUrl, fetchImg);
dataFetcher(breedUrl, fetchBreedInfo);

// Event Listener
breedDropdown.addEventListener('change', event => {
  const breedsFiltered = dogBreedsCollection.filter(breed => breed.startsWith(event.target.value));
  dogBreedsUl.innerHTML = '';
  breedsFiltered.forEach( breed => postBreed(breed));
});

});

