---

kanban-plugin: board

---

## Documentation & Planning

- [ ] [[078 - Szakdolgozat dokumentációjához szükséges diagramok létrehozása]]
- [ ] [[079 - Tervezés - EK-diagram elkészítése]]
- [ ] [[080 - Tervezés - Egyedmodel-diagram elkészítése]]
- [ ] [[081 - Tervezés - Logikai adatfolyam-diagram elkészítése]]
- [ ] [[082 - Tervezés - Menütervek elkészítése bejelentkezett és nem-bejelentkezett felhasználók részére]]
- [ ] [[083 - Tervezés - Egyed-esemény mátrix elkészítése]]
- [ ] [[084 - Tervezés - Szekvencia-diagram elkészítése a QueryBuilder használatához]]
- [ ] [[085 - Tervezés - UML diagrammok elkészítése]]


## 🔴Backlog

- [ ] [[012 - FilterDialog ablakának dinamikus háttérszín adása a megjelenő Dark Light mode bekapcsolásával]]
- [ ] [[016 - ExifData szűrés esetén az text input mező hossza és karakterkészlete kerüljön validálása a backendre való elküldés előtt]]
- [ ] [[031 - Ha a törölt user bejelentkezve maradt, akkor ne tudjon kezdeményezni semmilyen utasítást]]
- [ ] [[043 - Google OAuth gomb középre igazítása és stílus hozzáadása]]
- [ ] [[047 - Mobilra is reszponzív legyen az alkalmazás, minden legyen reszponzív és kényelmes]]
- [ ] [[050 - Filtering Dialog input mezői nem kerülnek validálásra]]
- [ ] [[051 - Standard Input mező helyett Autocomplete input mezőt használjunk]]
- [ ] [[054 - Loading ikon megjelenítése a FilteringDialog űrlapjaiban]]
- [ ] [[055 - Loading ikon megjelenítése a képek lekérdezéséhez]]
- [ ] [[062 - Lehessen képet feltölteni a csatolmányként report küldése során]]
- [ ] [[063 - Validátorok hozzárendelése a Report üzenetekhez]]
- [ ] [[064 - Validálás Validátorok kollektor]]
- [ ] [[060 - Scheduler a félóránkénti report emailek kiküldésére]]
- [ ] [[070 - Spellchecker-ből jövő hibák és elírások javítása]]
- [ ] [[073 - TextField komponens minden egyes beírt karakter után kikényszerít re-rendert]]
- [ ] [[074 - Filtering oldalon egy input mező kitöltése kikényszeríti mind a 4 input mező re-renderelését]]
- [ ] [[086 - Középső egérgombbal rányomva a Filter oldal menüpontjára a NotFound oldalra navigál az oldal]]
- [ ] [[087 - NotFound oldalról nem lehet egy kattintással visza navigálni a főoldalra]]
- [ ] [[090 - FilteringDialog - Amikor először építi fel az input mezőket az ablak, akkor bizonyos esetekben többször újra rendereli az egész ablakot]]
- [ ] [[088 - 5 FilteringGroup-ot egymásba ágyazva túl kicsivé teszi a szűrési feltételek input mezőit]]
- [ ] [[094 - QueryComponent - Szűrásnél, csak a kiválasztott feltételhez tartozó opciók kerüljenek lekérésre a backend-ről]]
- [ ] [[100 - Filtering - A localStorage-ben eltárolt adatok betöltése esetén, hibaüzenet kerül dobásra]]
- [ ] [[104 - Filtering - Kiválasztott képre való rákattintás esetén, a szűrés eredmény képek kerüljenek megjelenítésre]]
- [ ] [[108 - Filtering - Jobb szöveg kiíratása azon esetekben, amennyiben nincs kép kiválasztva, vagy a szűrésből nem jött vissza kép]]
- [ ] [[123 - IOException kerül dobásra, amikor a távoli szerver visszautasítja a kapcsolatot, amit lehetne helyreállítani a http üzenet újraküldésével]]
- [ ] [[124 - IOException kerül dobásra, amikor a távoli szerver visszautasítja a kapcsolatot, miközben a képlekérdezések leáll]]
- [ ] [[130 - Procedure Log - CreationTime az aktuális időpont helyett az XML-ben feltűntetett CreationTime értéket használja]]
- [ ] [[151 - Bejelentés - Több sorba tördelt üzenet szövege, egy egysoros üzenetté alakul át az email elküldésekor]]
- [ ] [[159 - Kiválasztott kép eltávolítása után, a Clear All gomb még mindig klikkelhető]]
- [ ] [[161 - Pagination - Pagination az egy sorban legyen a mentés gombokkal]]
- [ ] [[162 - Filtering - Üres szűrési eredmény esetében kerüljön Üres eredmény kiíratásra]]
- [ ] [[164 - Filtering - A szűrési ablakban lévő input mezők túl nagy helyet foglalnak]]
- [ ] [[165 - Filtering - A Feltétel input mező hossza kisebb lehetne]]
- [ ] [[166 - Compose.yml - The frontend container should wait for the backend to fully load]]
- [ ] [[167 - DockerHub-ról levenni a projektet]]


## 🔴Code Improvement ToDo

- [ ] [[145 - .Env fájl változói egy Utils fájlba kerüljenek eltárolásra]]
- [ ] [[144 - Sensitive data must be stored in the .env file outside of the project]]
- [ ] [[136 - Backend Runtime Warning üzenetek javítása]]
- [ ] [[135 - DefaultSqlScriptExecutor DB Integer display width is deprecated and will be removed in a future release]]
- [ ] [[134 - Sebezhetőségek javítása a pom.xml-ben]]
- [ ] [[133 - JpaRepository használata CrudRepository helyett]]
- [ ] [[131 - ProcedureLog és BoundingBox duplikációkat kerüljünk el]]
- [ ] [[128 - Integer - Helyettesíteni az int típust Integer típussal a backend oldalán]]
- [ ] [[127 - Native Query ne kerüljön használatra a Repository-ban, mivel emiatt nem lesz Portable az SQL utasítás]]
- [ ] [[126 - Exception - Generic Exception dobása - Exception osztályok egyesítése egy Generic osztállyá, amiből minden exception öröklődik]]
- [ ] [[125 - Endpoint - Egyszerűsíteni az egyes Endpoint-ok neveit]]
- [ ] [[103 - Using kebab-case for css properties in objects is not supported. Did you mean WebkitBoxShadow Error Component Stack]]
- [ ] [[097 - TokenValidation - Át lehet mozgatni ezen aspect osztályba a @RequestHeader-ben érkező Authentikációs tokent]]
- [ ] [[034 - ErrorHandling minden esetben internal-server-errort dob vissza]]
- [ ] [[032 - Minden endpoint kerüljön authentikációhoz kötve]]
- [ ] [[021 - Try-catch to axios http request methods, so we could handle the thrown exceptions]]
- [ ] [[018 - Licensz vizsgálat minden npm csomagra]]
- [ ] [[113 - Exception - Minden Exception dobásánál az osztály a BaseException-ből származzon]]
- [ ] [[013 - CheckStyle hibák javítása a Backend oldalán]]
- [ ] [[022 - ErrorLog létrehozása a production-ben dobásra került hibák visszakereshetősége céljából]]
- [ ] [[033 - Dto megvalósítása és az adatbázis logikai rétegének elrejtése]]
- [ ] [[096 - BaseController - Source type a pageToPageableResponse metódusban örökölhetne egy közös RootEntity-ből]]
- [ ] [[147 - Stílus változók kerüljenek kiszervezésre egy külön variables.scss fájlba]]
- [ ] [[148 - Spring Üzleti Alkalmazások Fejlesztése kurzus videóinek feldolgozása]]
- [ ] [[149 - NoImplicitAny változó használata a tsconfig fájlban]]
- [ ] [[150 - Import fájlok ABC sorrendbe való rendezése]]
- [ ] [[151 - Backend - PageableProperties helyettesítése a beépített Pageable típussal]]
- [ ] [[152 - ControllerEndpoint-ok áthelyezése az app api mappa alá]]
- [ ] [[157 - Ellenőrizni, hogy lehet-e a Matstruct-ot használni a Sprintboot oldalán]]
- [ ] [[160 - Szűrés - Csökkenteni a szűrés során a lekérdezések számát]]


## 🔴ToDo

- [ ] [[011 - Kiválasztott képek letöltése és zip fájlba való elmentése]]
- [ ] [[015 - Nagy méretű táblák partícionálása]]
- [ ] [[019 - Aktív szűrés eredményei, a kiválasztott képek és a hozzájuk tartozó szűrési feltételek kerüljenek eltárolásra localStorage-ben]]
- [ ] [[024 - Manual oldal implementálása]]
- [ ] [[025 - Settings oldal implementálása]]
- [ ] [[027 - ManageUsers oldal implementálása]]
- [ ] [[029 - Lucas-image-server átmozgatása a backend-re és ott implementálni a képek feldolgozását]]
- [ ] [[035 - Tranzakció kezelés megvalósítása és versenyhelyzet kiküszöbölése]]
- [ ] [[040 - Image Server implementálása]]
- [ ] [[044 - Profilkép megjelenítése a Mat Toolbar-on]]
- [ ] [[045 - Saját logó tervezése és megjelenítése a bejelentkezés, és a Mat Toolbar-on]]
- [ ] [[053 - Loading ikon megjelenítése a bejelentkezési oldalhoz]]
- [ ] [[056 - Loading ikon megjelenítése a timeline komponenshez]]
- [ ] [[059 - Report oldal és űrlap létrehozása]]
- [ ] [[061 - Tesztek írása és futtatása]]
- [ ] [[065 - User táblát kiegészíteni a user teljes nevével és a profilképére mutató linkkel]]
- [ ] [[075 - Drag&Drop logika implementálása a Filtering oldalon a szűrési opciók cseréjének céljából]]
- [ ] [[098 - Verziószám hozzáadása a projekthez, és annak növelése minden demo bemutatása után]]
- [ ] [[101 - Profile - Kijelentkezés implementálása]]
- [ ] [[102 - localStorage kiürítése bejelentkezés & kijelentkezés során]]
- [ ] [[112 - Animáció - react-native-reanimated csomag használata az alkalmazásban]]
- [ ] [[140 - Lottiefiles - Confirmation popup használata, sikeres űrlap elküldése során]]
- [ ] [[141 - Lottifiles - Login oldal animációval]]
- [ ] [[142 - Lottifiles - Under construction animáció]]
- [ ] [[143 - Lottifiles - 404 Not found animáció]]
- [ ] [[146 - Az adatbázis kerüljön kiszervezésre, és globálisan elérhető legyen]]
- [ ] [[158 - Jenkins pipeline írása az automatikus deploy-ok indítása céljából]]


## 🔴Client Requests

- [ ] [[023 - Sidebar-on lévő menüpontok véglegesítése]]
- [ ] [[039 - Procedures oldal létrehozása]]
- [ ] [[042 - Google OAuth oldal befejezése]]
- [ ] [[052 - Loading komponens megjelenítése]]
- [ ] [[095 - A szűrési feltételekhez tartozó opciókat el lehetne tárolni localStorage-ben addíg, míg újra le nem kérjük ezen opciókat globálisan]]
- [ ] [[117 - Exif adatok mentén lehessen szűrni a FilteringDialog ablakban]]
- [ ] [[118 - Adatbázos feltöltése a képekhez tartozó EXIF adatokkal]]
- [ ] [[119 - Settings - Legyen egy gomb, amivel frissíteni lehet az adatbázisban lévő képinformációkat]]


## 🟡In Progress

- [ ] [[003 - Befoglaló téglalapok megjelenítése a képeken]]
- [ ] [[004 - Eljárás logok automatikus kiválasztása a legnagyobb közös területű befoglaló téglalapok alapján]]
- [ ] [[017 - Magyar és angol fordítások hozzáadása az alkalmazáshoz]]
- [ ] [[152 - A throwNotification metóduon belül kerüljön meghívásra az i18n fordítás az üzenetekre]]
- [ ] [[153 - Input, Select komponensekben kerüljön az i18n fordítás, mintsem a komponens meghívásán kívül]]
- [ ] [[168 - Auto-Reloading certbot after every 60 days]]


## 🟢Done

**Complete**
- [ ] [[156 - Docker és alkalmazás futtatása VM-ben]]
- [ ] [[120 - A 2012_52222798N_V.jpg kép az egyértelműen meghatározható az adatbázisból vagy sem]]
- [ ] [[121 - Megkérdezni a témavezetőmet, hogy a fájlok milyen néven és milyen könyvtárakban vannak elmentve a gépén]]


***

## Archive

- [ ] 2024-12-06 21:56 Sending out the user's ID if the user is logged into the app
	- [ ] If the user is logged into the application, then after every 3 or 5 mins, the frontend should shedule an API call to the backend where it sends out the ID of the user.
- [ ] 2024-12-07 08:43 🟨:LiListTodo: **Creating an endpoint where we could fetch the active user's ID**
	- [ ] If the requests came from the frontend, then saving the ID of the user in a JSON file with a timestamp.
	- [ ] If the Lucas-image-server wants to fetch this ID, then the user is considered active, if the ID is provided and the timestamp is within 10 minutes. (the timestamp should be invalid after 10 mins. So the timestamp should be updated time to time.)
	
	#suggestion
- [ ] 2024-12-07 08:44 🟩 :LiListTodo: **SchedulerUpdateImageRepo**
	- [ ] Mapping the whole Lucas image database
	- [ ] Checking which images have not been stored yet in the local directory and saving them in the local directory system.
	- [ ] Creating object with the information of the newly created images
	- [ ] Fetching the EXIF data of the images.
	- [ ] Inserting into the database the newly created objects.
- [ ] 2024-12-07 08:44 🟩 :LiListTodo: **SchedulerUpdateDbUtil**
	- [ ] Mapping the whole Lucas image database
	- [ ] Checking which images have not been stored yet in the local directory
- [ ] 2024-12-07 08:44 Linces
	- Reading the licens and using only free-to-use npm libs
- [ ] 2024-12-07 09:11 Make it possible, so the API is not reachable by any other services. This application should not be reached via an open port. From Postman, I should not be able to send any get/post requests to this server.
	- [ ] There should be no active port in the API.
	- [ ] This API should wait for an active user ID before init any of the schedulers in the API.
		- [ ] Sending out an API request to the backend, where we want to fetch the ID of the active user.
		- [ ] If the ID is provided from the Backend, then the shedulers should run in the background.
	- [ ] The name of the project should be scheduler-service
	- [ ] renaming the two main methods that work in the background.
	- [ ] Giving JS documentation to the different methods and class names.
- [ ] 2025-02-26 11:34 [[163 - Szűrési opciók sorbarendezése abc sorrendbe a kiválasztott nyelv mentén]]
- [ ] 2025-02-26 11:34 [[154 - Pagination - Utolsó lapon túl nyomva, a kiválasztott képek felülete eltűnik]]
- [ ] 2025-02-26 11:34 [[115 - Növények mentén lehessen szűrni a FilteringDialog ablakban]]
- [ ] 2025-02-26 11:35 [[116 - Befoglaló téglalapok mentén lehessen szűrni a FilteringDialog ablakban]]
- [ ] 2025-02-26 11:35 [[077 - Eljárások mentén lehessen szűrni a FilteringDialog ablakban]]
- [ ] 2025-02-26 11:35 [[020 - Google OAuth - új Access Token generálása a Refresh Token segítségével, a token lejárata véget]]
- [ ] 2025-02-26 11:35 [[139 - Dokumentálás - Dokumentálni a témavezetőmnek az alkalmazás letöltését és annak beütemezését]]
- [ ] 2025-02-26 11:35 [[137 - Docker compose feltöltése Docker Hub]]
- [ ] 2025-02-26 11:36 [[138 - Demo google fiók létrehozása és hozzáadása a projekthez, hogy a témavezetőm meg tudja tekinteni a projektet]]
- [ ] 2025-02-26 11:36 [[028 - Alkalmazás dockerizálása]]
- [ ] 2025-02-26 11:36 [[129 - XML Parsing - A frontend oldalon kerüljön egy loading ikon megjelenítésre a parse és a backend válasz megkapásáig]]
- [ ] 2025-02-26 11:36 [[026 - Report oldal implementálása]]
- [ ] 2025-02-26 11:36 [[132 - Procedure Log - Képeket hozzárendelni növényekhez StackingOverflow hibát dob]]
- [ ] 2025-02-26 11:36 [[037 - XML parsing - Eljárások eredményeit felgoldozni és felvinni a megfelelő táblákba]]
- [ ] 2025-02-26 11:36 [[122 - Az adatbázishoz tartozó rekordok kerüljenek betöltésre docker-ben]]
- [ ] 2025-02-26 11:36 [[038 - Adatbázis feltöltése adatokkal]]
- [ ] 2025-02-26 11:36 [[111 - Query Builder - Animáció - TransitionGroup animáció hozzáadása a Query Builder-hez]]
- [ ] 2025-02-26 11:36 [[076 - Filtering Dialog szűrési ablak magassága nem reszponzív, a böngésző zoom módosítása esetén]]
- [ ] 2025-02-26 11:36 [[105 - Filtering - Add New gombra való rányomás esetén, egy teljesen üres szűrési felület kerüljön megjelenítésre]]
- [ ] 2025-02-26 11:36 [[001 - Google bejelentkezés során 3 hibaüzenet kerül dobásra 1 helyett]]
- [ ] 2025-02-26 11:36 [[114 - Login oldal el lett törve - Sikeres authentikáció után a felhasználó nem kerül átnavigálásra a dashboard oldalra]]
- [ ] 2025-02-26 11:36 [[005 - Átmozgatni a error üzeneteket a commands mappában a commands common mappában lévő fájlokba]]
- [ ] 2025-02-26 11:36 [[002 - Hibaüzenetek egységesítése]]
- [ ] 2025-02-26 11:36 [[036 - UtilClass létrehozása]]
- [ ] 2025-02-26 11:36 [[041 - Toast popup hibaüzenetek 5sec helyett 8sec ideig maradjon a képernyőn]]
- [ ] 2025-02-26 11:36 [[030 - A szűrési oldalon az űrlap kitöltésekor, a renderelés javításra kerüljön]]
- [ ] 2025-02-26 11:36 [[014 - EncryptionService-ben nem került hibaüzenet dobásra, amennyiben a program hibára fut]]
- [ ] 2025-02-26 11:36 [[066 - Report emailek behívásáért felelős endpoint-ot csak megfelelő authentikáció mellett lehessen elérni]]
- [ ] 2025-02-26 11:36 [[107 - Filtering - Mentés gombon jelenjen meg, hogy pontosan hány kép lett kiválasztva]]
- [ ] 2025-02-26 11:36 [[110 - Filtering - A szűrt képkártyák mérete ne fix méretű legyen, hanem reszponzív méretű]]
- [ ] 2025-02-26 11:36 [[009 - Szűrt képek megjelenítése a jobb oldali képernyőn]]
- [ ] 2025-02-26 11:36 [[010 - Lapozás implementálása a szűrt képek ablakában]]
- [ ] 2025-02-26 11:36 [[109 - Filtering - Listázott képekhez tartozó Scrollbar stílusa nem megfelelő]]
- [ ] 2025-02-26 11:36 [[106 - Filtering - A Szűrési gomb nem a szűrt képek felett helyezkedik el, hanem az mellett]]
- [ ] 2025-02-26 11:36 [[099 - Filtering - Nem tudok az országokra szűrni, azon belül is Magyarországra]]
- [ ] 2025-02-26 11:36 [[092 - ConversionService initializálása és Config fájl létrehozása]]
- [ ] 2025-02-26 11:36 [[093 - Filtering - Feltakarítani az előző demo által bemutatott szűrés logikáját, ami lecserélésre került]]
- [ ] 2025-02-26 11:36 [[006 - @deprecated - Képek szűrésének megvalósítása]]
- [ ] 2025-02-26 11:36 [[007 - @deprecated - Minden szűrési opcióhoz kerüljenek megjelenítésre a megfelelő űrlapok]]
- [ ] 2025-02-26 11:36 [[008 - @deprecated - Aktív szűrési tábla logikájának implementálása]]
- [ ] 2025-02-26 11:36 [[091 - PageableRequest implementálása a backend oldalán, ami szabadon paraméterezhető legyen]]
- [ ] 2025-02-26 11:36 [[067 - Path alias használata a relatív útvonali fájlok importálása helyett]]
- [ ] 2025-02-26 11:36 [[071 - Query Builder implementálása a Backend oldalon]]
- [ ] 2025-02-26 11:36 [[089 - Textfield - Nem lehet S -t karaktert megadni a Textfieldben]]
- [ ] 2025-02-26 11:36 [[068 - Új Query Builder implementálása a frontenden]]
- [ ] 2025-02-26 11:36 [[048 - Legyen egy Reset gomb a Filtering Dialog ablakban az aktív szűrések törlése céljából]]
- [ ] 2025-02-26 11:36 [[046 - Szűrési táblázat nem reszponzív, mérete nem változik dinamikusan az ablak méretének módosításával]]
- [ ] 2025-02-26 11:36 [[057 - Új design létrehozása a FilteringDialog oldalhoz]]
- [ ] 2025-02-26 11:36 [[072 - Query Builder optimalizáció és React memo használata]]
- [ ] 2025-02-26 11:36 [[049 - Custom Scrollbar stílus nincsen használva a Filtering Dialog űrlapj input mezőiben]]
- [ ] 2025-02-26 11:36 [[069 - Környezetfüggetlen nyelvtan definiálása az új QueryBuilder-hez]]
- [ ] 2025-02-26 11:36 [[058 - Email kiküldésének implementálása]]

%% kanban:settings
```
{"kanban-plugin":"board","list-collapse":[true,false,false,false,false,false,true],"show-checkboxes":false,"move-tags":true,"show-relative-date":true,"archive-with-date":true,"date-picker-week-start":1,"tag-colors":[],"hide-card-count":false,"new-note-template":"Templates/Node Template.md","new-note-folder":"Kanban Board/Nodes","metadata-keys":[{"metadataKey":"sprint","label":"sprint","shouldHideLabel":false,"containsMarkdown":false},{"metadataKey":"type","label":"type","shouldHideLabel":false,"containsMarkdown":false},{"metadataKey":"priority","label":"priority","shouldHideLabel":false,"containsMarkdown":false},{"metadataKey":"platform","label":"platform","shouldHideLabel":false,"containsMarkdown":false},{"metadataKey":"related","label":"related","shouldHideLabel":false,"containsMarkdown":false}],"move-task-metadata":false,"lane-width":300,"full-list-lane-width":true}
```
%%