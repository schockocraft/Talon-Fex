#!/bin/bash
start=$(date +%y-%m-%d_%H-%M)
script -c "node index.js" "./log/${start}.log"