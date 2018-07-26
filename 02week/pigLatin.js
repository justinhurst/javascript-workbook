'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function pigLatin(word) {
  //The basic idea of Pig Latin is to take the first letters of the word up to the first vowel, move them to the back, and add 'ay' to the end of it.
  //console.log( pigLatin('car') ); //=> 'arcay'

  //https://www.w3schools.com/Jsref/jsref_obj_array.asp

  //pig latin directions
  //===========================
    //go through letters
    //find the first vowel
    //cut the letters off up to that point
    //then paste those letters at the end of the word
    //then add 'ay' at the end

  // codePlan
  //============================
  // check if input is true and is a string
  // determine what if the word ending needs to be 'ay' or 'yay'
  // trim and to lowercase the input
  // break word up into letters using an array wordArray = ['b','o','b'] //.split("")
  // for loop iterate through the wordArray values
    // use conditional to check if the letter is a,e,i,o,u
    //if not a,e,i,o,u, shift that element save in a variable and then push that variable to the end
    //upon first letter being a,e,i,o,u, break out of the loop using 'break'. No longer need to remove letters and and add to end
  //add 'ay' to the end of the rearranged array
  //once loop is complete use .join() to combine array letters into a string again so it is a readable string

  //functions in parent function
  //=============================
  // checkIfValidString() = validates the input and returns false if any part of string is not a letter
  // rearrangeLetters() = loop through the letters of a valid string and rearrange them according to pig latin rules

  //global variables :
    //const word, the original input from the user lowercased and ready to validate and act on
  //local variables :
    // const alphabet will live inside the checkIfValidString function
    // const wordIntoLetters will be an array to hold the letters of the word to be translated while we operate on it

  //notes and issues while coding
  //============================
    // for loop is skipping an item when I use .shift()
      //https://stackoverflow.com/questions/9882284/looping-through-array-and-removing-items-without-breaking-for-loop
    // check input word for only letters without using regex
      // https://www.codeproject.com/Questions/1209228/How-do-I-check-if-a-string-has-all-letters-of-alph

    // duplicate letters in a word are messing up checkIfValidString()
    // create a new array with every element in an array that pass a test
      // https://www.w3schools.com/Jsref/jsref_filter.asp
      // https://gomakethings.com/removing-duplicates-from-an-array-with-vanilla-javascript/
  // use .push() to add 'ay' to the end of the letters split array

  //global word variable
  word = word.toLowerCase();
  const checkIfValidString = (word) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let letterFound = 0;
    const wordIntoLetters = word.split("");
    const uniqueLetters = wordIntoLetters.filter(function(item, index){
      return wordIntoLetters.indexOf(item) >= index;
    });
    word = uniqueLetters.join("");
    for ( let a = 0; a < alphabet.length; a++) {
      const alphabetLetter = alphabet[a];
      if (word.indexOf(alphabetLetter) > -1){
        letterFound++;
      }
    }
    return letterFound == word.length
  }
  const determineWordEnding = (word) => {
    if ((word.charAt(0) == 'a') || (word.charAt(0) == 'e') || (word.charAt(0) == 'i') || (word.charAt(0) == 'o') || (word.charAt(0) == 'u') || (word.charAt(0) == 'y') ) {
      return 'yay'
    } else {
      return 'ay'
    }
  }
  const rearrangeLetters = (word) => {
    const wordIntoLetters = word.split("");
    for(let i = 0; i < wordIntoLetters.length; i++){
      const item = wordIntoLetters[i];
      if ( (item == 'a') || (item == 'e') || (item == 'i') || (item == 'o') || (item == 'u') || (item == 'y') ) {
        break
      } else {
        wordIntoLetters.push(wordIntoLetters.shift());
        i--;
      }
    }
    wordIntoLetters.push(determineWordEnding(word));
    const translatedWord = wordIntoLetters.join("");
    return translatedWord
  }

  if(word && checkIfValidString(word)){
    return rearrangeLetters(word)
  } else {
    return 'Enter a valid word without spaces, numbers or special characters. Only letters are allowed'
  }
}


function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
