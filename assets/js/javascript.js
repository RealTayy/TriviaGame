function startNewGame() {
    var questions = [
        {
            question: 'Which of these is not an animal?',
            answers: ['cow.',
                'chicken.',
                'dog.',
                'alto saxophone.'],
            correct: 'alto saxophone.'
        },
        {
            question: 'Which of these is a shape?',
            answers: ['quadrilateral.',
                'hand.',
                'cat.',
                'pants.'],
            correct: 'quadrilateral.'
        },
        {
            question: 'Which of these words does not start with the letter \'b\'?',
            answers: ['big.',
                'bad.',
                'boy.',
                'aerodynamics.'],
            correct: 'aerodynamics.'
        },
        {
            question: 'Which of these is food?',
            answers: ['salisbury steak.',
                'box.',
                'cup.',
                'house.'],
            correct: 'salisbury steak.'
        },
        {
            question: 'Which of these is not a word?',
            answers: ['paper.',
                'up.',
                'car.',
                '~.'],
            correct: '~.'
        },
        {
            question: 'Which of these is a color?',
            answers: ['dull opaline green.',
                'man.',
                'fan.',
                'sit.'],
            correct: 'dull opaline green.'
        },
        {
            question: 'Which of these is not a greeting?',
            answers: ['hi.',
                'hello.',
                'sup.',
                'pterodactyl.'],
            correct: 'pterodactyl.'
        },
        {
            question: 'Which of these is not a number?',
            answers: ['one.',
                'two.',
                'three.',
                'rhinoceros.'],
            correct: 'rhinoceros.'
        },
        {
            question: 'Which of these objects is the largest?',
            answers: ['ant.',
                'onion.',
                'pig.',
                'milky way galaxy.'],
            correct: 'milky way galaxy.'
        },
        {
            question: 'Which of these words looks like I smashed my keys on my keyboard?',
            answers: ['friend.',
                'robot.',
                'bowl.',
                'a^JF$#a4fkxa$LkIO$1!.'],
            correct: 'a^JF$#a4fkxa$LkIO$1!.'
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
            timer.drawNumber();
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
            timer.drawNumber();

            if (timer.timeLeft === -1) {
                timer.stop();
                if (timer.canLose) displayTimeOutScreen();
            };
        },
        drawNumber: function () {
            $('#timer').finish();
            $('#timer').animate({ opacity: 1 }, 0, function () {
                $('#timer').text(timer.timeLeft);
                $('#timer').animate({ opacity: 0 }, 1000);
            })
        }
    };

    var questionsBank = questions.slice();
    var curQuestion;

    function displayStartScreen() {
        $('#question').hide();
        $('#selection').show();
        $('#selection-text').text("Simple Starting Screen.");
        $('#option-1').text("Click me.");
    }

    function displayIncorrectAnswerScreen() {
        addBlock('incorrect');
        $('#question-text').text("Wrong. The correct answer was " + curQuestion.correct);
        $('#choices').hide();
        timer.start(false, 3);
        setTimeout(function () {
            $('#choices').show();
            newQuestion();
        }
            , 4000);
    };

    function displayTimeOutScreen() {
        addBlock('timeout');
        $('#question-text').text("You ran out of time. The correct answer was " + curQuestion.correct);
        $('#choices').hide();
        timer.start(false, 3);
        setTimeout(function () {
            $('#choices').show();
            newQuestion();
        }
            , 4000);
    };

    function displayCorrectAnswerScreen() {
        addBlock('correct');
        $('#choices').hide();
        $('#question-text').text("Correct. You are smart. Probably.")
        timer.start(false, 3);
        setTimeout(function () {
            $('#choices').show();
            newQuestion();
        }
            , 4000);
    };

    function displayResultScreen() {
        $('#selection-qt').text("There's no questions left.");
        $('#selection-text').text("You finished the Quiz. Congratulations.");
        $('#selection-af').text("Play again? You know what to do.");
        $('#selection').show();
        $('#question').hide();
        timer.stop();
    };

    function addBlock(result) {
        var $newBlock = $('<div class=\'block\'>' + Math.abs(questions.length - questionsBank.length) + '</div>');
        // Determines what color to give to $newBlock
        switch (result) {
            case 'correct': $newBlock.css('background-color', '#A8CE00'); break;
            case 'incorrect': $newBlock.css('background-color', '#F47600'); break;
            case 'timeout': $newBlock.css('background-color', '#009CBF'); break;
        }
        $('#results').append($newBlock);
        $newBlock.animate({ opacity: 0, left: "+=50" }, 0, function () {
            $newBlock.animate({ opacity: 1, left: '-=50' }, 1000);
        })
    };

    function newQuestion() {
        if (questionsBank.length === 0) {
            displayResultScreen();
        } else {
            curQuestion = getQuestion();
            displayQuestion(curQuestion);
            timer.start(true, 10);
        }
    };

    function checkCorrect(choice) {
        if (choice === curQuestion.correct) displayCorrectAnswerScreen();
        else displayIncorrectAnswerScreen();
    };

    function displayQuestion() {
        $('#selection').hide();
        $('#question').show();
        $('#question-number').html("Simple Question #" + Math.abs(questions.length - questionsBank.length));
        $('#question-text').text(curQuestion.question);
        var choiceArray = [0, 1, 2, 3];
        // OKAY THIS LOOKS WEIRD AND CRAZY BUT ALL IT DOES IS RANDOMIZE THE ORDER THE ANSWERS ARE IN OKAY?        
        $('#choice-1').text(curQuestion.answers[choiceArray.splice(Math.floor(Math.random() * choiceArray.length - 1), 1)[0]]);
        $('#choice-2').text(curQuestion.answers[choiceArray.splice(Math.floor(Math.random() * choiceArray.length - 1), 1)[0]]);
        $('#choice-3').text(curQuestion.answers[choiceArray.splice(Math.floor(Math.random() * choiceArray.length - 1), 1)[0]]);
        $('#choice-4').text(curQuestion.answers[choiceArray.splice(Math.floor(Math.random() * choiceArray.length - 1), 1)[0]]);
    };

    function getQuestion() {
        return questionsBank.splice(Math.floor(Math.random() * questionsBank.length), 1)[0];
    };

    // Create button events here
    $(".choice").click(function () { checkCorrect(this.innerHTML) });
    $("#option-1").click(function () { initializeGame() });

    function initializeGame() {
        $('#results').empty();
        questionsBank = questions.slice();
        newQuestion();
    };

    displayStartScreen();
}

startNewGame();
