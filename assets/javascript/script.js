// PART ONE
//------------------------------------------------------------------------------------
// 1. Get API's.
// Fetch Edamam API Call

var APP_ID = "3a299119";
var APP_KEY = "6a46b3e002c78827692dab761f78027c";
// make query dynamic

var url = `https://api.edamam.com/search?q=undefined&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10`;
fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log("data :>> ", data);
  });

// click event listener
$("#nextBtn").click(function () {
  console.log("Next button clicked");
  getData();
});

// Fetch Spoonacular API Call
var API_KEY = "b18180e37fa14d5da507e6e986a1a055";
//api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert
https: var url = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}&from=0&to=10`;
fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log("data :>> ", data);
  });

function getData() {
  console.log(peanutAllergy.value());
}
// Function to get user input data
var peanutAllergy = $("peanutAllergy");
var seafoodAllergy = $("seafoodAllergy");
var dairyAllergy = $("dairyAllergy");
var gluten = $("gluten");
var vegan = $("vegan");
var kosher = $("kosher");
var vegan = $("vegan");

// Combining API Data
var apiData1 = []; // gonna be filed with api data from the first api
var apiData2 = []; // gonna be filled with data from the second api
var combinedData = apiData1.concat(apidata2); // this will be a combination of literally everything FILTER THIS!! RANDOMIZE THIS!!

// 1a. Perform Seperate Fetches

// 2. Create Variables. (One for each Allergy, One for Each Diet Restriction)

// 2a. Edamame Key (Grant: a22c41f69db53a7d477f0419b6d74735)

// 2b. Spoonacular Key (Ed: b18180e37fa14d5da507e6e986a1a055)

// 3. Console Log Data from Each API.

// 4. Create a place to store data in HTML.

// 4b. Find where Recipes are and grab one from each api.

// 4c. Append Data inside of Div as Elements.

// 5. Create a random recipe grabbing function.

// 5a. Grab 2 recipes from each api.

// 6. Decide what parameters we will need to use from BOTH api's.

// 6a. Give variable names to parameters that we will need to use and call.

// PART TWO
//------------------------------------------------------------------------------------

// 7. Update HTML w/ Page Header and a "Get random Recipe Button"

// 7a. Add Application Description

// PART THREE
//------------------------------------------------------------------------------------

// 8. Insert first Modal via Bootstrap

// 8a. Give Modal Text: "Do you have any allergies? Yes or No"

// 8b. Hide question, Load Checkboxes via bootstrap for allergies.

// 8c. Give modal a submit button.

// 8. Insert second Modal via Bootstrap

// 8a. Give Modal Text: "Do you have any other dietary restrictions? Yes or No"

// 8b. Hide question, Load Checkboxes via bootstrap for dietary restrictions.

// 8c. Give modal a next button.

// PART FOUR
//------------------------------------------------------------------------------------

// 9. Return Randomly Generated Recipe that won't make user sick.

// 9a. If User clicks one or more checkboxes for Allergies + Restrictions Modals:

// Then return API string for recipes excluding user given restrictions (Recipe Filter Function):

// Randomly Picks one recipe from string and appends to screen in a polished manner.
