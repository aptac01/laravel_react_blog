# laravel_react_blog
Блог с комментариями к статьям, на Laravel, vite, react, в докере.

## Установка

### Требования
* Docker
* Docker Compose

Я использовал версию докера с их сайта https://docs.docker.com/engine/

### Запуск

1. Клонировать репозиторий
```bash
git clone <ссылка на репозиторий>
cd проект
```

2. Настроить параметры в файлах .env.example и docker-compose.yaml (коннект к БД, APP_URL, VITE_HMR_HOST)

3. Настроить права на папку с проектом, для этого из папки проекта выполнить команду:
```bash
sudo ./.deploy_scripts/permissions.sh
```

3. Перед первым запуском докер образа - раскомментировать 4-ю строку в файле ./.deploy_scripts/entrypoint.sh, чтобы было так:
```bash
source .deploy_scripts/only_first_time.sh
```
После установки зависимостей и миграций - можно закомментировать обратно.

4. Запустить докер образ
```bash
docker compose up
```

Приложение будет доступно по адресу http://localhost:8088.
По умолчанию - запускается dev конфигурация, с hot module replacement и без сборки ресурсов. 
Чтобы запустить prod конфигурацию, нужно в ``.deploy_scripts/entrypoint.sh`` закомментировать ``запуск для дева`` и раскомментировать ``запуск на прод``.
Запуск на прод - на том же порту, 8088.

## Документация

### Статьи
* **GET /api/articles** - получить список статей
* **GET /api/articles/{id}** - получить статью по ID
* **POST /api/articles** - создать новую статью
* **POST /api/articles/{id}/comments** - добавить комментарий к статье

### Фронт
 * **GET /** - открыть список статей
 * **GET /articles/:id** - открыть выбранную статью, комментарии к ней и форму нового комментария
 * **GET /add** - открыть форму добавления статьи, ссылка на это есть в списке статьей

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


### Завершающие команды

Для запуска тестов:
```bash
docker compose exec app php artisan test
```
Отдельная БД для тестов не настроена, так что после запуска тестов - БД очищается, это поведение laravel по умолчанию.

Для заполнения базы тестовыми данными:
```bash
docker compose exec app php artisan db:seed
```

Для очистки кеша:
```bash
docker compose exec app php artisan config:clear
docker compose exec app php artisan route:clear
docker compose exec app php artisan cache:clear
```
