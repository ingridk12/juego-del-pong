// Variables para las raquetas del jugador y la computadora
let raquetaJugador, raquetaComputadora;
let anchoRaqueta = 10, altoRaqueta = 100;

// Variables para la pelota
let pelotaX, pelotaY, velocidadPelotaX, velocidadPelotaY, diametroPelota = 20;
let anguloPelota = 0; // Ángulo de la pelota
let velocidadRotacion = 0; // Velocidad de rotación

// Variables para los marcos superior e inferior
let grosorMarco = 20;

// Puntuaciones
let puntuacionJugador = 0, puntuacionComputadora = 0;

// Variables para las imágenes
let imagenFondo, imagenRaquetaJugador, imagenRaquetaComputadora, imagenPelota;

// Variables para los sonidos
let sonidoRebote; // El sonido de la colisión
let sonidoGol; // El sonido cuando alguien anota un gol

function preload() {
    // Cargar las imágenes
    imagenFondo = loadImage('fondo1.png'); // Cargar la imagen de fondo
    imagenRaquetaJugador = loadImage('barra1.png'); // Cargar la imagen para la raqueta del jugador
    imagenRaquetaComputadora = loadImage('barra2.png'); // Cargar la imagen para la raqueta de la computadora
    imagenPelota = loadImage('bola.png'); // Cargar la imagen para la pelota

    // Cargar los sonidos
    sonidoRebote = loadSound('bounce.wav'); // Cargar el archivo de sonido para la colisión
    sonidoGol = loadSound('173859__jivatma07__j1game_over_mono.wav'); // Cargar el archivo de sonido para el gol
}

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
    // Mostrar la imagen de fondo
    image(imagenFondo, 0, 0, width, height); // Dibujar la imagen de fondo ajustada al canvas

    // Dibujar los marcos superior e inferior
    fill("#2B3FD6");
    rect(0, 0, width, grosorMarco); // Marco superior
    rect(0, height - grosorMarco, width, grosorMarco); // Marco inferior

    // Dibujar raquetas con las imágenes
    image(imagenRaquetaJugador, raquetaJugador.x, raquetaJugador.y, anchoRaqueta, altoRaqueta); // Raqueta del jugador
    image(imagenRaquetaComputadora, raquetaComputadora.x, raquetaComputadora.y, anchoRaqueta, altoRaqueta); // Raqueta de la computadora

    // Mover la pelota
    pelotaX += velocidadPelotaX;
    pelotaY += velocidadPelotaY;

    // Calcular la velocidad de rotación en función de la velocidad de la pelota
    velocidadRotacion = sqrt(velocidadPelotaX * velocidadPelotaX + velocidadPelotaY * velocidadPelotaY) * 0.05;

    // Incrementar el ángulo de la pelota según la velocidad de rotación
    anguloPelota += velocidadRotacion;

    // Dibujar la pelota con rotación
    push();
    translate(pelotaX, pelotaY); // Mover el punto de origen al centro de la pelota
    rotate(anguloPelota); // Aplicar la rotación
    imageMode(CENTER); // Asegurarse de que la imagen se dibuje desde el centro
    image(imagenPelota, 0, 0, diametroPelota, diametroPelota); // Dibujar la pelota rotada
    pop(); // Restaurar la transformación

    // Rebote en los marcos superior e inferior
    if (pelotaY - diametroPelota / 2 < grosorMarco || pelotaY + diametroPelota / 2 > height - grosorMarco) {
        velocidadPelotaY *= -1;
    }

    // Colisión con la raqueta del jugador
    if (pelotaX - diametroPelota / 2 < raquetaJugador.x + anchoRaqueta && 
        pelotaY > raquetaJugador.y && pelotaY < raquetaJugador.y + altoRaqueta) {
        velocidadPelotaX *= -1;
        sonidoRebote.play(); // Reproducir el sonido al colisionar con la raqueta del jugador
    }

    // Colisión con la raqueta de la computadora
    if (pelotaX + diametroPelota / 2 > raquetaComputadora.x && 
        pelotaY > raquetaComputadora.y && pelotaY < raquetaComputadora.y + altoRaqueta) {
        velocidadPelotaX *= -1;
        sonidoRebote.play(); // Reproducir el sonido al colisionar con la raqueta de la computadora
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
        sonidoGol.play(); // Reproducir el sonido de gol
        narrarMarcador(); // Narrar el marcador
        reiniciarPelota();
    } else if (pelotaX > width) {
        puntuacionJugador++;
        sonidoGol.play(); // Reproducir el sonido de gol
        narrarMarcador(); // Narrar el marcador
        reiniciarPelota();
    }

    // Mostrar puntuaciones
    fill("#2B3FD6");
    textSize(32);
    text(puntuacionJugador, width / 4, 50);
    text(puntuacionComputadora, (3 * width) / 4, 50);
}

function reiniciarPelota() {
    pelotaX = width / 2;
    pelotaY = height / 2;
    velocidadPelotaX *= -1;
}

// Función para narrar el marcador actual
function narrarMarcador() {
    let narrador = new SpeechSynthesisUtterance(); // Crear objeto para narración de voz
    narrador.text = `El marcador es, Jugador ${puntuacionJugador}, Computadora ${puntuacionComputadora}`;
    narrador.lang = 'es-ES'; // Establecer el idioma en español
    window.speechSynthesis.speak(narrador); // Ejecutar la narración
}
