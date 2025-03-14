#!/bin/bash
source /opt/elasticbeanstalk/deployment/env
cd /var/app/current
php artisan cache:clear && php artisan config:cache && php artisan route:cache && php artisan view:cache
echo "Config cached successfully" >> /var/log/laravel.log
