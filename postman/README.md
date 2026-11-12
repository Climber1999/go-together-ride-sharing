# GoTogether Postman collection

Import `GoTogether.postman_collection.json` and `GoTogether-Local.postman_environment.json` into Postman, then select **GoTogether Local**.

The collection has folders for platform checks, users and places, bookings, rides and Kafka, and vehicles. It includes direct service requests plus sample API Gateway routes. The environment defaults to the local Docker ports: gateway `8080`, user `8081`, booking `8082`, ride `8083`, vehicle `8084`, and Eureka `8761`.

Before trying account or data operations, replace the example credentials and IDs in the environment. Send **Login** and copy the returned access token into `accessToken` if an endpoint requires authentication; set `refreshToken` when testing refresh or revoke. Update the example phone, OTP, email-verification token, ride date, and IDs as needed.

Requests that create, update, or delete accounts, rides, bookings, or vehicles change the running development database. The sample booking and vehicle deletion requests are destructive for the selected IDs; use disposable development data.
