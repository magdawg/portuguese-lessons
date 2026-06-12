# A2 → B1 Curriculum — the structured course plan

This is the full **Curso estruturado A2 → B1**: a 36-lesson progression the `portuguese-lesson` skill follows when generating numbered course lessons. It is reference data, read on demand — `SKILL.md` points here to decide *what* the next lesson should cover.

The plan is delivered in order unless the student requests otherwise. Each lesson has a number, a grammar focus, a communication goal, and a vocabulary theme.

## The progression tracker

Progress is tracked in `portuguese-lessons/progression.json` (a local, gitignored file in the repo's working directory).

1. Look for `portuguese-lessons/progression.json`. If it doesn't exist, create the directory `portuguese-lessons/` and initialize:

   ```json
   {
     "current_lesson": 0,
     "completed_lessons": [],
     "level": "A2",
     "notes": "Starting fresh"
   }
   ```

2. Read it to decide which numbered lesson to deliver next.
3. If `$ARGUMENTS` is a number, deliver that lesson. If it's a topic (e.g. "past tense", "conjuntivo"), find the matching row below and deliver that lesson. If empty, deliver `current_lesson + 1`.

### After delivering a numbered lesson, update the tracker

- Increment `current_lesson` and add the number to `completed_lessons`.
- Update `level` when crossing a threshold: lesson 12 → `A2+`, lesson 20 → `B1-`, lesson 36 → `B1`.
- Add any notes about what the student found challenging.

> Mariana (Granola-based) lessons are **supplementary** — they go in a separate `mariana_lessons` array and do **not** increment `current_lesson`. See `SKILL.md`.

---

## A2 Consolidation (Lessons 1–12)

| # | Grammar Focus | Communication Goal | Vocabulary Theme |
|---|---|---|---|
| 1 | Presente do indicativo — revisão (regulares + irregulares comuns: ser, estar, ter, ir) | Apresentar-se e falar sobre rotinas diárias | Rotina diária, profissões |
| 2 | Pretérito perfeito simples — verbos regulares | Contar o que fez ontem / no fim de semana | Atividades de lazer, fim de semana |
| 3 | Pretérito perfeito simples — irregulares (ser/ir, ter, estar, fazer, dizer, poder, querer) | Contar uma viagem ou experiência passada | Viagens, transportes |
| 4 | Pretérito imperfeito — formação e usos (hábitos, descrições no passado) | Descrever como era a vida quando era criança | Infância, memórias, escola |
| 5 | Perfeito vs. imperfeito — contraste | Contar uma história com ações e contexto | Narrativa, conectores temporais (quando, enquanto, de repente) |
| 6 | Pronomes de objeto direto e indireto (me, te, o/a, lhe, nos, vos, os/as, lhes) | Responder a perguntas sem repetir o substantivo | Compras, presentes, favores |
| 7 | Colocação dos pronomes átonos (próclise, ênclise, mesóclise — introdução) | Escrever mensagens e e-mails simples com pronomes | Comunicação escrita, e-mails |
| 8 | Preposições de lugar e movimento (em, a, para, de, por) + contrações | Dar e pedir direções, descrever localização | Cidade, direções, lugares |
| 9 | Futuro próximo (ir + infinitivo) e futuro simples — introdução | Falar sobre planos e intenções | Planos, projetos, tempo livre |
| 10 | Comparativos e superlativos (mais…do que, menos…do que, tão…como, o/a mais…) | Comparar cidades, pessoas, produtos | Descrições, adjetivos, opiniões |
| 11 | Imperativo (tu e você) — verbos regulares e irregulares comuns | Dar conselhos, instruções, receitas simples | Saúde, culinária, instruções |
| 12 | Revisão A2 — consolidação e autoavaliação | Fazer uma apresentação oral curta sobre si mesmo | Todos os temas anteriores |

## A2→B1 Bridge (Lessons 13–20)

| # | Grammar Focus | Communication Goal | Vocabulary Theme |
|---|---|---|---|
| 13 | Presente do conjuntivo — formação (regulares + irregulares) | Expressar desejos e dúvidas | Desejos, esperanças |
| 14 | Presente do conjuntivo — usos (querer que, esperar que, talvez, embora, para que) | Dar opiniões com nuance ("espero que", "duvido que") | Opiniões, debate |
| 15 | Pretérito perfeito composto (tenho + particípio passado) — uso europeu | Falar sobre ações repetidas ou contínuas no presente | Hábitos recentes, mudanças |
| 16 | Infinitivo pessoal — formação e usos básicos | Expressar causa, finalidade e condição de forma natural | Trabalho, objetivos |
| 17 | Voz passiva (ser + particípio) e passiva com "se" | Descrever processos e notícias | Notícias, processos, indústria |
| 18 | Discurso indireto — introdução (disse que, perguntou se) | Relatar o que alguém disse | Conversas, fofoca, relatos |
| 19 | Condições reais (se + presente/futuro) e irreais — introdução (se + imperfeito do conjuntivo) | Falar sobre situações hipotéticas | Sonhos, condições, consequências |
| 20 | Revisão ponte A2→B1 — teste de progresso | Participar numa conversa semi-espontânea | Todos os temas |

## B1 Core (Lessons 21–36)

| # | Grammar Focus | Communication Goal | Vocabulary Theme |
|---|---|---|---|
| 21 | Imperfeito do conjuntivo — formação e usos | Expressar condições irreais no presente | Situações hipotéticas, desejos |
| 22 | Futuro do conjuntivo — formação e usos (quando, se, assim que) | Falar sobre o futuro com incerteza | Planos futuros, carreira |
| 23 | Pretérito mais-que-perfeito composto (tinha + particípio) | Contar histórias com sequência de tempos | Narrativa, anedotas |
| 24 | Pretérito mais-que-perfeito simples (fora, dissera — reconhecimento) | Ler textos literários e formais | Leitura, cultura, literatura |
| 25 | Conjuntivo perfeito (tenha + particípio) | Expressar dúvidas sobre o passado | Suposições, análise |
| 26 | Condicional (futuro do pretérito) — formação e usos | Fazer pedidos educados, dar conselhos formais | Contextos formais, cortesia |
| 27 | Orações relativas (que, quem, onde, cujo — introdução) | Descrever pessoas e coisas de forma mais precisa | Descrições complexas, pessoas |
| 28 | Conectores de discurso (porém, contudo, além disso, por outro lado, visto que, dado que) | Argumentar e estruturar opiniões escritas | Argumentação, ensaio |
| 29 | Gerúndio vs. a + infinitivo (diferença PT-BR vs. PT-PT) | Descrever ações em progresso à maneira portuguesa | Ações em progresso, quotidiano |
| 30 | Verbos com preposição (depender de, pensar em, acreditar em, insistir em, consistir em) | Usar expressões verbais com naturalidade | Expressões idiomáticas, regências |
| 31 | Expressões idiomáticas e calão leve | Compreender e usar linguagem coloquial | Expressões do dia a dia, humor |
| 32 | Registos de língua — formal vs. informal | Adaptar o discurso ao contexto (entrevista vs. café) | Trabalho, socialização |
| 33 | Pretérito imperfeito do conjuntivo + condicional (revisão de condicionais completas) | Debater temas sociais usando condicionais | Sociedade, problemas atuais |
| 34 | Revisão geral do conjuntivo — todos os tempos | Escrever um texto argumentativo | Temas livres |
| 35 | Cultura portuguesa — diferenças regionais, pronúncia, sotaques | Compreender variações do português europeu | Cultura, regiões, tradições |
| 36 | Avaliação final B1 — teste integrado | Conversa livre, escrita e compreensão | Todos os temas |
