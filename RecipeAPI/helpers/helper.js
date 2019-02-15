const fs = require('fs');

//searching in the array the last id and increment of 1 to return a new id
const getNewId = (array) => {
  if(array.length > 0) {
    return array[array.length - 1].recipe_id + 1;
  } else {
    return 1;
  }
}

//returns the date of your server in ISO 8601
const newDate = () => new Date.toString();

function mustBeInArray(array, id) {
  return new Promise((resolve, reject) => {
    const recipe = array.find(recipe => recipe.recipe_id === id) //row was the recipe we found, we return that recipe via resolve
    if(!recipe) {
      reject({
        message: `ID of ${id} cannot be found`,
        status: 404
      })
    } else {
      resolve(recipe)
    }
  })
}

//writes a new array in the JSON file data
function writeJSONFile(fileName, content) {
  fs.writeFileSync(fileName.recipes, JSON.stringify(content), 'utf-8',
  (err) => {
    if(err){
      console.log(err);
    }
  }
  )
}

module.exports = {
  getNewId,
  newDate,
  mustBeInArray,
  writeJSONFile
}