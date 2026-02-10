#!/bin/bash

wait_for_db() {
    until nc -z db 3306; do
      echo "Waiting for database..."
      sleep 2
    done
    echo "Database is up!"
}
