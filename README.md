![alt text](https://github.com/wallacemachado7/StarterHtml/blob/new-version/cover.jpg?raw=true 'Insany Design')

Um Start padrão para iniciar todos os projeto que forem ser usados em HTML puro

**Recomendado usar o Yarn para instalar as dependências e executar como administrador para que não ocorra nenhum erro de permissão.**

---

## Passos para executar o projeto

Start Project.

1. `sudo yarn`
2. `gulp`

---

- ## Criando HTML

Para agilizar a criação de HTML/SCSS/JS, criei o comando

```
node create-file.js NOME_DA_PAGINA
```

Ele ja ira criar o arquivo HTML, SCSS e JS com o nome expecifico em suas respectivas pastas.

---

- ## TinyPNG

Imagens em JPG, PNG, e JPEG são automaticamente otimizadas pela API do TinyPNG, recomendo cada DEV [criar uma conta e gerar uma API KEY](https://tinypng.com/developers) pois o TinyPNG tem uma limite de 500 conversões por mês.

API key encontra-se no gulpfile.js, linha 48.

```javascript
{
    apiKey: ['API_KEY'],
    cache: true,
    log: false,
}
```

---

- ## Imagens WEBP

Ao final do projeto, caso haja nescessidade, é possivel trocar todas as tags img com jpg, png, e jpeg por WEBP, basta executar o comando dentro da pasta do projeto

```bash
node change-img.js
```

---

- ## Include de HTML

### Exemplo

index.html

```html
<!DOCTYPE html>
<html>
  <body>
    <!-- Inserção de um código HTML  -->
    @@include('./view.html')
    <!-- Inserção de um código HTML passando valores para dentro do HTML  -->
    @@include('./var.html', { "name": "haoxin", "age":12345, "socials": { "fb":
    "facebook.com/include", "tw":"twitter.com/include" } })
  </body>
</html>
```

view.html

```html
<h1>view</h1>
```

var.html

```html
<label>@@name</label>
<label>@@age</label>
<strong>@@socials.fb</strong>
<strong>@@socials.tw</strong>
```

Resultado:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>view</h1>
    <label>haoxin</label>
    <label>12345</label>
    <strong>facebook.com/include</strong>
    <strong>twitter.com/include</strong>
  </body>
</html>
```

---

- ## Minify de HTML

  Todos os arquivos HTML são minificados por padrão, caso precise do arquivo sem o minify basta identar (option + shift + f ou alt + shift + f)

---

- ## Cache CSS e JS
  Arquivos .css e .js são automaticamente chamados com ?v=(HASH gerada automaticamente toda vez que os arquivos sofrerem alterações) para que tenhamos certeza que os clientes sempre irão ver a ultima versão que subimos

---

- ## Fake API

  Caso nescessário, para agilizar projetos com consumo de API, criar um aquivo chamado

```
fake-api.json
```

dentro do mesmo criar um exemplo de como seria o retorno da API, ex.:

```javascript
{
    "nes_games": [
        {
            "name": "Super Mario Bros.",
            "img": "https://upload.wikimedia.org/wikipedia/en/0/03/Super_Mario_Bros._box.png"
        },
        {
            "name": "Super Mario Bros. 2",
            "img": "https://www.mariowiki.com/images/thumb/e/ea/SMB2_Boxart.png/1200px-SMB2_Boxart.png"
        },
        {
            "name": "Super Mario Bros. 3",
            "img": "https://hb.imgix.net/4ea099299f6af1861ff8389bde0c34b6c4957224.jpg?auto=compress,format&fit=crop&h=353&w=616&s=86d8ce7ac94fb9cbb94b6322cb630cb1"
        }
    ]
}
```
nes_games seria o retorno que esperamos da API verdadeira.

- Exemplo de como realizar uma chamada a API (fake ou real)

```javascript
  fetch('./../../fake-api.json').then((res) => {
    res.json().then((data) => {
      console.log(data);
    });
  });
```