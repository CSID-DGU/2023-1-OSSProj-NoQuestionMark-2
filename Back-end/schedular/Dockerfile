FROM openjdk:17
ARG JAR_FILE=build/libs/app.jar
COPY ${JAR_FILE} ./app.jar
ENV TZ=Asia/Seoul
COPY .env /app
ENTRYPOINT ["java", "-jar", "./app.jar"]