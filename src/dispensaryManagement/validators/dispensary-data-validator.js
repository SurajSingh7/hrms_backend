import { body , param} from "express-validator";

export const dispensaryLocationValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .escape()
        .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),

    body("location")
        .trim()
        .notEmpty().withMessage("Location is required")
        .escape(),

    body("address")
        .trim()
        .notEmpty().withMessage("Address is required")
        .escape(),

    body("phone")
        .optional()
        .trim()
        .matches(/^\+?[1-9][0-9]{7,14}$/).withMessage("Invalid phone number format"), // Supports international numbers

    body("status")
        .optional()
        .isBoolean().withMessage("Status must be true or false")
        .toBoolean()
];

export const dispensaryLocationIdValidator = [
    param("id")
    .trim()
    .notEmpty().withMessage("Id is required") 
    .isMongoId().withMessage("Invalid MongoDB ObjectId") 
];