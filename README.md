<h1 align="center">Proffy 👨‍🎓 </h1>

<h2 align="center">

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=proffy-api&uri=https%3A%2F%2Fgithub.com%2Fdefauth98%2FProffy-2.0%2Fblob%2Fmaster%2FInsomnia_2020-10-27.json)

</h2>

<p align="justify">Plataforma WEB e Mobile, para os alunos poderem encontrar suas aulas, e entrar em contato com os professores.</p>

## :file_folder: Link para a aplicação

Link da aplicação: https://proffy-deploy-frontend.netlify.app/

### :computer: Funcionalidades

- [x] Autenticação de usuários

- [x] Recuperação de senhas

- [x] Perfil do proffy

- [x] Splash Screen no React Native

- [x] Paginação na listagem de proffys

- [x] Exibindo horários disponiveis dos proffys

- [x] Salvando seus proffys favoritos

- [x] Logout da aplicação

- [x] Deploy da aplicação

### :nut_and_bolt: Tecnologias

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

### Como rodar o projeto?

Você vai precisar ter docker instalado na sua máquina para rodar o banco de dados PostgreSQL ou instalar diretamente na sua máquina.

#### Backend

```bash
# Clone a aplicação
git clone https://github.com/defauth98/Proffy-2.0.git

# Entre no diretório do backend
cd server

# Instale as dependencias
npm i

# Rode o banco de dados usando o docker
docker run --name nlw -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Configure as variveis de ambiente (.env) e rode as migrations
npm run migrate

# Rode a aplicação
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
