# App Dedoches Bíblicos (PWA)

App de aluna, gamificado, para quem comprou os 100 Dedoches Bíblicos em Feltro.

## O que tem
- **Boas-vindas** com a mascote Lãzinha (SVG animado): nome e objetivo (catequese, família ou vender).
- **Início**: XP, nível, sequência de dias, missões diárias, contagem real até o Natal e progresso do presépio.
- **Trilha**: as 10 coleções e os 100 personagens em caminho estilo jogo. Cada personagem tem 5 passos (materiais, imprimir, recortar, montar, finalizar), cores sugeridas, dica da mascote, passagem bíblica e pergunta para as crianças.
- **Escola**: 3 pontos de costura com animação + Quiz da Fé (22 perguntas).
- **Ateliê**: contador de kits produzidos e vendidos, meta do mês e conta de sobra (só com os números da usuária).
- **Perfil**: 7 níveis, 23 conquistas, 4 bônus (liberados no Premium), instalar app.

O progresso fica salvo no próprio aparelho.

## Configurar (app-data.js)
- `plano`: 'premium' ou 'basico' (bônus bloqueados no básico). Para vender os dois, publique duas cópias, uma para cada plano.
- `linksMoldes`: link do PDF de cada coleção (botão "Abrir molde em PDF").
- `linksBonus`: links dos PDFs dos bônus.
- Link com `#basico` mostra os bônus bloqueados; `#premium` libera os 4 bônus.
- `suporte`: e-mail ou WhatsApp.

## Publicar (Vercel)
Envie esta pasta como projeto estático (preset "Other", sem build). Em https, o app pode ser instalado na tela inicial e funciona offline (sw.js).
