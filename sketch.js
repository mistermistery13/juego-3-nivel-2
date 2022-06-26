//sonidos
var S_1,S_2;
var E_1 = "apagado",E_2 = "apagado";
var C_1,C_2;
var cancion,E_cancion;

//juego
var N_1,N_2;
var jugador,musica;
var jugadorImg;
var G_obstaculo,G_obstaculo2,G_obstaculo3,G_obstaculo4;
var G_sierra_multicolor;
var flecha_derecha,flecha_izquierda,flecha_abajo,flecha_arriba;
var segundos = 0,tiempo_espera = 20,velocidad1 = -5,velocidad2 = 5;
var S_segundos1 = 0;
var S_obstaculos = 1;

var gameState = "pantalla principal";
var gameState_2 = "pantalla principal";
function preload(){
  //sonidos
  S_1 = loadSound("./sonidos/musica1.mp3");
  S_2 = loadSound("./sonidos/musica2.mp3");

  //animaciones
  sierraMulticolor = loadAnimation ("./animaciones/sierra_instaKill (1).png","./animaciones/sierra_instaKill (2).png",
  "./animaciones/sierra_instaKill (3).png","./animaciones/sierra_instaKill (4).png");

  //imagenes
  flecha_derecha = loadImage ("./imagenes/flecha_derecha.png");
  flecha_izquierda = loadImage ("./imagenes/flecha_izquierda.png");
  flecha_abajo = loadImage ("./imagenes/flecha_abajo.png");
  flecha_arriba = loadImage ("./imagenes/flecha_arriba.png");
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  vidas = 3;

  G_obstaculo = createGroup();
  G_obstaculo2 = createGroup();
  G_obstaculo3 = createGroup();
  G_obstaculo4 = createGroup();
  G_sierra_multicolor = createGroup();

  jugador = createSprite (width / 2, height / 2 ,width / 50,width / 50);
  jugador.shapeColor = "lime";

  //pantalla principal
  N_1 = createSprite (40,height / 2,50,50);
  N_1.shapeColor = "red";
  N_2 = createSprite (100,height / 2,50,50);
  N_2.shapeColor = "red";

  musica = createSprite(width - 20,0 + 20,50,50);
  musica.shapeColor = "white";

  //musica
  C_1 = createSprite (130,height / 2,200,200);
  C_1.shapeColor = "black";
  C_2 = createSprite (390,height / 2,200,200);
  C_2.shapeColor = "black";
}
function draw(){
  background ("gray");
console.log(gameState_2);
  movimiento();
  fin_del_juego();
  indicaciones_jugando();
  accesos();
  sonidos_segundos();
  drawSprites();
}
function movimiento(){
  
  if (keyDown ("W") || keyDown ("up_arrow")){
    jugador.y = jugador.y - 10;
  }
  if (keyDown ("S") || keyDown ("down_arrow")){
    jugador.y = jugador.y + 10
  }
    if (keyDown ("A") || keyDown ("left_arrow")){
      jugador.x = jugador.x - 10;
    }
    if (keyDown ("D") || keyDown ("right_arrow")){
      jugador.x = jugador.x + 10
    }
  jugador.velocityX = 0;
  jugador.velocityY = 0;
  jugador.collide (G_obstaculo);
  jugador.collide (G_obstaculo2);
  jugador.collide (G_obstaculo3);
  jugador.collide (G_obstaculo4);
}
function accesos(){
if (gameState === "pantalla principal"){
  if (mousePressedOver(musica) && segundos > 0){
    gameState = "musica";
    segundos = 0;
  }
  C_1.visible = false;
  C_2.visible = false;

  N_1.visible = true;
  N_2.visible = true;

  musica.visible = true;
  jugador.visible = false
  jugador.x = width / 2;
  jugador.y = height / 2;
}

if (gameState === "musica"){
  if (mousePressedOver(musica) && segundos > 0){
    gameState = "pantalla principal";
    segundos = 0;
  }
  jugador.x = width / 2;
  jugador.y = height / 2;

  textSize(20);
  fill ("red");
  text ("presiona M para mutear la musica",0 + 20,0 + 100);
  fill ("green");
  text ("presiona P para REPRODUCIR la musica",0 + 20,0 + 140);

  C_1.visible = true;
  C_2.visible = true;

  N_1.visible = false;
  N_2.visible = false;
}
if (mousePressedOver (N_1) && gameState === "pantalla principal"){
  gameState = "indicaciones";
  gameState_2 = "nivel 1";

  jugador.visible = true;
  musica.visible = false;

  N_1.visible = false;
  N_2.visible = false;
}
if (mousePressedOver (N_2) && gameState === "pantalla principal"){
  gameState = "indicaciones";
  gameState_2 = "nivel 2";

  jugador.visible = true;
  musica.visible = false;

  N_1.visible = false;
  N_2.visible = false;
}
}

function sonidos_segundos(){
//sonidos (on y off)
if (keyWentDown ("M") && E_cancion === "encendido" && S_segundos1 > 0){
  cancion.pause();
  E_cancion = E_cancion = "apagado";
  S_segundos1 = 0;
}
if (keyWentUp ("P") && E_cancion === "apagado" && S_segundos1 > 0){
  cancion.play();
  E_cancion = E_cancion = "encendido";
  S_segundos1 = 0;
}

//sonidos
if (gameState === "musica"){
  if (mousePressedOver (C_1) && E_1 === "apagado"){
    cancion = S_1;

    S_1.loop();
    S_2.stop();

    E_1 = "encendido";
    E_2 = "apagado";

    E_cancion = E_1;
  }
  if (mousePressedOver (C_2) && E_2 === "apagado"){
    cancion = S_2;
    
    S_1.stop();
    S_2.loop();

    E_1 = "apagado";
    E_2 = "encendido";

    E_cancion = E_2;
  }
}

//contador de segundos de musica
if (frameCount % 10 === 0){
  S_segundos1 = S_segundos1 + 1;
}

//contador de segundos
if (frameCount % 30 === 0){
  segundos = segundos + 1;
}
}
function fin_del_juego(){
  if (jugador.x < 0 || jugador.x > width){
    gameState = "final";
  }
  if (jugador.y < -15 || jugador.y > height + 15){
    gameState = "final";
  }
  if (gameState === "final"){
    if (keyDown ("R")){
    gameState = "pantalla principal";
    gameState_2 = "pantalla principal";
    velocidad1 = -5;
    velocidad2 = 5;
    S_obstaculos = 1;
    tiempo_espera = 20;
    }
    G_obstaculo.destroyEach();
    G_obstaculo2.destroyEach();
    G_obstaculo3.destroyEach();
    G_obstaculo4.destroyEach();
    G_sierra_multicolor.destroyEach();

    jugador.visible = false;
    jugador.x = width / 2;
    jugador.y = height / 2;
  }
}
function indicaciones_jugando(){
  if (gameState === "indicaciones"){
    indicaciones_1();
  }
  if (gameState === "jugando_1"){
  juego_1();
  }
  if (gameState_2 === "nivel 2"){
  nivel_2();
  }
}
function indicaciones_1(){
  if (gameState === "indicaciones"){

//indicacion 1
if (S_obstaculos > 0 && S_obstaculos <= 4){
  var ind_1 = createSprite (width + 10,height / 2 - 10,20,20);
  ind_1.addImage (flecha_izquierda);
  ind_1.scale = 2;
  ind_1.velocityX = -10;
  ind_1.lifetime = 300;
}
//indicacion 2
  if (S_obstaculos >= 2 && S_obstaculos <= 4){
  var ind_2 = createSprite (0 - 10,height / 2 + 10,20,20);
  ind_2.addImage (flecha_derecha);
  ind_2.scale = 2;
  ind_2.velocityX = 10;
  ind_2.lifetime = 300;
  }

//indicacion 3
if (S_obstaculos >= 3 && S_obstaculos <= 4){
  var ind_3 = createSprite (width / 2,0 - 10,20,20);
  ind_3.addImage (flecha_abajo);
  ind_3.scale = 2;
  ind_3.velocityY = 10;
  ind_3.lifetime = 300;
  }

//indicacion 4
if (S_obstaculos === 4){
  var ind_4 = createSprite (width / 2,height + 10,20,20);
  ind_4.addImage (flecha_arriba);
  ind_4.scale = 2;
  ind_4.velocityY = -10;
  ind_4.lifetime = 300;
  }
  gameState = "jugando_1";
  }
}
function juego_1(){

  //disminuye tiempo de aparicion
  if (tiempo_espera > 10){
  if (segundos >= 5){
    segundos = 0;
    tiempo_espera = tiempo_espera - 10;
  }
}
//aumenta velocidad
if (tiempo_espera === 10){
  if (segundos === 5){
    segundos = 0;
    velocidad1 = velocidad1 - 5;
    velocidad2 = velocidad2 + 5;
  }
}

//reinicia el tiempo y velocidad [desbloquea siguientes obstaculos]
if (velocidad1 < -20){
  tiempo_espera = 20;
  velocidad1 = -5;
  velocidad2 = 5;
  S_obstaculos = S_obstaculos + 1;
  gameState = "indicaciones";
}

//obstaculo 1
if (S_obstaculos > 0 && S_obstaculos <= 4){
if (frameCount % tiempo_espera === 0){
  var tamaño = Math.round (random (20,60));

  var obstaculo = createSprite (width + 10,random (0,height),tamaño,tamaño);
  obstaculo.shapeColor = "brown";
  //obstaculo.velocityX = -5;
  obstaculo.lifetime = 300;

  G_obstaculo.add (obstaculo);

  obstaculo.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
  }
  G_obstaculo.setVelocityXEach(velocidad1);
}
//obstaculo 2
if (S_obstaculos >= 2 && S_obstaculos <= 4){
  if (frameCount % tiempo_espera === 0){
  var obstaculo2 = createSprite (0 - 10,random (0,height),tamaño,tamaño);
  obstaculo2.shapeColor = "brown";
  //obstaculo2.velocityX = 5;
  obstaculo2.lifetime = 300;

  G_obstaculo2.add (obstaculo2);

  obstaculo2.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
}
G_obstaculo2.setVelocityXEach(velocidad2);
}
//obstaculo 3
if (S_obstaculos >= 3 && S_obstaculos <= 4){
  if (frameCount % tiempo_espera === 0){
  var obstaculo3 = createSprite (random (0,width),0 - 10,tamaño,tamaño);
  obstaculo3.shapeColor = "brown";
  //obstaculo3.velocityY = 5;
  obstaculo3.lifetime = 300;

  G_obstaculo3.add (obstaculo3);

  obstaculo3.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
}
G_obstaculo3.setVelocityYEach(velocidad2);
}
//obstaculo 4
if (S_obstaculos === 4){
  if (frameCount % tiempo_espera === 0){
  var obstaculo4 = createSprite (random (0,width),height + 10,tamaño,tamaño);
  obstaculo4.shapeColor = "brown";
  //obstaculo4.velocityY = -5;
  obstaculo4.lifetime = 300;

  G_obstaculo4.add (obstaculo4);

  obstaculo4.depth = jugador.depth;
  jugador.depth = jugador.depth + 1;
}
G_obstaculo4.setVelocityYEach(velocidad1);
}
if (S_obstaculos === 5 && gameState_2 === "nivel 1"){
  S_obstaculos = 1;
  N_1.shapeColor = "green";
  gameState = "pantalla principal";
  gameState_2 = "pantalla principal";
}
if (S_obstaculos === 5 && gameState_2 === "nivel 2"){
  S_obstaculos = 1;
  N_2.shapeColor = "green";
  gameState = "pantalla principal";
  gameState_2 = "pantalla principal";
}
}
function nivel_2(){

  if (jugador.isTouching(G_sierra_multicolor)){
    G_sierra_multicolor.destroyEach();
    vidas = vidas - 1;
  }
  textSize (20);
  fill ("lime");
  text("VIDAS = " + vidas,10,20);

  if (vidas === 0){
  gameState = "final";
  }

  if (S_obstaculos >= 1 && S_obstaculos <= 4){
    if (frameCount % 30 === 0){
    var sierra_multicolor = createSprite (width + 10,random (0,height),40,40);
    sierra_multicolor.addAnimation("multicolor",sierraMulticolor);
    sierra_multicolor.velocityX = -5;
    sierra_multicolor.lifetime = 300;
    sierra_multicolor.setCollider ("circle",0,0,5);
    //sierra_multicolor.debug= true;
  
    G_sierra_multicolor.add (sierra_multicolor);

  }
}
}