# Link Manager

Projecto que permite ao utilizador guardar links favoritos de um determinado blog.

Permite ao utilzador guardar links manualmente ou usar **Web Crawler** (Bot - que permite extrair informações necessárias de um determinado site), automatizando o processo de copiar o links de un determinado blog/site;

Para este projecto foi usado o site **dev.to** para web crawler.


O projecto está dividido em duas partes: **backend** e **frontend**


### **Backend**

para a construção da api foi usado a linguagem python, com o framework **djangorestframework;**

para a construção do bot foi usado a biblioteca:

**beautifulSoup4** - para  extrair informaçoes de conteudo html

**selenium** - para  poder ter controle sobre o browser que vai abrir o site que irá ser usado pelo  bot

**websocket** - para poder mostrar ao user em real-time o processo de crawling


Passos para rodar  a api:

1. Instalar o docker, caso não tenha instalado
2. navegue para a pasta backend na raiz do projecto
3. rode comando **docker-compose up -d,** quando é teminado a execuçao do comando pode-se acessar a aplicação usando o url htttp://localhost:8000
