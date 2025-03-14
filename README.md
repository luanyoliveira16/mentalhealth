# Projeto Mental Health 
- Trabalho do quarto período do curso de Análise e Desenvolvimento de Sistemas do SENAC.

Este projeto foi desenvolvido para criar uma plataforma de agendamento de consultas com profissionais, permitindo que os usuários se cadastrem, façam login, recuperem senha, busquem profissionais por filtros e agendem consultas de forma intuitiva. O backend também foi desenvolvido de forma independente utilizando **Node.js** com autenticação **JWT** e envio de e-mails via **STMP**. O deploy foi realizado na **Vercel**.


## Tecnologias Utilizadas

### Frontend
- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **Canva**: Para criação do protótipo inicial.
- **Expo**: Para desenvolvimento e deploy de aplicativos React Native de maneira rápida.

### Backend
- **Node.js**: Utilizado para o desenvolvimento do backend da aplicação.
- **JWT (JSON Web Token)**: Para autenticação segura dos usuários.
- **Nodemailer (STMP)**: Para envio de e-mails, incluindo recuperação de senha.
- **Vercel**: Para deploy do backend e frontend.
- **Hostinger**: Hospedagem do banco de dados.

## Funcionalidades

### 1. **Tela de Login**
- O usuário pode fazer login utilizando seu e-mail e senha.
- Caso o usuário tenha esquecido a senha, ele pode recuperar o acesso através de um processo de verificação via e-mail.

### 2. **Tela de Cadastro**
- O usuário pode criar uma conta fornecendo informações como nome, e-mail e senha.
- Após o cadastro, o usuário pode acessar sua conta com as credenciais criadas.

### 3. **Tela de Recuperação de Senha**
- Caso o usuário esqueça sua senha, ele pode solicitar um token para redefinir a senha através de seu e-mail.

### 4. **Tela de Busca e Agendamento**
- O usuário pode buscar por profissionais utilizando filtros como nome, especialidade ou preço por hora.
- Ao clicar no profissional desejado, um modal exibirá informações adicionais sobre o profissional, além de um calendário para agendamento de consulta.

### 5. **Tela de Perfil**
- O usuário pode atualizar suas informações pessoais diretamente no perfil.

### 6. **Tela de Histórico de Consultas**
- O usuário pode visualizar um histórico de consultas realizadas, com detalhes de cada uma.

## Funcionalidades Técnicas

- **Desenvolvimento Autônomo**: Todo o desenvolvimento foi feito de forma independente, incluindo a criação do protótipo no **Canvas**, o desenvolvimento do frontend em **React Native** e a construção do backend em **Node.js** com autenticação JWT.
- **Envio de E-mails**: O envio de e-mails, como a recuperação de senha, é feito via **Nodemailer** utilizando o protocolo **STMP**.
- **Deploy**: A aplicação foi disponibilizada para testes através do **Expo** (frontend) e o backend foi implementado e deployado na **Vercel**, garantindo que todas as funcionalidades estejam funcionando corretamente em um ambiente real.

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js**: Instale o Node.js na sua máquina.
- **Expo CLI**: Instale o Expo CLI globalmente com o seguinte comando:
  ```bash
  npm install
  npx expo start
