const quotes = [
  "Believe in yourself and all that you are",
  "Know that there is something inside you that is greater than any obstacle",
  "Success is not final, failure is not fatal: it is the courage to continue that counts",
  "The only way to do great work is to love what you do",
  "If you haven't found it yet, keep looking. Don't settle",
  "The greatest glory in living lies not in never falling, but in rising every time we fall",
  "I have not failed. I've just found 10,000 ways that won't work",
  "Believe you can and you're halfway there",
  "Your time is limited, don't waste it living someone else's life",
  "The only limit to our realization of tomorrow will be our doubts of today",
  "You miss 100% of the shots you don't take",
  "If you can't fly then run, if you can't run then walk, if you can't walk then crawl, but whatever you do you have to keep moving forward",
];
let randomquote = document.querySelector(".randomquote");

function get_quote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}
randomquote.innerText = get_quote();
