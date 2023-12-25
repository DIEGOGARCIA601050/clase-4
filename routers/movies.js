import { Router } from "express";

import { require } from "../express";

const movies = require('../pokemon/movies.json')
const router = Router();

router.get("/m", (req, res) => {
    res.json(movies);
});