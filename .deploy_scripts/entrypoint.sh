#!/bin/bash

# при выполнении в первый раз - раскомментировать
#source .deploy_scripts/only_first_time.sh

# запуск для дева
nohup php-fpm &
npm run dev

## запуск на прод
#nohup php-fpm &
#nohup npm run build &
#nohup rm public/hot &
#npm run serve