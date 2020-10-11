# *Spacewar!*
Recriação do jogo multijogador de combate espacial Spacewar!, desenvolvido por Steve Russel em colaboração com Martin Graetz, Wayne Wiitanen, Bob Saunders, Steve Piner, e outros e lançado em abril de 1962 para o minicomputador DEC (Digital Equipment Corporation) PDP-1.
## Gameplay original
A gameplay do *Spacewar!* original envolve duas naves monocromáticas chamadas "the needle" e "the wedge", cada uma controlada por um jogador. Os jogadores tentam acertar-se enquanto manobram sua nave em um plano bidimensional no campo gravitacional de uma estrela. As naves disparam mísseis, que não são afetados pela atração gravitacional da estrela. As naves têm uma quantidade limitada de mísseis e combustível, usado quando o jogador utiliza os propulsores da nave. Os mísseis são disparados um por vez ao apertar de um botão e existe um tempo de espera entre disparos. As naves mantêm-se em movimento mesmo quando o jogador não está acelerando e rotacionar as naves não altera a direção de seu movimento, embora os navios possam girar em uma taxa constante - sem efeito de inércia.<br><br>
Os controles do jogador incluem rotação no sentido horário e anti-horário, impulso para frente, disparo de mísseis e hiperespaço.<br><br>
Cada jogador controla uma das naves e deve tentar abater a outra nave, evitando uma colisão com a estrela ou a nave adversária. Voar perto da estrela pode fornecer uma ajuda da gravidade ao jogador, sob o risco de julgar mal a trajetória e cair na estrela. Se uma nave passar por uma borda da tela, ela reaparecerá do outro lado em um efeito contínuo. Um recurso de hiperespaço, ou "botão de pânico", pode ser usado como um último instrumento para escapar dos mísseis inimigos movendo a nave do jogador para outro local na tela após ele desaparecer por alguns segundos, mas a reentrada do hiperespaço ocorre em uma localização aleatória e, em algumas versões, há uma probabilidade crescente de o navio explodir a cada uso do botão.
## Gameplay recriada
Alguns aspectos da gameplay do jogo original foram extintos ou levemente alterados para simplificar, ao menos por agora, o desenvolvimento. Nesse momento, o jogo não conta com:
* a estrela que gera um campo gravitacional sobre a área de jogo;
* o sistema de combustível;
* o "botão de pânico".<br>

Além disso, o número de disparos não é finito.
### Controles
| Controles                          |  P1 |       P2      |
|------------------------------------|:---:|:-------------:|
| Acelerar                           | "W" |   "up arrow"  |
| Rotacionar no sentido horário      | "D" | "right arrow" |
| Rotacionar no sentido anti-horário | "A" | "left arrow"  |
| Atirar                             | "F" |      "O"      |
### Resultados
Atualmente, os resultados podem ser verificados no console de desenvolvimento web, em que é impressa uma das três mensagens a seguir ao fim do jogo:
* "Player 1 wins!", quando o Jogador Um é vitorioso;
* "Player 2 wins!", quando o Jogador Dois é vitorioso;
* "Crash detected!", quando há colisão entre as naves.
### Obseervações: 
* Para simplificar os cálculos, maximizar performance e aumentar compatibilidade foi utilizado o sistema de colisão circular. As consequências dessa escolha não são perceptíveis o suficiente para justificar o uso de técnicas mais precisas. 
* O jogo é atualizado a cada 16.65ms (gerando, portanto, 60 quadros por segundo).
