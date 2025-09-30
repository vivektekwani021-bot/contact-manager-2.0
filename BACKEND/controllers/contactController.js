const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")
// @desc Get all contacts
// @route GET /api/contacts/ 
// @access Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id:req.user.id}) 
  res.json(contacts);
});

// @desc Create contact
// @route POST /api/contacts
// @access Private
const createContact = asyncHandler(async (req, res) => {
  console.log("createdContact is", req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!!");
  }
const contact = await Contact.create({
  name,
  email,
  phone,
  user_id: req.user.id
});

res.status(201).json(contact);

  //res.status(200).json({ message: "create contacts" });
});

// @desc Get single contact
// @route GET /api/contact/:id
// @access Private
const getContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id)
   if(!contact)
   {
    res.status(404);
    if(!contact){
      
    }
    throw new Error("contact not found")
   }
   
  res.json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access Private


const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesn't have permission to update other users' contacts");
}

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});


// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
  try
  {
    const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesn't have permission to update other users' contacts");
}

  await contact.deleteOne();

  res.status(200).json(contact);
  } catch(e) {
    console.log(e);
  }
});

// const updateContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);

//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }

//   const updatedContact = await Contact.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   res.status(200).json(updatedContact);
// });

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
