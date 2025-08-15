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

### Terminal + AWS Console Integration

#### 1. AWS CLI Setup (Terminal)
```bash
# Configure AWS credentials to connect terminal with AWS console
aws configure
# Enter your AWS Access Key ID (from AWS Console > IAM > Users > Security credentials)
# Enter your AWS Secret Access Key
# Enter your region (us-east-1)
# Enter output format (json)
```

#### 2. Verify AWS Console Connection
```bash
# Test connection to AWS services
aws sts get-caller-identity
# Should show your AWS account ID and user ARN from console
```

### Build & Push Images (Terminal → AWS Console)
```bash
# Build images locally (terminal)
docker build -t misaro/yolo-backend:v1.0.0 backend/
docker build -t misaro/yolo-frontend:v1.0.0 client/

# Push to Docker Hub (terminal connects to registry)
docker push misaro/yolo-backend:v1.0.0
docker push misaro/yolo-frontend:v1.0.0

# Verify images in AWS Console:
# AWS Console → ECR (if using) or check Docker Hub
```

### Create EKS Cluster (Terminal → AWS Console)
```bash
# Create cluster via terminal (creates resources visible in AWS Console)
eksctl create cluster \
  --name ecommerce-cluster \
  --region us-east-1 \
  --nodegroup-name standard-workers \
  --node-type t3.micro \
  --nodes 2 \
  --nodes-min 2 \
  --nodes-max 4

# Verify in AWS Console:
# AWS Console → EKS → Clusters → ecommerce-cluster
```

### Deploy Application (Terminal → AWS Console)
```bash
# Create namespace (visible in AWS Console)
kubectl create namespace ecommerce

# Deploy manifests (creates AWS resources)
kubectl apply -f manifests/

# Verify deployment in AWS Console:
# AWS Console → EKS → Clusters → ecommerce-cluster → Workloads
kubectl get pods -n ecommerce
kubectl get svc -n ecommerce
kubectl get ingress -n ecommerce
```

### AWS Console Integration Points

#### 1. ALB Management
```bash
# Get ALB DNS from terminal
kubectl get ingress ecommerce-ingress -n ecommerce

# Verify in AWS Console:
# AWS Console → EC2 → Load Balancers → [ALB-name]
```

#### 2. EC2 Instances
```bash
# View cluster nodes from terminal
kubectl get nodes

# Verify in AWS Console:
# AWS Console → EC2 → Instances → filter by "eks:ecommerce-cluster"
```

#### 3. Security Groups
```bash
# View security groups via AWS CLI
aws ec2 describe-security-groups --filters "Name=tag:eks:cluster-name,Values=ecommerce-cluster"

# Verify in AWS Console:
# AWS Console → EC2 → Security Groups
```

## 📁 Manifest Files

| File | Purpose | AWS Console View |
|------|---------|------------------|
| `01-namespace.yaml` | Creates ecommerce namespace | EKS → Namespaces |
| `02-backend.yaml` | Backend deployment & service | EKS → Workloads |
| `03-frontend.yaml` | Frontend deployment & service | EKS → Workloads |
| `04-secret.yaml` | MongoDB Atlas connection | EKS → Configuration → Secrets |
| `05-ingress.yaml` | ALB ingress configuration | EC2 → Load Balancers |

## 🔧 Configuration

### MongoDB Atlas Secret (Terminal → AWS Console)
```bash
# Create secret via terminal
kubectl create secret generic mongo-secret \
  --from-literal=uri="mongodb+srv://username:password@cluster.mongodb.net/dbname" \
  -n ecommerce

# Verify in AWS Console:
# AWS Console → EKS → Clusters → ecommerce-cluster → Configuration → Secrets
```

### Update Ingress Domain (Terminal → AWS Console)
```bash
# Edit ingress configuration
kubectl edit ingress ecommerce-ingress -n ecommerce

# Verify changes in AWS Console:
# AWS Console → EC2 → Load Balancers → [ALB-name] → Listeners
```

## 📊 Scaling (Terminal → AWS Console)

Current replicas in manifests:
- **Frontend**: 1 replica (max 4 via node scaling)
- **Backend**: 1 replica (max 4 via node scaling)

Scale via terminal (updates AWS Console):
```bash
# Scale deployments
kubectl scale deployment frontend-deployment --replicas=3 -n ecommerce
kubectl scale deployment backend-deployment --replicas=3 -n ecommerce

# Verify in AWS Console:
# AWS Console → EKS → Clusters → ecommerce-cluster → Workloads
```

## 🔍 Access Application

### Get ALB DNS (Terminal → Browser)
```bash
# Get ALB DNS from terminal
kubectl get ingress ecommerce-ingress -n ecommerce

# Copy ADDRESS field and paste in browser
# Or verify in AWS Console:
# AWS Console → EC2 → Load Balancers → DNS name
```

### CloudWatch Logs (Terminal → AWS Console)
```bash
# View logs from terminal
kubectl logs -f deployment/backend-deployment -n ecommerce

# View in AWS Console:
# AWS Console → CloudWatch → Log Groups → /aws/eks/ecommerce-cluster/cluster
```

## 🧹 Cleanup (Terminal → AWS Console)

```bash
# Delete all resources (removes from AWS Console)
kubectl delete -f manifests/

# Delete cluster (removes all AWS resources)
eksctl delete cluster --name ecommerce-cluster --region us-east-1

# Verify cleanup in AWS Console:
# AWS Console → EKS → Clusters (should be empty)
# AWS Console → EC2 → Load Balancers (should be empty)
```

## 🔗 AWS Console Quick Links
- **EKS Dashboard**: AWS Console → EKS → Clusters → ecommerce-cluster
- **EC2 Instances**: AWS Console → EC2 → Instances (filter by eks:ecommerce-cluster)
- **Load Balancers**: AWS Console → EC2 → Load Balancers
- **CloudWatch Logs**: AWS Console → CloudWatch → Log Groups
