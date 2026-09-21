# Nova landing page curta — NRNB 2026

## Objetivo
Criar a rota independente `/nrnb2026-participe` para teste de conversão, preservando integralmente a página principal atual. A nova versão terá aproximadamente 50%–60% do comprimento atual, com leitura mais rápida, menos repetição e acesso antecipado aos ingressos.

## Estrutura da página
1. **Hero compacto** com imagem e identidade oficiais, eyebrow “2 DIAS • EXPERIÊNCIA PRÁTICA • 7 PASSOS DA ORGANIZAÇÃO”, headline e subtítulo definidos no briefing, data, horário, local, preço inicial e CTA “QUERO PARTICIPAR” para `#ingressos`.
2. **Prova rápida** com dados confirmados: 4ª edição, 2 dias, 7 Passos da Organização e São José dos Campos.
3. **Quebra de objeções** com as três objeções e respostas literais do briefing em composição compacta.
4. **Três grandes entregas**: Organizar, Manter e Viver Mais Leve, seguidas do CTA intermediário para ingressos.
5. **Diferencial prático** com texto conciso, selo do método e no máximo quatro fotos reais já existentes.
6. **Conteúdos condensados** em grade escaneável, usando apenas temas reais já cadastrados.
7. **Os dois dias** em dois cards narrativos — Entender e Organizar; Aplicar e Manter — sem apresentá-los como cronograma oficial.
8. **Quem vai ensinar** com bloco compacto da Suelen e carrossel dos convidados mostrando apenas foto, nome e tema; detalhes permanecem sob “Saiba mais”.
9. **Prova social única** reunindo um vídeo, fotos reais e até três depoimentos já existentes, sem outra galeria na página.
10. **Ingressos antecipados** com os três cards completos, preços, benefícios, lote, progresso, compra segura, links e lógica cumulativa atuais.
11. **Para quem é** reduzido aos quatro itens indicados.
12. **FAQ comercial** somente com respostas reais já disponíveis; perguntas sem política confirmada de cancelamento ou garantia não serão inventadas.
13. **Fechamento de decisão** com os textos e CTA do briefing, seguido de rodapé, WhatsApp e CTA fixo mobile.

## Design e comportamento
- Manter magenta, azul, preto e branco, tipografia e fotografias oficiais do NRNB.
- Criar uma composição mais editorial, limpa e visual, com seções menos fragmentadas e títulos fortes, sem reproduzir o visual do benchmark.
- Priorizar celular: textos curtos, cards compactos, carrossel simples e promessa, data, local, preço e CTA compreensíveis nos primeiros segundos.
- Todos os CTAs externos aos cards fazem rolagem suave até `#ingressos`; somente os três cards abrem seus checkouts atuais.

## Mensuração e preservação
- Manter GTM/GA4, Utmify, UTMs, WhatsApp e demais scripts globais atuais; não adicionar nem disparar Purchase no clique.
- Registrar esta variante como `nrnb2026-participe` nos eventos de visualização, CTA do Hero, profundidade de rolagem, visualização de ingressos, cliques por categoria e início de checkout.
- Definir título, descrição, Open Graph e Twitter próprios da nova rota.
- Corrigir a divergência de hidratação causada pela inclusão automática de UTMs nos links, sem alterar destinos ou parâmetros.

## Validação
- Comparar `/` antes e depois para confirmar que não houve alteração na página atual.
- Validar desktop e celular: primeira dobra, ordem, comprimento, fotos, carrossel, vídeo, preços, benefícios, progresso, FAQ, CTA fixo e ausência de cortes ou estouro horizontal.
- Testar rolagem dos CTAs, os três checkouts, WhatsApp, preservação de UTMs e eventos da nova variante.
