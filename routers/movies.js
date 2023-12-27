import { Router } from "express";

import { Require } from "../Require.js";

const movies = Require('../pokemon/movies.json')
const router = Router();

router.get("/", (req, res) => {
    res.json(movies);
});