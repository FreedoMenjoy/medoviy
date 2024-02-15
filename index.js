const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser');
const path = require("path");
const fs = require("fs")
const crypto = require('crypto');
const uL = require("./logic/userLogin");
const mongo = require("./logic/mongoClass")

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const secretKey = crypto.randomBytes(32).toString('hex');

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

function requireAuth(req, res, next) {
    if (req.path != "/login"){
        if (!req.session.isAuthenticated) {
            req.session.userRole = 'guest';
        }

        if (req.session.isAuthenticated || req.path === `/${req.session.userRole}`) {
            return next();
        } else {
            res.redirect("/");
        }
    } else {
        return next();
    }
}


app.get("/", (req, res) => {
    res.redirect(`/${req.session.userRole}`);
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/:role", requireAuth, (req, res) => {
    res.render("index");
});

app.get("/:role/coop",  (req, res) => {
  res.render("coop");
});

app.get("/:role/market", async (req, res) => {
  const MongoHandler = new mongo();
  try {
    const allProductsData = await MongoHandler.getAllData("products");

    let userRole = req.session.userRole;
    if (userRole == null){
      userRole = "guest" 
    }
    
    const photoList = allProductsData.map(product => product.photos);
    const nameList = allProductsData.map(product => product.name);
    const priceList = allProductsData.map(product => product.price);
    const linkList = allProductsData.map(product => {
        const productId = product.id;
        const link = `/${userRole}/product_page/${productId}`;
        return link;
    });

    res.render("market", {
      productData: JSON.stringify({
        productPhoto: photoList,
        productName: nameList,
        productLink: linkList,
        productPrice: priceList
      })
    });
    
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
  }
});

app.post("/check_login", (req, res) => {
  const userPassword = req.body.password;
  const userName = req.body.username;
  const userLogin = new uL(userName, userPassword);
  userLogin
    .allCheck()
    .then((check) => {
      if (check[0] == true) {
        req.session.isAuthenticated = true;
        req.session.userRole = check[1].role;
        res.redirect(`/${check[1].role}`);
      } else {
        res.redirect("/");
      }
    })
});

app.get('/:role/product_page/:id', async (req, res) => {
  const productId = req.params.id;
  const MongoHandler = new mongo();

  try {
      const htmlFilePath = path.join(__dirname, '/views/product.ejs');
      const htmlFileContent = await fs.promises.readFile(htmlFilePath, 'utf-8');
      await MongoHandler.getData("products", { id: parseInt(productId) }) 
          .then((product) => {
              if (product) {
                  const data = {
                      productPath : product.path,
                      productName: product.name,
                      productPrice: product.price,
                      productDescription: product.description,
                      productCompound: product.compound,
                      productEnergeticValue: product.energeticValue,
                      productProtein: product.protein,
                      productFats: product.fats,
                      productCarbs: product.carbs,
                      productSuitability: product.suitability,
                      productMass: product.mass,
                      productPhotos: product.photos.split(" "),
                      productGoods: product.goods,
                      productCooking: product.cooking,
                      projectPath : process.cwd()
                  };
                  const replacedHtml = Object.keys(data).reduce((acc, key) => {
                      const placeholder = `{{${key}}}`;
                      const value = data[key];
                      return acc.replace(new RegExp(placeholder, 'g'), value);
                  }, htmlFileContent);

                  res.render('product', data);
              } else {
                  res.status(404).send("Product not found");
              }
          })
  } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
  }
});

app.get("/:role/profile", requireAuth, (req, res) => {
  if (req.session.userRole == "a") {
    res.render("a_profile");
  }
});

app.post("/:role/profile", (req, res) => {
    try {
      const MongoHandler = new mongo();
      const formType = req.body.formType;
      if (formType == "products"){
        var name = req.body.p_name;
        var price = req.body.p_price;
        var categories = req.body.p_categories;
        var description = req.body.p_description;
        var compound = req.body.p_compound;
        var EValue = req.body.p_EValue;
        var proteins = req.body.p_proteins;
        var carbs = req.body.p_carbs;
        var fats = req.body.p_fats;
        var suitability = req.body.p_suitability;
        var mass = req.body.p_mass;
        var photos = req.body.photos;
        var goods = req.body.p_goods || null;
        var cooking = req.body.p_cooking || null ;

        MongoHandler.addProduct(
          productName = name,
          productPrice = price,
          productCategories = categories,
          productDescription = description,
          productCompound = compound,
          productEnergeticValue = EValue,
          productProtein = proteins,
          productFats = fats,
          productCarbs = carbs,
          productSuitability = suitability,
          productMass = mass,
          productPhotos = photos,
          productGoods = goods,
          productCooking = cooking
        )
        .then(() => {
          res.json({ success: true, message: "Data received successfully." });
        })
      } else {
        res.status(400).send("Wrong data");
      }
    } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
})

app.get('/:role/settings', async (req, res) => {
     if (req.session.userRole === 'a') {
      res.send(`product_manager.ejs`);
    } else {
      res.status(403).send('У вас нет доступа к этой странице');
    }
  });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Connected to http://localhost:${PORT}`);
});