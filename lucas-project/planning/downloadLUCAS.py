# -*- coding: utf-8 -*-
"""
Created on Wed Nov 25 11:02:08 2020

@author: Boud
"""

# -*- coding: utf-8 -*-
"""
Created on Tue Nov 24 20:00:08 2020

@author: Boudewijn
"""

from urllib.request import urlopen
import re
from bs4 import BeautifulSoup
import requests
import os

def isDirectory(url):
    if(url.endswith('/')):
        return True
    else:
        return False

def findLinks(url):
    page = requests.get(url).content
    bsObj = BeautifulSoup(page, 'html.parser')
    maybe_directories = bsObj.findAll('a', href=True)

    for link in maybe_directories:
        #print(isDirectory(link['href']))
        if(isDirectory(link['href'])):
            newUrl = url + link['href']         
            findLinks(newUrl) #recursion happening here
        else:
            if(link['href'].endswith('.jpg')):
                print(url + link['href'])
                #print(link['href'])
                r = requests.get(url + link['href'])
                country = url.split('/')[6]
                yr = url.split('/')[5]
                fold = r"\\nas1\Other\LUCAS"+ "\\" + yr + "\\" + country+ "\\"
                out = fold +  link['href']
                if not os.path.exists(fold):
                    os.makedirs(fold)
                if not os.path.exists(out):
                    print(out)
                    with open(out, 'wb') as f:
                        f.write(r.content)

# Example: https://gisco-services.ec.europa.eu/lucas/photos/2018/AT/
# Years: 2006, 2009, 2012, 2015
# countries: AT, BE, BG, CY, CZ, DE, DK, EE, EL, ES, FI, FR, HR, HU,
            # IE, IT, LT, LU, LV, MT, NL, PL, PT, RO, SE, SI, SK, UK
startUrl = "https://gisco-services.ec.europa.eu/lucas/photos/2022/HU/"
findLinks(startUrl)