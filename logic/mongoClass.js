const { MongoClient } = require('mongodb');

class MongoHandler {
  constructor() {
    this.dbName = "honeyfather";
    this.client =  new MongoClient("mongodb://127.0.0.1:27017"); 
    this.collection = null;
  }

  async connect(collectionName) {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
      const db = this.client.db(this.dbName);
      this.collection = db.collection(collectionName);

      console.log(`Collection "${collectionName}" accessed successfully.`);
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    }
  }
  
  async addProduct(
    productPath,
    productName, 
    productPrice, 
    productDescription,  
    productCompound, 
    productValue, 
    productEnergeticValue, 
    productProtein, 
    productFats, 
    productCarbs, 
    productSuitability,
    productMass, 
    productPhotos = "/product_photos/standartPhoto.png",
    productGoods = null, 
    productCooking = null){

    await this.connect("products");
    await this.insertData({
        id : await this.generateId(), 
        path : productPath,
        name: productName,
        price: productPrice,
        description: productDescription,
        compound: productCompound,
        value: productValue,
        energeticValue: productEnergeticValue,
        protein: productProtein,
        fats: productFats,
        carbs: productCarbs,
        suitability: productSuitability,
        mass: productMass,
        photos : productPhotos,
        goods: productGoods,
        cooking: productCooking
    });
  }

  async addUser(username, userpassword, user_role, user_phone = null, user_data = null){
    await this.connect("users");
    await this.insertData({id : await this.generateId(), name : username , password : userpassword, role : user_role, phone: user_phone, userdata : user_data});
  }

  async updateData(collectionName, filter, update) {
    await this.connect(collectionName);

    try {
        const result = await this.collection.updateOne(filter, update);
        console.log(`Данные успешно обновлены. Количество измененных документов: ${result.modifiedCount}`);
    } catch (err) {
        console.error('Ошибка при обновлении данных:', err);
    } finally {
        this.client.close();
    }
  }

  async insertData(data) {
    try {
      const result = await this.collection.insertOne(data);
      console.log(`Данные успешно вставлены. ID вставленного документа: ${result.insertedId}`);
    } catch (err) {
      console.error('Ошибка при вставке данных:', err);
    } finally {
      this.client.close();
    }
  }

  async deleteData(query) {
    try {
      const result = await this.collection.deleteOne(query);
      console.log(`Удалено ${result.deletedCount} документов`);
    } catch (err) {
      console.error('Ошибка при удалении данных:', err);
    } finally {
      this.client.disconnect();
    }
  }

  async getData(collectionName, query) {
    await this.connect(collectionName);
  
    try {
      const result = await this.collection.findOne(query);
      return result
    } catch (err) {
      console.error('Ошибка при получении данных:', err);
    } finally {
      this.client.close();
    }
  }

  async generateId() {
    let generatedId;
    do {
      generatedId = Math.floor(Math.random() * 90000000) + 10000000;
    } while (!(await this.isIdUnique(generatedId)));
    return generatedId;
  }
  
  async isIdUnique(generatedId) {
    const existingDocument = await this.collection.findOne({ id: generatedId });
    return !existingDocument;
  }

  async getProuctsDict(){
    this.connect('products');
    const data = await this.collection.find({}, { projection: { _id: 1, name: 1 } }).toArray();
    const result = {};

    data.forEach(item => {
        result[item.name] = item.id;
    });

    return result;
  }

}

module.exports = MongoHandler;