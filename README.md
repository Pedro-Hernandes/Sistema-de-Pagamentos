# Sistema de Usuários e Transferências

Este projeto é um sistema simples que gerencia usuários e permite a realização de transferências de saldo entre eles. Foi implementado utilizando HTML, CSS e JavaScript, com as funcionalidades principais descritas abaixo.

## Funcionalidades

### Cadastro de Usuários
- Os usuários podem ser cadastrados preenchendo informações como nome completo, CPF, e-mail, senha e tipo de usuário (Pagador ou Recebedor).
- O sistema valida se o CPF ou e-mail já foram cadastrados.
- Cada usuário recebe um saldo inicial de R$ 500,00 caso seja do tipo "Pagador". Recebedores começam com saldo R$ 0,00.

### Listagem de Usuários
- Todos os usuários cadastrados são listados na página, mostrando ID, nome, tipo de usuário e saldo atual.
- A lista é atualizada automaticamente após qualquer operação, como cadastro, transferência ou exclusão.

### Transferências
- Pagadores podem transferir dinheiro para outros usuários.
- O sistema valida se o pagador possui saldo suficiente.
- É possível inserir valores com vírgulas, como "10,50" ou "0,50".
- Após a transferência, os saldos são atualizados automaticamente na lista.

### Exclusão de Usuários
- Usuários podem ser excluídos clicando no botão "x" ao lado de seus nomes na lista.
- Antes da exclusão, uma janela de confirmação é exibida para evitar exclusões acidentais.

## Tecnologias Utilizadas
- **HTML:** Estrutura da página.
- **CSS:** Estilização visual.
- **JavaScript:** Lógica de negócio e manipulação da DOM.

## Como Utilizar
1. Clone este repositório ou copie os arquivos em um servidor local.
2. Abra o arquivo `index.html` no navegador.
3. Utilize os formulários para cadastrar usuários e realizar transferências.

## Funcionalidades Futuras
- Integração com serviços externos de notificação (e-mail ou SMS).
- Persistência dos dados em um banco de dados ou armazenamento local.

---
Esse projeto foi desenvolvido a fim de realização de uma prova na Universidade de Analise e Desenvolvimento de Sistemas, com nota final obtida: 8.75 / 10.00
