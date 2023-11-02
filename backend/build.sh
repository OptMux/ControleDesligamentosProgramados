#!/bin/bash

build_dir="dist";
db_folder="prisma";
schema_file="schema.prisma";

if [ -d $build_dir ]; then
    rm -rf $build_dir;
fi

build_command="build:pack";

if [ $1 == "--dev" ]; then
    build_command="build:pack:dev";
fi

yarn migrate;

yarn generate;

yarn "$build_command";

if [ -d $build_dir ]; then
    cp $db_folder/$schema_file $build_dir;
fi
