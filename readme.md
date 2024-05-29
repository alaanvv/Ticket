# Database
```prisma
model Ticket {
  id       String @id @default(uuid())
  user_id  String
  event_id String
  type     String                          // "meia" || "inteira" || ...
  origin   String                          // "economico" || "website" || ...
  status   String     @default("not-paid") // "not-paid" "valid" "used"
}

model User {
  id       String @id @default(uuid())
  email    String
  name     String
  password String
  type     String @default("customer") // "admin" "lobby" "customer"
}

model Event {
  id          String  @id @default(uuid())
  name        String  @unique              // "Rodeio"
  description String?
  banner      String?                      // url
  local       String?
  address     String?
  date        Date?
  stocks      Stock[]
}

model Stock {
  id     String @id @default(uuid())
  type   String     @default("Inteira") // "meia" || "inteira" || ...
  price  Float      @default(0)
  amount Int        @default(0)
}

model Sale {
  event  String
  type   String
  date   Date   @default(now())
  price  Float  @default(0)
  origin String
}
```

---

# Todo
- [ ] Setup ticket database
- [ ] Create communication with database
    - [ ] Make it as much verbose as possible

---

- Ver se o comprador precisa de pagina de buscar eventos (caso tenha muitos)
- Pra comprar no site precisa ter conta (pra pegar dados)

1. Catálogo de Eventos:

Visualização: Exibir lista de eventos disponíveis, com informações básicas (nome, data, local, imagem).
Filtros: Permitir filtrar eventos por categoria, data, local, preço, etc.
Busca: Permitir busca por nome do evento, artista, local, etc.
Ordenação: Ordenar eventos por data, popularidade, preço, etc.
Página Detalhada do Evento: Exibir informações completas do evento (descrição, data/horário, local, mapa, fotos, vídeos, etc.).
Disponibilidade de Ingressos: Mostrar tipos de ingressos disponíveis (inteira, meia, VIP, etc.) com seus respectivos preços e quantidade.
Contador de Ingressos: Exibir a quantidade de ingressos restantes em tempo real.
Categorias de Eventos: Permitir a criação e gerenciamento de categorias de eventos (shows, teatro, esportes, etc.).

Sistema de Compra de Ingressos:

Formulário de Compra: Coletar dados do comprador (nome, e-mail, CPF, etc.).
Pagamento Online: Integrar com gateways de pagamento (PagSeguro, Mercado Pago, etc.).
Confirmação de Compra: Enviar e-mail de confirmação com detalhes da compra e ingressos (QR code).

Área do Cliente:

Login/Cadastro: Permitir que usuários criem contas e façam login.
Histórico de Compras: Visualizar compras anteriores, baixar ingressos.

Gerenciamento de Eventos (Painel Administrativo):

Cadastro de Eventos: Criar, editar e excluir eventos.
Gerenciamento de Ingressos: Definir tipos de ingressos, preços, lotes, etc.
Relatórios de Vendas: Visualizar estatísticas de vendas por evento, período, etc.





Leitura do Ingresso:

QR Code: O QR code deve conter informações únicas do ingresso, como o ID do pedido e o ID do ingresso.

Validação do Ingresso:

Consulta ao Banco de Dados: Ao ler o QR, o sistema deve consultar a tabela itens_pedido para verificar se o ingresso é válido.
Verificar ID do pedido: O sistema deve confirmar se o ID do pedido existe na tabela pedidos.
Verificar ID do ingresso: O sistema deve confirmar se o ID do ingresso existe na tabela ingressos e se está associado ao pedido correto.
Verificar se o ingresso já foi utilizado: O sistema deve verificar se o ingresso ainda não foi utilizado para check-in (você pode adicionar um campo utilizado na tabela itens_pedido para controlar isso).

Resposta ao Usuário:
Ingresso válido: Se todas as verificações forem bem-sucedidas, o sistema deve exibir uma mensagem de confirmação (ex: "Check-in realizado com sucesso!") e liberar a entrada do usuário.
Ingresso inválido: Se alguma das verificações falhar, o sistema deve exibir uma mensagem de erro (ex: "Ingresso inválido", "Ingresso já utilizado", "Pedido não pago") e negar a entrada do usuário.

Interface do Sistema:

Aplicativo Web ou Desktop: Desenvolva um aplicativo simples e intuitivo para a equipe da portaria utilizar.
Funcionalidades:
Leitura do QR code: Através da câmera do dispositivo.
Exibição de informações do ingresso: Nome do evento, tipo de ingresso, nome do comprador.
Mensagens de confirmação/erro: Claras e visíveis para o usuário e para a equipe da portaria.
Registro de check-ins: O sistema deve registrar cada check-in realizado, incluindo data, hora e informações do ingresso, para fins de controle e auditoria.
Modo offline (opcional): Caso a internet falhe, o sistema deve ter a capacidade de funcionar offline, armazenando os check-ins localmente e sincronizando com o banco de dados quando a conexão for restabelecida.
Considerações Adicionais:

Segurança: Implemente medidas de segurança para proteger o sistema contra fraudes e acessos não autorizados.
Treinamento da Equipe: Certifique-se de que a equipe da portaria esteja familiarizada com o sistema e saiba como utilizá-lo corretamente.
Plano de Contingência: Tenha um plano de contingência para lidar com problemas técnicos ou falhas no sistema durante o evento.
