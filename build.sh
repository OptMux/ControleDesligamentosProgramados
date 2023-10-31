#!/bin/bash

if [ $1 == "--also-back" ]; then
    echo "also building backend..."
    cd "backend/";
    sh "./build.sh";
    cd ..
fi

cd "frontend/";
yarn build:prod;
if [ -e "./dist" ]; then
    if [ -e "../backend/cdp" ]; then
        rm -r "../backend/cdp";
    fi
    cp -r "./dist" "../backend/cdp";
    if [ -e "../backend/dist" ]; then
        if [ -e "../backend/dist/cdp" ]; then
            rm -r "../backend/dist/cdp";
        fi
        cp -r "./dist" "../backend/dist/cdp";
    fi
fi
cd ..

