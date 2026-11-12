# 🐳 Docker Guide - GoTogether Platform

Complete guide for running your GoTogether microservices platform using Docker.

## 📋 Prerequisites

- **Docker Desktop** installed and running
- **Docker Compose** (comes with Docker Desktop)
- At least **8GB RAM** available for Docker
- Ports available: `3307` (MySQL), `6379` (Redis), `8080-8084` (APIs), `8761` (Eureka), `9093` (Kafka)

## 🚀 Quick Start

### 1️⃣ First Time Setup

```powershell
# Navigate to your project directory
cd C:\Users\durve\Downloads\PROJECT

# Create .env file from example
Copy-Item .env.example .env

# Edit .env file with your actual credentials (IMPORTANT!)
notepad .env
```

> [!IMPORTANT]
> Update these values in your `.env` file:
> - `MYSQL_ROOT_PASSWORD` - Change from default
> - `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` - For file uploads
> - `SENDGRID_API_KEY` - For email notifications
> - `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` - For SMS

### 2️⃣ Run All Services (Development)

```powershell
# Build and start all services
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

This will start:
- ✅ **MySQL** (container port 3306, host port 3307) - Database
- ✅ **Redis** (port 6379) - Cache
- ✅ **Kafka** (host port 9093) - Message broker
- ✅ **Eureka** (port 8761) - Service discovery
- ✅ **User Service** (port 8081)
- ✅ **Booking Service** (port 8082)
- ✅ **Ride Service** (port 8083)
- ✅ **Vehicle Service** (port 8084)
- ✅ **API Gateway** (port 8080)
- ✅ **Frontend** (port 80)

### 3️⃣ Access Your Application

Once all services are running:

- **Frontend**: http://localhost
- **API Gateway**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761
- **User Service**: http://localhost:8081
- **Booking Service**: http://localhost:8082
- **Ride Service**: http://localhost:8083
- **Vehicle Service**: http://localhost:8084

---

## 🎯 Common Commands

### Starting Services

```powershell
# Start all services
docker-compose up

# Start specific service(s)
docker-compose up booking-service
docker-compose up mysql redis booking-service

# Start in background
docker-compose up -d

# Rebuild and start (when code changes)
docker-compose up --build
```

### Stopping Services

```powershell
# Stop all services (keeps containers)
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop, remove containers, AND delete volumes (CAUTION: deletes database!)
docker-compose down -v
```

### Viewing Logs

```powershell
# View logs for all services
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs for specific service
docker-compose logs booking-service
docker-compose logs -f booking-service

# View last 100 lines
docker-compose logs --tail=100 booking-service
```

### Service Management

```powershell
# Check service status
docker-compose ps

# Restart a service
docker-compose restart booking-service

# Rebuild specific service
docker-compose build booking-service
docker-compose up -d --no-deps booking-service
```

---

## 🏭 Production Mode

### Run with Production Settings

```powershell
# Use both docker-compose files (override with production settings)
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Production mode adds:
- 🔒 Enhanced security settings
- 📊 Resource limits and reservations
- 🔄 Automatic restart policies
- ⚡ Optimized JVM settings
- 💾 Persistent storage on host

---

## 🔧 Troubleshooting

### Check Container Health

```powershell
# View all container statuses
docker ps

# Check specific container
docker inspect gotogether-booking-service
```

### Access Container Shell

```powershell
# Access Booking Service container
docker exec -it gotogether-booking-service sh

# Access MySQL container
docker exec -it gotogether-mysql bash

# Run MySQL commands
docker exec -it gotogether-mysql mysql -uroot -proot123 gotogether
```

### View Resource Usage

```powershell
# Check resource consumption
docker stats

# Check specific service
docker stats gotogether-booking-service
```

### Common Issues

#### ❌ Port Already in Use

```powershell
# Find what's using port 8082
netstat -ano | findstr :8082

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

#### ❌ Out of Memory

Increase Docker memory in **Docker Desktop Settings** → **Resources** → **Memory** (recommend at least 8GB)

#### ❌ Service Won't Start

```powershell
# View detailed logs
docker-compose logs booking-service

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache booking-service
docker-compose up booking-service
```

#### ❌ Database Connection Failed

```powershell
# Wait for MySQL to be ready (check health)
docker-compose ps

# Manually test MySQL connection
docker exec -it gotogether-mysql mysql -uroot -proot123 -e "SHOW DATABASES;"
```

---

## 🧪 Development Workflow

### Make Code Changes

```powershell
# 1. Make your code changes in the Booking service
# 2. Rebuild only that service
docker-compose build booking-service

# 3. Restart the service (without affecting others)
docker-compose up -d --no-deps booking-service

# 4. View logs
docker-compose logs -f booking-service
```

### Database Management

```powershell
# Access MySQL CLI
docker exec -it gotogether-mysql mysql -uroot -proot123 gotogether

# Backup database
docker exec gotogether-mysql mysqldump -uroot -proot123 gotogether > backup.sql

# Restore database
type backup.sql | docker exec -i gotogether-mysql mysql -uroot -proot123 gotogether

# Reset database (CAUTION: deletes all data!)
docker-compose down -v
docker-compose up -d mysql
```

---

## 📊 Service Architecture

```
┌──────────────┐
│   Frontend   │ :80
└──────┬───────┘
       │
┌──────▼───────────┐
│  API Gateway     │ :8080
└──────┬───────────┘
       │
       ├─────► User Service    (:8081) ──┐
       │                                  │
       ├─────► Booking Service (:8082) ──┼───► MySQL (:3306)
       │                                  │
       ├─────► Ride Service    (:8083) ──┤
       │                                  │
       └─────► Vehicle Service (:8084) ──┘
                                          │
       ┌──────────────────────────────────┤
       │                                  │
    Redis (:6379)                    Kafka (:9092)

    Eureka (:8761) provides service discovery
```

---

## 🎨 Individual Service Docker Commands

If you prefer to run services individually:

### Build Individual Service

```powershell
# Build Booking Service
cd C:\Users\durve\Downloads\PROJECT\Booking-1
docker build -t gotogether-booking:latest .

# Build Ride Service
cd C:\Users\durve\Downloads\PROJECT\GoTogether-ride
docker build -t gotogether-ride:latest .
```

### Run Individual Service

```powershell
# Run Booking Service (requires MySQL and Redis running)
docker run -d \
  --name booking-service \
  -p 8082:8082 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/gotogether \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=root123 \
  -e SPRING_REDIS_HOST=host.docker.internal \
  gotogether-booking:latest
```

> [!TIP]
> Use `docker-compose` instead of individual commands for easier management!

---

## 🔍 Health Checks

All services have health checks. Check status:

```powershell
# View health status
docker-compose ps

# Test service health endpoints
curl http://localhost:8082/actuator/health  # Booking Service
curl http://localhost:8083/actuator/health  # Ride Service
curl http://localhost:8081/actuator/health  # User Service
```

---

## 📝 Best Practices

1. **Always use** `docker-compose down` before rebuilding to avoid issues
2. **Use** `-d` flag for background execution during development
3. **Monitor logs** with `docker-compose logs -f` when debugging
4. **Create backups** of your database before major changes
5. **Use** `.env` file for sensitive credentials (never commit to git!)
6. **Allocate enough memory** to Docker Desktop (8GB+ recommended)

---

## 🆘 Need Help?

### View Service Details

```powershell
# Show all running containers
docker ps

# Show all containers (including stopped)
docker ps -a

# View container details
docker inspect gotogether-booking-service
```

### Clean Up Everything

```powershell
# Remove all stopped containers, networks, images, and volumes
docker system prune -a --volumes

# WARNING: This deletes EVERYTHING including your database!
```

---

## ✅ Next Steps

1. ✅ Start all services: `docker-compose up -d --build`
2. ✅ Check health: `docker-compose ps`
3. ✅ View logs: `docker-compose logs -f`
4. ✅ Access frontend: http://localhost
5. ✅ Test API: http://localhost:8080

Happy coding! 🚀
