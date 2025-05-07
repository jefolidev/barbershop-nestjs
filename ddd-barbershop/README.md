- **Requisitos Funcionais — Clientes**

  - [x] O cliente não pode agendar horários inexistentes;
  - [x] O cliente não pode possuir mais de um agendamento em um mesmo serviço;
  - [x] O cliente não pode agendar mais de um mesmo serviço no mesmo horário
  - [x] O cliente não pode escolher um barbeiro sem horários disponíveis;
  - [x] O cliente nao pode agendar um horário fora do período de funcionamento da barbearia;

  - [ ] No caso de pagamento remoto, o cliente nao devera poder criar um agendamento sem que o pagamento tenha sido efetuado;

  - [ ] O cliente deve poder obter apenas informações apenas sobre os seus próprios agendamentos;

  - [ ] O cliente só poderá avaliar o atendimento apos a conclusão do serviço;
  - [ ] O cliente só poderá avaliar o agendamento apos a conclusão do agendamento;
  - [ ] O cliente nao pode criar mais de uma avaliação no mesmo atendimento/agendamento;

  - [ ] O cliente deve receber uma solicitação quando o barbeiro alterar informações do agendamento;

**Notificações**

- [ ] O cliente deve ser notificado se o barbeiro alterar ou cancelar o horário do agendamento

- **Requisitos Funcionais — Barbeiros**

  [x] O barbeiro deve poder ver os agendamentos realizados pelos clientes nos seus horários;
  [x] O barbeiro deve poder definir horários disponíveis ou bloquear horários quando necessário;

  [ ] O barbeiro deve poder criar solicitações para adiar data, horário ou ambos os dois

  - [ ] O cliente deve receber uma solicitação ao acontecer algo

  [ ] O barbeiro deve poder ver um histórico dos atendimentos de até 4 meses;
  [x] O barbeiro deve poder concluir atendimentos ou determinar outros status: Não iniciado, Em andamento, Cancelado pelo cliente, Não compareceu e Concluído

  [ ] Caso o pagamento seja realizado de forma presencial o barbeiro deve poder atualizar o status do atendimento para “Pagamento recebido”

  - Ao fazer isso, inserir o método de pagamento e o valor recebido pelo cliente
    [ ] O barbeiro deve poder visualizar seus pagamentos;
    [ ] O barbeiro deve poder ver históricos de pagamentos realizados como data, método de pagamento, valor recebido e o cliente;

  [ ] O barbeiro deve poder visualizar as avaliações realizadas pelos clientes em relação ao seu atendimento;
  [ ] O barbeiro devera poder avaliar a experiencia de atendimento com o cliente

- **Notificações**

  [ ] O barbeiro deve receber uma notificação quando um cliente agendar ou cancelar um horário;
  [ ] O barbeiro deve receber uma notificação 30 minutos antes sobre o próximo atendimento agendado;
  [ ] O barbeiro devera receber uma notificação se algum cliente cancelar ou alterar seu agendamento;
  [ ] O barbeiro devera ser notificado se o cliente deixou uma avaliação de seu atendimento;
  [ ] O barbeiro deve receber uma notificação quando um cliente realizar o pagamento de um agendamento;
  [ ] O barbeiro deve ser notificado se o cliente deixe de comparecer ao seu atendimento;
  [ ] O barbeiro deve ser notificado de qualquer alteracao no agendamento, como mudança de horário ou serviço solicitado

- **Regras de Negocio — Barbeiros**

  [ ] O barbeiro não pode agendar atendimentos em horários em que já tenha agendado outros atendimentos;
  [ ] O barbeiro deve garantir que o horário de atendimento esteja dentro do período de funcionamento da barbearia;
  [ ] O barbeiro não pode alterar um agendamento de um cliente se o horário nao tiver disponibilidade;
  [ ] O barbeiro deve garantir que só poderá alterar ou cancelar um agendamento se for aceito pela solicitação feita ao cliente, caso contrario, devera reembolsar o cliente;
  [ ] O barbeiro deve poder bloquear horários em que nao estará disponível, mas devera notificar os clientes caso isso altere agendamentos previamente agendados;
  [ ] O barbeiro não pode realizar mais de um atendimento ao mesmo tempo no mesmo horário;
  [ ] O barbeiro nao pode finalizar um atendimento ate que o pagamento tenha sido realizado

- **Notificações**

  [ ] Em caso de pagamento presencial, o barbeiro deve receber uma notificação confirmando o pagamento
