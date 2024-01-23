import express from "express";
import { getTasks } from "../controllers";

const router = express.Router();

router.get("/", getTasks);

export default router;
