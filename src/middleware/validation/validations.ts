import { body } from "express-validator";

export const userDataValidation = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("User name is required")
    .isString()
    .withMessage("User name should be string")
    .isLength({ min: 5 })
    .withMessage("Name should be at least 5 characters"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),
  body("email").optional().isEmail().withMessage("Provide valid email"),
];

export const userLogingValidation = [
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),
  body("email").optional().isEmail().withMessage("Provide valid email"),
];

export const workspaceDataValidation = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name should be string")
    .isLength({ min: 5 })
    .withMessage("Name should be at least 5 characters"),
  body("slag")
    .exists()
    .withMessage("Slag is required")
    .isString()
    .withMessage("Slag should be string")
    .isLength({ min: 5 })
    .withMessage("Slag should be at least 5 characters"),
];

export const workspaceChannelValidation = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name should be string")
    .isLength({ min: 3 })
    .withMessage("Name should be at least 3 characters"),
];
