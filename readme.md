# laravel_test_polis.online 
Блог с комментариями на Laravel, WIP

## Установка

### Требования
* Docker
* Docker Compose

## todo

 - вписать сюда актуальные инструкции по деплою
 - permissions.sh
 - only_first_time.sh

### Запуск

1. Клонировать репозиторий
```bash
git clone <ссылка на репозиторий>
cd проект
```

2. Установить зависимости
```bash
docker compose up -d --build
docker compose exec app composer install
docker compose exec app npm install
```

3. Настроить окружение
```bash
cp .env.example .env
```

4. Выполнить миграции и сидеры
```bash
docker-compose exec app php artisan migrate
docker-compose exec app php artisan db:seed
```

5. Запустить приложение
```bash
docker-compose up -d
```

Приложение будет доступно по адресу http://localhost

## API документация

### Статьи
* **GET /api/articles** - получить список статей
* **GET /api/articles/{id}** - получить статью по ID
* **POST /api/articles** - создать новую статью
* **POST /api/articles/{id}/comments** - добавить комментарий к статье

### Модель Article
* id
* title
* content
* created_at

### Модель Comment
* id
* article_id
* author_name
* content
* created_at
```

### Завершающие команды

Для запуска тестов:
```bash
docker-compose exec app php artisan test
```

Для очистки кеша:
```bash
docker-compose exec app php artisan config:clear
docker-compose exec app php artisan route:clear
docker-compose exec app php artisan cache:clear
```
