import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsDir = path.join(__dirname,'..', 'uploads');


if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/; // Tipos de archivo permitidos
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
      return cb(null, true);
  }
  cb('Error: El archivo debe ser una imagen PNG o JPG');
};

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});