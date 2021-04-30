// Click event listener for "Get Recipe" button
var tag_filters = "";
var ingredients_filters = "";
var btn_next = $("#nextBtn"); // <----- Rename "#getRecipeBtn"

// On Page load, we check for recipes saved inside of localStorage under the key 'previousRecipes'
// If 'previousRecipes' doesn't exist, we set that to an empty array.
// Then in our api call that we make to spoonacular is where we are going to want to save the data into local storage. (Lines 84-124)
var previousRecipes = JSON.parse(localStorage.getItem("previousRecipes")) || [];

// For loop
function getPreviousRecipeUrls(data) {
  for (i = 0; i < 5; i++) {
    $(`#card${i + 1}`).empty();
    $(`#card${i + 1}`).append(`<div id="appendedCard${i}"></div>`);
    var fiveDayDiv = $(`#appendedCard${i}`);
    fiveDayDiv.append(
      `<h3>${dayjs.unix(data.daily[i].dt).format("dddd MM/DD/YYYY")}</h3>`
    );
    fiveDayDiv.append(
      `<img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png" alt="${data.daily[i].weather[0].description}">`
    );
    fiveDayDiv.append(`<p>Temperature: ${data.daily[i].temp.max}</p>`);
    fiveDayDiv.append(`<p>Wind Speed: ${data.daily[i].wind_speed}</p>`);
    fiveDayDiv.append(`<p>Humidity: ${data.daily[i].humidity}</p>`);
  }
}

$("#nextBtn").click(function (e) {
  // Prevents the form from triggering its default behavior
  e.preventDefault();
  console.log("Next button clicked");
  var tags = [];
  var excludeIngredients = [];
  var counter = 0;
  $("input:checked").each(function () {
    counter++;
    if ($(this).val() == "vegan" || $(this).val() == "vegetarian") {
      tags.push($(this).val());
    } else {
      excludeIngredients.push($(this).val());
    }
    console.log("User selected: " + $(this).val());
  });
  // console.log(tags.join(","));
  // console.log(excludeIngredients.join(","));

  //includes tag seperated by commas
  tag_filters = tags.join(",");

  //includes ingredients by commas
  ingredients_filters = excludeIngredients.join(",");
  if (!counter) {
    // Edamam API call
    call_Edamam();
    console.log("Edamam Api Call Needed");
  } else {
    call_Spoonacular(tag_filters);
  }
});

function call_Edamam() {
  // Random number generator used to gather a random recipe from the Edamam API
  var randomNumber = Math.floor(Math.random() * 100 + 1);
  var APP_ID = "3a299119";
  var APP_KEY = "6a46b3e002c78827692dab761f78027c";

  // If user does not give any data input but clicks "Get Recipe" button, random recipe is grabbed from Edamam API
  var url = `https://api.edamam.com/search?q=undefined&app_id=${APP_ID}&app_key=${APP_KEY}&from=${randomNumber}`;
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("data :>> ", data);

      return data;
    })
    .then(function (data) {
      var r = data.hits[0].recipe;
      var recipe = {
        title: r.label,
        hasRecipe: false,
        link: r.shareAs,
        image: r.image,
      };

      // Appending random Spoonacular recipe Image and Title to Dom
      $("#image").attr("src", recipe.image);
      $("#image").attr("alt", recipe.title);
      $("#title").text(recipe.title);
      console.log(data);
      // Displaying Edamam link
      $(`<a href="${recipe.link}"> ${recipe.title}<a/>`).appendTo("#steps");
      // Toggles modal off when user clicks "Get Recipe"
      $("#myModal").modal("toggle");
    });
}

function call_Spoonacular(tags) {
  var API_KEY = "b18180e37fa14d5da507e6e986a1a055";
  var url = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1&tags=${tags}`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("data :>> ", data);

      return data;
    })
    .then(function (data) {
      var r = data.recipes[0];
      console.log(data);
      var recipe = {
        title: r.title,
        hasRecipe: true,
        steps: r.analyzedInstructions[0].steps,
        image: r.image,
      };
      // Appending random Spoonacular recipe Image and Title to DOM
      $("#image").attr("src", recipe.image);
      $("#image").attr("alt", recipe.title);
      $("#title").text(recipe.title);
      console.log(data);
      // Giving recipe steps text a place to go
      document.querySelector("#steps").innerHTML = makeStepsElement(
        recipe.steps
      );

      $("#previouslySearched").text(recipe.title);
      $("#previouslySearched").text(recipe.sourceUrl);
      console.log(r);

      previousRecipes.push({
        title: r.title,
        sourceUrl: r.sourceUrl,
      });
      $(`<a href="${recipe.sourceUrl}"> ${recipe.title}<a/>`).appendTo(
        "#previouslySearched"
      );
      // Clear Local Storage on Button Click
      $("#clearBtn").click(function (e) {
        localStorage.clear();
        //removes any children within parent
        $("#previouslySearched").empty();
      });

      localStorage.setItem("previousRecipes", JSON.stringify(previousRecipes));
      /*At the end of our spoonacular api call we could do something like this.
      We grab a bunch of information(WE ONLY NEED THE URL) on the recipe and whatever we want to store we push it into previousRecipes
      Then we make sure to save localStorage afterwards.
      If everything goes well you should be left with an array where each element in that array is a different recipe.
      This should get your data into the right place. After that is just a matter of writing the code that uses the data to append the cards.
      Its all pretty similar to the high scores part of the javascript quiz homework*/

      /* • Module 3.5.8: Save and Load the High Score
     This will have the relevant information for working with local storage.*/

      // Toggles modal off when user clicks "Get Recipe"
      $("#myModal").modal("toggle");
    });
}

// Appending random Spoonacular recipe steps to DOM
function makeStepsElement(steps) {
  let _steps = steps.map((step_item) => {
    return `<li>Step ${step_item.number}: ${step_item.step}</li>`;
  });

  _steps = `<ul>${_steps.join("")}</ul>`;
  return _steps;
}

// ICE BOX
//var history = localStorage.getItem('');

// Saving previous recipes to Local Storage
localStorage.setItem();

/*Appending data to a localStorage() array #
If you’re storing collections of data, it might make more sense to use an array.
Similar to the example above, we’ll first check to see if the item already exists. 
localStorage() only stores string values. If there’s already saved data, we’ll convert it to an array. 
Otherwise, we’ll create one.
Then, we’ll push our new value to the array and save it back to localStorage(), running it through toString() to convert it back to a string.*/

// Get the existing data
var existing = localStorage.getItem("myFavoriteSandwich");

// If no existing data, create an array
// Otherwise, convert the localStorage string to an array
existing = existing ? existing.split(",") : [];

// Add new data to localStorage Array
existing.push("tuna");

// Save back to localStorage
localStorage.setItem("myFavoriteSandwich", existing.toString());
