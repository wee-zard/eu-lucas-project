##########
# README #
##########

Előkövetelmények!
1. FONTOS! Az ezen fájlban lévő lépések megkezdése előtt BIZONYOSODJ meg arról, hogy a README_PART_1.txt fájlban taglalt lépések mindegyike sikeresen végrehajtásra került-e. Ellenkező esetben kérünk hajtsd végre azon lépéseket. A 'media' fájl, és a 'media' fájlban található fájlok szükségesek a szerver futtatásához lokálisan, ellenkező esetben hibás működés fog fentállni.
2. Docker Desktop telepítése. A Docker Desktop ingyenesen beszerezhető a következő oldalon: "https://www.docker.com/products/docker-desktop".


Lépések:
1. A 'media' mappa, és annak könyvtárszerkezete sikeresen létrehozásra került. Most nyissunk egy terminált (vagy cmd-t ha windows-t van használatban), és lépjünk bele ezen mappába

HINT:
Én pl. a következő helyre csomagoltam ki a windows számítógépemen: "C:\Users\User\localImageServer"
Fontos, hogy navigáljunk a "cd" (change directory) utasítással ezen "localImageServer" mappába (a mappa abszolút elérési útvonala eltérhet felhasználóként, hiszen ez attól függ, hogy a projekt mappája hova lett kicsomagolva).
Lépjünk bele a projekt mappájába. Jelen esetemben ez a következő utasítás kiadását jelenti: "cd C:\Users\User\localImageServer"


2. Most, hogy benne vagyunk a projekt mappájában, futtassuk a szervert a "compose.yml" segítségével. FONTOS, hogy bizonyosodjunk meg arról, hogy a docker desktop, vagy valamilyen más docker már elére telepítve van a számítógépen, különben a következő sorokban olvasható utasítások NEM fognak lefutni. A Docker Desktop a következő oldalról letölthető: "https://www.docker.com/products/docker-desktop".


3. Futtassuk a következő egysoros utasítást az alkalmazás futtatásához (ezen szervert minden egyes esetben ezen utasítás segítségével kell elindítani):

docker compose up -d


FONTOS!
A szerver alapértelmezetten a 6792-es portot használja. Így amennyiben ezen port az ön gépén NEM elérhető/lefoglalásra került egy másik alkalmazás által, akkor jelenleg kérjük, hogy szabadítsa fel ezen portot a szerver számára.
A későbbiekben lehetőséget adunk arra, hogy ezen port dinamikusan változtatni lehessen, de egyenlőre erre nincsen lehetőség. Szíves megértésüket kérjük.
