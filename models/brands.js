// https://mongoosejs.com/docs/schematypes.html
var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var formatDate = function () {
  return DateTime.fromJSDate(this.dateOfBirth).toISODate();
};

var brandSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  brand_name: { type: String, required: true },
  creator_fullname: { type: String, required: true },
  type_of_car: { type: String, required: true, enum: ["Luxe", "Sport", "Polyvalent"] },
  contact_email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  creationDate: {
    type: Date,
    required: true,
    transform: (x) => DateTime.fromJSDate(x).toISODate(),
  },
});

brandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

brandSchema.virtual("id").get(function () {
  return this._id;
});

// Export model.
module.exports = mongoose.model("brands", brandSchema);