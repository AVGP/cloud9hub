#!/bin/bash

apt-get -y update
apt-get -y upgrade

apt-get install -y docker.io haproxy

source setup.sh
