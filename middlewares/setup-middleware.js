import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

export const setupMiddleware = (app) => {
    app.use(express.json({ limit: "500mb" }));
    app.use(express.urlencoded({ limit: "500mb", extended: true }));
    app.use(cookieParser());
    app.use(bodyParser.json());
};