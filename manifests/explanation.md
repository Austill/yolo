# AWS EKS E-Commerce Deployment Explanation

## Overview
This project deploys a containerized e-commerce application (React frontend + Node.js backend) on AWS EKS using Application Load Balancer (ALB) for ingress routing.

## Architecture Components

### 1. Container Images
- **Frontend**: `misaro/yolo-frontend:v1.0.0` (React + Nginx)
- **Backend**: `misaro/yolo-backend:v1.0.0` (Node.js + Express)

### 2. Kubernetes Resources

#### Namespace (`01-namespace.yaml`)
Creates isolated environment for the e-commerce application:
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ecommerce
```

#### Backend Deployment (`02-backend.yaml`)
- **Replicas**: 1 (as defined in manifest)
- **Port**: 5000
- **Environment**: MongoDB Atlas connection via secret
- **Resources**: 64Mi memory, 100m CPU requests

#### Frontend Deployment (`03-frontend.yaml`)
- **Replicas**: 1 (as defined in manifest)
- **Port**: 80 (Nginx serving React build)
- **Environment**: REACT_APP_API_URL for API endpoint
- **Resources**: 64Mi memory, 100m CPU requests

#### Ingress Configuration (`05-ingress.yaml`)
- **Type**: AWS ALB (Application Load Balancer)
- **Scheme**: Internet-facing
- **SSL**: HTTPS on port 443
- **Routing Rules**:
  - `/api/*` → backend-service:5000
  - `/*` → frontend-service:80

### 3. AWS Services Integration

#### EKS Cluster Configuration
- **Instance Type**: t3.micro
- **Min Nodes**: 2
- **Max Nodes**: 4
- **Region**: us-east-1

#### ALB Ingress Controller
- **Annotations** in ingress:
  - `alb.ingress.kubernetes.io/scheme: internet-facing`
  - `alb.ingress.kubernetes.io/target-type: ip`
  - `alb.ingress.kubernetes.io/ssl-redirect: "443"`

### 4. Scaling Strategy
- **Horizontal scaling** via node group scaling (2-4 nodes)
- **Pod scaling** via manual kubectl commands
- **Current limits**: Max 4 replicas per deployment (constrained by node resources)

### 5. Security Configuration
- **Secrets**: MongoDB Atlas URI stored as Kubernetes secret
- **SSL/TLS**: Managed via AWS ACM certificates
- **Network**: Isolated namespace with controlled ingress

## Deployment Flow
1. **Build Phase**: Docker images built and pushed to registry
2. **Cluster Creation**: EKS cluster with 2-4 t3.micro nodes
3. **Secret Setup**: MongoDB connection string as Kubernetes secret
4. **Manifest Application**: kubectl apply -f manifests/
5. **DNS Configuration**: ALB DNS used for application access

## Resource Limits
- **Frontend**: 1 replica (scales to max 4)
- **Backend**: 1 replica (scales to max 4)
- **Memory**: 64Mi requests, 128Mi limits per pod
- **CPU**: 100m requests, 250m limits per pod
