 // INITAILIZING VARIABLES
 var millisec = 0
 var sec = 0
 var timer = document.getElementById('timer')
 var Startbtn = document.getElementById('Startbtn')
 var settime
 var result = document.getElementById('result')
 var Usertext = document.getElementById("UserText");
 var TimeTaken = 0
 var compare
 var compareData
 var randomindex = Math.floor(Math.random() * 10)
 var sentenceToType = document.getElementById("sentenceToType");
 var RefSentence = ""
 var errorWords = 0;
 var correctWords = 0;
 var missedpunc
 var speedP = 0
 var speedWP = 0
 var obj
 var NameofPlayer = ""
 var difficulty = document.getElementById('DIFFICULTY').value
 var wordCount = 0;
 // ===================================================================================================================================


 //  FETCHING JSON DATA





 //  async function myfunc() {

 //      obj = await fetch("./sentences.json")
 //  }
 //  myfunc();
 //  let myAsyncFunction = async() => {
 //      const response = await fetch("./sentences.json");

 //      let data = await response.json();
 //      return data;
 //  };




 console.log(RefSentence)
     // getting container list
 var containerList = document.getElementsByClassName("container");
 console.log(containerList.length)


 var ProceedBtn = document.getElementById("proceed")


 //  PROCEEDING TO TYPING SCREEN -------CONTAINER 2
 ProceedBtn.addEventListener("click", () => {
     NameofPlayer = document.getElementById("Name").value
     difficulty = document.getElementById('DIFFICULTY').value


     fetch("./sentences.json")
         .then((data) => {
             return data.json();
         })
         .then((sentencesData) => {
             console.log(sentencesData.sentence2[randomindex])
             if (difficulty == "EASY") {
                 sentenceToType.innerText = sentencesData.sentence1[randomindex];
                 RefSentence = sentenceToType.innerText
             } else if (difficulty == "MEDIUM") {
                 sentenceToType.innerText = sentencesData.sentence2[randomindex];
                 RefSentence = sentenceToType.innerText
             } else {
                 sentenceToType.innerText = sentencesData.sentence3[randomindex];
                 RefSentence = sentenceToType.innerText
             }
             document.getElementById("ReferSent").innerHTML = RefSentence;
         })
         .catch((error) => {
             console.log(error);
         })
     document.getElementById("resultMessage").innerText = " THANKS " + NameofPlayer + " FOR USING THIS TYPING TEST."
     console.log(NameofPlayer)
     console.log(difficulty)


     //  PLAYER CANNOT PROCEED WITHOUT ENTERING DETAILS 
     if (NameofPlayer == '') {
         alert("Please Enter Your Name");
     }
     if (difficulty == 'SELECT') {
         alert("Please Select Difficulty Level");
     }
     if (NameofPlayer != '' && difficulty != 'SELECT') {
         containerList[0].style.display = "none";
         containerList[1].style.display = "block";
         document.getElementById("playerName").innerHTML = "HELLO " + NameofPlayer + " . ";
         document.getElementById("chosenDifficulty").innerHTML = "GLAD THAT YOU CHOSE " + difficulty + " LEVEL . ";
     }

 })


 //  FUNCTION THAT STARTS THE GAME 
 function StartGame() {

     Startbtn.style.display = 'none' //hiding Start Button
     document.getElementById("Submit").style.display = 'inline-block' //hiding Start Button
     document.getElementById('TypingBox').style.display = 'block' //displaying Text box


     // Timer Functions
     timer.innerHTML = 'Time ' + sec + ' : ' + millisec + 'seconds'

     if (millisec < 9) {
         timer.innerHTML = 'Time ' + sec + ' : ' + '0' + millisec + 'seconds'
     }
     if (sec <= 9) {
         timer.innerHTML = 'Time ' + '0' + sec + ' : ' + millisec + 'seconds'
     }
     millisec++
     if (millisec == 100) {
         sec++
         millisec = 0
     }
 }
 var StartTime = () => {
     settime = setInterval(StartGame, 10)
 }
 Startbtn.addEventListener('click', StartTime)

 function WordCounter(str) {
     var response = str.split(' ').length //Conting no. of space 
     console.log(response)
     return response
 }




 // FUNCTION THAT STOPS THE GAME
 function stopTimer() {
     clearInterval(settime)
     var NewSec = sec
     var Newmillisec = millisec - 1;
     document.getElementById('Submit').style.display = "none"
     document.getElementById('ShowResult').style.display = "inline-block"
     console.log(NewSec)
     console.log(Newmillisec)



     Usertext.disabled = true; //disable text iput upon submitting
     var totalstr = Usertext.value
     document.getElementById("userSent").innerHTML = Usertext.value
     console.log(totalstr);

     wordCount = WordCounter(totalstr);
     if (Usertext.value == "") {
         wordCount = 0;
     }
     console.log("word count is " + wordCount)
         //  calculating Time Taken
     TimeTaken = (NewSec + Newmillisec / 100)
     console.log("The time taken is" + TimeTaken + "secondss");

     //  Calculating Speed
     speedWP = Math.floor((wordCount / TimeTaken) * 60);
     console.log((wordCount / TimeTaken))
     document.getElementById("ScoreWP").innerHTML = "YOUR SPEED IN WORDS PER MINUTES WITHOUT CONSIDERING PENALTY IS " + speedWP



     //COUNTING PUNCTUATIONS
     //  function countPunctuations(str) {
     //      var i = 0;
     //      var c = 0;
     //      for (i = 0; i < str.length; i++) {
     //          if (str == '.' || str == ',' || str == '!' || str == "'") {
     //              c++;
     //          }
     //      }
     //      return c;
     //  }

     //  var Noofpunc = countPunctuations(RefSentence);
     //  console.log(Noofpunc)
     //  var NoofpuncUser = countPunctuations(Usertext);
     //  console.log(NoofpuncUser)


     //  console.log("missed punc is " + (Noofpunc - NoofpuncUser))
     //  document.getElementById("puncP").innerHTML = "You have Entered " + (Noofpunc - NoofpuncUser) + " incorrect/missed punctuation .So For this Penalty Incurred was " + ((Noofpunc - NoofpuncUser) * 25) + " milli-seconds"


     compareData = compareWords(RefSentence, totalstr)
     console.log(compareData)

     //  calculating Time Taken
     TimeTaken = TimeTaken + errorWords * 0.5;
     console.log("The time taken is" + TimeTaken + "secondss Cosidering Penalty");
     document.getElementById("puncP").innerHTML = "You took " + TimeTaken + " seconds including penalty to complete how much you wrote with given errors."
         //  Calculating Speed
     var speedP = Math.floor((correctWords / TimeTaken) * 60);
     document.getElementById("ScoreP").innerHTML = "YOUR SPEED IN WORDS PER MINUTES CONSIDERING PENALTY IS " + speedP

     console.log("Your speed WPM is " + speedP);
 }




 // COMPARING USER INPUT AND GIVEN SENTENCE
 function compareWords(str1, str2) {
     var wrd1 = str1.split(' ')

     console.log(wrd1)
     var wrd2 = str2.split(" ")
     console.log(wrd2)
     var count = 0
     console.log("lenght" + wrd1.length)

     //  FOREACH RUNS THE FORLOOP AUTOMATICALLY FOR EACH ARRAY ELEMENT
     wrd1.forEach(function(item, index) {
         if (item == wrd2[index]) {
             count++
         }
     })
     correctWords = count;
     errorWords = (wrd1.length - count)
     document.getElementById("overview").innerHTML = "You have Entered " + count + " correct words out of " + wrd1.length + " and total errors are " + errorWords + ".";
     document.getElementById("WordP").innerHTML = "You have Entered " + errorWords + " incorrect/missed words .So For this Penalty Incurred was " + errorWords * 0.5 + " seconds."
     return ("You have Entered " + count + "correct words out of " + wrd1.length + " and total errors are " + errorWords + ".")

 }



 function WordCounter(str) {
     var response = str.split(' ').length //Conting no. of space 
     console.log(response)
     return response
 }



 function ShowResult() {
     containerList[1].style.display = "none";
     containerList[2].style.display = "block";
 }