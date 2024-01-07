const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

// Создаем объект для вставки
const userObject = {
    "id": 55210106,
    "name": "Another Product",
    "price": 29.99,
    "description": "Another description",
    "compound": "Another compound",
    "value": 200,
    "protein": 20,
    "fats": 10,
    "carbs": 25,
    "suitability": "Another suitability",
    "mass": 1000,
    "photos": "/product_photos/standartPhoto.png",
    "goods": [
      "goodX",
      "goodY"
    ],
    "cooking": "Another cooking instructions",
    "path": "Главная/Мед/Мед подзалупный"
  };

// Подключаемся к базе данных и вставляем объект в коллекцию
async function insertUser() {
  try {
    await client.connect();
    const database = client.db('honeyfather'); // Замените 'honeyfather' на имя вашей базы данных
    const collection = database.collection('products'); // Замените 'users' на имя вашей коллекции

    const result = await collection.insertOne(userObject);
    console.log(`Inserted user with ID: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

// Вызываем функцию для вставки
async function run() {
  try {
    await insertUser();
  } finally {
    await client.close();
  }
}

// Вызываем функцию для вставки
run();