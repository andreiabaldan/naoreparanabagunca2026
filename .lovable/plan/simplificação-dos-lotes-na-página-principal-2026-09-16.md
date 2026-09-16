# Simplificação dos lotes na página principal

## Objetivo
Simplificar exclusivamente a comunicação de lotes nos três cards de ingressos da página principal, mantendo preços atuais, parcelamentos, benefícios, nomes, CTAs, links, percentuais, cores, design geral e rastreamento.

## Alterações
1. Remover a listagem comparativa de 1º lote, 2º lote, 3º lote e valor cheio.
2. Manter o preço atual em destaque apenas uma vez no topo de cada card.
3. Substituir o bloco antigo por uma versão compacta com esta hierarquia:
   - `LOTE ATUAL`
   - `2º LOTE`
   - `PRÓXIMO LOTE EM BREVE`
   - percentual específico de cada ingresso no formato `XX% DO LOTE 2 VENDIDO`
   - barra de progresso existente, preservando 34% no Compromisso, 25% no VIP e 70% no Platinum.
4. Remover da estrutura da página principal os dados de preços futuros que deixarem de ser exibidos, sem afetar nenhuma outra página.

## Validação
- Conferir os três cards no computador e celular, garantindo que o novo bloco permaneça compacto.
- Confirmar os preços R$ 147,00, R$ 197,00 e R$ 447,00, os parcelamentos, benefícios e CTAs.
- Confirmar que os três links de compra e os eventos de rastreamento permanecem inalterados.
- Verificar que nenhuma outra seção ou página foi modificada.
