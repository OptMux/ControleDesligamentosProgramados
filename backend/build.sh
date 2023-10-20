#!/bin/bash

build_dir="dist"

if [ -d $build_dir ]; then
    rm -rf $build_dir
fi

yarn build
