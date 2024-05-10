# login-e-cadastro-react-express
Projeto full-stack de uma tela de login e cadastro, desenvolvido como projeto pessoal com o intuito de estudar sobre desenvolvimento web com React e Node.

## Tecnologias utilizadas
<b>Front-end:</b>
<br>
O front-end foi feito utilizando React, TailwindCSS para a estilização, React Router para o roteamento das páginas e Axios para as requisições http.

<div style="inline_block">
    <img alt="HTML5" align="center" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
    <img alt="TailwindCSS" align="center" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img alt="JavaScript" align="center" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
    <img alt="React" align="center" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img alt="React Router" align="center" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
    <img alt="Axios" align="center" src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white" />
</div>

##

<b>Back-end:</b>
<br>
O back-end foi feito utilizando Node.js com o Express, e o banco de dados escolhido para o projeto foi o PostgreSQL. Também foram utilizadas algumas outras dependências, como a bibliotecas jwt, para gerar o token e autenticar o usuário, bcrypt para encriptação de senha, uuid para gerar o id único dos usuários e dotenv para acessar as variáveis de ambiente.

<div style="inline_block">
    <img alt="JavaScript" align="center" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
    <img alt="Node.js" align="center" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
    <img alt="Express" align="center" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
    <img alt="Json Web Tokens" align="center" src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink" />
    <img alt="PostgreSQL" align="center" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
</div>
<br>

## Telas da aplicação:
A aplicação tem apenas duas telas, a tela de login onde o usuário efetua sua autenticação e uma tela home, onde o usuário pode ver e editar suas informações e também ver algumas informações dos outros usuários registrados.

OBS: É possível que o design das imagens a seguir não esteja 100% fiel ao design atual do projeto, pois estou sempre ajustando algo.

### Tela de login:
<img alt='Tela de Login' src='https://imgur.com/bm2DOrZ.png'><br>

A tela de login é a primeira que o usuário vê ao abrir a aplicação, nela é possível realizar o login, caso já possua cadastro, ou realizar seu cadastro. Também será possível acessar um método para recuperação de senha, caso o usuário tenha esquecido a sua.
<br>

<b>Cadastro:</b>

<img alt='Cadastro' src='https://imgur.com/i8eutvJ.png'><br>

Ao clicar no botão de "Cadastre-se" é mostrado este modal na tela, onde o usuário pode preencher as informações necessárias para realizar seu cadastro na aplicação.

Aqui todas as informações precisam ser preenchidas, no front-end possui verificação de preenchimento de todas elas, uma validação básica do formato do E-mail usando um regex e também uma validação do tamanho da senha, que deve ser de no mínimo 8 caracteres, além disso verifica se as senhas dos campos "Senha" e "Confirmar Senha" coincidem. Importante mencionar que essas verificações também são feitas no back-end.

<b>Recuperar Senha:</b>

<img alt='Recuperar Senha' src='https://imgur.com/gCQ3w7S.png'><br>
Esta parte ainda não está feita, mas a ideia é que ao clicar no botão "Esqueci minha senha" este modal seja aberto pedindo para o usuário informar seu E-mail e solicitar uma recuperação de senha.

O objetivo é que a requisição seja feita para o back-end informando o E-mail, para ser verificado se existe um cadastro com o mesmo e enviar um código para que o usuário possa cadastrar uma nova senha.