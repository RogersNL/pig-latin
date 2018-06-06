$(document).ready(function(){
  // INCLUDED CHARACTERS
  var includedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,-'";
  var vowels = "AEIOUaeiou";
  var vowelsWithY = "AEIOUYaeiouy";

  // FUNCTIONS
    // TURN WORD TO ARRAY EX:HELLO -> ["H","E","L","L","O"]
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
  			if (!alphaCheck) {
        	i = arrayChecking.length;
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
    function testIfVowel(word, standardVowels) {
      vowelCheck = word.charAt(0).includes(standardVowels);
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
        if (!consonantCheck) {
        	position = position + 1;
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

  $("#form-pig-latin").submit(function(event){
    event.preventDefault();
    var userInput = $("input#sentence").val();

    var mySentence = splitSentence(userInput);
    console.log(mySentence);
    var output = [];
    mySentence.forEach(function(inputtedText) {
      if (wordCheck(inputtedText, includedCharacters)) {
        if (inputtedText.length > 1 && testIfVowel(inputtedText, vowels)){
          var addWay = inputtedText + "way"
          output.push(addWay);
        } else {
          moveConsonant(inputtedText, firstVowelPosition(inputtedText, vowelsWithY));
          output.push(newWord);
          position = 0;
        }
      } else {
        output.push(inputtedText);
      }
    })
    $("#translated-sentence").text(output.join(" "));
    // for (i = 0; i < sentenceWords.length; i++) {
    
  });
});
