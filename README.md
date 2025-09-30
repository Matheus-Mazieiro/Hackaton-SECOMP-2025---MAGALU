# TeamPomodoro 🌱⏱️

Um aplicativo web colaborativo que transforma o **Pomodoro** em uma experiência **social e gamificada**.

---

## 🎯 Desafio

Como ajudar estudantes a manter o **foco e engajamento** nos estudos?

- O Pomodoro clássico é solitário.
- Estudar em grupo mantém a motivação, mas muitas vezes dispersa.
- Pausas são necessárias, mas podem virar distrações longas.

## 💡 Nossa Solução

O **TeamPomodoro** é um app web que permite que estudantes:

1. **Entrem em salas de estudo virtuais.**
2. **Façam ciclos Pomodoro em conjunto.**
3. Nos **momentos de pausa**, participem de **mini-jogos coletivos** (quiz rápido, desafios simples, guia de respiração).
4. **Gamifiquem o foco**: pontos individuais e de equipe, rankings semanais e feedback em tempo real.

---

## 🚀 Funcionalidades

- ✅ **Salas de foco** (grupo de até 6 pessoas).
- ✅ **Timer sincronizado** via WebSockets.
- ✅ **Detecção de troca de aba/janela** → se alguém sair, o grupo é notificado.
- ✅ **Gamificação coletiva**: pontos, badges e ranking.
- ✅ **Break interativo**: quizzes, jogos curtos ou exercícios de respiração.
- ✅ **Histórico de produtividade** individual e coletivo.

---

## 🏗️ Arquitetura

- **Frontend**: React/Next.js (responsivo, mobile-first).
- **Backend**: Node.js + WebSockets, rodando em **VM na Magalu Cloud**.
- **Banco de Dados**: PostgreSQL (hospedado na VM).
- **Magalu Cloud**:
  - VM para hospedar backend + DB.
  - Escalabilidade para lidar com múltiplas salas de estudo simultâneas.

```
Usuário → Frontend (React) → API (Node.js) → DB (Postgres)
                             ↑
                         WebSockets
```

---

## 🎮 Dinâmica do Break

- **Mini-quiz rápido**: 3 perguntas de conhecimento geral.
- **Desafio coletivo**: todos clicam juntos para “encher a barra”.
- **Relax guiado**: 1min de respiração animada.

---

## 🔒 Estratégia de Foco (mesmo no Web)

- O app entra em **fullscreen** no início do ciclo.
- Se o usuário **trocar de aba ou minimizar**, o sistema registra como “perda de foco”.
- O grupo é **notificado em tempo real**.
- O “medidor coletivo de foco” cai se houver muitas interrupções.

---
<!--

## ⚙️ Estrutura do Projeto (exemplo)

```
team-pomodoro/
├─ frontend/           # React (Next.js)
│  ├─ pages/
│  ├─ components/
│  └─ public/
├─ backend/            # Node.js + WebSocket (Socket.IO)
│  ├─ src/
│  ├─ migrations/
│  └─ Dockerfile
├─ infra/              # scripts de deploy / terraform (opcional)
└─ README_TeamPomodoro.md
```

---

## 🧩 Endpoints e Flows Principais (backend)

- `POST /api/rooms` → cria sala
- `POST /api/rooms/:id/join` → entra numa sala
- WebSocket `room:{id}` → eventos: `timer:start`, `timer:tick`, `timer:end`, `focus:lost`, `break:start`, `break:end`, `quiz:start`, `quiz:answer`
- `GET /api/users/:id/stats` → pega histórico do usuário

---

## ✨ Snippets Úteis

### 1) Detectar troca de aba / perda de foco (frontend)

```javascript
// exemplo simples em React
import { useEffect } from 'react';

function usePageVisibility(onHidden, onVisible) {
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) onHidden();
      else onVisible();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [onHidden, onVisible]);
}

// uso em componente
usePageVisibility(
  () => socket.emit('focus:lost', { roomId }),
  () => socket.emit('focus:returned', { roomId })
);
```

> Observação: isso detecta quando o usuário troca de aba ou minimiza a janela. Não é possível bloquear o SO via web.


### 2) Sincronização de timer com Socket.IO (backend)

```javascript
// servidor Node/Express + socket.io (esboço)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ roomId, userId }) => {
    socket.join(roomId);
  });

  socket.on('timer:start', ({ roomId, duration }) => {
    // Broadcast para todos na sala
    io.to(roomId).emit('timer:start', { duration, startedAt: Date.now() });

    // Opcional: lógica de servidor para ticks
    // setInterval ou um scheduler mais robusto em produção
  });
});

server.listen(3000, () => console.log('server running'));
```

---

## 🧪 Métricas e Analytics

- Tempo médio focado por usuário (diário/semana).
- Número de quebras de foco por sala.
- Taxa de conclusão de ciclos Pomodoro.
- Engajamento nos breaks (quantas pessoas participaram do mini-jogo).

---

## 💾 Deploy na Magalu Cloud (VM)

1. Crie uma VM (Ubuntu) na Magalu Cloud.
2. Configure Node.js e PostgreSQL na VM (ou use containerização: Docker).
3. Suba o backend (por PM2, systemd ou Docker Compose).
4. Configure um reverse-proxy (nginx) e TLS (Let's Encrypt).

---

## 🎯 Roadmap / Próximos passos

1. MVP: salas, timer sincronizado, detecção de troca de aba, break com 1 mini-atividade.
2. Gamificação: pontos, badges e leaderboard.
3. Mobile PWA / app nativo.
4. Integração com calendários e notificações push.

-->
