const mongoose = require('mongoose');

const mongodbUri = 'mongodb+srv://voidd:YJfzcbpkYrr1lt7u@cluster0.sflqkuj.mongodb.net/';
const databaseName = 'honeyfather';
const collectionName = 'users';

mongoose.connect(`${mongodbUri}${databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose
     .connect(db, {useNewUserParser : true, useUnifinedTopology : true})
     .then((res) => console.log("Connected to DB"))
     .catch((error) => console.log(error))

const dataSchema = new mongoose.Schema({
      id: Number,
      name: String,
      phone: String,
      password : String,
      userInfo : String
    });

class Mongo {
  
    newUser(phone, password) {
      const DataModel = mongoose.model(collectionName, dataSchema);
      const newData = new DataModel({
          key: key,
          value: value,
      });

      newData.save((error, result) => {
          if (error) {
              console.error(`Error inserting data: ${error}`);
          } else {
              console.log(`Data inserted with _id: ${result._id}`);
          }
          mongoose.connection.close();
      });
    }

    generateUserId() {
      const idLength = 8;
      const digits = '0123456789';
      let userId = '';
      
      for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        userId += digits.charAt(randomIndex);
      }
      
      return parseInt(userId, 10); // Преобразование строки в число с основанием 10
    }
    
}