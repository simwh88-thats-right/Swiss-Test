// Swiss Cottage Secondary School Quiz Configuration
const quizData = {
    title: "Student Success & Stress Profile",
    questions: [
        {
            question: "When you have a major exam coming up, what's your first reaction?",
            icon: "📝",
            answers: [
                { text: "Create a detailed study schedule immediately", type: "achiever" },
                { text: "Feel overwhelmed and need time to process", type: "reflector" },
                { text: "Form a study group with classmates", type: "collaborator" },
                { text: "Wait until closer to the exam to start studying", type: "adapter" }
            ]
        },
        {
            question: "How do you handle social media when stressed?",
            icon: "📱",
            answers: [
                { text: "Use it to share achievements and stay motivated", type: "achiever" },
                { text: "Take breaks from social media to focus", type: "reflector" },
                { text: "Connect with friends for support and advice", type: "collaborator" },
                { text: "Scroll through it to distract myself", type: "adapter" }
            ]
        },
        {
            question: "Your parents expect you to excel in all subjects. How do you respond?",
            icon: "👨‍👩‍👧‍👦",
            answers: [
                { text: "Set high standards and work hard to meet them", type: "achiever" },
                { text: "Feel pressure but try to manage expectations", type: "reflector" },
                { text: "Talk openly with family about realistic goals", type: "collaborator" },
                { text: "Focus on subjects I enjoy most", type: "adapter" }
            ]
        },
        {
            question: "How do you define success as a student?",
            icon: "🎯",
            answers: [
                { text: "Getting top grades and academic recognition", type: "achiever" },
                { text: "Personal growth and understanding concepts deeply", type: "reflector" },
                { text: "Building meaningful relationships and helping others", type: "collaborator" },
                { text: "Finding balance between studies and personal interests", type: "adapter" }
            ]
        },
        {
            question: "When facing peer pressure at school, you typically:",
            icon: "👥",
            answers: [
                { text: "Stay focused on my goals and ignore distractions", type: "achiever" },
                { text: "Think carefully about the consequences before acting", type: "reflector" },
                { text: "Discuss with trusted friends to make good decisions", type: "collaborator" },
                { text: "Go with the flow but set personal boundaries", type: "adapter" }
            ]
        }
    ],
    results: {
        achiever: {
            title: "🏆 The High Achiever",
            description: "You're driven by excellence and have strong personal goals. You handle stress by channeling it into motivation, but remember to take breaks and celebrate small wins along the way!",
            avatar: "👑",
            strengths: ["Goal-oriented", "Self-motivated", "Resilient"],
            tips: "Practice self-care and remember that perfection isn't always necessary."
        },
        reflector: {
            title: "🧠 The Thoughtful Reflector", 
            description: "You process stress by thinking deeply and prefer to understand rather than just perform. Your introspective nature is a strength - trust your analytical skills!",
            avatar: "🤔",
            strengths: ["Self-aware", "Analytical", "Thoughtful"],
            tips: "Don't overthink everything - sometimes taking action is better than endless analysis."
        },
        collaborator: {
            title: "🤝 The Team Player",
            description: "You thrive on connections and handle stress by reaching out to others. Your social skills and empathy make you a natural leader and trusted friend!",
            avatar: "👥",
            strengths: ["Empathetic", "Communicative", "Supportive"],
            tips: "Remember to also develop independence and trust your own judgment."
        },
        adapter: {
            title: "🌊 The Flexible Adapter",
            description: "You handle stress by staying flexible and finding creative solutions. Your ability to adapt and maintain balance is admirable - just ensure you're still working toward your goals!",
            avatar: "🌟",
            strengths: ["Adaptable", "Creative", "Balanced"],
            tips: "Set some firm goals to ensure your flexibility doesn't hold you back from achieving your potential."
        }
    }
};

// Rest of the JavaScript code remains the same, but update the showResults function:

function showResults() {
    const maxScore = Math.max(...Object.values(scores));
    const resultType = Object.keys(scores).find(key => scores[key] === maxScore);
    const result = quizData.results[resultType];
    
    document.getElementById('progress').style.width = '100%';
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    
    document.getElementById('result-content').innerHTML = `
        <div style="font-size: 4em; margin-bottom: 20px;">${result.avatar}</div>
        <h3>${result.title}</h3>
        <p style="margin-bottom: 20px;">${result.description}</p>
        <div class="success-indicators">
            ${result.strengths.map(strength => `
                <div class="success-indicator">
                    <div class="icon">✨</div>
                    <div class="text">${strength}</div>
                </div>
            `).join('')}
        </div>
        <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
            <strong>💡 Tip for Success:</strong><br>
            ${result.tips}
        </div>
    `;
}

// Keep all other functions the same as before
let currentQuestion = 0;
let answers = {};
let scores = { achiever: 0, reflector:
