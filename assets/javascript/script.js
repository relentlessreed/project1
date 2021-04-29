// PART ONE
//------------------------------------------------------------------------------------
// 1. Get API's.
// Fetch Edamam API Call
var randomNumber = Math.floor(Math.random() * 100 + 1);
var APP_ID = "3a299119";
var APP_KEY = "6a46b3e002c78827692dab761f78027c";
// // make query dynamic

//IF NOTHING IS CLICKED SEARCH THIS API
var url = `https://api.edamam.com/search?q=undefined&app_id=${APP_ID}&app_key=${APP_KEY}&from=${randomNumber}`;

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log("data :>> ", data);
    var r = data.hits[0].recipe;
    var recipe = {
      title: r.label,
      hasRecipe: false,
      link: r.url,
      image: r.image,
    };
    console.log(recipe);
  });

console.log(url);

// Edamam Recipe Randomize Function

//	var x = _randomNumberBetween1and200
//	From= x
//	To= x+1

// Data Structure EDAMAM
/*Display Each Recipe Title {
  title: value, cookTime, hasRecipe: T/F, instructions, link, image
} */

// click event listener
var tag_filters = "";
var ingrediants_filters = "";
$("#nextBtn").click(function () {
  console.log("Next button clicked");
  var tags = [];
  var excludeIngredients = [];
  $("input:checked").each(function () {
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
  call_recipes();
});

// Fetch Spoonacular API Call
//https://api.spoonacular.com/recipes/complexSearch?&tags=vegan&excludeIngredients=peanuts&addRecipeInformation=true&number=10&apiKey=b18180e37fa14d5da507e6e986a1a055 //
//api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert
/*https: var url = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}&from=0&to=10`;
fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log("data :>> ", data);
  });*/

function call_recipes() {
  var API_KEY = "3461b5eaec8740babb6ea8db7ec41d11";
  var url1 = `https://api.spoonacular.com/recipes/complexSearch?&tags=`;
  var tags = tag_filters;
  var randomNumber = Math.floor(Math.random() * 100 + 1);
  var ingredients =
    "&intolerances=" + ingredients_filters + "&diet=" + ingredients_filters;
  var url2 = `&addRecipeInformation=true&number=1&offset=${randomNumber}&instructionsRequired=true&apiKey=${API_KEY}`;

  var results = url1 + tags + ingredients + url2;
  console.log(results);
  // https: var url = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}&from=0&to=10`;
  https: var url = results;
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("data :>> ", data);

      return data;
    })
    .then(function (data) {
      var recipe = {
        title: "",
        hasRecipe: "",
        steps: "",
        image: "",
      };
      // Will not need this loop
      for (var i = 0; i < 10; i++) {
        var r = data.results[i];
        if (r) {
          if (r.title || r.image || r.analyzedInstructions[0].steps) {
            recipe.title = r.title;
            recipe.hasRecipe = true;
            recipe.steps = r.analyzedInstructions[0].steps;
            recipe.image = r.image;
            console.log(recipe);
          }
        }
      }
      $("#image").attr("src", recipe.image);
      console.log(recipe);
    });

  // DATA TEST STARTS HERE
  // var validator
}

// $().attr("src", recipe.image)

// Data Structure SPOONACULAR
// data.results[0].
/*Display Each Recipe Title {
  title: value, cookTime, hasRecipe: T/F, instructions, link, image
} */
