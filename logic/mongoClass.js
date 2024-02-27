const { MongoClient } = require('mongodb');
const config = require("./config.js")


class MongoHandler {
  constructor() {
    this.dbName = "honeyfather";
    this.client =  new MongoClient(config["MONGO_URI"]); 
    this.collection = null;
  }

  async connect(collectionName) {
    try {
      await this.client.connect();
      const db = this.client.db(this.dbName);
      this.collection = db.collection(collectionName);
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    }
  }
  
  async addProduct(
    productName, 
    productPrice, 
    productCategories,
    productDescription,  
    productCompound, 
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
        name: productName,
        price: productPrice,
        categories : productCategories,
        description: productDescription,
        compound: productCompound,
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

  async addUser(user_name, user_password, user_email, user_role = "u", user_phone = null, user_data = null){
    await this.connect("users");
    await this.insertData({id : await this.generateId(), username : user_name , password : user_password,email : user_email ,role : user_role, phone: user_phone, userdata : user_data});
  }

  async addCategory(name, power, subcategories = null){
    await this.connect("categories");
    await this.insertData({id : await this.generateId(), name : name , power : power, subcategories : subcategories});
  }

  async addRegistartion(email, code, login, password){
    await this.connect("registrations");
    await this.insertData({email : email , code : code, login : login, password: password});
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
    } catch (err) {
      console.error('Ошибка при вставке данных:', err);
    } finally {
      this.client.close();
    }
  }

  async deleteData(collectionName, query) {
    await this.connect(collectionName);

    try {
      const result = await this.collection.deleteOne(query);
    } catch (err) {
      console.error('Ошибка при удалении данных:', err);
    } finally {
      this.client.close();
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

  async getAllData(collectionName) {
    await this.connect(collectionName);

    try {
      const result = await this.collection.find({}).toArray();
      return result;
    } catch (err) {
      console.error('Ошибка при получении всех данных:', err);
    } finally {
      this.client.close();
    }
  }

  async getProductAndCategories(collectionName) {
    await this.connect(collectionName);
  
    try {
      const result = await this.collection.find({}, { projection: { id: 1, category: 1 } }).toArray();
      return result;
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

  filterProductsByDictionary(productCategoryDict, productList) {
    const filteredProducts = productList.filter(product => {
      const productId = product.id;
      const productCategories = product.categories;

      if (productCategoryDict.hasOwnProperty(productId)) {
        return productCategoryDict[productId].some(category => productCategories.includes(category));
      }
      return false;
    });

    return filteredProducts;
  }

}

module.exports = MongoHandler;