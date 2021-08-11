const quotes=['When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
  'It is a far, far better thing that I do, than I have ever done; it is a far, far better rest I go to than I have ever known.',
'All we have to decide is what to do with the time that is given us.','You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. You’re on your own. And you know what you know. And YOU are the one who’ll decide where to go',
'It matters not what someone is born, but what they grow to be.',
'Whatever our souls are made of, his and mine are the same.','Whenever you feel like criticizing anyone, just remember that all the people in this world haven’t had the advantages that you’ve had.',
'Real courage is when you know you’re licked before you begin, but you begin anyway and see it through no matter what.','We are such stuff as dreams are made on, and our little life is rounded with a sleep.','I am no bird; and no net ensnares me: I am a free human being with an independent will, which I now exert to leave you.',
'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
'I took a deep breath and listened to the old brag of my heart: I am, I am, I am.',
'I am not afraid of storms, for I am learning how to sail my ship.',
'Life is to be lived, not controlled; and humanity is won by continuing to play in face of certain defeat.',
'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
'You pierce my soul. I am half agony. Half hope. Tell me not that I am too late, that such precious feelings are gone for ever.',
'There are some things you learn best in calm, and some in storm.','Once upon a time there was a boy who loved a girl, and her laughter was a question he wanted to spend his whole life answering.',
'Memories, even your most precious ones, fade surprisingly quickly. But I don’t go along with that. The memories I value most, I don’t ever see them fading.'];

let words=[];
let wordIndex=0;
let startTime=Date.now();

const quoteElement=document.getElementById("quote");
const statusElement=document.getElementById("status");
const typedValueElement=document.getElementById("typed-val");

document.getElementById('start').addEventListener('click',
()=>
{
  const quoteIndex=Math.floor(Math.random()*quotes.length);
  const quote=quotes[quoteIndex];
  typedValueElement.className ='';
  words=quote.split(' ');// split divides array in substrings.

  wordIndex=0;
  //map function is used to modify elements of an array accoriding to the function specified

  const spanWords=words.map(function(word){
    return `<span>${word}</span>`
  });

  quoteElement.innerHTML=spanWords.join(' ');
  //The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object),
  // separated by commas or a specified separator string.
  //If the array has only one item, then that item will be returned without using the separator.

  quoteElement.childNodes[0].className='correct';
  //childNodes returns:
  //A NodeList object, representing a collection of nodes.
  // The nodes in the returned collection are sorted as they appear in the source code
  //indexing from 0,therefore we are accessing element of quote.
  statusElement.innerText='';

  typedValueElement.value='';
  typedValueElement.focus();
});
let index=0;
typedValueElement.addEventListener('input',
()=>{
  if(index==0)
  {
    startTime= new Date().getTime();
  }
  let currentWord=words[index];
  let typedValue=typedValueElement.value;
  console.log(typedValue);
  console.log(currentWord);
  if(typedValue===currentWord&&index===words.length-1)
  {
    const elapsedTime=new Date().getTime()-startTime;
    typedValueElement.value = '';
    let k=Math.floor(((index+1)*60)/(elapsedTime/1000));
    const message=`Typing speed is ${k} words per minute`;
    statusElement.innerHTML=message;
    quoteElement.innerHTML="";
  }
  else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = '';
    currentWord="";
    // move to the next word
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    wordIndex+=2;
    index++;
    console.log(wordIndex);
    console.log(quoteElement.childNodes[wordIndex]);
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = 'correct';
  }
  else if(currentWord.startsWith(typedValue))
  {
    typedValueElement.className = '';
  }
  else {
    typedValueElement.className = 'incorrect';
  }
});
