
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 x* This method will pull data from the form
 x* use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 x* then add that data to the kittens list.
 x* Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  let form = event.target;

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "tolerant",
    affection: 5,
  }

  kittens.push(kitten);
  saveKittens()
  form.reset()
  drawKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let savedKittens= JSON.parse(window.localStorage.getItem("kittens"))
  if(savedKittens){
    kittens = savedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
let kittensElement = document.getElementById("kittens")
let kittensTemplate = ""

kittens.forEach(kitten =>{
  kittensTemplate += `
  <div class="kitten-card">
    <div class="kitten ${kitten.mood}">
    <img src=https://robohash.org/${kitten.name}?set=set4 height="200" width="200">
    <h3>Name: ${kitten.name}</h3>
    <h4>Mood: ${kitten.mood}</h4>
    <h4>Affection: ${kitten.affection}</h4>
    <button onclick="pet('${kitten.id}')">Pet</button>
    <button onclick="catnip('${kitten.id}')">Catnip</button>
    </div>
  </div>
  `
})
kittensElement.innerHTML = kittensTemplate

}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  console.log(currentKitten)
  let n = Math.random()
  if (n > .7){
    currentKitten.affection ++;
    setKittenMood(currentKitten)
    saveKittens()
  }else {currentKitten.affection --}
  setKittenMood(currentKitten);
  saveKittens();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
 let currentKitten = findKittenById(id)
 currentKitten.mood= "tolerant"
 currentKitten.affection = 5
 saveKittens()
}
/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  let kittenAffection = kitten.affection;
  if (kittenAffection >= 6){kitten.mood = "happy"}
  if (kittenAffection <= 5){kitten.mood = "tolerant"}
  if (kittenAffection <= 3){kitten.mood = "angry"}
  if (kittenAffection <= 0){kitten.mood = "gone"}
  
}

function getStarted() {
  document.getElementById("welcome").remove();
  loadKittens();
  drawKittens();
}

function clearKittens(){
  if(confirm("Are you sure you want to abandon your kittens?")){
  localStorage.clear()
}
  else{
    return false
  }
  document.getElementById("welcome").remove();
}
/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
