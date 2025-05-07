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

- [ ] **Notificações**
- [ ] O cliente deve ser notificado se o barbeiro alterar ou cancelar o horário do agendamento.


🧠 Use Cases Úteis (pra deixar a experiência redonda):
   
    Finalização do Agendamento (check-out do barbeiro)
    → O barbeiro marca que o serviço foi concluído. Dá margem pra gerar avaliações, histórico ou até relatórios.

    Listagem de agendamentos do barbeiro
    → Barbeiro vê a agenda do dia ou da semana. Tu só tem o fetch pros clientes, né?

🔍 Use Cases Operacionais / de Suporte

    Reagendamento automático em caso de cancelamento do barbeiro
    → Imagina que o barbeiro faltou. O sistema já sugere outra data com outro barbeiro disponível.

    Verificar disponibilidade de horário antes de agendar/reagendar
    → Um use case isolado que pode ser usado antes de chamar o de criação de agendamento.

    Bloqueio de datas personalizadas (férias, folgas)
    → Já que tu tem blockedWorkSchedule, talvez fazer um use case de "bloquear agenda" ajude a manter isso mais explícito no domínio.

🚀 Use Cases Visionários (pensa no futuro)

    Sugestão de horários inteligentes
    → Tipo: “Esse horário já tá lotado. Mas temos às 10h e às 14h”. Um algoritmo simples com base na carga do barbeiro.

    Histórico de alterações de agendamentos
    → Uma espécie de log pra saber quem remarcou/cancelou, quando, etc.

    Notificação de lembrete
    → Envia lembrete automático pro cliente no dia anterior. Pode ser outro domínio (notifications), mas o use case nasce daqui.

