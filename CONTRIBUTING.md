## Contribuindo

Caso queira fazer uma contribuição grande, recomendamos que abra uma
issue para discutir sua ideia antes de executá-la. Para pequenos bugfixes, fique a vontade para abrir PRs. Fique atento aos padrões de projeto que
usamos. Dê uma olhada no styleguide de [React e CSS](https://github.com/pagarme/react-style-guide) e
também nosso [Git Style Guide](https://github.com/pagarme/git-style-guide).

### TL;DR:

Para criar um novo PR:

1. Crie um fork deste repositório e clone em seu computador.
1. Crie uma nova branch baseada na master (`git checkout -b fix/button-size`, por exemplo).
1. Faça suas alterações, criando commits que agrupam as alterações feitas.
1. Envie sua branch para seu fork (`git push origin fix/button-size`, por exemplo).

Caso sua branch fique desatualizada, poderemos solicitar um rebase.
Para fazê-lo:

1. Adicione nosso "upstream" como remoto: `git remote add upstream https://github.com/pagarme/pilot`.
1. Busque as atualizações do upstream: `git fetch upstream`.
1. Faça o rebase de sua branch: `git rebase upstream/master <sua-branch>`.
1. Resolva os conflitos e use `git rebase --continue` para continuar.
1. Faça o force push em seu fork: `git push origin <sua-branch> --force-with-lease`.

### O uso do `git rebase`

Durante o desenvolvimento de uma feature, usamos o Git principalmente como 
ferramenta de sincronização de código para salvar nosso trabalho, e permitir 
que você ou outra pessoa possa ter acesso às modificações.

Porém, quando terminamos uma feature, a função do Git se torna manter o
histórico de modificações no tempo. O comando `git rebase -i` pode ser
usado para reescrever o histórico do Git, permitindo que o desenvolvedor
faça commits bagunçados durante o processo de desenvolvimento, mas que
após finalizado, mantenha a história concisa e significante.

Use o `git rebase` para manter seus commits organizados para que todos
consigam entender a linha de raciocínio do trabalho desenvolvido. Isso
irá acelerar o processo de revisão e aprovação de código.

### Features: Do primeiro commit ao lançamento

Para trabalhar em uma grande feature (uma nova página, modal, etc.), 
crie uma *feature branch*. Feature branches começam com o prefixo
`feature/`, por exemplo: `feature/balance`.

#### Feature branches

Caso uma feature seja um _épico_ (uma tarefa muito grande), uma feature
branch pode ser usada para receber Pull Requests até que a funcionalidade
seja implementada por completo.

Quando um Pull Request é incorporado (merged) em uma feature branch,
usamos a ação de _Rebase and Merge_ do Github. Isso permite que sejam
feitos rebases adicionais na feature branch até que ela esteja pronta
para ser incorporada em seu alvo.

Quando uma feature está pronta para ser incorporada em seu alvo, criamos
um Pull Request. O merge de uma feature branch é feito usando a ação de
`Merge` do Github.

O time de desenvolvimento pode solicitar a alteração ou alterar a base do
Pull Request. Por isso *é importante que grandes features sejam discutidas
previamente*. Utilize uma issue para isso.

#### Release branches

Um projeto em produção requer manutenção, porém novas features são sempre 
bem-vindas. Para minimizar o tempo de lançamento e otimizar os conflitos de
merge é necessário organizar o fluxo do Git.

O prefixo de branches de lançamento é `release/`, por exemplo:
`release/v0.1.1`. Release branches são usadas como _alvos de feature
branches_ e sofrem, geralmente, menos rebases (geralmente `git rebase -i`) 
que feature branches. Entretanto, se caso houver necessidade de remover uma 
feature já incorporada (merged), é válido fazer um rebase na release branch.

Usamos um modelo de duas branches ativas para coordenar lançamentos. Uma
referente à **versão atual em produção** e outra referente à **próxima versão**.
Se a versão atual em produção é a `v0.1.0` e a próxima a `v0.2.0`, teremos
duas branches, `release/v0.1.1` e `release/v0.2.0`.

A branch `release/v0.1.1` será usada como alvo de branches de fixes que
serão publicadas em produção em um curto prazo. Este curto prazo pode ser
realmente curto ou não, de uma hora a uma semana, dependendo da velocidade
do desenvolvimento e da urgência das correções.

A branch `release/v0.2.0` será usada como alvo de feature branches e
terá um tempo de release provavelmente mais longo que a `v0.1.1`, o que
significa que ela terá de ser atualizada em relação à `master` antes de
ser integrada.

#### Fix branches

Todo código tem bugs, e todo bug tem uma correção. Durante o ciclo de
desenvolvimento do projeto encontramos e corrigimos bugs a todo momento.
Se você encontrou um bug, use as issues do projeto para reportar. Dê o máximo
de detalhes que puder e se possível, adicione um GIF mostrando como reproduzir o bug.

Branches de correção tem o prefixo `fix/`, por exemplo, `fix/balance-sum`
e geralmente têm como alvo uma release branch da versão atual.

#### Refactor & Chore branches

Estas branches são usadas quando é feita uma refatoração de código,
seja ela para tornar o código mais genérico, melhorar a legibilidade,
adicionar testes, modificar o processo de build, etc.

Prefixadas `chore/` e `refactor/`, por exemplo, `chore/add-eslint` e
`refactor/webpack-config-files`, a premissa para enquadrar uma branch
nesta categoria é que ela não afete a interface pública, que, no caso de
um webapp, é a UI e UX. Na dúvida sobre quebrar a interface de componentes,
use as issues para discussão.

Estas branches podem ser incorporadas diretamente na branch `master`,
dependendo do conteúdo e da criticidade da modificação. Por exemplo: um
refactor que muda a maneira com que a camada de cache funciona pode quebrar
a experiência do usuário, então certamente entrará em uma release branch.
Por outro lado, um refactor que torna um componente mais genérico e que não
tem potencial de quebrar a experiência pode ser integrado na branch `master`.

Integrar uma branch diretamente na `master` significa, efetivamente,
tornar a branch comum para ambas branches de release ativas, e deve ser feito com
parcimônia, já que gera a obrigatoriedade do rebase de ambas release branches
antes de seu merge na `master`.