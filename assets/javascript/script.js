$(document).ready(function() {

	//CSS Manipulation
	$("#title").css("color", "purple")
	$("body").css("color", "#02153F")

	// Audio for Theme Song
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "Assets/finalfantasyzanarkand.mp3");

    // Theme Music Play Button
    $(".theme-button").on("click", function() {
        audioElement.play();
    });

    // Theme Music Pause Button
    $(".pause-button").on("click", function() {
        audioElement.pause();
    });

    //Var array to hold correct answers
	var correctoptions = ["1920", "30 Days", "25%", "The Moon revolving around the Earth", "Thor's Day"];

	//Var array to reference images
	var correctImage = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];

	//Var to hold Wrong option total
	var wrongoption = 0;

	//Var to hold Unanswered question totals
	var unanswered = 0;

	//Var to hold totalscore
	var totalscore = 0;

	//Var for timer
	var timer;

	//Var for IntervalID
	var IntervalID;

	//Var Array for all option choices
	const options = {
        optionchoices1: ["1720", "1869", "1920", "1820"],
        optionchoices2: ["6 months", "1 year", "30 Days", "3 months"],
        optionchoices3: ["5%", "2%", "10%", "25%"],
        optionchoices4: ["The Earth revolving around the Sun", "The Moon revolving around the Earth", "The Earth making a rotation", "The Sun making a rotation"],
        optionchoices5: ["Moon Day", "Sun Day", "Thor's Day", "Woden's day"]
      };

    //Var Array for all question choices
	const questions = {
        question1: ["What year did women get the right to vote in the U.S.?"],
        question2: ["How long does it take for an aluminum can you throw away to be recycled and be back in your hand as a new drink?"],
        question3: ["The U.S. holds what percent of the world's total prisoners?"],
        question4: ["What is a month a measure of?"],
        question5: ["What was the day Thursday named after?"]
      };

      // Var to hold index of current question.
      var questionIndex = 0;

      // Var to hold current index of options.
      var optionIndex = 0;

      // Const to hold Array of Questions
      const questionsArray = [questions.question1, questions.question2, questions.question3, questions.question4, questions.question5];
      
      // Const to hold Array of Answers
      const optionsArray = [options.optionchoices1, options.optionchoices2, options.optionchoices3, options.optionchoices4, options.optionchoices5];

      // Var to Start the Game.
      var gameBegin;

      //Jquery Hide Reset Button
      $('#buttonreset').hide();

	  //Start Game
	  $('#buttonstart').click(function(){

		//Function to Start Game
		gameBegin = true;
		startGame();
		//Hide the start button
		$('#buttonstart').hide();
		showReset();
	});

	//Function to start Game
	function startGame() {
		showquestions();
	};

	//Ask First Question
	function showquestions(){

	//Start timer
	time();

	//This asks and displays the questions
    $('#start').html('<h2>'+questionsArray[questionIndex][0]+'</h2>');
    logArray(optionsArray[optionIndex]);
	};

	//Next question function
	function next() {

	//If Else Statement. Setting Number of Questions
	if(questionIndex < 4){
		questionIndex++;
		optionIndex++;
		showquestions();
		$("#option0, #option1, #option2, #option3").show();
		$('#images').hide();
		}

	//Game ends after all questions
	else if (questionIndex === 4){
		gameBegin = false;
		stop();
		$("#option0, #option1, #option2, #option3").hide();
		$('#images').hide();
		$('#timeclock').hide();
		$('#start').html("<h2>Incorrect Answers: "+ wrongoption+"<br>Correct Answers: "+totalscore+"<br>Unanswered Questions: "+unanswered+'</h2>');
		showReset();
		}
	};


	//Choosing the Correct Answer
	$("#option0, #option1, #option2, #option3").on("click", function(word) {

		var word = "";
		word = $(this).text();
		
	//Events after the Correct Answer is Picked
		if(word == correctoptions[optionIndex]){
			$('#start').html("<h2>Correct! The Answer is: "+correctoptions[optionIndex]+"</h2>");
			$("#option0, #option1, #option2, #option3").hide();
			showImage();
			setTimeout(next, 2000);
			stop();
			totalscore++;
		}

	//Checks if the wrong answer is selected
		else if (word != correctoptions[optionIndex]){
			$('#start').html("<h2>Incorrect Choice! The Correct Answer is: "+correctoptions[optionIndex]+"</h2>");
			$("#option0, #option1, #option2, #option3").hide();
			showImage();
			stop();
			setTimeout(next, 2000);
			wrongoption++;
		}
      });

	//Function to show images.
	function showImage() {
		$('#images').show();
		$('#images').html("<img src='assets/images/"+correctImage[optionIndex]+"'>");
	};

	//Reset button
	$("#buttonreset").on("click", function(){

	//Reset game
	reset();
	
	//Hide Eeset button
	$('#buttonreset').hide();

	});

	//Display Questions
	function logArray(list) {
        for (var i = 0; i < list.length; i++) {
          $('#option'+i).html(list[i]+'<br>');
        }
      }

    //Start the Timer
	function time(){
	
	//Question Time Out after 30 seconds
	timer = 25;
	clearInterval(IntervalID);

	//Decrementing Timer
    IntervalID = setInterval(decrement, 1000);
	}

	//Resets game to Question 1
	function reset(){
		questionIndex = 0;
		optionIndex = 0;
		$("#option0, #option1, #option2, #option3").show();
		$('#timeclock').show();
		time();
		wrongoption = 0;
		unanswered = 0;
		totalscore = 0;
		startGame();
	}

	//Hide reset button when Game Begins
	function showReset(){
		if (gameBegin == true) {
			$('#buttonreset').hide();
		}
	//Show reset button when Game Ends
		else if (gameBegin == false){
			$('#buttonreset').show();
		}
	}

	//This functions decreases the timer and stops it
    function decrement() {

    // Time decreasing (--)
    timer--;

    //Display remaining time
     $("#timeclock").html("<h2>Time Remaining: " + timer + "</h2>");
    
    // Surpassing the Time Limit for Questions
      if (timer === 0) {
        $("#timeclock").html("<h2>Time's Up!</h2>");
        $('#start').html('<h2>Time up! The correct option is '+correctoptions[optionIndex]+'</h2>');
		$("#option1, #option3, #option2, #option1").hide();
		stop();
		setTimeout(next, 2000);
		unanswered++;
      }
  	}

  	//Stopping timer and clearing IntervalID
    function stop() {
    	clearInterval(IntervalID);
    }
});