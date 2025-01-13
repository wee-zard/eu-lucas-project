FROM alpine/java:22-jdk
WORKDIR /app
COPY ./target/spring-boot-0.2.0.jar /app
EXPOSE 8989
ENTRYPOINT ["java", "-jar", "spring-boot-0.2.0.jar"]
