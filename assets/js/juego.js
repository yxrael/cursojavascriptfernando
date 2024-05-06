/**
 * 2C 2 of clubs
 * 2D 2 of diamonds
 * 2H 2 of Hearts
 * 2S 2 of Spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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
    console.log(deck);
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
const valorCarta = ( carta ) => { 

    console.log(carta);
    
    const valor = carta.substring(0, carta.length - 1);
    // let puntos = 0;
    // if ( isNaN( valor )){
    //     puntos = ( valor === 'A') ? 11 : 10;
    // } else {
    //     puntos = valor * 1
    // };

     return (!isNaN( valor )) 
        ? valor * 1
        : (valor === 'A') ?  11 :  10;

 }

 console.log(valorCarta(pedirCarta()));
