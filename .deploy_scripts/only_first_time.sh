# установка зависимостей
composer install --no-interaction --optimize-autoloader
npm install --dev

cp .env.example .env

# Генерация APP_KEY
php artisan key:generate

source .deploy_scripts/wait_for_db.sh
wait_for_db

# Миграции и сидеры
php artisan migrate --force
php artisan db:seed --force
