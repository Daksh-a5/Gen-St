async function loadQuiz() {
  const response = await fetch('questions.json');
  const questions = await response.json();
  let quizHTML = '';
  questions.forEach((q, i) => {
    quizHTML += `<p>${i+1}. ${q.question}</p>`;
    q.options.forEach(opt => {
      quizHTML += `<input type="radio" name="q${i}" value="${opt}"> ${opt}<br>`;
    });
  });
  document.getElementById('quiz').innerHTML = quizHTML;
}

function submitQuiz() {
  let score = 0;
  const radios = document.querySelectorAll('input[type=radio]:checked');
  radios.forEach((radio, i) => {
    if (radio.value === quizQuestions[i].answer) score++;
  });
  document.getElementById('result').innerText = `Your Score: ${score}`;
}

let quizQuestions = [];
loadQuiz().then(() => {
  fetch('questions.json').then(res => res.json()).then(data => quizQuestions = data);
});

