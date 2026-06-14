<h1 align="center">Proffy API 👨‍🎓 </h1>

### :computer: Projeto 

Plataforma WEB e Mobile, para os alunos poderem encontrar suas aulas, e entrar em contato com os professores


[Link da aplicação](https://proffy-deploy-frontend.netlify.app/)

### ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js][nodejs]
- [TypeScript][typescript]
- [Express][express]

[nodejs]: https://nodejs.org/
[typescript]: https://www.typescriptlang.org/
[express]: https://expressjs.com/pt-br/

### :rocket: Como rodar o projeto?

Você vai precisar ter o docker e o docker compose instalado na sua máquina

```bash
# Clone a aplicação
git clone https://github.com/defauth98/proffy-api.git proffy-api

# Entre no diretório do backend
cd proffy-api

# Rode o projeto usando o make file
make run
```

Crie um arquivo .env e configure as variaveis de ambiente

```js
SECRET='proffy'
PG_HOST='localhost'
PG_USER='postgres'
PG_PASSWORD='docker'
PG_DATABASE='proffy'
PORT=3333
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

Rode as migrations e inicie o projeto, para isso é necessário criar um banco de dados com o nome igual ao que está no arquivo .env

```sql
create database proffy;
```


```bash
# Rodar a migrations
npm run migrate
```

### Autor

👤 **Daniel Ribeiro**

- Github: [@defauth98](https://github.com/defauth98)
- LinkedIn: [@daniel-ribeiro-vasso](https://linkedin.com/in/daniel-ribeiro-397604164)
