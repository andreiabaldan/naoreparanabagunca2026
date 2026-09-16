# Dois pop-ups de conversão na página principal

## Objetivo
Adicionar somente à página principal dois lightboxes coerentes com a identidade atual, sem alterar as demais seções, preços, links ou integrações existentes.

## Implementação
- Criar o pop-up de ajuda com a copy aprovada, WhatsApp oficial e mensagem específica, exibido após 20 segundos reais de baixa interação. Cliques, rolagem ativa, teclado, formulários e vídeos reiniciam a contagem. Uma decisão encerra sua exibição durante a sessão.
- Criar o pop-up de saída com a copy aprovada, campos Nome e WhatsApp, validação, máscara de telefone, estados de envio/erro/sucesso e espaço reservado para a futura capa do guia.
- No computador, usar movimento genuíno do cursor para o topo após permanência mínima. No celular, usar retorno rápido ao topo somente após navegação relevante e tempo mínimo, sem interceptar o botão Voltar ou impedir a saída.
- Coordenar os dois pop-ups para nunca aparecerem juntos e não incomodarem quem já comprou, clicou em checkout, WhatsApp ou converteu.
- Salvar na Planilha Google: data/hora, nome, WhatsApp, origem, conversão, URL e UTMs da sessão. O guia só será liberado após confirmação real do registro.
- Após sucesso, mostrar a tela aprovada e abrir o guia do YouTube em nova aba apenas quando a visitante clicar.
- Adicionar os eventos de visualização, fechamento, WhatsApp, envio, sucesso e acesso ao guia à camada de mensuração atual.
- Garantir fechamento por X, ação secundária, tecla Esc e clique fora, foco acessível, bloqueio de rolagem e boa leitura no computador e celular.

## Dependência para concluir
- Conectar a conta Google responsável pela planilha.
- Informar ou criar a planilha e a aba que receberão os contatos.

## Validação
- Testar os gatilhos, a frequência por sessão, os dois tamanhos de tela, validação do formulário, falha real sem falso sucesso, gravação na planilha e abertura do guia.
