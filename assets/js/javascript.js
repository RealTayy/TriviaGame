function startNewGame() {
    var questions = [
        {
            question: 'this is question 1',
            answers: ['answer 1-1',
                'answer 1-2',
                'answer 1-3',
                'answer 1-4'],
            correct: 'answer 1-1'
        },
        {
            question: 'this is question 2',
            answers: ['answer 2-1',
                'answer 2-2',
                'answer 2-3',
                'answer 2-4'],
            correct: 'answer 2-2'
        },
        {
            question: 'this is question 3',
            answers: ['answer 3-1',
                'answer 3-2',
                'answer 3-3',
                'answer 3-4'],
            correct: 'answer 3-3'
        },
        {
            question: 'this is question 4',
            answers: ['answer 4-1',
                'answer 4-2',
                'answer 4-3',
                'answer 4-4'],
            correct: 'answer 4-4'
        }
    ];

    var timer = {
        maxTime: 10,
        timeLeft: 0,
        counter: null,
        canLose: true,
        start: function (canLose, maxTime) {
            timer.canLose = canLose;
            timer.maxTime = maxTime;
            timer.reset();
            timer.counter = setInterval(function () { timer.countDown(timer.canLose) }, 1000);
        },
        stop: function () {
            clearInterval(timer.counter);
        },
        resume: function () {
            timer.counter = setInterval(function () { timer.countDown() }, 1000);
        },
        reset: function () {
            timer.stop();
            timer.timeLeft = timer.maxTime;
            $('#timer').text(timer.timeLeft);
        },
        countDown: function () {
            timer.timeLeft--;
            $('#timer').text(timer.timeLeft);

            if (timer.timeLeft === 0) {
                timer.stop();                
                if (timer.canLose) displayTimeOutScreen();
            };
        }
    };

    var questionsBank = questions.slice();

    function displayStartScreen() {
        $('#question').hide();
        $('#selection').show();
        $('#selection-text').text("Starting Screen");
        $('#option-1').text("Start New Game");
    }

    function displayIncorrectAnswerScreen() {
        $('#question').hide();
        $('#selection').show();
        $('#selection-text').text("Incorrect Answer: Display what the right answer");
        $('#option-1').text("Play Again");
    };

    function displayTimeOutScreen() {        
        $('#question').hide();
        $('#selection').show();
        $('#selection-text').text("Timed Out: Display what the right answer");
        $('#option-1').text("Play Again");        
    };

    function displayWinScreen() {
        $('#question').hide();
        $('#selection').show();
        $('#selection-text').text("w0w you won and beat the game so cool");
        $('#option-1').text("Play Again");
    };

    function displayCorrectAnswerScreen() {        
        timer.start(false, 5);
        setTimeout(newQuestion(), 5000);
    };

    function newQuestion() {
        curQuestion = getQuestion();
        displayQuestion(curQuestion);
        timer.start(true, 30);
    };

    function checkCorrect(choice) {
        if (choice === curQuestion.correct && questionsBank.length === 0) displayWinScreen();
        else if (choice === curQuestion.correct) displayCorrectAnswerScreen();
        else displayIncorrectAnswerScreen();
    };

    function displayQuestion() {
        $('#selection').hide();
        $('#question').show();        
        $('#question-text').text(curQuestion.question);
        $('#choice-1').text(curQuestion.answers[0]);
        $('#choice-2').text(curQuestion.answers[1]);
        $('#choice-3').text(curQuestion.answers[2]);
        $('#choice-4').text(curQuestion.answers[3]);
    };

    function getQuestion() {
        return questionsBank.splice(Math.floor(Math.random() * questionsBank.length), 1)[0];
    };

    // Create button events here
    $(".choice").click(function () { checkCorrect(this.innerHTML) });
    $("#option-1").click(function () { initializeGame() });

    function initializeGame() {
        questionsBank = questions.slice();
        newQuestion();
    };

    displayStartScreen();
}

startNewGame();