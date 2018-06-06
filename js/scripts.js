$(document).ready(function(){
  // INCLUDED CHARACTERS
  var includedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'";
  function wordCheck(word, standard) {
    function wordToArray(string, array) {
    for (i = 0; i < string.length; i++)
      array.push(string.substring(i,i+1));
    }
    var check = true;
    function testIfAlpha(stringStandard, arrayChecking) {
    	for (i = 0; i < arrayChecking.length; i++) {
    		check = stringStandard.includes(arrayChecking[i]);
  			if (!check) {
        	i = arrayChecking.length;
        }
    	}
    }
    var arrayCharacters = [];
    wordToArray(word, arrayCharacters);
    testIfAlpha(standard, arrayCharacters);
    return check;
  }

  $("#form-pig-latin").submit(function(event){
    event.preventDefault();
    var inputtedText = $("input#sentence").val();

    if (inputtedText.includes(!inclu)) {
      var addWay = inputtedText + "way"
      $("#translated-sentence").text(addWay);
    } else {
      $("#translated-sentence").text(inputtedText);
    }
  });
});
