import bcrypt from 'bcrypt'

(async () => {
    const hashedPassword = await bcrypt.hash('200420102020T', 12);
    console.log(hashedPassword)
})() //200420102020T

const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Configurar o middleware Multer para lidar com uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Diretório onde os vídeos serão armazenados
  },
  filename: function (req, file, cb) {
    const originalname = path.parse(file.originalname).name;
    const ext = path.extname(file.originalname);
    const filename = `${originalname}_${Date.now()}${ext}`; // Nome do arquivo será o nome original + data atual + extensão
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Rota para lidar com uploads de vídeos
app.post('/api/upload', upload.single('video'), (req, res) => {
  const videoFile = req.file;
  if (!videoFile) {
    return res.status(400).json({ error: 'Nenhum arquivo de vídeo enviado.' });
  }

  // Lógica adicional para processar o arquivo, se necessário

  // Retornar o link direto ou outras informações
  res.status(200).json({ message: 'Upload bem-sucedido', link: `/uploads/${videoFile.filename}` });
});

// Servir arquivos estáticos (vídeos) a partir do diretório de uploads
app.use('/uploads', express.static('uploads'));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
