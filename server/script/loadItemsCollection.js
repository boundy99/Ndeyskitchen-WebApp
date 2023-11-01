const Item = require('../database/models/itemModel');
const mongoose = require('mongoose');
const chalk = require('chalk');

const image = 'img1.jpeg';

const itemsData = [
  {
    name: 'Chocolate Cake',
    category: 'Sweet',
    filter: 'Cakes',
    components: 'Chocolate filling, vanilla icing',
    price: '20.99',
    image: image,
    alt: 'image',
  },

  {
    name: 'Wrap',
    category: 'Savory',
    filter: 'Wraps',
    components: 'Tomato sauce, cheese',
    price: '10.99',
    image: image,
    alt: 'image',
  },

  {
    name: 'Pumpkin Cake',
    category: 'Sweet',
    filter: 'Cakes',
    components: 'Chocolate filling, chocolate icing',
    price: '15.99',
    image: image,
    alt: 'image',
  },

  {
    name: 'Milkshake',
    category: 'Sweet',
    filter: 'Milkshakes',
    components: 'Vanilla filling, vanilla icing',
    price: 25.99,
    image: image,
    alt: 'image',
  },

  {
    name: 'Vanilla Cake',
    category: 'Sweet',
    filter: 'Cakes',
    components: 'Vanilla filling, vanilla icing',
    price: '25.00',
    image: image,
    alt: 'image',
  },

  {
    name: 'Pizza',
    category: 'Savory',
    filter: 'Pizza',
    components: 'Tomato sauce, cheese',
    price: '20.99',
    image: image,
    alt: 'image',
  },

  {
    name: 'Chicken Wings',
    category: 'Savory',
    filter: 'Wings',
    components: 'BBQ sauce',
    price: '10.99',
    image: image,
    alt: 'image',
  },
];

mongoose
  .connect('mongodb://localhost:27017/TestDatabase')
  .then(() => {
    console.log(chalk.cyan('Database Connection Established'));
  })
  .catch(err => console.log(err));

async function loadItemsCollection() {
  try {
    const result = await Item.insertMany(itemsData);

    if (result) console.log(chalk.yellow('Items data loaded successfully'));
  } catch (err) {
    console.error(`Error inserting documents: ${err.message}`);
  } finally {
    mongoose.connection.close();
  }
}

loadItemsCollection();