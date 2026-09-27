#!/bin/zsh
cd "$(dirname "$0")"
baixa() { # id  arquivo  titulo  artista
  [ -f "musicas/$2.mp3" ] && { echo "[$2] já existe"; return; }
  yt-dlp -q --no-warnings -x --audio-format mp3 --audio-quality 0 --no-playlist \
    -o "musicas/$2.%(ext)s" "https://www.youtube.com/watch?v=$1" 2>/dev/null \
    && echo "[$2] ok  $3 · $4" || echo "[$2] FALHOU  $3"
}
baixa eiPE7YO_F30 1-1 "Bagunça de Criança" "Mundo Bita"
baixa aczVMUhrKao 1-2 "Tempo de Alegria" "Ivete Sangalo"
baixa iDhHIhgclR4 2-1 "Como é Grande o Meu Amor por Você" "Rádio Bita"
baixa QW0i1U4u0KE 2-2 "Oração" "A Banda Mais Bonita da Cidade"
baixa dWpLXAhw_u0 3-1a "What's Up Danger (instrumental)" "Blackway & Black Caviar"
baixa 3ApM0HfNtV4 3-1b "Sunflower (instrumental)" "Post Malone & Swae Lee"
baixa 1J6wIgARLms 3-2 "Nunca Desistir" "Imagine e Sonhe"
baixa Dr4gittIyaU 4-1 "A Amizade" "Mundo Bita"
baixa FH4EDYF1frI 4-2 "Meu, Seu, Nosso" "Mundo Bita"
baixa M71yKfSkyJA 5-1 "Palco de Brinquedos" "Mundo Bita"
baixa qNlPLFsBNbc 5-2 "Oração ao Tempo" "Caetano Veloso"
baixa QE0r_b7iAp4 5-3 "Fábrica de Saudades" "Carrossel"
baixa hZPXL9TB68Q 6-1 "Adventure of a Lifetime" "Coldplay"
baixa 59FwqjwsSo4 6-2 "Flores de Gratidão" "Universo da Música Infantil"
baixa BX5E0G7ixpI 6-3 "Sementes do Amanhã" "Gonzaguinha"
baixa Kd6FOU6NGZc 6-4 "Depende de Nós" "Ivan Lins"
baixa tIUBzJ7p1e0 6-5 "É Preciso Saber Viver" "Titãs"
echo FIM
