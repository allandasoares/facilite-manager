#!/bin/bash
RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
BLUE='\033[34m'
RESET='\033[0m'

echo -e "${BLUE} $* ${RESET}"
docker exec -it busca_certa-manager bash -c "$*"