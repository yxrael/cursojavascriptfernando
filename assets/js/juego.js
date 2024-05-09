/**
 * 2C 2 of clubs
 * 2D 2 of diamonds
 * 2H 2 of Hearts
 * 2S 2 of Spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosHTML = document.querySelectorAll('h1');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const divTitulo = document.querySelector('.titulo');

//crear una nueva baraja (ordenada)
const crearDeck = () => {  

    for( let i = 2; i <= 10; i++){
        for( let tipo of tipos ){
            deck.push( i + tipo);
        }
    }

    for ( let tipo of tipos) {
        for (let esp of especiales){
            deck.push( esp + tipo);
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck);
    // console.log(deck);
    return deck;

};

crearDeck();

// funcion para tomar una carta
const pedirCarta = () => { 

    if( deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
 };

//  console.log(pedirCarta());
//  pedircarta();
const valorCarta = ( carta ) => { 
    
    const valor = carta.substring(0, carta.length - 1);

     return (!isNaN( valor )) 
        ? valor * 1
        : (valor === 'A') ?  11 :  10;
 }

// turno de la computadora
const turnoComputadora = () => {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta( carta );
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    imgCarta.title = valorCarta( carta );
    divCartasComputadora.append( imgCarta );

}


// Eventos
btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador ;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    imgCarta.title = valorCarta( carta );
    divCartasJugador.append( imgCarta );
    

    if ( puntosJugador > 21 ) {
        console.warn('Lo siento mucho, perdiste');
        divTitulo.textContent = 'Te has pasado de 21';
        
        btnPedir.disabled = true;
        btnDetener.disabled = true;

    } else if ( puntosJugador === 21 ) {
        console.warn('21, genial');
        divTitulo.textContent = '21, genial!';
        btnPedir.disabled = true;
    }
});

// pasar a turno computadora
btnDetener.addEventListener('click', () => {
    compuActiva();
})

// turnoCompuActivo
const compuActiva = () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    // turnoComputadora();
    // if ( puntosComputadora > 21 ) {
    //     console.warn('Computadora pierde');
    // } else if ( (puntosComputadora > puntosJugador) || ( puntosComputadora === 21 ) ) {
    //     console.warn('Computadora gana');
    // }
    while ( puntosComputadora < puntosJugador && puntosComputadora < 21 ) {
        turnoComputadora();
        if ( puntosComputadora > 21 ) {
            console.warn('Computadora pierde');
            divTitulo.textContent = 'Pierde la computadora';
        };
    };
    if ( puntosComputadora >= puntosJugador && puntosComputadora <=21 ){
        console.warn('Computadora gana');
        divTitulo.textContent = 'Gana la computadora';
    }
    
}

// recargar pagina
btnNuevo.addEventListener('click', () => {
    window.location.reload();
})


