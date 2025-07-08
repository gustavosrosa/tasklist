import { Router } from "express";

const routes = new Router();

routes.get('/teste', (req, res) => {
    return res.json({OK: true});
});

export default routes;