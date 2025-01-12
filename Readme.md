# Eureka Project Documentation

## Overview
This project consists of multiple microservices:
- Eureka Server (Discovery Service)
- Service Gateway
- Client Service
- Voiture Service

## Prerequisites
- Docker
- Docker Compose
- JDK 17
- Maven

## Project Structure
```
.
├── Client/
├── Eureka Server/
├── ServiceGateway/
├── Voiture/
└── deployFeign/
    └── docker-compose.yml
```

## Running with Docker

1. **Build the Project**
   First, build all services using Maven:
   ```bash
   cd "Eureka Server" && mvn clean package
   cd ../Client && mvn clean package
   cd ../Voiture && mvn clean package
   cd ../ServiceGateway && mvn clean package
   ```

2. **Run with Docker Compose**
   Navigate to the deployFeign directory and run:
   ```bash
   cd ../deployFeign
   docker-compose up -d
   ```

## Service URLs
- Eureka Server: http://localhost:8761
- Gateway Service: http://localhost:8888
- Client Service: http://localhost:8088
- Voiture Service: http://localhost:8089
- PHPMyAdmin: http://localhost:8085

## Database
- MySQL database is accessible via PHPMyAdmin
- Credentials:
  - Username: root
  - Password: root

## Stopping Services
To stop all services:
```bash
docker-compose down
```

## Additional Notes
- All services are configured to automatically register with Eureka Server
- The Gateway Service routes requests to appropriate microservices
- Database data is persisted using Docker volumes