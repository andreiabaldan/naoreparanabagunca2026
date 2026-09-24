# Ajustes pontuais na página principal

## O que será alterado
- Reposicionar o menu para ficar entre a faixa giratória e o Hero, mantendo-o fixo durante a rolagem e compacto no celular.
- Transformar o bloco “Oferta especial” do Hero em uma caixa informativa translúcida, sem aparência ou comportamento de botão.
- Atualizar somente os checkouts de Compromisso e VIP para o novo link compartilhado, preservando integralmente o Platinum.
- Reestilizar o box promocional de “Uma experiência completa” com fundo claro, título magenta e CTA magenta.
- Remover apenas o reforço promocional 2 por 1 da Programação, mantendo seu CTA original e todo o conteúdo.
- Adicionar o CTA “QUERO VIVER ESSA EXPERIÊNCIA” ao fim de “Antes de qualquer coisa”, levando à seção de ingressos.
- Conferir que todos os CTAs gerais levam a `#ingressos` e apenas os três botões dos cards abrem checkouts.

## Detalhes técnicos
- As mudanças serão restritas à página principal compartilhada em `nrnb2026-nova`, condicionando a campanha à rota `/` como já ocorre hoje.
- Serão reutilizados os componentes, tokens de cor, interações e mensuração existentes.
- Nenhum texto protegido, imagem, preço, benefício, palestrante, depoimento, FAQ ou checkout Platinum será alterado.

## Validação
- Conferir desktop e celular: ordem faixa → menu → Hero, enquadramento, contraste, altura do menu e ausência de overflow.
- Testar rolagem dos CTAs, menu, cards Compromisso/VIP e checkout Platinum.
- Confirmar que a Programação não contém mais o box 2 por 1.
