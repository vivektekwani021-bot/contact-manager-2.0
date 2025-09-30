// const mongoose = require("mongoose");


// const contactSchema = mongoose.Schema({
//       user_id:{
//        type: mongoose.Schema.Types.ObjectId,
//        requierd: true,
//        ref: "User",
//       },
//   name: {
//     type: String,
//     required: [true, "Please add the contact name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please add the contact email address"],
//   },
//   phone: {
//     type: String,
//     required: [true, "Please add the contact phone number"],
//   },

// },
// {
//     Timestamps: true
// }
// );
// module.exports = mongoose.model("contact" , contactSchema)
const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  // user_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true, // <-- fixed typo
  //   ref: "User",
  // },
  name: {
    type: String,
    required: [true, "Please add the contact name"],
  },
  email: {
    type: String,
    required: [true, "Please add the contact email address"],
  },
  phone: {
    type: String,
    required: [true, "Please add the contact phone number"],
  },
},
{
  timestamps: true // <-- fixed typo
}
);

module.exports = mongoose.model("contact", contactSchema);