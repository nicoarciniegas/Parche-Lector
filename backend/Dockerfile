# ========================
# Stage 1: Build the App
# ========================
# We use a Maven image with JDK 21 (Change to 17 if you use Java 17)
FROM maven:3.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

# 1. Copy only the pom.xml first
COPY pom.xml .

# 2. Download dependencies (This layer will be cached if pom.xml doesn't change)
# This speeds up future builds dramatically
RUN mvn dependency:go-offline

# 3. Copy the source code
COPY src ./src

# 4. Build the jar, skipping tests to speed up deployment
RUN mvn clean package -DskipTests

# ========================
# Stage 2: Run the App
# ========================
# We use a smaller JRE image for the final container
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the built jar from the previous stage
# We rename it to 'app.jar' so we don't have to care about version numbers
COPY --from=build /app/target/*.jar app.jar

# Expose the port Render uses (Documentation only, Spring listens to $PORT env var)
EXPOSE 10000

# Run the application
# -Xmx350m: Limits Java Heap to 350MB. 
# Render Free Tier has 512MB total. This leaves room for the OS so you don't crash.
ENTRYPOINT ["java", "-Xmx350m", "-jar", "app.jar"]