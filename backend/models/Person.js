const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name:                  { type: String },
  iqamaNumber:           { type: String },
  nationality:           { type: String },
  gender:                { type: String },
  jobTitle:              { type: String },
  certificateNumber:     { type: String },
  issueDateHijri:        { type: String },
  issueDateGregorian:    { type: String },
  expiryDateHijri:       { type: String },
  expiryDateGregorian:   { type: String },
  programType:           { type: String },
  programExpiryHijri:    { type: String },
  licenseNumber:         { type: String },
  establishmentName:     { type: String },
  establishmentNumber:   { type: String },
  amanah:                { type: String, default: 'أمانة منطقة الرياض' },
  municipality:          { type: String, default: 'بلدية الرياض' },
  photoUrl:             { type: String },   // Cloudinary secure URL
  createdAt:             { type: Date, default: Date.now },
});

module.exports = mongoose.model('Person', PersonSchema);
