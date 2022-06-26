// questo per le diverse voci di chrome, creo array vuoto che conterrà le voci 
let voices = [];
//prendo il mio speechsynthesys
speechSynthesis.addEventListener('voiceschanged',function() {
    //qui raccolgo le voci
    voices = speechSynthesis.getVoices();
});

// Prendiamo dalla pagina HTML tutti gli elementi che ci serviranno
// sicuramente text area perchè dovremmo raccogliere il testo scritto
// poi il tasto play perchè dobbiamo sapere quando viene premuto
// anche la barra del range perchè dovrà regolare tono paperella
// e poi ci servirà il tag figure della paperella

// Raccolgo dalla pagina elementi che mi servono
const textArea = document.querySelector('textarea');
const playButton = document.querySelector('button');
const pitchBar = document.querySelector('input');
const duckFigure = document.querySelector('figure');

// Osserviamo tasto play per vedere se viene cliccato
// aggiungo al playButton un "ascoltatore di evento"
// quindi questo equivale a "se qualcuno clicca il bottone, fai questo"
playButton.addEventListener('click',function(){
        //prima cosa controllare che ci sia del testo
        //prendo lunghezza del value dentro textArea
        //quindi qua prende valore text area
        //con trim() toglie tutti gli spazi
        //e poi prende la lunghezza
        const textLenght = textArea.value.trim().length;
        if(textLenght>0) {
           //allora c'è testo e paperella deve parlare
            talk();
        }
});

// preparo funzione per far parlare la paperella
function talk() {
    // Step 1: prendere testo e tono di voce
    const text = textArea.value;
    const pitch = pitchBar.value;

    // Step 2: preparo una frase per il sintetizzatore vocale
    // dalla documentazione devo creare oggetto di tipo speech
    const utterance = new SpeechSynthesisUtterance(text);

    //Step 3: devo specificare parametri frase
    utterance.volume = 1;
    utterance.rate = 1;
    // tra questi ovviamente il tono pitch
    utterance.pitch = pitch;

    //vado a cercare voce femminile
    //il find itera quelle cose sulla lista di tutte le voci
    const femaleVoice= voices.find(function(voice) {
        if (voice.name.includes('Alice'))
            return true; 
    });
    //una volta trovata la aggiungo
    utterance.voice=femaleVoice;

    //poi faccio parlare
    speechSynthesis.speak(utterance);

    //poi quando la paperella inizia a parlare
    utterance.addEventListener('start', function(){
        //blocco anche gli elementi che comandano la sua parlata
        //cioè testo, bottone, pitch
        //modifico l'attributo dei tag textarea, button, input
        textArea.disabled = true;
        playButton.disabled = true;
        pitchBar.disabled = true;

        //cambio la classe della paperella così la animo
        duckFigure.classList.add("talking");
        
    })

    //quando ha finito tolgo di nuovo la classe
    utterance.addEventListener('end', function(){
        //cambio la classe della paperella così torna statica
        //rimuovo quella che avevo aggiunto
        duckFigure.classList.remove("talking");

        //rimetto disponibili i bottoni
        textArea.disabled = false;
        playButton.disabled = false;
        pitchBar.disabled = false;

        //azzero il testo
        textArea.value= "";
    })

} 