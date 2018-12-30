#!/bin/bash
if [ ! -d "./log" ]; then
  # Control will enter here if $DIRECTORY doesn't exist.
fi
start=$(date +%y-%m-%d_%H-%M)
script -c "node start.js" "./log/${start}.log"
