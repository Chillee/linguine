#!/usr/bin/env bash

jbuilder exec bin/lingc.bc examples/$1 > examples/color.json
cd examples/$2
make view
