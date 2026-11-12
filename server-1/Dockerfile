FROM maven:3.9-eclipse-temurin-21-alpine AS build

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app
RUN addgroup -g 1001 -S appuser && \
    adduser -u 1001 -S appuser -G appuser
COPY --from=build /app/target/*.jar app.jar
RUN chown -R appuser:appuser /app

USER appuser
EXPOSE 8761
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=10 \
  CMD wget --quiet --tries=1 --spider http://localhost:8761/actuator/health || exit 1

ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
