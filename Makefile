# MAKEFILE
#
# @author      Sam Craig <sam@lunaris.io>
# @link        https://github.com/lunaris-studios/mirror-gatsby-base
# ------------------------------------------------------------------------------

.EXPORT_ALL_VARIABLES:

# Display general help about this command
.PHONY: help
help:
	@echo ""
	@echo "$(PROJECT) Makefile."
	@echo ""
	@echo "The following commands are available:"
	@echo ""
	@echo "    make build      : Build production Gatsby payload"	
	@echo ""
	@echo "    make clean      : Remove build / test artifacts"
	@echo ""
	@echo "    make dev        : Start Gatsby development server"		
	@echo ""
	@echo "    make format     : Format code"		
	@echo ""
	@echo "    make generate   : Generate code"		
	@echo ""	
	@echo "    make serve      : Serve static build directory via local http server"		
	@echo ""
	@echo "    make update     : Update project dependencies"
	@echo "    make update-nix : Update niv dependencies"
	@echo "    make update-npm : Update npm dependencies"
	@echo ""

# === Entities ===

# URL of the remote repository
REPOSITORY := https://github.com/lunaris-studios/mirror-gatsby-base

# Project owner
OWNER := lunaris-studios

# Project name
PROJECT := mirror-gatsby-base

# Project version
VERSION := 0.0.0

# === Shell Configuration ===

SHELL := /bin/bash

UNAME_OS := $(shell uname -s | tr '[:upper:]' '[:lower:]')
UNAME_ARCH := $(shell uname -m | tr '[:upper:]' '[:lower:]')

TMP_BASE := vendor
TMP := $(TMP_BASE)
TMP_BIN = $(TMP)/bin
TMP_VERSIONS := $(TMP)/versions

# === Build ===

# Build production Gatsby payload
.PHONY: build
build:
	@npm run build

# === Clean ===

# Remove build / test artifacts
.PHONY: clean
clean:
	@npm run clean

# === Dev ===

# Start Gatsby development server
.PHONY: dev
dev:
	@npm run dev

# === Format ===

# Format code
.PHONY: format
format:
	@npm run format

# === Gererate ===

# Generate code
.PHONY: generate
generate:
	@npm run generate

# === Serve ===

# Serve static build directory via local http server
.PHONY: serve
serve:
	@npm run serve				

# === Update ===

# Update all project dependencies
.PHONY: update
update:
	@$(MAKE) -s update-niv
	@$(MAKE) -s update-npm	

# Update niv dependencies
.PHONY: update-niv
update-niv:
	@niv update

# Update npm packages
.PHONY: update-npm
update-npm:
	@npm run update