#!/bin/bash
start=$(date +%y-%m-%d_%H-%M)
script -c "node start.js" "./log/${start}.log"