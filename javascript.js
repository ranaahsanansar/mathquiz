// -------------------
// Eye Open and Close Function 
// -------------------
function eyeOpen(){
    let eye = document.getElementById('eye').src = "open.png";
}
function eyeclose(){
    let eye1 = document.getElementById('eye').src = "close.png";
}

// -------------------
// Logic of The Game 
// --------------------
var playing = false;
var score;
var action ;
var timeRemaining;
var correctAnswer;


hide('choices');
document.getElementById('question').innerHTML = "ASN";
document.getElementById('instruction').innerHTML = "<span>Click On Start Button</span>";


// If we Click on the Start or reset Button 
document.getElementById('startReset').onclick = function(){
    // if We are Playing 
    if (playing == true){
        location.reload();
    } // If Not playing 
    else{
        // change Instructions Message 
        document.getElementById('instruction').innerHTML = "<span>Click on correct answer</span>";

        playing = true;
        // timeRemaining = 60;
        timeRemaining = prompt('Set Time in Seconds');
        // set the Score to Zero 
        score = 0;
        show('choices');
        
        hide('gameOver');
        document.getElementById('scorevalue').innerHTML = score;
        // Show Timer 
        // document.getElementById('timer').style.display = 'block';
        show('timer');
        // Change The Start Button 
        document.getElementById('startReset').innerHTML = "Reset Game";
        // Start The Coun Down 
        document.getElementById('timeValue').innerHTML = timeRemaining;
        generateQ();
        StartCountdown();
        // Generate a new Question and its Options 
        // generateQ();

    }
}
// Clicking on Answer Box 
for (i = 1 ; i<5 ; i++){
    document.getElementById("box"+ i).onclick = function (){
        if (playing == true){
            if (this.innerHTML == correctAnswer){
                // Increase the Score 
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                    // show the Correct and hide Wrong Box 
                     hide('wrong');
                     show('correct');
                     setTimeout(function(){
                        hide('correct');
                     } , 1000);

                    //  generate New Question 
                    generateQ();
            }else{
                // show Wrong BOx 
                hide('correct');
                show('wrong');
                setTimeout(function(){
                   hide('wrong');
                } , 1000);
            }
        }
        else {
    
        }
    }
}


// Functions ---------------------------------

// The Function Defination For Countdown 
function StartCountdown() {
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById('timeValue').innerHTML = timeRemaining;
        if(timeRemaining == 0 ){
            hide('choices');
            // Stop the Count down and Over the Game 
            stopContdown();
            // document.getElementById('gameOver').style.display = "block";
            show('gameOver');
            // hide('choices');
            document.getElementById('gameOver').innerHTML = "<p>Game Over!</p><p>Your Score is "+ score +"</p>";
            hide('timer');
            hide('correct');
            hide('wrong');
            playing = false;
            document.getElementById('startReset').innerHTML = "Start Game";
        }
    } , 1000)
}
function stopContdown(){
    clearInterval(action);

}
function hide(id){
    document.getElementById(id).style.display = "none";
}
function show(id){
    document.getElementById(id).style.display = "block";
}
// Generate the new Question and Choice 
function generateQ(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x * y ;
    document.getElementById('question').innerHTML =  x + "x" + y ;

    var correctPosition = 1 + Math.round(3*Math.random());
    // Fill the Box with The Correct Answer 
    document.getElementById("box"+ correctPosition).innerHTML = correctAnswer;

    // Make array to Create Unique Answers
    var answers = [correctAnswer];
    // Fill Other With Worng Answer 
    for(i=1; i<5; i++){
        if(i != correctPosition){
            var wrongAnswer;
            
            do {
                wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
            }while (answers.indexOf(wrongAnswer)>-1)

            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

