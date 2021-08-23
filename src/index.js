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

dataFetcher(imgUrl, fetchImg);

function fetchBreedInfo(data) {
  const dogBreeds = Object.keys(data.message)
  dogBreeds.forEach( breed => {
    dogBreedsUl.innerHTML += `<li> ${breed} </li>`;
    dogBreedsCollection.push(breed);
  });
};

dataFetcher(breedUrl, fetchBreedInfo)

// Event Listener
breedDropdown.addEventListener('change', event => {
  const breedsFiltered = dogBreedsCollection.filter(a => a[0] == event.target.value)
  dogBreedsUl.innerHTML = '';
  breedsFiltered.forEach( breed => dogBreedsUl.innerHTML += `<li> ${breed} </li>` );
});

});