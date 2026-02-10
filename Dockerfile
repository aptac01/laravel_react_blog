# Базовый образ с PHP и необходимыми компонентами
FROM php:8.1-fpm

# Установка системных зависимостей
RUN apt-get update && \
    apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    netcat-traditional \
    mc

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Установка Node.js
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

# Настраиваем права доступа
RUN chown -R www-data:www-data /var/www
USER www-data

WORKDIR /var/www

# копируем исходники
COPY . /var/www/

# Копируем конфигурационные файлы
COPY .env.example .env
COPY docker-compose.yaml .

WORKDIR /var/www

# Установка зависимостей
USER root
RUN docker-php-ext-install pdo pdo_mysql                        # Устанавливаем PHP расширения
RUN composer install --no-interaction --optimize-autoloader
RUN npm install --dev
USER www-data

# открытие портов
EXPOSE 9000
EXPOSE 8000
EXPOSE 3000

ENTRYPOINT [".deploy_scripts/entrypoint.sh"]
