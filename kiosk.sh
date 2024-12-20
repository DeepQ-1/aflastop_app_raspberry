#!/bin/bash
export DISPLAY=:0
export WAYLAND_DISPLAY=wayland-0
export XCURSOR_THEME=""
export XCURSOR_SIZE=0

unclutter -idle 0 -root &
vite-react-typescript-starter
