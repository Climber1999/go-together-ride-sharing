# GoTogether
Gotogether is a ride-sharing platform connecting car owners with passengers to share empty seats, enabling affordable carpools for commutes.​  Key Features Matches users by location, schedule for car, bike pooling.  Free service focused on convenience and cost savings.​  Supports daily travel partners via app/web.

# GoTogether ride service: GenAI ride search

The ride service has an experimental natural-language search endpoint. Spring AI
asks a local Ollama model to extract a source city, destination city, and travel
date from the user's message. Java validates that all three fields are present
and then calls the existing `RideService.searchRides` method; the model does not
query the database or make booking changes.

## Run locally

1. Install Ollama, then download the configured model:

   ```powershell
   ollama pull llama3.2
   ```

   Keep Ollama running on `http://localhost:11434`.

2. From this directory, start the Spring Boot service:

   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

   The ride service's existing MySQL configuration must also be available.

3. Send a search request:

   ```powershell
   Invoke-RestMethod -Method Post `
     -Uri http://localhost:8081/gotogether/rides/assistant-search `
     -ContentType "application/json" `
     -Body '{"message":"Find a ride from Pune to Mumbai tomorrow"}'
   ```

The response includes the extracted search fields and matching rides. If a city
or travel date is missing or unclear, `clarificationNeeded` is `true`, `rides`
is empty, and `clarification` asks what information is needed.

Set `OLLAMA_BASE_URL` or `OLLAMA_MODEL` to override the defaults. If you change
the model, ensure it is available in Ollama first. This project uses Java 21,
Spring Boot, and Spring AI's Ollama starter.
