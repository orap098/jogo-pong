//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 2;
let velocidadeYBolinha = 6;

//Variavéis da raquete
let xRaquete = 5;
let yRaquete = 150;
let compRaquete = 6;
let alturaRaquete = 90;

let colidiu = false;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//Placar
let meusPontos = 0;
let pontosOponente = 0;

//Sons do jogo
 let raquetada;
 let ponto;
 let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3")
  ponto = loadSound("ponto.mp3")
}

function setup() {
  createCanvas(600, 400)
   trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete,yRaquete);
    movimentaMinhaRaquete();
    colisãoRaquete(xRaquete,yRaquete);
    mostraRaquete(xRaqueteOponente,yRaqueteOponente);
    movimentaRaqueteOponente();
    colisãoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluirPlacar();
    adicionaPontos();
  bolinhaNaoFicaPresa();
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}

function mostraRaquete (x,y){
 rect(x, y, compRaquete, alturaRaquete);
}

function movimentaMinhaRaquete(){
    if (keyIsDown(UP_ARROW)){
        yRaquete -= 10;
   }
    if (keyIsDown(DOWN_ARROW)){
        yRaquete += 10;
    }
}

function colisãoRaquete(x, y){
    colidiu =
      collideRectCircle(x, y, compRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1; 
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - compRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(147,112,219));
  rect(150, 10, 40, 20);
  fill(255)
  text(meusPontos,170, 27)
  fill(color(147,112,219));
  rect(450, 10, 40, 20);
  fill(255)
  text(pontosOponente,470, 27)
}

function adicionaPontos(){
  if (xBolinha + raio > 600){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha + raio < 15){
    pontosOponente += 1
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}