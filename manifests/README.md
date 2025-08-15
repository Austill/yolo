# AWS EKS E-Commerce Deployment

Deploy a production-ready e-commerce application on AWS EKS with Application Load Balancer (ALB) ingress.

## �� Quick Start

### Prerequisites
```bash
# Install required tools
aws --version          # AWS CLI
eksctl version         # EKS cluster management
kubectl version        # Kubernetes CLI
helm version          # Package manager
```

### 1. Build & Push Images
```bash
# Backend
docker build -t misaro/yolo-backend:v1.0.0 backend/
docker push misaro/yolo-backend:v1.0.0

# Frontend  
docker build -t misaro/yolo-frontend:v1.0.0 client/
docker push misaro/yolo-frontend:v1.0.0
```

### 2. Create EKS Cluster
```bash
eksctl create cluster \
  --name ecommerce-cluster \
  --region us-east-1 \
  --nodegroup-name standard-workers \
  --node-type t3.micro \
  --nodes 2 \
  --nodes-min 2 \
  --nodes-max 4
```

### 3. Deploy Application
```bash
# Create namespace
kubectl create namespace ecommerce

# Deploy manifests
kubectl apply -f manifests/

# Verify deployment
kubectl get pods -n ecommerce
kubectl get svc -n ecommerce
kubectl get ingress -n ecommerce
```

## 📁 Manifest Files

| File | Purpose |
|------|---------|
| `01-namespace.yaml` | Creates ecommerce namespace |
| `02-backend.yaml` | Backend deployment & service |
| `03-frontend.yaml` | Frontend deployment & service |
| `04-secret.yaml` | MongoDB Atlas connection |
| `05-ingress.yaml` | ALB ingress configuration |

## 🔧 Configuration

### MongoDB Atlas Secret
```bash
kubectl create secret generic mongo-secret \
  --from-literal=uri="mongodb+srv://username:password@cluster.mongodb.net/dbname" \
  -n ecommerce
```

### Update Ingress Domain
Edit `05-ingress.yaml`:
```yaml
spec:
  rules:
    - host: yourdomain.com  # Change this
```

## 📊 Scaling

Current replicas in manifests:
- **Frontend**: 1 replica (max 4 via node scaling)
- **Backend**: 1 replica (max 4 via node scaling)

Scale manually:
```bash
kubectl scale deployment frontend-deployment --replicas=3 -n ecommerce
kubectl scale deployment backend-deployment --replicas=3 -n ecommerce
```

## 🔍 Access Application

Get ALB DNS:
```bash
kubectl get ingress ecommerce-ingress -n ecommerce
# Use the ADDRESS field to access your app
```

## 🧹 Cleanup

```bash
# Delete all resources
kubectl delete -f manifests/

# Delete cluster
eksctl delete cluster --name ecommerce-cluster --region us-east-1
