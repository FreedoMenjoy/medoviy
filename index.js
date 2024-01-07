const express = require("express");
const session = require("express-session");
const path = require("path");
const fs = require("fs")
const crypto = require('crypto');
const uL = require("./logic/userLogin");
const mongo = require("./logic/mongoClass")

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

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

app.get("/:role/profile", (req, res) => {
  res.render("a_profile");
});

app.get("/:role/market", (req, res) => {
  res.render("market");
});

app.post("/check_data", (req, res) => {
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

app.get('/:role/product/:id', async (req, res) => {
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


app.get('/:role/settings', async (req, res) => {
     if (req.session.userRole === 'a') {
      res.send(`product_manager.ejs`);
    } else {
      res.status(403).send('У вас нет доступа к этой странице');
    }
  });

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Connected to http://localhost:${PORT}`);
});
