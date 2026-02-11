#!/bin/bash

# Настройка прав доступа к путям приложения
# Использование:
#  - cd в папку проекта
#  - выполнить скрипт 'sudo ./.deploy_scripts/permissions.sh'
# В итоге владельцем файлов будет текущий юзер, а группой - www-data

# Настраиваем права доступа
chown -R $SUDO_USER:www-data $PWD
chmod -R 775 $PWD