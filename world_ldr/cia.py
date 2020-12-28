import requests
from bs4 import BeautifulSoup
import time


#function to retrive all the chiefs for each country
def get_all_country_links():
    country_name_list = []
    url = 'https://www.cia.gov/library/publications/world-leaders-1/AF.html'
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    countries = soup.find(id='cosCountryList')
    for p in countries.find_all('a',href=True):
        country_name_list.append({ p.text : p['href'] })
    return country_name_list


def get_chiefs(country_code):
    roles = {}
    url = 'https://www.cia.gov/library/publications/world-leaders-1/'+ country_code
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    country = soup.find(id='countryOutput')

    for p in country.find_all('div', id ='chiefsOutput'):
        name = p.find('span', class_='cos_name')
        title = p.find('span', class_='title')
        roles[title.text.strip()] = name.text.strip()
    return roles


def get_all_country_leaders(country_name_list):
    country_output_dict = {}
    for country in country_name_list:
        key = list(country.keys())[0]
        country_code = country[key]
        output = get_chiefs(country_code)
        country_output_dict[key] = output
        time.sleep(1)
    return country_output_dict


country_name_list = get_all_country_links()
output = get_all_country_leaders(country_name_list)

