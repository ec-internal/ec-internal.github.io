//struct.txt: https://drive.google.com/file/d/16OrXRMruNfMxjgSfPdObuIedPjXbBUrA/view?usp=sharing
//api key: AIzaSyC_FVBSm45ll1vbFk9cpXLORkx_A_R7_wM

window.onload = function() {
    let fileId = window.location.hash;
    if (!fileId) {
        console.log("No fileId defined in FAQ!");
        return;
    } else {
        fileId = fileId.substring(1);
    }

    axios({
            method: 'get',
            url: `https://api.github.com/repos/ec-internal/ec-internal.github.io/contents/website-data/alumni-companies/`,
            responseType: 'stream',
        })
        .then(function(response) {
            let data = response.data;
            renderQuestions(parseQuestions(data));
            enableToggle();
        });
};

function parseQuestions(input) {
    let parsedQuestions = [];
    const questionFlag = 'Q:';
    const answerFlag = 'A:';

    let inputArray = input.split('\r\n');

    let questionBuffer = {
        question: '',
        answer: ''
    }

    let currentTextType = 0; //0 = not defined, 1 = question, 2 = answer

    for (line of inputArray) {
        if (line.startsWith('#')) {
            continue;
        }
        if (line.startsWith(questionFlag)) {
            if (questionBuffer.question.length > 0) {
                parsedQuestions.push({...questionBuffer })
            }
            questionBuffer = {
                question: '',
                answer: ''
            }
            line = line.slice(questionFlag.length);
            questionBuffer.question = line;
            currentTextType = 1;
        } else if (line.startsWith(answerFlag)) {
            line = line.slice(answerFlag.length);
            questionBuffer.answer = line;
            currentTextType = 2;
        } else {
            if (currentTextType == 1) {
                questionBuffer.question += '<br>' + line;
            } else if (currentTextType == 2) {
                questionBuffer.answer += '<br>' + line
            }
        }
    }

    if (questionBuffer.question.length > 0) {
        parsedQuestions.push({...questionBuffer })
    }

    return parsedQuestions;
}

function renderQuestions(questions) {
    for (let question of questions) {
        let template = `<div class="container"><div class="question">${question.question}</div><div class="answercont"><div class="answer">${question.answer}</div></div></div>`;
        console.log(template)
        $('#faq').append(template);
    }
}

//////////////////////////toggle faq section///////////////////////

function enableToggle() {
    let question = document.querySelectorAll(".question");

    question.forEach(question => {
        question.addEventListener("click", event => {
            const active = document.querySelector(".question.active");
            if (active && active !== question) {
                active.classList.toggle("active");
                active.nextElementSibling.style.maxHeight = 0;
            }
            question.classList.toggle("active");
            const answer = question.nextElementSibling;
            if (question.classList.contains("active")) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = 0;
            }
        })
    })
}