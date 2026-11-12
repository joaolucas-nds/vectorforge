# SPEC — Ciclo de exploração (Fase A): Surprise, cadeados, desfazer, «Like this», prévia ao vivo

> Fase A da análise `meta/analises/261112-ANALISE-exploracao-e-ux.md`. O COMO está em `meta/workorders/261112-wo0003-exploracao.md`.
> Escrita em 2026-11-12 a partir de um protótipo construído e testado fora do repositório (VM do chat: build real, `npm run regress` e 18 testes de comportamento em jsdom sobre o `dist/vectorforge.html`).

## Problema
Pedido do dono (2026-11-12): «apertar um botão e gerar um diferente do último», «configuração aleatória para tudo», «mais opções, variações». Hoje nada redesenha sem o botão Generate (no rodapé do painel), o único acaso é o seed, as variações mudam só o seed, não há desfazer — e o canvas pode abrir vazio (FIX-003: medido 0×0 no painel do navegador; −80 px no jsdom com o build atual).

## Critérios de aceite (verificáveis)
- [ ] **Prévia ao vivo:** escolher estilo, tipo, paleta, fonte, proporção ou modo redesenha na hora; arrastar slider redesenha (debounce 120 ms); mudar o tamanho do canvas redesenha; digitar no Text→Form redesenha (300 ms).
- [ ] **🎲 Surprise** (botão no topo, botão do rodapé e tecla **Espaço**) sorteia estilo, tipo, paleta, Complexity (15–95), Symmetry (0–100), espessura (0,6–2,4), preenchimento (metade das vezes 0; senão 10–60%) e seed — **nunca repete o estado anterior** (10 Surprises seguidos: 0 repetições).
- [ ] **Cadeado** em estilo, tipo, paleta e em cada slider: o que está travado não muda no Surprise. Travar o tipo segura o estilo. Tudo travado → nada muda e o status avisa.
- [ ] **↻ New seed** (tecla **R**): mesmos parâmetros, seed diferente do atual — mesmo com o seed travado (é ação explícita).
- [ ] **Desfazer / refazer** (botões ↶ ↷, **Ctrl+Z** / **Ctrl+Shift+Z** ou **Ctrl+Y**), histórico de até **60** estados; os botões ficam desabilitados quando não há para onde ir.
- [ ] **Variações «Like this»:** miniatura 0 = estado atual; 1–3 = Complexity e Symmetry a ±20 pontos e seed novo (cadeados respeitados); o tooltip mostra os valores; clicar adota os valores e a escolhida vira a nova base.
- [ ] Atalhos não disparam enquanto se digita em campo de texto/número.
- [ ] **FIX-003:** canvas nunca fica com tamanho ≤ 0; re-enquadra ao redimensionar a janela e ao voltar a aba.
- [ ] `npm run regress` → **0 mudanças** (nenhum gerador foi tocado).
- [ ] Roteiro do dono: tudo acima, visto no navegador.

## Decisões de design
- **Módulo novo `src/core/explore.js`**, sem tocar gerador: só `state`, controles e `doGen()`. O regress é a rede.
- **Sorteio em unidades de slider** (inteiros), porque `doGen()` relê os sliders para o `state` — o que é sorteado é exatamente o que aparece.
- **Histórico por ação, não por quadro:** entra ao soltar o slider (`change`), em cada escolha discreta, Surprise, New seed e variação — arrastar não enche o histórico.
- **«Like this» determinístico pelo estado** (semente derivada de seed/comp/sym), para as miniaturas não mudarem sozinhas a cada redesenho.
- **Idioma:** rótulos novos em inglês, como o resto da UI — a troca de idioma é decisão da Fase B.

## Fora de escopo
Fase B (layout novo, seções recolhíveis, rótulos completos, seed digitável, estado na URL, favoritos, paleta aleatória harmônica) e Fase C (variedade dentro dos geradores). Ver a análise.

## Passos
1. `npm run regress` antes (linha de base atual) e depois — 0 mudanças.
2. Aplicar as edições de UI; `npm run build`.
3. Sonda de comportamento (jsdom) fora do repo, se a rede permitir instalar o jsdom.
4. Registro (DEC-015, FIX-003, versão 0.5.0) e roteiro do dono.
