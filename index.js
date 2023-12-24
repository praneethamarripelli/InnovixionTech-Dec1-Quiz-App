const quizData = [{
    question: "1. when do we celebrate National mathematics day?",
    a: "On December 22",
    b: "On June 18",
    c: "On July 11",
    d: "On January 1",
    correct: "a",
},
{
    question: "2. Why is National Mathematics Day celebrated every year?",
    a: "For Fun",
    b: "On Occassion Of Great Mathematician Srinivasa Ramanujan Birthday to create awareness on Math",
    c: "Gandhiji Birthday",
    d: "None Of these",
    correct: "b",
},
{
    question: "3. who is srinivasa Ramanujan?",
    a: "English Professor",
    b: "Software Engineer",
    c: "an Indian Mathematician ",
    d: "None",
    correct: "c",
},
{
    question: "4. What is Ramanujan number",
    a: "1234",
    b: "5678",
    c: "1811",
    d: "1729",
    correct: "d",
},
{
    question: "5. What is the Value of π",
    a: "3.14",
    b: "18.1",
    c: "5.31",
    d: "None of the above",
    correct: "a",
}
];

const userSelected = {}

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const labelEls = document.querySelectorAll('.op_label');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const submitBtn = document.getElementById('submit');
const reloadBtn = document.getElementById('reload');
const scoreEle = document.getElementById('score');
const resultEle = document.getElementById('result');
let currentQtn = 0;
let answered = 0;
let submitted = false;

loadQuiz();

function loadQuiz() {
    const currentQtnData = quizData[currentQtn];
    questionEl.innerText = currentQtnData.question;
    a_text.innerText = currentQtnData.a;
    b_text.innerText = currentQtnData.b;
    c_text.innerText = currentQtnData.c;
    d_text.innerText = currentQtnData.d;
    if (submitted) {
        let actualAns = currentQtnData.correct;
        let userAns = userSelected[currentQtn];
        labelEls.forEach(labelEl => {
            labelEl.classList.remove("correct");
            labelEl.classList.remove("wrong");


        });
        if (actualAns == userAns) {
            let correct = actualAns + "_text";
            document.getElementById(correct).classList.add("correct")

        }
        else {
            let correct = actualAns + "_text";
            let wrong = userAns + "_text";

            document.getElementById(correct).classList.add("correct")

            document.getElementById(wrong).classList.add("wrong")

        }
    }
    else {
        deselectAnswer();
    }
    if (currentQtn === quizData.length-1) {
        nextBtn.style.display = "none";
        if (submitted) {
            reloadBtn.style.display = "block";
            submitBtn.style.display = "none";
        }
        else {
            reloadBtn.style.display = "none";
            submitBtn.style.display = "block";


        }
    }
    if (userSelected[currentQtn]) {
        let selected = userSelected[currentQtn];
        document.getElementById(selected).checked = true
    }

}

function deselectAnswer() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
            userSelected[currentQtn] = answer

        }
    });

    return answer;
}
prevBtn.addEventListener('click', () => {
    getSelected()
    if (currentQtn > 0) {
        currentQtn--;
        if (currentQtn == 0) {
            prevBtn.disabled = true;
            prevBtn.classList.add('disabled')
        }
        loadQuiz();
    }


})

nextBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (!submitted) {
        if (answer) {
            if (answer === quizData[currentQtn].correct) {
                answered++;
            }
            currentQtn++;
            if (currentQtn < quizData.length) {
                loadQuiz();
                prevBtn.disabled = false;
                prevBtn.classList.remove('disabled')
            }
        }
    }
    else {
        currentQtn++;
        loadQuiz()
    }
})
submitBtn.addEventListener('click', () => {
    if (getSelected()) {
        submitted = true
        quiz.style.display = "none";
        resultEle.style.display = "block";
        scoreEle.innerHTML = `${answered}/${quizData.length} questions answered correctly`


    }


})

function loadAnswers() {
    currentQtn = 0
    quiz.style.display = "block";
    resultEle.style.display = "none";
    answerEls.forEach(answerEl => {
        answerEl.disabled = true;

    });
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
    loadQuiz();

}