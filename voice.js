const startBtn = document.querySelector("#start-btn");

const recognition = new webkitSpeechRecognition();
recognition.continuous = true; // allows to speak more than one word
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// we'll create window - speech synthesis so that the bot speaks to us
const synth = window.speechSynthesis;

startBtn.addEventListener("click", () => {
  recognition.start(); // starts recording user's voice
});

let utter = new SpeechSynthesisUtterance("Hi, How are you?");
utter.onend = () => {
  recognition.start();
};

// this is array for user's questions
const userQuestions = [
  "hello",
  "what is your name",
  "how are you",
  "what is page a vu",
  "what is the purpose of this website",
  "who can use it",
  "what technology does it use",
  "is it accurate",
];

// this is array for bot's answers
const answersByBot = [
  "hello, this is Jarvis, the Bot",
  "My name is Jarvis",
  "I'm good, what about you",
  "It is a platform for readers with different locations and interests to connect and share their views",
  "Purpose of this website is to connect a community of readers to share their interests",
  "Any person who is interested in reading can use it",
  "It uses AI/ML for recommendation system, web technologies for the frontend and firebase for storing the data",
  "We are trying to achieve maximum accuracy and we hope you're satisfied with the results",
];

let flag = 0;
recognition.onresult = (e) => {
  // stores user's message in the variable below
  const transcript = e.results[e.results.length - 1][0].transcript.trim();
  //   document.getElementById("ans").innerHTML = transcript;

  for (let i = 0; i < userQuestions.length; i++) {
    if (transcript === userQuestions[i]) {
      recognition.stop();
      flag = 1;
      utter.text = answersByBot[i];

      //--------------------
      // to display text
      let divElementQue = document.createElement("div");
      let divElementTextQue = document.createTextNode(
        "Question: " + userQuestions[i]
      );
      divElementQue.appendChild(divElementTextQue);
      document.body.appendChild(divElementQue);
      let divElementAns = document.createElement("div");
      let divElementTextAns = document.createTextNode(
        "Answer: " + answersByBot[i]
      );
      divElementAns.appendChild(divElementTextAns);
      document.body.appendChild(divElementAns);
      //--------------------

      synth.speak(utter);
    }
  }
  if (flag === 0) {
    utter.text = "It seems that I don't have an answer for that";
    synth.speak(utter);
  }

  //   if (transcript === "hello") {
  //     recognition.stop();
  //     utter.text = "Hi, How are you?";
  //     synth.speak(utter);
  //   } else if (transcript === "goodbye") {
  //     utter.text = "Hope to see you soon";
  //     synth.speak(utter);
  //   }
};
