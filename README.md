<img src="https://avatars1.githubusercontent.com/u/3846050?v=4&s=200" width="127px" height="127px" align="left"/>

# Pilot

A próxima versão da Dashboard Pagar.me

<br>

[![Join the chat at https://gitter.im/pagarme/react-event-components](https://badges.gitter.im/pagarme/pilot.svg)](https://gitter.im/pagarme/pilot?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<br>


Pilot é o codinome da nova dashboard do Pagar.me. O produto foi criado
a partir de feedbacks dos usuários, para que eles possam ter uma
experiência cada vez mais transparente de sua operação financeira no
Pagar.me, e consigam focar no seu negócio!

## Trabalhando neste repositório

Este repositório é um monorepo que aloja os pacotes que compõem o Pilot.
Para instalar as dependências é necessário usar o
[Yarn](https://yarnpkg.com/en) versão 1.0 ou superior, que suporta a
funcionalidade de [Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

### Stack

A stack foi escolhida com base no que empresas como Facebook, AirBnb,
e New York Times estão usando para construir suas experiências. Também foi
levado em consideração a simplicidade, curva de aprendizado e requisitos
como fácil distribuição e entrega progressiva.

Tendo isso em vista, fomos de React. A estrutura do projeto foi iniciada
rapidamente usando o [FormerKit Dashboard](https://github.com/pagarme/react-scripts-former-kit-dashboard),
projeto que desenvolvemos baseado no Create React App para nos permitir
criar rapidamente projetos de dashboards.

### Rodando

Use o Yarn para instalar as dependências:

```
yarn
```

Entre no diretório do Pilot:

```
cd packages/pilot
```

Inicie a aplicação:

```
yarn start
```

### Contribuindo

Caso queira fazer uma contribuição grande, recomendamos que abra uma
issue para discutir sua ideia antes de executá-la. Para pequenos bugfixes
fique a vontade para abrir PRs. Fique atento aos padrões de projeto que
usamos -- veja nosso styleguide de [React e CSS][react-styleguide] e
também nosso [Git Style Guide][git-styleguide].

Usamos o Github flow no desenvolvimento. Para criar um novo PR:

1. Crie um fork deste repositório e clone em seu computador
1. Crie uma nova branch baseada na master (`git checkout -b fix/button-size` por exemplo)
1. Faça suas alterações, criando commits que agrupam as alterações feitas
1. Envie sua branch para seu fork (`git push origin fix/button-size`, por exemplo)

Caso sua branch fique desatualizada, poderemos solicitar um rebase.
Para fazê-lo:

1. Adicione nosso "upstream" como remoto: `git remote add upstream https://github.com/pagarme/pilot`
1. Busque as atualizações do upstream: `git fetch upstream`
1. Faça o rebase de sua branch: `git rebase upstream/master <sua-branch>`
1. Resolva os conflitos e use `git rebase --continue` para continuar
1. Faça o force push em seu fork: `git push origin <sua-branch> --force-with-lease`

## Licensing

See [LICENSES](LICENSES.md).

---

[milestones]: https://github.com/pagarme/pilot/milestones
[dashboard-pagarme]: https://dashboard.pagar.me
[react-styleguide]: https://github.com/pagarme/react-style-guide
[git-styleguide]: https://github.com/pagarme/git-style-guide
[storybook]: https://github.com/storybooks/storybook
