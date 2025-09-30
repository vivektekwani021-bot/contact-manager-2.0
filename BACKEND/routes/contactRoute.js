const express = require("express");
const { getContacts, createContact , 
    getContact, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middlewares/validateToken");
const router = express.Router();

router.use(validateToken)
router.route("/").get(getContacts).post(createContact)
     
// router.route("/")
//
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// router.route("/:id");

//router.route("/:id");

module.exports = router;
