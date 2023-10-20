#!/bin/bash

build_dir="dist";
db_folder="prisma";
schema_file="schema.prisma";

if [ -d $build_dir ]; then
    rm -rf $build_dir;
fi

yarn migrate;

yarn generate;

yarn build:pack;

if [ -d $build_dir ]; then
    cp $db_folder/$schema_file $build_dir;
fi
