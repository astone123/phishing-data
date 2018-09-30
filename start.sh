#!/bin/sh
CMD="docker-compose down && docker-compose up -d"

if [ "$1" = "build" ]
then
    CMD="$CMD --build"
fi

eval $CMD