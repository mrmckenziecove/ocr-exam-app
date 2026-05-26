let i = 0;
let score = 0;
let timer;
let t = 0;

let data = JSON.parse(localStorage.getItem("app")) || {
    topics: {}
};

const exam = [
{
topic: "Loops",
q: "FOR i = 1 TO 5\n total = total + i\nNEXT i\nWhat is total?",
marks: 4,
keywords: ["15"]
},
{
topic: "Selection",
q: "Write pseudocode for positive/negative check",
marks: 6,
keywords: ["if", "else", "0"]
},
{
topic: "Search",
q: "Describe linear search",
marks: 6,
keywords: ["compare", "each", "element"]
},
{
topic: "Arrays",
q: "Find largest value in array of 10 numbers",
marks: 8,
keywords: ["array", "max", "loop", "compare"]
}
];

function startExam(){
i = 0;
score = 0;
document.getElementById("exam").style.display = "block";
startTimer();
load();
}

function startTimer(){
clearInterval(timer);
t = 0;
timer = setInterval(()=>{
t++;
document.getElementById("timer").innerText =
"Time: " + String(Math.floor(t/60)).padStart(2,"0") +
":" + String(t%60).padStart(2,"0");
},1000);
}

function load(){
if(i >= exam.length){
end();
return;
}

document.getElementById("title").innerText =
"Question " + (i+1) + " (" + exam[i].marks + " marks)";

document.getElementById("question").innerText = exam[i].q;
document.getElementById("answer").value = "";
document.getElementById("feedback").innerText = "";
}

function submit(){
let ans = document.getElementById("answer").value.toLowerCase();
let Q = exam[i];

let match = 0;

Q.keywords.forEach(k=>{
if(ans.includes(k)) match++;
});

let marks = Math.round((match/Q.keywords.length)*Q.marks);
score += marks;

document.getElementById("feedback").innerText =
"Marks: " + marks + "/" + Q.marks;

i++;
setTimeout(load,700);

save();
}

function end(){
let pct = Math.round((score/(exam.length*4))*100);

document.getElementById("title").innerText = "Exam Finished";
document.getElementById("question").innerText =
"Score: " + score + "\nGrade: " + grade(pct);
}

function grade(p){
if(p>=85) return "9";
if(p>=75) return "8";
if(p>=65) return "7";
if(p>=55) return "6";
if(p>=45) return "5";
if(p>=35) return "4";
if(p>=25) return "3";
if(p>=15) return "2";
return "1";
}

function save(){
localStorage.setItem("app", JSON.stringify(data));
}

function reset(){
localStorage.removeItem("app");
alert("Reset complete");
}
