// Click event listener for "Get Recipe" button
var tag_filters = "";
var ingredients_filters = "";
var btn_next = $("#nextBtn"); // <----- Rename "#getRecipeBtn"

// On Page load, we check for recipes saved inside of localStorage under the key 'previousRecipes'
// If 'previousRecipes' doesn't exist, we set that to an empty array.
// Then in our api call that we make to spoonacular is where we are going to want to save the data into local storage. (Lines 84-124)
var previousRecipes = JSON.parse(localStorage.getItem("previousRecipes")) || [];

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
  var API_KEY = "3461b5eaec8740babb6ea8db7ec41d11";
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
      $(`<a href="${r.sourceUrl}"> ${recipe.title}<a/>`).appendTo(
        "#previouslySearched"
      );
      // Clear Local Storage on Button Click
      $("#clearBtn").click(function (e) {
        localStorage.clear();
        //removes any children within parent
        $("#previouslySearched").empty();
      });

      localStorage.setItem("previousRecipes", JSON.stringify(previousRecipes));

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
