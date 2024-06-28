const Router = require('express').Router;

const routes = new Router();

routes.get("/", (req, res) => {return res.json({OK: true})})

module.exports = routes;
