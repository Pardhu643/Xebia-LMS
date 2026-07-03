FROM eclipse-temurin:8-jdk AS builder
WORKDIR /app
COPY mvnw mvnw
COPY .mvn .mvn
COPY pom.xml pom.xml
COPY src src
RUN sed -i 's/\r$//' mvnw && sed -i 's/\r$//' .mvn/apache-maven-3.9.6/bin/mvn && chmod +x mvnw && chmod -R +x .mvn && ./mvnw -DskipTests package

FROM eclipse-temurin:8-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENV PORT=8080
ENTRYPOINT ["java", "-jar", "app.jar"]
