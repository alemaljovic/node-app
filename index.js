import fs from "fs";
import readlineSync from "readline-sync";

function showOptionAnswer(questionDict) {
  console.log(`\n ${questionDict.q}`);

  let optionBuilder = "";
  let optionNo = "a";
  for (const [key, value] of Object.entries(questionDict)) {
    if (key === "an" || key === "q") {
      continue;
    }

    optionBuilder += `${optionNo}/${value}`;
    console.log(`<${optionNo}> ${value}`);
    optionNo = String.fromCharCode(optionNo.charCodeAt(0) + 1);
  }

  let answer;
  do {
    answer = readlineSync
      .question("\n Enter the option a, b, c, or d: ")
      .toLowerCase();

    //Validate user input
    if (!["a", "b", "c", "d"].includes(answer)) {
      console.log("\nInvalid option. Please enter a, b, c, or d.");
    }
  } while (!["a", "b", "c", "d"].includes(answer));

  return answer;
}

//Load questions
let questions;

function loadQuestionsFromFile() {
  questions = JSON.parse(fs.readFileSync("./questions.json", "utf-8"));
}

loadQuestionsFromFile();

let rightAnswer = 0;
let i = 0;

do {
  const questionDict = questions[i];
  const answer = showOptionAnswer(questionDict);
  i++;

  if (questionDict.an === answer) {
    rightAnswer++;
    console.log("\nCorrect Answer!");
  } else {
    console.log("\nYour answer is wrong");
    console.log(`\nCorrect answer is ${questionDict.an}`);
  }
} while (i < questions.length);

//Repot function
function generateReport() {
  console.log("\n!!!Game Over");
  console.log(
    `\nYou made ${rightAnswer} right out of 5 answers. Your score is ${rightAnswer}`
  );
}

generateReport();