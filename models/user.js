const { Schema, model} = require("mongoose");

const nameSchema = new Schema({
    userName: String,
    crushName: String
})

const coupleModel = new model("coupleData", nameSchema)
module.exports = coupleModel;
