# Landing page da oferta 2 por 1

## Objetivo
Substituir a versão antiga de `/2por1` por uma cópia independente da página principal atual, preservando integralmente a homepage `/` e transformando “Compre 1 ingresso e ganhe +1” no argumento comercial central.

## Estrutura preservada
- Replicar na nova página o Hero atual, identidade visual, montagem fotográfica, dores, método, benefícios, galeria e lightbox, experiência NRNB, Suelen, convidados, programação, depoimentos, local, FAQ, rodapé e comportamento responsivo.
- Manter scripts globais, mensuração, WhatsApp, captura de UTMs e popup do guia.
- Criar as adaptações dentro de `/2por1`, sem alterar componentes ou conteúdo da homepage.

## Oferta 2 por 1
- Barra superior preta: “OFERTA ESPECIAL 2 POR 1 • COMPRE 1 INGRESSO E GANHE +1”.
- Manter a headline e os destaques azul-claro já aprovados no Hero.
- Acrescentar no Hero o selo “OFERTA ESPECIAL • 2 POR 1”, a mensagem de acompanhamento, o método, data, horário e CTA “QUERO APROVEITAR O 2 POR 1”.
- Criar uma composição compacta “COMPRE 1 + GANHE +1” sem competir com a headline.
- Manter um contador que inicia em 4 horas a cada entrada na página, conforme solicitado.
- Inserir reforços variados e compactos nos pontos definidos: após a prova rápida, após a galeria e após “A experiência NRNB”.
- Adicionar antes da compra a seção principal “2 dias. 2 pessoas. 1 ingresso.” com a representação “VOCÊ + QUEM VOCÊ ESCOLHER = 2 DIAS DE NRNB”.
- Todos os CTAs promocionais levarão ao checkout exclusivo `https://payfast.greenn.com.br/pre-checkout/xa37xct`, preservando UTMs.
- Não exibir categoria, preço, parcelamento, regras operacionais ou elegibilidade que não tenham sido confirmados.

## Conversão e mensuração
- Adaptar CTA final e sticky mobile para “QUERO O 2 POR 1”.
- Adaptar somente o popup de ajuda dessa página para dúvidas sobre a promoção; manter o popup de saída e o guia atuais.
- Registrar eventos específicos: `nrnb_2for1_hero_click`, `nrnb_2for1_gallery_click`, `nrnb_2for1_experience_click`, `nrnb_2for1_offer_click` e `nrnb_2for1_whatsapp_click`.
- Não disparar evento de compra no clique.
- Preservar os parâmetros UTM no checkout e no WhatsApp sem causar divergência visual no carregamento.

## SEO
- Definir título, descrição e compartilhamento próprios para a campanha.
- Marcar a página promocional para não competir com a homepage nos buscadores.
- Não alterar o SEO da página principal.

## Validação
- Conferir desktop e mobile, ordem das seções, montagem do Hero, carrosséis, galeria/lightbox, vídeos, FAQ, sticky CTA e popups.
- Validar checkout exclusivo, WhatsApp, UTMs e eventos da campanha.
- Confirmar que não há estouro horizontal, sobreposição ou erro de carregamento.
- Comparar `/` antes e depois para confirmar que a homepage permaneceu intacta.
