const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Readable } = require('stream');
const QRCode = require('qrcode');
const cloudinary = require('cloudinary').v2;
const Person = require('../models/Person');

// ── Cloudinary config ──────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,
});

// ── Multer: memory storage (buffer → Cloudinary stream) ───────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('يُسمح برفع الصور فقط'), false);
  },
});

/**
 * Upload buffer to Cloudinary and return secure_url
 */
function uploadToCloudinary(buffer, originalName) {
  return new Promise((resolve, reject) => {
    const publicId = `balady_health/photo_${Date.now()}_${originalName.replace(/\.[^.]+$/, '').replace(/\s+/g, '_')}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id:  publicId,
        folder:     'balady_health',
        resource_type: 'image',
        transformation: [
          { width: 600, height: 800, crop: 'limit', quality: 'auto:good' },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    // Pipe buffer into the upload stream
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
}

// ── POST /api/persons ─────────────────────────────────────────────────────
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const {
      name, iqamaNumber, nationality, gender, jobTitle,
      certificateNumber, issueDateHijri, issueDateGregorian,
      expiryDateHijri, expiryDateGregorian,
      programType, programExpiryHijri,
      licenseNumber, establishmentName, establishmentNumber,
      amanah, municipality,
    } = req.body;

    // Upload photo to Cloudinary if provided
    let photoUrl = null;
    if (req.file) {
      photoUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    }

    const person = new Person({
      name, iqamaNumber, nationality, gender, jobTitle,
      certificateNumber, issueDateHijri, issueDateGregorian,
      expiryDateHijri, expiryDateGregorian,
      programType, programExpiryHijri,
      licenseNumber, establishmentName, establishmentNumber,
      amanah:       amanah       || 'أمانة منطقة الرياض',
      municipality: municipality || 'بلدية الرياض',
      photoUrl,
    });

    const saved = await person.save();

    // Generate QR code pointing to the certificate page
    const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
    const certUrl  = `${BASE_URL}/certificate/${saved._id}`;
    const qrCode   = await QRCode.toDataURL(certUrl, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width:  300,
      color:  { dark: '#000000', light: '#ffffff' },
    });

    return res.status(201).json({ person: saved, qrCode });
  } catch (err) {
    console.error('POST /api/persons error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// ── GET /api/persons/:id ──────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'الشهادة غير موجودة' });
    return res.json(person);
  } catch (err) {
    console.error('GET /api/persons/:id error:', err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
