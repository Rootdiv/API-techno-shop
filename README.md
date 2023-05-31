# Сервер API для интернет-магазина Techno Shop и Techno Shop

Доступные методы:

GET /api/category - получить список категорий

GET /api/goods - получить список товаров

GET /api/goods/{id} - получить товар по его ID

GET /api/goods?{search=""} - найти товар по названию

GET /api/goods?{category=""&maxprice=""} - фильтрация

Параметры:

- category
- color
- minprice
- maxprice
- mindisplay
- maxdisplay

GET /api/goods?{list="{id},{id}"} - получить товары по id

## Запуск API на хостинге:

- Установить Node.js по инструкции хостинга
- Установить pm2: npm install -g pm2
- Выполнить: pm2 startup
- При запуске через https нужно изменить переменные `domain` и `certDir`
- В каталоге API выполнить: pm2 start
- Выполнить: pm2 save
