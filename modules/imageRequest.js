import { readFile } from 'node:fs/promises';

export const imageRequest = async (req, res) => {
  try {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/jpeg');
    const image = await readFile(`.${req.url}`);
    res.end(image);
  } catch (err) {
    console.error(`Ошибка при чтении файла: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Картинка не найдена' }));
  }
};
