var Brands = require("../models/brands");

const { param, body, validationResult } = require("express-validator");

// Create
exports.create = [
  // Check validation
  body("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("brand_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("The brand name must be specified")
    .isAlphanumeric()
    .withMessage("Brand name has non-alphanumeric characters."),

  body("creator_fullname")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Creator full name must be specified.")
    .isAlphanumeric()
    .withMessage("Creator full name has non-alphanumeric characters."),

  body("type_of_car")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("type of car must be specified."),

  body("contact_email").isEmail().withMessage("Invalid email"),

  body("creationDate", "Invalid date of creation")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process Request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create student object with escaped and trimmed data
    var brand = new Brand({
      _id: req.body.id,
      brand_name: req.body.brand_name,
      creator_fullname: req.body.creator_fullname,
      type_of_car: req.body.type_of_car,
      contact_email: req.body.contact_email,
      creationDate: req.body.creationDate,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      brand.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Brand created successfully !");
      });
    }
  },
];

// Read
exports.getAll = function (req, res, next) {
  Brands.find().exec(function (err, result) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
};

exports.getById = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Brands.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
      });
    }
  },
];

// Delete
exports.delete = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Brands.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("Brand deleted successfully !");
      });
    }
  },
];

// Update
exports.update = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),

  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters."),

  body("class")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified."),

  body("email").isEmail().withMessage("Invalid email"),

  body("dateOfBirth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create student object with escaped and trimmed data
    var brand = new Brand({
      _id: req.params.id,
      brand_name: req.body.brand_name,
      creator_fullname: req.body.creator_fullname,
      type_of_car: req.body.type_of_car,
      contact_email: req.body.contact_email,
      creationDate: req.body.creationDate,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Brands.findByIdAndUpdate(req.params.id, brand, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Brand updated successfully !");
      });
    }
  },
];
