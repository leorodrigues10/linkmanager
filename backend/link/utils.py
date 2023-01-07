import re
import time
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.headless = True
driver = webdriver.Chrome(options=options)
prefix = 'https://dev.to'


def simple_crawl(url):
    response = requests.get(url)
    return _scrapy(response.content)


def crawl_with_scroll(url):
    driver.get(url)
    time.sleep(2)

    scroll_pause_time = 0.5
    screen_height = driver.execute_script('return window.screen.height;')

    i = 1
    while True:
        driver.execute_script(f'window.scrollTo(0, {screen_height}*{i * 100});')
        i += 1

        time.sleep(scroll_pause_time)
        scroll_height = driver.execute_script('return document.body.scrollHeight;')
        print('preparing the page ...')
        if i == 200 or screen_height * i > scroll_height:
            break

    return _scrapy(driver.page_source)


def _scrapy(content):
    webpage = BeautifulSoup(content, 'html.parser')

    # get all `a` tags that id match with the regex
    elements = webpage.find_all(attrs={'id': re.compile('article-link-')})

    links = []
    for element in elements:
        # get the href value of the `a` tag
        href = element.attrs['href']

        """
            get the text of the `a` tag,
            remove the \n and blank space from the title
            convert it into array
        """
        title = element.string.split()
        print({
            'title': ' '.join(title),  # join every elements in array title, separate by space
            'url': prefix + href
        })
        links.append({
            'title': ' '.join(title),  # join every elements in array title, separate by space
            'url': prefix + href
        })

    return links
