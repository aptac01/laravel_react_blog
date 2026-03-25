#!/bin/bash

# при выполнении в первый раз - раскомментировать
#source .deploy_scripts/only_first_time.sh

# queue:work не запускается без коннекта к базе
source .deploy_scripts/wait_for_db.sh
wait_for_db

# запуск для дева
nohup php artisan reverb:start --debug &
nohup php artisan queue:work &
nohup php-fpm &
npm run dev

## запуск на прод
#nohup php-fpm &
#nohup php artisan reverb:start &
#nohup php artisan queue:work &
#nohup npm run build &
#nohup rm public/hot &
#npm run serve