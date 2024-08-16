# Сервер API для интернет-магазина Techno Shop и Vue 3 Techno Shop

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

POST /api/order - отправка заказа на сервер

## Запуск API на хостинге:

- Установить Node.js по инструкции хостинга
- Установить pm2: npm install -g pm2
- Выполнить: pm2 startup
- В каталоге API выполнить: pm2 start ecosystem.config.json
- Выполнить: pm2 save
