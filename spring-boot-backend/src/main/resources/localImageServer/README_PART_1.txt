##########
# README #
##########

Ezen mappa és a bennelévő fájlok azon célt szolgálják, hogy segítségükkel a lokális környezeten (tehát a felhasználó által használt számítógépen) lévő képek betöltését megsegítse.

Ahhoz, hogy ez működhessen, ahhoz a következő utasításokat szükséges követni:


1. Ezen a mappán belül, hozzon létre egy 'media' mappát amiben a képek eltárolásra kerülhetnek:

Hint:
A könyvtár struktúrájának a következőnek kell kinéznie:
media/
.env
.compose.yml
media-folder-structure.png
README.txt


2. Mozgasd át a lokális környezeten lévő képeket ezen 'media' mappában úgy, hogy a mappastruktúra a 'media-folder-stucture.png' képen látható formátumot tükrözze.

HINT:
Minden kép elérhető a következő távoli szerveren: "https://gisco-services.ec.europa.eu/lucas/photos/".
Az alkalmazás az imént linkelt url-en elérhető mappastruktúrát követik.
Amennyiben a képek nem ezen formában vannak rendezve, úgy a képek beolvasása nem fog megfelelően megtörténni (amennyiben ez történik, akkor külön értesítés kerül kiíratásra, hogy milyen abszolút útvonalon lévő kép nem kerül helyesen beolvasásra)


HINT 2:
A /media mappán belül szükséges, hogy létrehozásra kerüljenek az évjáratok mappái: /2006, /2009, /2012, /2015, /2018, /2022
media/2006/
media/2009/
media/2012/
media/2015/
media/2018/
media/2022/
.env
.compose.yml
media-folder-structure.png
README.txt


HINT 3:
Az egyes évjáratok mappáin belül létre kell hozni az egyes országoknak megfelelő mappákat (ugyebár akár több ország közül kerülhetnek ki képek)
media/2006/HU/
media/2009/HU/
media/2012/HU/
media/2015/HU/
media/2018/HU/
media/2022/HU/
.env
.compose.yml
media-folder-structure.png
README.txt


HINT 4:
Minden feltöltött képhez tartozik egy "x" és "y" koordináta, hogy az adott kép hol kerül fényképezésre. Ezen "x" és "y" komponenseknek megfelelő mappákai ugyancsak létre kell hozni a "media" mappán belül (hasonlóan, ahogyan a következő url-en látható: "https://gisco-services.ec.europa.eu/lucas/photos/").

A mappa szerkezet azon esetben, amennyiben az "x" komponensnek megfelelő mappákat is létrehozzuk:
media/2006/HU/481/
media/2006/HU/482/
media/2006/HU/483/
media/2006/HU/484/
media/2006/HU/.../
media/2009/HU/481/
media/2009/HU/482/
media/2009/HU/483/
media/2009/HU/484/
media/2009/HU/.../
media/2012/HU/481/
media/2012/HU/482/
media/2012/HU/483/
media/2012/HU/484/
media/2012/HU/.../
media/2015/HU/481/
media/2015/HU/482/
media/2015/HU/483/
media/2015/HU/484/
media/2015/HU/.../
media/2018/HU/481/
media/2018/HU/482/
media/2018/HU/483/
media/2018/HU/484/
media/2018/HU/.../
media/2022/HU/481/
media/2022/HU/482/
media/2022/HU/483/
media/2022/HU/484/
media/2022/HU/.../
.env
.compose.yml
media-folder-structure.png
README.txt


HINT 5:
Ezt követően az "x" komponensek mappájában hozzuk létre a megfelelő "y" komponenseknek megfelelő mappákat, és ezen mappákon belül
kerüljenek eltárolásra a tényleges képek:
media/2006/HU/481/026/47902658E.jpg
media/2006/HU/481/026/47902658N.jpg
media/2006/HU/481/026/47902658P.jpg
media/2006/HU/481/026/47902658S.jpg
media/2006/HU/481/026/47902658W.jpg
media/2006/HU/481/426/47942662E.jpg
media/2006/HU/481/426/47942662N.jpg
media/2006/HU/481/426/47942662P.jpg
media/2006/HU/481/426/47942662S.jpg
media/2006/HU/481/426/47942662W.jpg
media/2006/HU/481/626/...
media/2006/HU/481/826/...
...