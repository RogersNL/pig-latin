$(document).ready(function(){
  // INCLUDED CHARACTERS
  var includedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,-'";
  var vowels = "AEIOUaeiou";
  var vowelsWithY = "AEIOUQYaeiouqy";

  // FUNCTIONS
    // TURN WORD TO ARRAY EX:HELLO -> ["H","E","L","L","O"]
    var splitCharacters = [];
    function wordToArray(string, array) {
      for (i = 0; i < string.length; i++)
    array.push(string.substring(i,i+1));
    }
    // TEST IF WORD HAS INCLUDED CHARACTERS AND STORES RESULT
    // INTO "alphaCheck" AS BOOLEAN EX: DOES "GOODBY3" HAVE ONLY
    // ALPHABET CHARACTERS? alphaCheck = false
    var alphaCheck = true;
    function testIfAlpha(stringStandard, arrayChecking) {
    	for (i = 0; i < arrayChecking.length; i++) {
    		alphaCheck = stringStandard.includes(arrayChecking[i]);
        // if (arrayChecking[i] === arrayChecking[arrayChecking.length-1]) {
        //   alert("last element");
        //   if (!".".includes(arrayChecking[arrayChecking.length-1])) {
        //   alert("not .");
        //   alphaCheck = false;
        //   break;
        //   } else {
        //     alert("is a .");
        //     alphaCheck = true;
        //   }
        // }
        if (!alphaCheck) {
          alert("not in alphacheck")
        	break;
        }
    	}
    }
    // FUNCTION THAT COMBINES wordToArray and testIfAlpha
    function wordCheck(word, standard) {
      var arrayCharacters = [];
      wordToArray(word, arrayCharacters);
      testIfAlpha(standard, arrayCharacters);
      return alphaCheck;
    }
    // FUNCTION THAT CHECKS FOR VOWELS
    var vowelCheck = true;
    function testIfVowel(array, standardVowels) {
      vowelCheck = standardVowels.includes(array[0]);
      return vowelCheck;
    }
    // FUNCTION THAT CHANGES WORDS THAT START WITH CONSONANTS
    var newWordArray = [];
    var newWord = "";
    function moveConsonant(word, slicePosition) {
    	newWordArray = [word.slice(slicePosition), word.slice(0,slicePosition), "ay"];
      newWord = newWordArray.join("");
    }
    // FUNCTION THAT FINDS POSITION OF FIRST VOWEL
    var position = 0;
    var consonantCheck = true;
    function testVowelPosition(stringStandard, arrayChecking) {
    	for (i = 0; i < arrayChecking.length; i++) {
      	consonantCheck = stringStandard.includes(arrayChecking[i]);
        if ("Yy".includes(arrayChecking[i]) && i === 0) {
          position++;
        } else if (!consonantCheck) {
        	position++;
        } else if ("Qq".includes(arrayChecking[i])) {
          position++;
          if ("Uu".includes(arrayChecking[i+1])) {
            position++;
          }
        } else {
        	i = arrayChecking;
        }
      }
    }
    // FUNCTION THAT COMBINES wordToArray AND testVowelPosition
    function firstVowelPosition(word, standard) {
      var arrayCharacters = [];
      wordToArray(word, arrayCharacters);
      testVowelPosition(standard, arrayCharacters);
      return position;
    }
    // FUNCTION THAT SPLITS SENTENCE INTO WORDS TO AN ARRAY
    var sentenceWords = [];
  	function splitSentence(string) {
    	return string.split(" ");
  	}
    //FUNCTION FOR TESTING WHETHER OR NOT TO USE THE BRANCH FOR SINGLE LETTER WORD OR WORD STARING WITH VOWEL
    function isFirstAVowel(word) {
      var vowelTestArray = [];
      wordToArray(word, vowelTestArray);
      testIfVowel(vowelTestArray, vowels);
      return vowelCheck;
    }
    //FUNCTION THAT CHECKS FOR "." AT THE END AND REMOVES IT
    function dotCheck(string) {
      var dotCheckArray = [];
      wordToArray(string, dotCheckArray);
      if (".".includes(dotCheckArray[dotCheckArray.length-1])) {
        return true;
      }
    }


  $("#form-pig-latin").submit(function(event){
    event.preventDefault();
    var userInput = $("input#sentence").val();

    var mySentence = splitSentence(userInput);
    var output = [];
    mySentence.forEach(function(inputtedText) {
      if (wordCheck(inputtedText, includedCharacters)) {
        if (inputtedText.length === 1 || isFirstAVowel(inputtedText)){
          if (dotCheck(inputtedText)) {
            inputtedText = inputtedText.substring(0,inputtedText.length - 1);
            var addWay = inputtedText + "way.";
          } else {
          var addWay = inputtedText + "way";
          }
          output.push(addWay);
        } else {
          if (dotCheck(inputtedText)) {
            inputtedText = inputtedText.substring(0,inputtedText.length - 1);
            moveConsonant(inputtedText, firstVowelPosition(inputtedText, vowelsWithY));
            output.push(newWord + ".");
          } else {
          moveConsonant(inputtedText, firstVowelPosition(inputtedText, vowelsWithY));
          output.push(newWord);
          position = 0;
          }
        }
      } else {
        output.push(inputtedText);
      }
    })
    $("#translated-sentence").text(output.join(" "));
  });
});
