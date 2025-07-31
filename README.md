# Automated Docker Deployment with Ansible + Vagrant

This project sets up a local environment for a containerized web app using Vagrant, Ansible, and Docker — fully automated.

---

## 💡 What This Does
- Spins up a virtual Ubuntu server using Vagrant
- Installs Docker and Docker Compose via Ansible
- Clones your app repository automatically inside the VM
- Runs your full-stack app using Docker Compose
- Stops and removes old containers before redeploying

---

## ⚙️ Prerequisites

Ensure these tools are installed on your host machine:
- VirtualBox
- Vagrant

---

## 🚀 How to Run the Project

### 1. Open your terminal and cd into the project folder
```
cd yolo
```
### 2. Boot and provision the virtual machine
```
vagrant up
vagrant provision
```
This installs Docker, clones your app, and sets up everything via Ansible.

### 3. SSH into the VM to check or run commands
```
vagrant ssh
```
Your project will be cloned under /home/vagrant/ecommerce/ (or wherever the playbook defines).

---

## 🗂 Project Structure

ecommerce/
├── Vagrantfile
├── ansible/
│   ├── ansible.cfg
│   ├── inventory.ini
│   ├── playbook.yml
│   └── roles/
│       ├── docker/
│       ├── app_deploy/
│       └── ...

---

## ✅ What You Get

Once provisioned:
- Docker is ready
- Your app is cloned and deployed
- Containers are up and running automatically
- No manual setup needed

---

## 🧹 Stop or Clean Up

To halt the VM:
```
vagrant halt
```
To remove the VM completely:
```
vagrant destroy
```
---

## 👨‍💻 Author

Austin Misaro – DevOps Student | Moringa School
