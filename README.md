<h1 align="center">Proffy 👨‍🎓 </h1>

<p align="center">
  <a href="#desktop_computer-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#nut_and_bolt-tecnologias">Funcionalidades da versão 2.0</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tractor-como-rodar-o-projeto">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#whale-criando-um-container-com-o-docker">Como rodar o projeto?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#autor">Autor</a>
</p>

<h1 align="center">
  <a 
  href="https://insomnia.rest/run/?label=Proffy%20Backend%20API&uri=https%3A%2F%2Fgithub.com%2Fdefauth98%2Fproffy%2Fblob%2Fmaster%2Fserver%2FInsomnia_2020-10-27.json" 
  target="_blank"  ><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</h1>


### :computer: Projeto 

Plataforma WEB e Mobile, para os alunos poderem encontrar suas aulas, e entrar em contato com os professores

Link da aplicação: https://proffy-deploy-frontend.netlify.app/

### :boom: Funcionalidades da versão 2.0

- Autenticação de usuários
- Recuperação de senhas
- Perfil do proffy
- Splash Screen no React Native
- Paginação na listagem de proffys
- Exibindo horários disponiveis dos proffys
- Salvando seus proffys favoritos
- Logout da aplicação
- Deploy da aplicação

### ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js][nodejs]
- [TypeScript][typescript]
- [React][reactjs]
- [React Native][rn]
- [Expo][expo]

[nodejs]: https://nodejs.org/
[typescript]: https://www.typescriptlang.org/
[expo]: https://expo.io/
[reactjs]: https://reactjs.org
[rn]: https://facebook.github.io/react-native/
[yarn]: https://yarnpkg.com/

### :rocket: Como rodar o projeto?

Você vai precisar ter docker instalado na sua máquina para rodar o banco de dados PostgreSQL ou instalar diretamente na sua máquina.

#### Backend

```bash
# Clone a aplicação
git clone https://github.com/defauth98/proffy.git

# Entre no diretório do backend
cd proffy/server

# Instale as dependencias
npm i

# Rode o banco de dados usando o docker
docker run --name nlw -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Crie um arquivo .end e configure as variaveis de ambiente

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

# Rodar o projeto
npm run dev
```

#### Frontend

```bash
# Entre no diretório do backend
cd web

# Instale as dependencias
npm i

# Configure o seu api em /src/services/api.ts e rode o app
npm start
```

#### Mobile

```bash
# Entre no diretório do backend
cd mobile

# Instale as dependencias
npm i

# Configure o seu api em /src/services/api.ts e rode o app
npm start
```

### Autor

👤 **Daniel Ribeiro**

- Twitter: [@defauth8](https://twitter.com/defauth8)
- Github: [@defauth98](https://github.com/defauth98)
- LinkedIn: [@daniel-ribeiro-397604164](https://linkedin.com/in/daniel-ribeiro-397604164)

## Licença

The [MIT License]() (MIT)

Copyright :copyright: 2020 - Proffy
