# Publicar a nova landing page como página principal

## Objetivo
Colocar a landing page aprovada de `/nrnb2026-nova` na raiz do domínio, sem redirecionamento, mantendo uma cópia real e acessível da página principal atual.

## Alterações
1. Duplicar integralmente a página atual de `/` em `/nrnb2026-anterior`, preservando conteúdo, recursos, links, integrações e comportamento.
2. Validar a cópia antes de alterar a raiz.
3. Servir a landing page de `/nrnb2026-nova` diretamente em `/`, mantendo a URL principal sem redirecionamento.
4. Manter `/nrnb2026-nova` disponível temporariamente com a mesma landing page.
5. Usar na raiz os metadados da nova landing page e canonical absoluto para `https://naoreparanabagunca.com.br/`, sem canonical conflitante na rota temporária.
6. Preservar GTM, Utmify, eventos, UTMs, WhatsApp e os três checkouts existentes.

## Validação
- Conferir `/`, `/nrnb2026-anterior` e `/nrnb2026-nova` em desktop e celular.
- Testar menu, âncoras, CTAs, ingressos, WhatsApp, palestrantes, programação, FAQ, mídia e ausência de redirecionamento.
- Confirmar metadados e canonical da raiz.
- Verificar segurança e solicitar a publicação no domínio já conectado.
