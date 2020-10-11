// Chama função initialize() quando a página HTML é totalmente carregada.
document.addEventListener('DOMContentLoaded', initialize);

var DEG2RAD = Math.PI / 180.0;

// Variáveis relacionadas ao Canvas.
var canvas = null;
var context = null;
var canvasBounds = null;

// Variáveis para configuração dos jogadores
const FPS = 60; // Quadros por segundo
const SHIP_SIZE = 30; // Altura da nave em pixels
const TURN_SPEED = 360; // Velocidade de rotação em graus por segundo
const LASER_DIST = 1000; // Distância máxima que o tiro pode viajar como fração do comprimento da tela
const SHIP_THRUST = 5; // Aceleração da nave
const FRICTION = 0.7; // Coeficiente de atrito do espaço
const LASER_SPEED = 500; // Velocidade dos tiros em pixels por segundo
const MAX_SPEED = 10; // Velocidade máxima das naves

// Obtém acesso ao elemento Canvas da página HTML
canvas = document.getElementById('gameCanvas');
context = canvas.getContext('2d');

// Determina se o jogo acabou
var ended = false;

canvasBounds = canvas.getBoundingClientRect();

const newShip = {
	x: 100,
	y: 100,
	r: SHIP_SIZE / 2,
	a: 90 / 180 * Math.PI,
	rot: 0,
	thrusting: false,
	thrust: {x: 0, y: 0},
	canShoot: true,
	explodeTime: 0
	}

var ship = {
	x: 100,
	y: 100,
	r: SHIP_SIZE / 2,
	a: 90 / 180 * Math.PI,
	rot: 0,
	thrusting: false,
	thrust: {x: 0, y: 0},
	canShoot: true,
	explodeTime: 0
	}

const newShip2 = {
	x: canvas.width - 100,
	y: canvas.height - 100,
	r: SHIP_SIZE / 2,
	a: 90 / 180 * Math.PI,
	rot: 0,
	thrusting: false,
	thrust: {x: 0, y: 0},
	canShoot: true,
	}

var ship2 = {
	x: canvas.width - 100,
	y: canvas.height - 100,
	r: SHIP_SIZE / 2,
	a: 90 / 180 * Math.PI,
	rot: 0,
	thrusting: false,
	thrust: {x: 0, y: 0},
	canShoot: true,
	}

var laser = {
	x: ship.x + 4 /3 * ship.r * Math.cos(ship.a),
	y: ship.y - 4 / 3 * ship.r * Math.sin(ship.a),
	r: SHIP_SIZE / 15,
	xv: LASER_SPEED * Math.cos(ship.a) / FPS,
	yv: -LASER_SPEED * Math.sin(ship.a) / FPS,
	dist: 0
}

var laser2 = {
	x: ship2.x + 4 /3 * ship2.r * Math.cos(ship2.a),
	y: ship2.y - 4 / 3 * ship2.r * Math.sin(ship2.a),
	r: SHIP_SIZE / 15,
	xv: LASER_SPEED * Math.cos(ship2.a) / FPS,
	yv: -LASER_SPEED * Math.sin(ship2.a) / FPS,
	dist: 0
}

// Audição de eventos
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Game loop (atualização constante do jogo)
setInterval(update, 1000/FPS);

function keyDown(/** @type of {KeyboardEvent} */ ev){
	switch(ev.keyCode)
	{
		case 37: // Seta esquerda (rotacionar a nave no sentido anti-horário)
			ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
			break;
		case 38: // Seta para cima (impulsionar)
			ship.thrusting = true;
			break;
		case 39: // Seta direita (rotacionar a nave no sentido horário)
			ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;
			break;
		case 79: // Atirar
			shootLaser();
			break;

		// Segunda nave
		case 65: // A (rotacionar a nave 2 no sentido anti-horário)
			ship2.rot = TURN_SPEED / 180 * Math.PI / FPS;
			break;
		case 87: // Seta para cima (impulsionar)
			ship2.thrusting = true;
			break;
		case 68: // Seta direita (rotacionar a nave no sentido horário)
			ship2.rot = -TURN_SPEED / 180 * Math.PI / FPS;
			break;
		case 70: // Atirar 2
			shootLaser2();
			break;
	}
}

function keyUp(/** @type of {KeyboardEvent} */ ev){
	switch(ev.keyCode)
	{
		case 37: // Seta esquerda (rotacionar a nave no sentido anti-horário)
			ship.rot = 0;
			break; 
		case 38: // Seta para cima (parar de impulsionar)
			ship.thrusting = false;
			break;
		case 39: // Seta direita (parar de rotacionar a nave no sentido horário)
			ship.rot = 0;
			break;
		case 79: // Atirar
			break;

		// Segunda nave
		case 65: // Seta esquerda (rotacionar a nave no sentido anti-horário)
			ship2.rot = 0;
			break; 
		case 87: // Seta para cima (parar de impulsionar)
			ship2.thrusting = false;
			break;
		case 68: // Seta direita (parar de rotacionar a nave no sentido horário)
			ship2.rot = 0;
			break;
		case 70: // Atirar
			break;
	}
}

function shootLaser()
{
	
	laser.x = ship.x + 4 / 3 * ship.r * Math.cos(ship.a);
	laser.y = ship.y - 4 / 3 * ship.r * Math.sin(ship.a);
	laser.xv = LASER_SPEED * Math.cos(ship.a) / FPS;
	laser.yv = -LASER_SPEED * Math.sin(ship.a) / FPS;
	
	// Desabilitar os tiros até o último suma
	ship.canShoot = false;
}

function shootLaser2()
{
	
	laser2.x = ship2.x + 4 / 3 * ship2.r * Math.cos(ship2.a);
	laser2.y = ship2.y - 4 / 3 * ship2.r * Math.sin(ship2.a);
	laser2.xv = LASER_SPEED * Math.cos(ship2.a) / FPS;
	laser2.yv = -LASER_SPEED * Math.sin(ship2.a) / FPS;
	
	// Desabilitar os tiros até o último suma
	ship2.canShoot = false;
}

function initialize(){}

function update()
{
	drawSpace();
	drawShip1();
	drawShip2();

	// Impulsionar a nave
	if (ship.thrusting)
	{
		if (ship.thrust.x <= MAX_SPEED && ship.thrust.y <= MAX_SPEED && ship.thrust.x >= -MAX_SPEED && ship.thrust.y >= -MAX_SPEED)
		{
			ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
			ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;
		}	
		// Desenhar o fogo
			drawFire1();
	} else // Aplicar atrito
	{
		ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
		ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
	}

	// Rotacioanr a nave 2
	ship2.a += ship2.rot;

	// Impulsionar a nave 2
	if (ship2.thrusting)
	{
		if (ship2.thrust.x <= MAX_SPEED && ship2.thrust.y <= MAX_SPEED && ship2.thrust.x >= -MAX_SPEED && ship2.thrust.y >= -MAX_SPEED)
		{
		ship2.thrust.x += SHIP_THRUST * Math.cos(ship2.a) / FPS;
		ship2.thrust.y -= SHIP_THRUST * Math.sin(ship2.a) / FPS;
		}
		// Desenhar o fogo 2
		drawFire2();
	} else{
		ship2.thrust.x -= FRICTION * ship2.thrust.x / FPS;
		ship2.thrust.y -= FRICTION * ship2.thrust.y / FPS;
	}

	// Atirar
	if (ship.canShoot == false)
	{
		drawLaser();
		setTimeout(function() { ship.canShoot = true }, 2000);
	}

	// Atirar 2
	if (ship2.canShoot == false)
	{
		drawLaser2();
		setTimeout(function() { ship2.canShoot = true }, 2000);
	}

	// Rotacioanr a nave
	ship.a += ship.rot;

	// Mover a nave
	ship.x += ship.thrust.x;
	ship.y += ship.thrust.y;

	// Mover a nave 2
	ship2.x += ship2.thrust.x;
	ship2.y += ship2.thrust.y;

	// Mover os tiros
	laser.x += laser.xv;
	laser.y += laser.yv;

	// Mover os tiros
	laser2.x += laser2.xv;
	laser2.y += laser2.yv;

	// Efeito Warp Around
	warpAround();

	if (collisionDetection(laser2.x, laser2.y, laser2.r, ship.x, ship.y, ship.r))
	{
		if (!ended) { console.log("Player 2 wins!"); }
		restartGame();
	}

	if (collisionDetection(laser.x, laser.y, laser.r, ship2.x, ship2.y, ship2.r))
	{
		if (!ended) { console.log("Player 1 wins!"); }
		restartGame();
	}

	if (collisionDetection(ship.x, ship.y, ship.r, ship2.x, ship2.y, ship2.r))
	{
		if (!ended) { console.log("Crash detected!!"); }
		restartGame();
	}
}

function restartGame() {
	ended = true;
	setTimeout(() => { location.reload() }, 2000);
	//ship = newShip;
	//ship2 = newShip2;
}

function drawSpace(){
	// Desenhando o espaço
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
};

function drawShip1()
{
	// Desenhando a nave
	context.lineWidth = SHIP_SIZE / 20;
	context.strokeStyle = "white";
	context.beginPath();
	context.moveTo(ship.x + 4 /3 * ship.r * Math.cos(ship.a), ship.y - 4 / 3 * ship.r * Math.sin(ship.a)); // Nariz
	context.lineTo(ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)), ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))); // Trás esquerda
	context.lineTo(ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)), ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))); // Trás direita
	context.closePath();
	context.stroke();
}

function drawShip2()
{
	// Desenhando a nave
	context.lineWidth = SHIP_SIZE / 20;
	context.strokeStyle = "white";
	context.beginPath();
	context.moveTo(ship2.x + 4 /3 * ship2.r * Math.cos(ship2.a), ship2.y - 4 / 3 * ship2.r * Math.sin(ship2.a)); // Nariz
	context.lineTo(ship2.x - ship2.r * (2 / 3 * Math.cos(ship2.a) + Math.sin(ship2.a)), ship2.y + ship2.r * (2 / 3 * Math.sin(ship2.a) - Math.cos(ship2.a))); // Trás esquerda
	context.lineTo(ship2.x - ship2.r * (2 / 3 * Math.cos(ship2.a) - Math.sin(ship2.a)), ship2.y + ship2.r * (2 / 3 * Math.sin(ship2.a) + Math.cos(ship2.a))); // Trás direita
	context.closePath();
	context.stroke();
}

function drawFire1()
{
	// Desenhando o fogo da nave
	context.lineWidth = SHIP_SIZE / 10;
	context.fillStyle = "red";
	context.strokeStyle = "yellow";
	context.beginPath();
	context.moveTo(ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)), ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))); // Trás esquerda
	context.lineTo(ship.x - ship.r * 8 / 3 * Math.cos(ship.a), ship.y + ship.r * 8 / 3 * Math.sin(ship.a)); // Trás meio
	context.lineTo(ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)), ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))); // Trás direita
	context.closePath();
	context.fill();
	context.stroke();
}

function drawFire2()
{
	// Desenhando o fogo da nave
	context.lineWidth = SHIP_SIZE / 10;
	context.fillStyle = "red";
	context.strokeStyle = "yellow";
	context.beginPath();
	context.moveTo(ship2.x - ship2.r * (2 / 3 * Math.cos(ship2.a) + 0.5 * Math.sin(ship2.a)), ship2.y + ship2.r * (2 / 3 * Math.sin(ship2.a) - 0.5 * Math.cos(ship2.a))); // Trás esquerda
	context.lineTo(ship2.x - ship2.r * 8 / 3 * Math.cos(ship2.a), ship2.y + ship2.r * 8 / 3 * Math.sin(ship2.a)); // Trás meio
	context.lineTo(ship2.x - ship2.r * (2 / 3 * Math.cos(ship2.a) - 0.5 * Math.sin(ship2.a)), ship2.y + ship2.r * (2 / 3 * Math.sin(ship2.a) + 0.5 * Math.cos(ship2.a))); // Trás direita
	context.closePath();
	context.fill();
	context.stroke();
}

function drawLaser()
{
	// Desenhar os tiros
	context.fillStyle = "salmon";
	context.beginPath();
	context.arc(laser.x, laser.y, laser.r, 0, 360 * DEG2RAD, false);
	context.fill();
}

function drawLaser2()
{
	// Desenhar os tiros
	context.fillStyle = "salmon";
	context.beginPath();
	context.arc(laser2.x, laser2.y, laser2.r, 0, 360 * DEG2RAD, false);
	context.fill();
}

function collisionDetection(obj1x, obj1y, obj1r, obj2x, obj2y, obj2r)
{
	var a = obj1x - obj2x;
	var b = obj1y - obj2y;
	var c = (a * a) + (b * b);
	var radii = obj1r + obj2r;
	return radii * radii >= c; 
}

function warpAround()
{
	/*		JOGADOR 1		*/

	// Bordas laterais da tela
	if (ship.x < 0 - ship.r)
	{
		ship.x = canvas.width + ship.r;
	}
	else if(ship.x > canvas.width + ship.r)
	{
		ship.x = 0 - ship.r;
	}

	// Bordas verticais da tela
	if (ship.y < 0 - ship.r)
	{
		ship.y = canvas.height + ship.r;
	}
	else if(ship.y > canvas.height + ship.r)
	{
		ship.y = 0 - ship.r;
	}

	/*		TIRO J1		*/

	// Bordas laterais da tela (tiro 1)
	if (laser.x < 0 - laser.r)
	{
		laser.x = canvas.width + laser.r;
	}
	else if(laser.x > canvas.width + laser.r)
	{
		laser.x = 0 - laser.r;
	}

	// Bordas verticais da tela (tiro 1)
	if (laser.y < 0 - laser.r)
	{
		laser.y = canvas.height + laser.r;
	}
	else if(laser.y > canvas.height + laser.r)
	{
		laser.y = 0 - laser.r;
	}

	/*		JOGADOR 2		*/

	// Bordas laterais da tela
	if (ship2.x < 0 - ship2.r)
	{
		ship2.x = canvas.width + ship2.r;
	}
	else if(ship2.x > canvas.width + ship2.r)
	{
		ship2.x = 0 - ship2.r;
	}

	// Bordas verticais da tela
	if (ship2.y < 0 - ship2.r)
	{
		ship2.y = canvas.height + ship2.r;
	}
	else if(ship2.y > canvas.height + ship2.r)
	{
		ship2.y = 0 - ship2.r;
	}

	/*		TIRO J2		*/

	// Bordas laterais da tela (tiro 2)
	if (laser2.x < 0 - laser2.r)
	{
		laser2.x = canvas.width + laser2.r;
	}
	else if(laser2.x > canvas.width + laser2.r)
	{
		laser2.x = 0 - laser2.r;
	}

	// Bordas verticais da tela (tiro 2)
	if (laser2.y < 0 - laser2.r)
	{
		laser2.y = canvas.height + laser2.r;
	}
	else if(laser2.y > canvas.height + laser2.r)
	{
		laser2.y = 0 - laser2.r;
	}
}