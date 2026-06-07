# AI Video Factory - Local UI MVP

Esta é a interface visual (mockada) para a ferramenta de criação automática de vídeos com IA. O projeto foi desenhado para atuar como o painel de controle de uma arquitetura local real (React + Python backend + FFmpeg + Ollama).

## Arquitetura Prevista
- **Frontend (Este Repositório):** React, TypeScript, Vite, Tailwind CSS, Lucide React.
- **Backend (Futuro):** Python ou Node.js servindo requisições HTTP locais, interagindo com ferramentas binárias.
- **Tools:** FFmpeg, Ollama (Llama3/Mistral para scripts, etc).

## O que foi implementado ("Mock")
Toda a comunicação com o suposto backend/engine local ocorre por meio do módulo `src/services/api.ts`.
Atualmente as promessas estão simuladas com um pequeno 'delay' (setTimeout) e dados estáticos para simular a sensação de uso do sistema real.

### Telas
- **Dashboard:** Visão geral do uso da máquina, processos ativos e histórico.
- **Diagnostics:** Checagem de ferramentas locais instaladas (Node, FFmpeg, Docker, Ollama etc).
- **Projects & Timeline:** Pipelines de execução passo a passo, exibindo desde a Ideia, Roteirização, até Render final.
- **Jobs:** Fila de processamento.
- **Library:** Acervo de mídias categorizado por direitos de uso.
- **Settings:** Configuração de diretórios físicos e seleção de modelagem de linguagem de IA (Ollama).

## Como rodar localmente

1. Tenha o Node.js instalado (v18+).
2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`
   *(Dependências primárias: \`react-router-dom\`, \`lucide-react\`, \`clsx\`, \`tailwind-merge\`)*.
3. Inicie o servidor de desenvolvimento:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Acesse \`http://localhost:3000\` ou na porta indicada no terminal.

## Próximos Passos (Integração Codex / Backend)
- Substituir o arquivo \`src/services/api.ts\` pelas chamadas \`fetch()\` aos endpoints locais em desenvolvimento.
- Conectar o Websocket para atualizar os \`jobs\` em tempo real.
- Acoplar player de vídeo nativo HTML5 na tela de "Timeline Preview".
- Respeitar a persistência de configurações via backend.
