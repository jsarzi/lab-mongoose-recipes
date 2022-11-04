const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    const newReceipe = new Recipe({
      title: "Crêpe",
      level: "Easy Peasy",
      ingredients: ["eggs", "milk", "flour", "rhum"],
      cuisine: "French",
      dishType: "dessert",
      duration: 15,
      creator: "justine",
    });
    const crepe = await Recipe.create(newReceipe);
    const allrecipes = await Recipe.insertMany(data);
    let updateOne = await Recipe.findOneAndUpdate(
      {
        title: "Rigatoni alla Genovese",
      },
      {
        duration: 100,
      }
    );
    await Recipe.deleteOne({ title: "Carrot Cake" });
    await mongoose.disconnect();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
