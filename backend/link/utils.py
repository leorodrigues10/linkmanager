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


def simple_crawl(url, username):
    response = requests.get(url)
    return _scrapy(response.content, username)


def crawl_with_scroll(url, username):

    send_message(f"processando a página: {url}", username)

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    prefs = {}
    options.experimental_options["prefs"] = prefs
    prefs["profile.default_content_settings"] = {"images": 2}
    driver = webdriver.Chrome(options=options)
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    time.sleep(2)

    scroll_pause_time = 0.3
    screen_height = driver.execute_script('return window.screen.height;')

    i = 1
    send_message(f"scroll iniciado", username)
    while True:
        driver.execute_script(f'window.scrollTo(0, {screen_height}*{i});')
        i += 1

        time.sleep(scroll_pause_time)
        scroll_height = driver.execute_script('return document.body.scrollHeight;')

        # send the iterator value to the client
        async_to_sync(channel_layer.group_send)(
            f'{username}',
            {
                "type": "send_event",
                "scroll": {
                    'index': i
                }
            }
        )

        # ends the loop execution if iterator is 100 or reach the end of the page
        if i == 50 or screen_height * i > scroll_height:
            send_message(f"scroll terminado", username)
            break

    page_source = driver.page_source
    driver.quit()
    return _scrapy(page_source, username)


def crawl_tags():
    response = requests.get(prefix)
    webpage = BeautifulSoup(response.content, 'html.parser')
    tags_nav = webpage.find(attrs={'id': 'sidebar-nav-default-tags'})
    link_elements = tags_nav.find_all('a')
    tags = []

    for index, link in enumerate(link_elements):
        href = link.attrs['href']
        tag = link.string.split()

        tags.append({
            'id': index + 1,
            'url': prefix + href,
            'tag': ' '.join(tag)
        })

    return tags


def _scrapy(content, username):
    send_message(f"processando os titulos e as urls...", username)
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
            f'{username}',
            {
                "type": "send_event",
                "link": {
                        'title': ' '.join(title),  # join every elements in array title, separate by space
                        'url': prefix + href
                    }
            }
        )

    return links


def send_message(message, username):
    async_to_sync(channel_layer.group_send)(
        f'{username}',
        {
            "type": "send_event",
            "message": message
        }
    )
