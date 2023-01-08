import re
import time
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


prefix = 'https://dev.to'

channel_layer = get_channel_layer()


def simple_crawl(url):
    response = requests.get(url)
    return _scrapy(response.content)


def crawl_with_scroll(url):
    options = Options()
    options.headless = True
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    time.sleep(2)

    scroll_pause_time = 0.3
    screen_height = driver.execute_script('return window.screen.height;')

    i = 1
    while True:
        driver.execute_script(f'window.scrollTo(0, {screen_height}*{i * 20});')
        i += 1

        time.sleep(scroll_pause_time)
        scroll_height = driver.execute_script('return document.body.scrollHeight;')
        print(i)
        if i == 10 or screen_height * i > scroll_height:
            break
    page_source = driver.page_source
    driver.quit()
    return _scrapy(page_source)


def crawl_tags():
    response = requests.get(prefix)
    webpage = BeautifulSoup(response.content, 'html.parser')
    tags_nav = webpage.find(attrs={'id': 'sidebar-nav-default-tags'})

    link_elements = tags_nav.find_all('a')

    tags = []

    for link in link_elements:
        href = link.attrs['href']
        tag = link.string.split()

        tags.append({
            'url': prefix + href,
            'tag': ' '.join(tag)
        })

    return tags


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
        links.append({
            'title': ' '.join(title),  # join every elements in array title, separate by space
            'url': prefix + href
        })

        async_to_sync(channel_layer.group_send)(
            'leonel',
            {
                "type": "get_links",
                "link": {
                        'title': ' '.join(title),  # join every elements in array title, separate by space
                        'url': prefix + href
                    }
            }
        )
    print(len(links))
    return links
