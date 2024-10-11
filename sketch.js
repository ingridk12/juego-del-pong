// Variables para las raquetas del jugador y la computadora
let raquetaJugador, raquetaComputadora;
let anchoRaqueta = 10, altoRaqueta = 100;

// Variables para la pelota
let pelotaX, pelotaY, velocidadPelotaX, velocidadPelotaY, diametroPelota = 20;

// Variables para los marcos superior e inferior
let grosorMarco = 10;

// Puntuaciones
let puntuacionJugador = 0, puntuacionComputadora = 0;

function setup() {
    createCanvas(800, 400);

    // Inicializar posición de las raquetas
    raquetaJugador = createVector(10, height / 2 - altoRaqueta / 2);
    raquetaComputadora = createVector(width - 20, height / 2 - altoRaqueta / 2);

    // Inicializar la pelota en el centro
    pelotaX = width / 2;
    pelotaY = height / 2;
    velocidadPelotaX = 5;
    velocidadPelotaY = 3;
}

function draw() {
    background(0);

    // Dibujar los marcos superior e inferior
    fill(255);
    rect(0, 0, width, grosorMarco); // Marco superior
    rect(0, height - grosorMarco, width, grosorMarco); // Marco inferior

    // Dibujar raquetas
    rect(raquetaJugador.x, raquetaJugador.y, anchoRaqueta, altoRaqueta);
    rect(raquetaComputadora.x, raquetaComputadora.y, anchoRaqueta, altoRaqueta);

    // Dibujar pelota
    ellipse(pelotaX, pelotaY, diametroPelota);

    // Mover la pelota
    pelotaX += velocidadPelotaX;
    pelotaY += velocidadPelotaY;

    // Rebote en los marcos superior e inferior
    if (pelotaY - diametroPelota / 2 < grosorMarco || pelotaY + diametroPelota / 2 > height - grosorMarco) {
        velocidadPelotaY *= -1;
    }

    // Colisión con la raqueta del jugador
    if (pelotaX - diametroPelota / 2 < raquetaJugador.x + anchoRaqueta && 
        pelotaY > raquetaJugador.y && pelotaY < raquetaJugador.y + altoRaqueta) {
        velocidadPelotaX *= -1;
    }

    // Colisión con la raqueta de la computadora
    if (pelotaX + diametroPelota / 2 > raquetaComputadora.x && 
        pelotaY > raquetaComputadora.y && pelotaY < raquetaComputadora.y + altoRaqueta) {
        velocidadPelotaX *= -1;
    }

    // Mover la raqueta del jugador
    if (keyIsDown(UP_ARROW)) {
        raquetaJugador.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        raquetaJugador.y += 5;
    }

    // Restricción de los límites de la raqueta del jugador
    raquetaJugador.y = constrain(raquetaJugador.y, grosorMarco, height - grosorMarco - altoRaqueta);

    // Movimiento básico de la computadora para seguir la pelota
    if (pelotaY > raquetaComputadora.y + altoRaqueta / 2) {
        raquetaComputadora.y += 4;
    } else if (pelotaY < raquetaComputadora.y + altoRaqueta / 2) {
        raquetaComputadora.y -= 4;
    }

    // Restricción de los límites de la raqueta de la computadora
    raquetaComputadora.y = constrain(raquetaComputadora.y, grosorMarco, height - grosorMarco - altoRaqueta);

    // Reiniciar la pelota si sale de los límites
    if (pelotaX < 0) {
        puntuacionComputadora++;
        reiniciarPelota();
    } else if (pelotaX > width) {
        puntuacionJugador++;
        reiniciarPelota();
    }

    // Mostrar puntuaciones
    fill(255);
    textSize(32);
    text(puntuacionJugador, width / 4, 50);
    text(puntuacionComputadora, (3 * width) / 4, 50);
}

function reiniciarPelota() {
    pelotaX = width / 2;
    pelotaY = height / 2;
    velocidadPelotaX *= -1;
}
