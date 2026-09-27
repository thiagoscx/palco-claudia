# Palco · Formatura Montessori

App de ensaio e apresentação para a Cláudia Coelho (2º período, Instituto Montessori, Ponte Nova MG).
Roda no celular, funciona sem internet depois do primeiro download.

- `index.html` app inteiro
- `repertorio.js` as 6 coreografias e 17 faixas
- `musicas/` MP3 128k, todos no mesmo volume (-14 LUFS)
- `sw.js` offline; o cache das músicas (`musicas-v1`) não é apagado quando o app é atualizado

Para trocar ou acrescentar música: baixa o MP3 em `musicas/<id>.mp3`, acrescenta a faixa em `repertorio.js` com `dur` em segundos, e sobe o commit.
