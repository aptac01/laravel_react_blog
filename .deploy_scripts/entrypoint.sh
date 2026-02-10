#!/bin/bash

# при выполнении в первый раз - раскомментировать
#source .deploy_scripts/only_first_time.sh

# запуск приложения
#nohup php artisan serve --port 8000 &
#npm run dev

#php artisan serve --host=0.0.0.0 --port 8000

# запуск для дева
nohup php-fpm &
npm run dev

# запуск на прод
nohup php-fpm &
npm run build
npm run serve