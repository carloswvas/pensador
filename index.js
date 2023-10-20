const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const app = express();

const conn = require("./db/conn");

// Import Models
const User = require('./models/User')
const Tought = require('./models/Tought')

// Import Rotas
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRouters = require('./routes/authRouters')

// Import Controller
const ToughtController = require('./controllers/ToughtController')

//Configurar engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//Configurar JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware para as sessões
app.use(
  session({
    name: "session",
    secret: "nosso_secret", //Quanto maior a a crypto melhor
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

//Importar as flash
app.use(flash());

// Importar os arquivos estáticos
app.use(express.static("public"));

// Armazenar as sessões nas rotas
app.use((request, response, next) => {
  if (request.session.userId) {
    response.locals.session = request.session;
  }
  next();
});

// Rotas
app.use('/toughts', toughtsRoutes)
app.use('/', authRouters)

app.get('/', ToughtController.showToughts) //Página HOME

//Conexão e criação das tabelas do banco
conn
  // .sync({force:true})
  .sync()
  .then(() => {
    app.listen(3333);
  })
  .catch((err) => console.log(err));
