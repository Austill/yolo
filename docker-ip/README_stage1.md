 # 🛍️  Yolo E-Commerce Web App


Yolo is a full-stack e-commerce platform built with the **MERN stack** and fully containerized using **Docker** and **Docker Compose** for easy deployment and development.

---

## 🧰 Stack Overview

- **Frontend**: React.js (served via Nginx)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (Cloud-hosted)
- **Containerization**: Docker & Docker Compose

---

## 📁 Project Layout

```
yolo/
├── client/        # React app
├── backend/       # Express API
├── docker-compose.yml
└── README.md
```

---

## 🚀 Quick Start

1. **Clone the repo:**

```bash
git clone https://github.com/Austill/yolo.git
cd yolo
```

2. **Set your MongoDB URI in a .env file:**

Create a file at `./backend/.env` and add:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/yolo
```

3. **Run the app with Docker Compose:**

```bash
docker compose up --build -d
```

---

## 🌐 Access Points

| Service   | URL                               |
|-----------|-----------------------------------|
| Frontend  | http://localhost:3000             |
| Backend   | http://localhost:5000             |
| API Test  | http://localhost:5000/api/products |

---

## 🛠️ Docker Details

### Containers
- `yolo-client` (React via Nginx on port 3000 → 80)
- `yolo-backend` (Node/Express on port 5000)

### Docker Images
- `misaro/yolo-client:v1.0.0`
- `misaro/yolo-backend:v1.0.0`

---


## 📸 DockerHub Images

Here’s a snapshot of the published Docker images:

![DockerHub Screenshot](./screenshots/dockerhubscreenshot.png)



## 🔐 Environment Setup

MongoDB URI is required in:
- `backend/.env`

```env
MONGO_URI=your-mongodb-uri
```

---

## 🗂️ Volumes

> No local Mongo volume is needed since MongoDB is hosted on Atlas.

---

## 📤 Deployment Workflow

### Build and tag:

```bash
docker build -t misaro/yolo-client:v1.0.0 ./client
docker build -t misaro/yolo-backend:v1.0.0 ./backend
```

### Push to DockerHub:

```bash
docker push misaro/yolo-client:v1.0.0
docker push misaro/yolo-backend:v1.0.0
```

---

## ✅ Git Usage

```bash
git add .
git commit -m "Initial commit"
git push origin master
```

---

## 👨‍💻 Maintainer

Built with ❤️ by **Austin Misaro**
