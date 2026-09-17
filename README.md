# EventFlow

O **EventFlow** é um sistema de gerenciamento de eventos. O projeto foi desenvolvido com o objetivo de reunir, em uma única aplicação, o cadastro e gerenciamento de eventos por empresas e a venda de ingressos para o público.

O sistema possui diferentes funcionalidades de acordo com o tipo de usuário que utiliza a aplicação. Empresas podem se cadastrar no sistema e utilizar a plataforma para criar e administrar seus eventos. Já os participantes podem acessar os eventos disponibilizados e realizar a compra de ingressos sem precisar possuir uma conta.

## Funcionamento do sistema

O funcionamento do EventFlow pode ser dividido em duas partes principais: **gerenciamento de eventos** e **compra de ingressos**.

### Gerenciamento de eventos

A empresa realiza seu cadastro no sistema e, após estar registrada, pode utilizar as funcionalidades destinadas ao gerenciamento de seus eventos.

A empresa pode cadastrar um evento informando seus dados, como nome, descrição, local, data e outras informações necessárias. Os eventos cadastrados ficam disponíveis na aplicação para que possam ser consultados pelo público.

O sistema também permite que a empresa acompanhe e gerencie as informações relacionadas aos eventos e aos ingressos disponibilizados.

### Compra de ingressos

A parte de compra é disponibilizada publicamente. O participante não precisa realizar cadastro ou login para acessar os eventos e comprar ingressos.

O processo consiste em:

1. Acessar a página de eventos.
2. Escolher um evento.
3. Consultar as informações disponíveis.
4. Informar os dados necessários para a compra.
5. Finalizar a compra.
6. Receber os ingressos correspondentes à compra.

Uma mesma compra pode conter **um ou mais ingressos**, permitindo que uma pessoa compre ingressos para outras pessoas sem a necessidade de criar contas individuais.

## Organização do projeto

O projeto é separado em frontend e backend:

```text
EventFlow/
├── frontend/
│   └── Aplicação responsável pela interface do sistema
│
├── backend/
│   └── API responsável pelas regras de negócio e acesso aos dados
│
└── README.md
```

## O EventFlow é uma aplicação fictícia com o objetivo de pratica de desenvilvimento de sistemas.
