---
id: 28
type:
  - 🟨Client
priority:
  - High
related: 
platform:
  - backend
  - database
  - frontend
  - image-server
sprint: 
creation-time: 2024-12-07T09:46:00
---
Elvárt működés: 
- A Lucas projekt mindegyik komponensét dockerizálni kell. Amennyiben ezen megtörténik, akkor a docker container-ben lévő komponenseknek kommunikálnia kell egymással ahhoz, hogy az alkalmazás működhessen.
- Az adatbázis egyenlőre lokálban lesz, így meg kell oldani azt, hogy a *client* oldalán lévő képeket használhassuk (és azok adatait feltölthessük az adatbázisba)

Segédanyagok:
- [x] Dockerize React app:
	- https://www.geeksforgeeks.org/how-to-dockerize-a-reactjs-app/
- [x] Dockerzie Java Spring boot app:
	- https://www.baeldung.com/dockerizing-spring-boot-application
	- https://spring.io/guides/gs/spring-boot-docker
	- https://gurselgazii.medium.com/dockerizing-your-maven-spring-boot-application-a-step-by-step-guide-e267c2d9e8e1
	- https://www.geeksforgeeks.org/how-to-dockerize-a-spring-boot-application-with-maven/
- [x] WSL configurations:
	- https://learn.microsoft.com/en-us/windows/wsl/wsl-config#configure-global-options-with-wslconfig