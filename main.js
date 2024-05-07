//Definimos el universo de preguntas y respuestas//
let questionsandanswer = [{ question: "¿Cuál es el lenguaje de programación más utilizado en la web?", answer: "JavaScript" },
    { question: "¿Qué significa HTML?", answer: "HyperText Markup Language"},
    { question: "¿Qué significa CSS?", answer: "Cascading Style Sheets" },
    { question: "¿Qué es JSON?", answer: "JavaScript Object Notation" }];

//Saludo y pedido de nombre de usuario//
let userName = prompt("Hola y bienvenido a nuestra trivia especial sobre Programación. Para continuar, ingresá tu nombre:");
    alert("Hola " + userName + ". Bienvenido al juego de preguntas y respuestas sobre programación.");  

//Función de mensaje de desafío//
function welcomeMessage() {
    alert("Vamos con las preguntas, que gane el mejor!");
}

//Función para mostrar preguntas al azar//
function showrandomquestion() {
    let randomindex = Math.floor(Math.random() * questionsandanswer.length);
    let question = questionsandanswer[randomindex].question;
    alert(question);
    return randomindex;
}

//Comprueba si la respuesta es correcta o no, retornando un valor//
function checkanswer(useranswer, correctanswer) {
    if (useranswer === correctanswer) {
        alert("¡Correcto!");
        return 1;
    } else {
        alert("Incorrecto. La respuesta correcta es: " + correctanswer);
        return 0;
    }
}

//Inicio del juego y del contador//
function startgame() {
    let score = 0;
    welcomeMessage();
    for (let i = 0; i < questionsandanswer.length; i++) {
        let randomindex = showrandomquestion();
        let userinput = prompt("Por favor, ingresa tu respuesta:");
        let correctanswer = questionsandanswer[randomindex].answer; score += checkanswer(userinput, correctanswer);
    }
    alert("¡Fin del juego! Tu puntaje final es: " + score);
    let playagain = confirm("Quieres jugar de nuevo?");
    if (playagain) {
        startgame();
    }
}

startgame();