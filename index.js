const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser');
const path = require("path");
const multer = require('multer');
const fs = require("fs")
const crypto = require('crypto');
const UserLogin = require("./logic/userLogin");
const MongoClass  = require("./logic/mongoClass")
const EmailRegistration  = require("./logic/emailRegistration")
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'product_photos'));
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const secretKey = crypto.randomBytes(32).toString('hex');

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

function requireAuth(req, res, next) {
    if (req.path != "/login") {
        if (!req.session.isAuthenticated) {
            req.session.userRole = 'guest';
        }

        if (req.session.isAuthenticated || req.path === `/${req.session.userRole}`) {
            return next();
        } else {
            return res.redirect("/");
        }
    } else {
        return next();
    }
}

function lOut(req, res, next){
  req.session.isAuthenticated = false;
  req.session.userRole = "guest";
  res.redirect('/guest'); 
  next();
}

app.get("/", (req, res) => {
    res.redirect(`/${req.session.userRole}`);
});

app.get("/:role", requireAuth, (req, res) => {
    res.render("index");
});

app.get("/:role/coop",  (req, res) => {
  res.render("coop");
});

app.get("/:role/terms",  (req, res) => {
  res.render("terms");
});

app.get("/:role/market", async (req, res) => {
  const MongoHandler = new MongoClass();
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

app.get('/:role/product_page/:id', async (req, res) => { //ПЕРЕДЕЛАТЬ
  const productId = req.params.id;
  const MongoHandler = new MongoClass();

  try {
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
                      productPhotos: product.photos,
                      productGoods: product.goods,
                      productCooking: product.cooking,
                      projectPath : process.cwd()
                  };

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

app.get('/:role/settings', async (req, res) => {
  if (req.session.userRole === 'a') {
   res.send(`product_manager.ejs`);
 } else {
   res.status(403).send('У вас нет доступа к этой странице');
 }
});

app.post("/add_product", upload.array('files'),(req, res) => {
  try {
    const MongoHandler = new MongoClass();

    const name = req.body.p_name;
    const price = req.body.p_price;
    const categories = req.body.p_categories;
    const description = req.body.p_description;
    const compound = req.body.p_compound;
    const EValue = req.body.p_EValue;
    const proteins = req.body.p_proteins;
    const carbs = req.body.p_carbs;
    const fats = req.body.p_fats;
    const suitability = req.body.p_suitability;
    const mass = req.body.p_mass;
    const goods = req.body.p_goods || null;
    const cooking = req.body.p_cooking || null ;
    const photos = req.files.map(file => file.filename);

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
      res.status(200).json({ success: true, message: "Data received successfully." });
    })
  } catch (error) {
  console.error(error);
  res.status(500).send("Internal Server Error");
}
})

app.post("/login", (req, res) => {
  const userPassword = req.body.password;
  const userName = req.body.username;

  const userLogin = new UserLogin(userName, userPassword);
  userLogin
    .allCheck()
    .then((check) => {
      if (check[0] == true) {
        req.session.isAuthenticated = true; // Система токенов!!!!!!!
        req.session.userRole = check[1].role;
        res.status(200).json({success : true, role : check[1].role});
      } else {
        res.status(400).json({ message: "wrongPasswordOrLogin" });
      }
    })

});

app.post("/logout", lOut, (req, res) => { });

app.post("/reg", upload.none(), async (req, res) => {
  const userName = req.body.username;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const eReg = new EmailRegistration(userName, userPassword, userEmail);
  try {
    const error = await eReg.checkData();
    if (error === null) {
      req.session.email = userEmail; // Надо в будущем будет сделать систему аунтефикации по сеансам/токенам и тогда тут нахуй заменить это
                                     // + тут будет скорее всего загрузка данных о сессии в дб, но пока что пользуемся этим
      res.status(200).json({success : true});
      eReg.sendCode();
    } else {
      res.status(400).json({ message: error });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({success : false});
  }
});

app.post("/reg_code_check", upload.none() , async (req, res) =>{
  const code = req.body.code;
  const email = req.session.email;

  const eReg = new EmailRegistration(null, null, email);
  const data = await eReg.checkCode(code);
  if (data != null){
    const mongoClass = new MongoClass();
    mongoClass.addUser(userName = data["login"], 
                       userPassword = data["password"], 
                       userEmail = data["email"] )
    await eReg.deleteEmailCodes()
    req.session.isAuthenticated = true; // Система токенов!!!!!!!
    req.session.userRole = "u";
    res.status(200).json({success : true});
  } else{
    res.status(400).json({ message: "wrongCode" });
  }
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Connected to http://localhost:${PORT}`);
});
