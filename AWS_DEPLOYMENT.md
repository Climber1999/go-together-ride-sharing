# AWS ECS deployment

The GitHub Actions workflow tests the services on pull requests to `development`, `staging`, and `main`. A push to one of those branches builds all six Docker images, pushes immutable commit-SHA tags to ECR, updates the matching ECS task definitions, and waits for the ECS services to stabilize. `main` maps to the `production` GitHub environment.

## AWS resources required

The workflow deploys application containers; it does not create AWS infrastructure. Before enabling branch deployments, provision an ECR repository and an ECS service for each of these names in each environment:

| Image / ECS service | Docker build context | Container name in task definition |
| --- | --- | --- |
| `user-service` | `GoTogether-dev` | `user-service` |
| `booking-service` | `Booking-1` | `booking-service` |
| `ride-service` | `GoTogether-ride` | `ride-service` |
| `vehicle-service` | `VehicleService` | `vehicle-service` |
| `api-gateway` | `trueme-api-gateway` | `api-gateway` |
| `frontend` | `Car Sharing Platform (2)` | `frontend` |

Use ECR names `gotogether-<environment>-<service>` and ECS service names `gotogether-<environment>-<service>`, where `<environment>` is `development`, `staging`, or `production`. Create one ECS cluster per environment (or set the environment-specific cluster variable to a shared cluster name). Each task definition must already contain its application configuration, networking, health checks, execution/task roles, and runtime secret references. The services also need the RDS, ElastiCache, and Kafka endpoints for their environment. Keep credentials in Secrets Manager and inject them into ECS tasks; do not put them in GitHub variables or image build arguments.

The gateway routes and browser API URL must resolve within each environment. Set `VITE_API_BASE_URL` to the environment's public gateway URL before the frontend image is built. Configure the gateway task with `USER_SERVICE_URL`, `BOOKING_SERVICE_URL`, `RIDE_SERVICE_URL`, `VEHICLE_SERVICE_URL`, `SERVER_PORT`, `FRONTEND_ORIGIN`, and a per-environment `JWT_SECRET`. The frontend image uses the Vite `dist` output and takes the API URL as a build argument.

## GitHub setup

Create GitHub Environments named `development`, `staging`, and `production`. For each environment configure:

- Secret `AWS_ROLE_ARN`: an IAM role trusted for GitHub Actions OIDC, restricted to this repository and that environment.
- Variable `AWS_REGION`: the AWS region containing that environment's resources.
- Variable `AWS_ACCOUNT_ID`: the AWS account ID.
- Variable `ECS_CLUSTER`: the ECS cluster for that environment.
- Variable `VITE_API_BASE_URL`: the public API gateway URL used in the frontend build.

The OIDC role needs ECR push permissions for that environment's six repositories, ECS task-definition registration and service update/describe permissions for its six services, and `iam:PassRole` only for those task and execution roles. Do not use long-lived AWS access keys. Configure required reviewers for `production` and branch protection rules so releases reach `main` through reviewed pull requests.

## First deployment

Create the ECR repositories, task definitions, ECS clusters/services, load balancers, network rules, and managed data services before pushing a branch: the workflow updates existing ECS services and does not bootstrap them. Then configure the three GitHub Environments and push to `development`. Promote changes with pull requests through `staging` and `main`. AWS resources incur charges while running; review AWS pricing and set budgets/alerts before creating the managed databases and Kafka clusters.
