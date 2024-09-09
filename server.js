const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const Food = require('./models/food');

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Welcome to the Food App! Go to <a href="/food">Food List</a>');
});

app.get('/food/new', (req, res) => {
    res.render('new');
})

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.post('/food', async (req, res) => {
    try {
        const { name, description, image, calories, isVegetarian} = req.body;

        const newFood = new Food({
            name,
            description,
            image,
            calories: parseInt(calories),
            isVegetarian: isVegetarian === 'on' ? true : false
        })
        await newFood.save();
        res.redirect('/food');
    } catch (err) {
        console.error(err);
        res.status(400).send('Error creating food item');
    }
    }
)

app.get('/food', async (req, res) => {
    try {
        const foods = await Food.find();
        res.render('index', { foods });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching food list');
    }
    }
)

app.put('/food/:id', async (req, res) => {
    try {
      const { name, description, image, calories, isVegetarian } = req.body;
      await Food.findByIdAndUpdate(req.params.id, {
        name,
        description,
        image,
        calories: parseInt(calories),
        isVegetarian: isVegetarian === 'on' ? true : false
      });
      res.redirect('/food');
    } catch (err) {
      res.status(400).send('Error updating food item');
    }
  });

app.delete('/food/"id', async (req, res) => {
    try {
        await Food.findByIdAandDelete(req.params.id);
        res.redirect('/food');
    } catch (err) {
        res.status(400).send('Error deleting food item');
      }
    }
)


app.listen(3000, function() {
    console.log("express server is listening for requests on Port:3000")
})