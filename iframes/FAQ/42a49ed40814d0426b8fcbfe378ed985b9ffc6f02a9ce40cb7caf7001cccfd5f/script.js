//struct.txt: https://drive.google.com/file/d/16OrXRMruNfMxjgSfPdObuIedPjXbBUrA/view?usp=sharing
//api key: AIzaSyC_FVBSm45ll1vbFk9cpXLORkx_A_R7_wM

let questions = [{
    question: '',
    answer: ''
}]

window.onload = function() {
    axios({
            method: 'get',
            url: 'https://www.googleapis.com/drive/v2/files/16OrXRMruNfMxjgSfPdObuIedPjXbBUrA?key=AIzaSyC_FVBSm45ll1vbFk9cpXLORkx_A_R7_wM&alt=media',
            responseType: 'stream',
        })
        .then(function(response) {
            let data = response.data;
            console.log(data)
            console.log(parseQuestions(data))
        });
};

function parseQuestions(input) {
    console.log(input)
    let parsedQuestions = [];
    const questionFlag = 'Q:';
    const answerFlag = 'A:';

    let inputArray = input.split('\n');

    let questionBuffer = {
        question: '',
        answer: ''
    }

    let currentTextType = 0; //0 = not defined, 1 = question, 2 = answer

    for (line of inputArray) {
        if (line.startsWith(questionFlag)) {
            if (questionBuffer.questionBuffer.length > 0) {
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
                questionBuffer.question += '\n' + line;
            } else if (currentTextType == 2) {
                questionBuffer.answer += '\n' + line
            }
        }

    }

    return parsedQuestions;
}

//////////////////////////toggle faq section///////////////////////
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