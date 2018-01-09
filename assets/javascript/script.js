$(document).ready(function() {

	//CSS Manipulation
	$("#title").css("color", "purple")
	$("body").css("color", "#02153F")

	// Audio for Theme Song
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/finalfantasyzanarkand.mp3");

    // Theme Music Play Button
    $(".theme-button").on("click", function() {
        audioElement.play();
    });

    // Theme Music Pause Button
    $(".pause-button").on("click", function() {
        audioElement.pause();
    });

    //Var array to hold correct answers
	var correctoptions = ["1920", "30 Days", "25%", "The Moon revolving around the Earth", "Thor's Day", "Ludacris", "Earth"];

	//Var array to reference images]
	var correctImage = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

	//Var to hold Wrong option total
	var wrongoption = 0;

	//Var to hold Unanswered question totals
	var unanswered = 0;

	//Var to hold totalscore
	var totalscore = 0;

	//Var for timer
	var timer;

	//Var for intervalId
	var intervalId;

	//Var Array for all option choices
	const options = {
        choices1: ["1720", "1869", "1920", "1820"],
        choices2: ["6 months", "1 year", "30 Days", "3 months"],
        choices3: ["5%", "2%", "10%", "25%"],
        choices4: ["The Earth revolving around the Sun", "The Moon revolving around the Earth", "The Earth making a rotation", "The Sun making a rotation"],
        choices5: ["Moon Day", "Sun Day", "Thor's Day", "Woden's day"],
        choices6: ["Steve Jobs", "Mark Zuckerburg", "Ludacris", "Bill Gates"],
        choices7: ["Saturn", "Jupiter", "Earth", "Uranus"]
      };

    //Var Array for all question choices
	const questions = {
        question1: ["What year did women get the right to vote in the U.S.?"],
        question2: ["How long does it take for an aluminum can you throw away to be recycled and be back in your hand as a new drink?"],
        question3: ["The U.S. holds what percent of the world's total prisoners?"],
        question4: ["What is a month a measure of?"],
        question5: ["What was the day Thursday named after?"],
        question6: ["Who didn't drop out of college?"],
        question7: ["On which planet does it NOT rain diamonds?"]
      };

      // Var to hold index of current question.
      var questionIndex = 0;

      // Var to hold current index of options.
      var optionIndex = 0;

      // Const to hold Array of Questions
      const questionsArray = [questions.question1, questions.question2, questions.question3, questions.question4, questions.question5, questions.question6, questions.question7];
      
      // Const to hold Array of Answers
      const optionsArray = [options.choices1, options.choices2, options.choices3, options.choices4, options.choices5, options.choices6, options.choices7];

      // Var to Start the Game.
      var begingame;

      //Jquery Hide Reset Button
      $('#buttonreset').hide();

	  //Start Game
	  $('#buttonstart').click(function(){

		//Function to Start Game
		begingame = true;
		gamestart();
		//Hide the start button
		$('#buttonstart').hide();
		showreset();
	});

	//Function to start Game
	function gamestart() {
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
	function nextquestion() {

	//If Else Statement. Setting Number of Questions
	if(questionIndex < 6){
		questionIndex++;
		optionIndex++;
		showquestions();
		$("#option0, #option1, #option2, #option3").show();
		$('#images').hide();
		}

	//Game ends after all questions
	else if (questionIndex === 6){
		begingame = false;
		stop();
		$("#option0, #option1, #option2, #option3").hide();
		$('#images').hide();
		$('#timeclock').hide();
		$('#start').html("<h2>Incorrect Answers: "+ wrongoption+"<br>Correct Answers: "+totalscore+"<br>Unanswered Questions: "+unanswered+'</h2>');
		showreset();
		}
	};


	//Choosing the Correct Answer
	$("#option0, #option1, #option2, #option3").on("click", function(rightanswer) {

		var rightanswer = "";
		rightanswer = $(this).text();
		
	//Events after the Correct Answer is Picked
		if(rightanswer == correctoptions[optionIndex]){
			$('#start').html("<h2>Correct! The Answer is: "+correctoptions[optionIndex]+"</h2>");
			$("#option0, #option1, #option2, #option3").hide();
			imagedisplay();
			setTimeout(nextquestion, 2000);
			stop();
			totalscore++;
		}

	//Checks if the wrong answer is selected
		else if (rightanswer != correctoptions[optionIndex]){
			$('#start').html("<h2>Incorrect Choice! The Correct Answer is: "+correctoptions[optionIndex]+"</h2>");
			$("#option0, #option1, #option2, #option3").hide();
			imagedisplay();
			stop();
			setTimeout(nextquestion, 2000);
			wrongoption++;
		}
      });

	//Function to show images.
	function imagedisplay() {
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
	
	//Question Time Out after 20 seconds
	timer = 20;
	clearInterval(intervalId);

	//Decrementing Timer
    intervalId = setInterval(decrement, 1000);
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
		gamestart();
	}

	//Hide reset button when Game Begins
	function showreset(){
		if (begingame == true) {
			$('#buttonreset').hide();
		}
	//Show reset button when Game Ends
		else if (begingame == false){
			$('#buttonreset').show();
		}
	}

	//This functions decreases the timer and stops it
    function decrement() {

    // Time decreasing (--)
    timer--;

    //Display remaining time
     $("#timeclock").html("<h2>Time Left: " + timer + "</h2>");
    
    // Surpassing the Time Limit for Questions
      if (timer === 0) {
        //Alert the user that time is up.
        $("#timeclock").html("<h2>Time's Up!</h2>");
        $('#start').html('<h2>You ran out of time! The correct answer is: '+correctoptions[optionIndex]+'</h2>');
		$("#option0, #option1, #option2, #option3").hide();
		imagedisplay();
	    stop();
		setTimeout(nextquestion, 2000);
		unanswered++;
      }
  	}

  	//Stopping timer and clearing intervalId
    function stop() {
    	clearInterval(intervalId);
    }
});