const { Schema, model} = require("mongoose");

const nameSchema = new Schema({
    userName: {type: String, unique: true}
    crushName: {type: String, unique: true}
})

const coupleModel = new model("coupleData", nameSchema)
module.exports = coupleModel;
