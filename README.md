<h1 align="center">Proffy 👨‍🎓 </h1>

<p align="center">
  <a href="#user-content-computer-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#user-content-boom-funcionalidades-da-versão-20">Funcionalidades da versão 2.0</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#user-content--tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#user-content-rocket-como-rodar-o-projeto">Como rodar o projeto?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#user-content-autor">Autor</a>
</p>

<p align="center">
  <img src=".github/capa.svg" align="center" width="900rem"/>
</p>

<h1 align="center">
  <a 
  href="https://insomnia.rest/run/?label=Proffy%20Backend%20API&uri=https%3A%2F%2Fgithub.com%2Fdefauth98%2Fproffy%2Fblob%2Fmaster%2Fserver%2FInsomnia_2020-10-27.json" 
  target="_blank"  ><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</h1>


### :computer: Projeto 

Plataforma WEB e Mobile, para os alunos poderem encontrar suas aulas, e entrar em contato com os professores


[Link da aplicação](https://proffy-deploy-frontend.netlify.app/){:target="_blank" rel="noopener"}


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

# Rodar o projeto
npm run dev
```

#### Frontend

O projeto está configurado para rodar usando a api que está no heroku, para usar a api em localhost é necessário mudar no arquivo `src/services/api.ts`

```bash
# Entre no diretório do backend
cd proffy/web

# Instale as dependencias
npm i

# Rode o projeto
npm start
```

#### Mobile

```bash
# Entre no diretório do backend
cd proffy/mobile

# Instale as dependencias
npm i

# Rode o projeto
npm start
```

### Autor

👤 **Daniel Ribeiro**

- Twitter: [@defauth8](https://twitter.com/defauth8)
- Github: [@defauth98](https://github.com/defauth98)
- LinkedIn: [@daniel-ribeiro-397604164](https://linkedin.com/in/daniel-ribeiro-397604164)
