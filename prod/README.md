# Lucas EU Applikáció beütemezése

Ezen dokumentumban tervezzük részletesen leírni, hogy milyen lépéseket kell megtennünk ahhoz, hogy futtathassuk a Lucas EU alkalmazást a saját lokális környezetünkön.

# 1. Docker Desktop letöltése

A Lucas EU Alkalmazást csak Docker használata mellett lehet elérni, emiatt szükségünk van egy alkalmazáshoz, ahol a különböző Docker-hez tartozó szolgáltatásokat elérhetjük és használhatjuk.

Ehhez le kell töltenünk a *Docker Desktop* alkalmazást, amit a következő oldalon, ingyenesen be lehet szerezni: https://www.docker.com/products/docker-desktop/ . 

# 2. Frontend-és Backend Docker Container letöltése

Ahhoz, hogy futtathassuk az alkalmazást, előtte le kell húznunk a szükséges konténereket a Docker Hub oldaláról.

## 2. Letöltés terminálban kiadott utasítások segítségével

1. A következő utasítás kiadásával letölthetjük az alkalmazás Frontend oldalát. Ezen utasítás kiadható terminálban (Linux esetében), avagy cmd-ben (windows esetén). Amennyiben interaktív alkalmazásban nyitottuk meg a markdown fájlt, akkor lehetőségünk van rákattintani a kódra, ami automatikusan futtatja számunkra a lent megjelenő kódrészletet terminálban.
```sh
docker pull udvattila99/lucas-eu-frontend:latest
```

2. A következő utasítás kiadásával letölthetjük az alkalmazás Backend oldalát.

```sh
docker pull udvattila99/lucas-eu-backend:latest
```

# 3. Docker Compose fájl futtatása

Minden Docker konténert letöltöttünk, amire szükségünk volt a Docker Hub oldaláról, így elkezdhetjük elindítani az alkalmazást. Ehhez szükségünk van egy *compose.yml* fájlra, ami megtalálható ezen projekt mappában.

1. Mielőtt még futtatnánk ezen *compose.yml* fájlt, előtte még terminálban lépjünk bele a projekt mappájába. Ezen projekt mappán belül található a *README.md* és a *compose.yml* fájl is.

2. Adjuk ki a következő utasítást:

```sh
docker compose up -d
```

Ezen utasítást kiadását véget már csak várnunk kell, hogy az egyes szolgáltatások letöltésre és elindításra kerülnek. Ez eltarthat legfeljebb 1 teljes percig is, így ilyenkor a felhasználó türelmét kérjük.

NAGYON FONTOS! Kérjük, hogy amennyiben az utolsó pontban megemlített utasítás sikeresen lefutott, akkor még ezt követően is várjunk legfeljebb 1 percet, mielőtt megtekintenénk az alkalmazást a böngészőben, mivel előfordulhat, hogy az egyes szolgáltatások még nem indultak el teljesen a háttérben.

# 4. Böngésző

Miután megvártuk, hogy a Docker compose által létrehozott konténerek sikeresen lefussanak a háttérben, most már megtekinthetjük az alkalmazást a böngészőben. Ehhez itt elérhetőek a következő linkek, amiket lehet használni: http://localhost:3000/

# 5. Belépés az alkalmazásba

Az alkalmazásba csak azon felhasználók léphetnek be, akik jogoslultágot kaptak az alkalmazás böngészéséhez. Tesztelés céljából elérhető egy felhasználó, akit szabadon lehet használni ahhoz, hogy belépjünk az alkalmazásba. Ajánlom ezen felhasználó használatát az alkalmazás alpha változata alatt.

| key       | value                                              |
|-----------|----------------------------------------------------|
| email cím | lucas.eu.guest@gmail.com                           |
| jelszó    | LY6OIZAqq5Os81ez2LCPC7ciVjVz59NdJdgsvjPsuHDorfX1q2 |
