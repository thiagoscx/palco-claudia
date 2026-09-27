// Espetáculo de formatura do 2º período, Instituto Montessori (Ponte Nova MG) — Cláudia Coelho.
// Cada coreografia tem sua cor; as faixas tocam em sequência dentro da coreografia e param no fim dela.
const ESPETACULO = {
  nome: "Formatura Montessori",
  coreografias: [
    { n: 1, tema: "Alegria",  cor: "#FFB627", faixas: [
      { id: "1-1", dur: 185, num: "1.1", titulo: "Bagunça de Criança", artista: "Mundo Bita", nota: "entrada" },
      { id: "1-2", dur: 222, num: "1.2", titulo: "Tempo de Alegria", artista: "Ivete Sangalo" } ] },
    { n: 2, tema: "Amor",     cor: "#FF5D8F", faixas: [
      { id: "2-1", dur: 174, num: "2.1", titulo: "Como É Grande o Meu Amor por Você", artista: "Rádio Bita" },
      { id: "2-2c", v: 2, dur: 114, num: "2.2", titulo: "Oração", artista: "instrumental + remix JetLag", nota: "emendada: instrumental até 0:47 e o remix entra na batida" },
      { id: "2-2g", dur: 112, num: "2.2", titulo: "Oração", artista: "instrumental + remix JetLag", nota: "opção: emenda em 0:46" },
      { id: "2-3", dur: 161, num: "2.3", titulo: "Sunflower", artista: "Post Malone & Swae Lee", nota: "cantada" } ] },
    { n: 3, tema: "Coragem",  cor: "#FF6B35", faixas: [
      { id: "3-1a", dur: 203, num: "3.1", titulo: "What's Up Danger", artista: "instrumental" },
      { id: "3-1b", dur: 158, num: "3.1", titulo: "Sunflower", artista: "instrumental", nota: "emenda na anterior" },
      { id: "3-2", v: 2, dur: 111, num: "3.2", titulo: "Nunca Desistir", artista: "Imagine e Sonhe", nota: "em 105%" } ] },
    { n: 4, tema: "Amizade",  cor: "#3DD598", faixas: [
      { id: "4-1", dur: 198, num: "4.1", titulo: "A Amizade", artista: "Mundo Bita" },
      { id: "4-2", dur: 188, num: "4.2", titulo: "Meu, Seu, Nosso", artista: "Mundo Bita" } ] },
    { n: 5, tema: "Sonhos",   cor: "#A97BFF", faixas: [
      { id: "5-1", dur: 199, num: "5.1", titulo: "Palco de Brinquedos", artista: "Mundo Bita" },
      { id: "5-2", dur: 207, num: "5.2", titulo: "Oração ao Tempo", artista: "Caetano Veloso" },
      { id: "5-3", dur: 145, num: "5.3", titulo: "Fábrica de Saudades", artista: "Carrossel" } ] },
    { n: 6, tema: "Gratidão", cor: "#4EA8DE", faixas: [
      { id: "6-1", v: 2, dur: 264, corte: [0, 36.3], num: "6.1", titulo: "Adventure of a Lifetime", artista: "Coldplay", nota: "só o começo, como efeito" },
      { id: "6-2", dur: 110, num: "6.2", titulo: "Flores de Gratidão", artista: "Universo da Música Infantil" },
      { id: "6-3", dur: 230, num: "6.3", titulo: "Sementes do Amanhã", artista: "Gonzaguinha" },
      { id: "6-4", dur: 166, num: "6.4", titulo: "Depende de Nós", artista: "Ivan Lins" },
      { id: "6-5", dur: 251, num: "6.5", titulo: "É Preciso Saber Viver", artista: "Titãs" } ] },
  ],
};
const TODAS = ESPETACULO.coreografias.flatMap(c => c.faixas.map(f => ({ ...f, coreo: c })));
const DUR_ORIG = Object.fromEntries(TODAS.map(f => [f.id, f.dur]));
// Trocar uma música: substitui o mp3, atualiza dur e SOBE o v da faixa (v: 2, 3...).
// O v entra na URL, então o celular dela busca o arquivo novo em vez do que já está no cache.
// corte: [inicio, fim] que eu já deixo pronto; ela pode mudar no app a qualquer momento.
const URL_FAIXA = f => `musicas/${f.id}.mp3` + ((f.v || 1) > 1 ? `?v=${f.v}` : "");
