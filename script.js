// Quiz Configuration - CUSTOMIZE THIS SECTION
const quizData = {
    title: "What's Your Spirit Animal?",
    questions: [
        {
            question: "What's your ideal way to spend a weekend?",
            image: "🌟", // You can replace with actual image URLs
            answers: [
                { text: "Reading a book at home", type: "owl" },
                { text: "Going on an adventure outdoors", type: "wolf" },
                { text: "Socializing with friends", type: "dolphin" },
                { text: "Working on a creative project", type: "cat" }
            ]
        },
        {
            question: "How do you handle challenges?",
            image: "💪",
            answers: [
                { text: "Think it through carefully", type: "owl" },
                { text: "Face them head-on", type: "wolf" },
                { text: "Ask friends for help", type: "dolphin" },
                { text: "Find a creative solution", type: "cat" }
            ]
        },
        {
            question: "What's your greatest strength?",
            image: "✨",
            answers: [
                { text: "Wisdom and knowledge", type: "owl" },
                { text: "Leadership and courage", type: "wolf" },
                { text: "Empathy and communication", type: "dolphin" },
                { text: "Independence and creativity", type: "cat" }
            ]
        }
    ],
    results: {
        owl: {
            title: "🦉 The Wise Owl",
            description: "You are thoughtful, intelligent, and love learning new things. You prefer quiet environments and deep conversations over small talk.",
            image: "🦉"
        },
        wolf: {
            title: "🐺 The Brave Wolf",
            description: "You are a natural leader with strong instincts. You're loyal to your pack and aren't afraid to take on challenges.",
            image: "🐺"
        },
        dolphin: {
            title: "🐬 The Social Dolphin", 
            description: "You are friendly, empathetic, and love being around others. You have excellent communication skills and care deeply about relationships.",
            image: "🐬"
        },
        cat: {
            title: "🐱 The Independent Cat",
            description: "You are creative, independent, and march to the beat of your own drum. You value your freedom and have a unique perspective on life.",
            image: "🐱"
        }
    }
};

// Quiz Logic
let currentQuestion = 0;
let answers = {};
let scores = { owl: 0, wolf: 0, dolphin: 0, cat: 0 };

function initQuiz() {
    document.querySelector('.quiz-header h1').textContent = quizData.title;
    showQuestion();
}

function showQuestion() {
    const question = quizData.questions[currentQuestion];
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    
    questionContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    
    // Update progress
    const progress = ((currentQuestion) / quizData.questions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
    
    // Update question info
    document.getElementById('question-number').textContent = 
        `Question ${currentQuestion + 1} of ${quizData.questions.length}`;
    document.getElementById('question-text').textContent = question.question;
    
    // Update image (you can replace emoji with actual images)
    document.getElementById('question-image').innerHTML = 
        `<div style="font-size: 4em; margin: 20px 0;">${question.image}</div>`;
    
    // Create answer buttons
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });
    
    // Reset next button
    const nextBtn = document.getElementById('next-btn');
    nextBtn.classList.remove('active');
    nextBtn.textContent = currentQuestion === quizData.questions.length - 1 ? 'See Results' : 'Next Question';
}

function selectAnswer(answerIndex) {
    // Remove previous selection
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Select current answer
    document.querySelectorAll('.answer-btn')[answerIndex].classList.add('selected');
    
    // Store answer
    answers[currentQuestion] = answerIndex;
    
    // Activate next button
    document.getElementById('next-btn').classList.add('active');
}

function nextQuestion() {
    if (!answers.hasOwnProperty(currentQuestion)) return;
    
    // Record the answer type
    const selectedAnswer = quizData.questions[currentQuestion].answers[answers[currentQuestion]];
    scores[selectedAnswer.type]++;
    
    currentQuestion++;
    
    if (currentQuestion < quizData.questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    // Find the personality type with highest score
    const maxScore = Math.max(...Object.values(scores));
    const resultType = Object.keys(scores).find(key => scores[key] === maxScore);
    const result = quizData.results[resultType];
    
    // Update progress to 100%
    document.getElementById('progress').style.width = '100%';
    
    // Show result
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    
    document.getElementById('result-content').innerHTML = `
        <div style="font-size: 4em; margin-bottom: 20px;">${result.image}</div>
        <h3>${result.title}</h3>
        <p>${result.description}</p>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    answers = {};
    scores = { owl: 0, wolf: 0, dolphin: 0, cat: 0 };
    showQuestion();
}

function shareResult() {
    const resultType = Object.keys(scores).find(key => scores[key] === Math.max(...Object.values(scores)));
    const result = quizData.results[resultType];
    
    if (navigator.share) {
        navigator.share({
            title: quizData.title,
            text: `I got ${result.title}! Take the quiz to find out your result.`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const text = `I got ${result.title} in the "${quizData.title}" quiz! Take it yourself: ${window.location.href}`;
        navigator.clipboard.writeText(text).then(() => {
            alert('Result copied to clipboard!');
        });
    }
}

// Initialize quiz when page loads
window.onload = initQuiz;
