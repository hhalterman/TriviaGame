//QUESTIONS
var triviaQuestions = [{
	question: "In “Beauty and the Beast,” what is the name of Gaston’s bumbling sidekick?",
	answerList: ["Maurice", "Dulé", "LeFou","Beau"],
	answer: 2
},

{
	question: "Cinderella's glass slipper fell from which of her feet?",
	answerList: ["left", "right", "neither"],
	answer: 0
},

{
	question: "In the movie “The Lion King,” what was Simba’s mother’s name?",
	answerList: ["Nala", "Sarafina", "Shenzi", "Sarabi"],
	answer: 3
},

{
	question: "In “Frozen,” on what side of her head does Anna get her platinum blonde streak?",
	answerList: ["left", "right"],
	answer: 1
},

{
	question: "In “Hercules,” Hades promised not to harm Megara if Hercules gave up his strength for how long?",
	answerList: ["Forever", "24 hours", "36 hours", "48 hours"],
	answer: 1
},

{
	question: "What is the crew celebrating on the ship at the beginning of “The Little Mermaid?”",
	answerList: ["Christmas", "Fouth of July", "Price Eric's Birthday", "Price Eric's Engagement"],
	answer: 2
},

{
	question: "Which phrase does the Evil Queen in “Snow White” actually say?",
	answerList: ["“Mirror, mirror, on the wall — who is the fairest of them all?”", "“Magic mirror, on the wall — who is the fairest of them all?”", "“Mirror, mirror, on the wall — who is the fairest one of all?”", "“Magic mirror, on the wall — who is the fairest one of all?”"],
	answer: 3
},

{
	question: "In the movie “Tangled,” Flynn Rider is wanted dead or alive according to his wanted poster because he's a...",
	answerList: ["Bandit", "Thief", "Treasonist", "Robber"],
	answer: 1
},

{
	question: "In “Sleeping Beauty,” what is the name of Maleficent’s pet raven?",
	answerList: ["Diablo", "Malum", "Mauvais", "Diable"],
	answer: 0
},

{
	question: "In “Pocahontas,” what did Pocahontas see in her dream that made her believe that a change was coming?",
	answerList: ["A strange cloud formation", "A spinning arrow", "A hawk circling her village", "A burning blue fire"],
	answer: 1
},

{
	question: "In “The Lion King,” what side of Scar's face is his scar on?",
	answerList: ["Left", "Right"],
	answer: 0
},

{
	question: "In “Aladdin,” what does Aladdin, and a reluctant Abu, give to the poor children to eat?",
	answerList: ["Dates", "Apples", "Bread", "Cheese"],
	answer: 2
},

{
	question: "In “Princess and the Frog,” what fictional country is Prince Naveen from?",
	answerList: ["Maramorgos", "Mypos", "Mrač", "Maldonia"],
	answer: 3
},

{
	question: "What does the matchmaker criticize Mulan for?",
	answerList: ["Being too tall", "Being too skinny", "Having bad posture", "Having big feet"],
	answer: 1
},

{
	question: "In “The Little Mermaid,” who is NOT one of Triton’s daughter?",
	answerList: ["Andrina", "Adora", "Attina", "Alana"],
	answer: 1
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "That's not it, sorry!",
	endTime: "Out of time!",
	finished: "Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1));
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<p>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
