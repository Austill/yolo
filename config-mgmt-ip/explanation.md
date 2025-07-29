# Project Explanation

## Overview
This project automates the setup and deployment of a containerized e-commerce platform using Ansible and Docker inside a virtual machine created with Vagrant.

## What It Does
- Sets up a clean Ubuntu virtual environment using Vagrant
- Installs Docker and Docker Compose using Ansible
- Automatically pulls the project code, sets up environment variables, and runs the app using Docker Compose

## Tools Used
- **Vagrant** for local VM provisioning
- **Ansible** for automation and configuration management
- **Docker & Docker Compose** for running the application in containers

## Folder Structure
project_root/
├── Vagrantfile
├── ansible/
│ ├── ansible.cfg
│ ├── inventory.ini
│ ├── playbook.yml
│ └── roles/


## Key Improvements
- Cleaned up Ansible tasks to avoid unnecessary redundancy
- Added steps to stop and remove old containers before redeployment
- Ensured all services start fresh and consistently each time

## Summary
This setup makes it easy to spin up a fully working e-commerce app in a local virtual server with just a few commands — no manual installations needed.
