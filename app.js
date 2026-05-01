// State Management and Data

// 1. Navigation Logic
const navLinks = document.querySelectorAll('.nav-links li');
const views = document.querySelectorAll('.view');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove active class from all
        navLinks.forEach(l => l.classList.remove('active'));
        views.forEach(v => v.classList.remove('active-view'));

        // Add active class to clicked
        link.classList.add('active');
        const targetId = link.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active-view');
    });
});

// 2. Timeline Data & Generation
const timelineData = [
    { title: "Delimitation & Rolls", desc: "Defining constituencies and updating the electoral rolls with eligible voters." },
    { title: "Announcement", desc: "ECI announces the election schedule, phases, and key dates." },
    { title: "Nominations", desc: "Candidates file their nomination papers, which are then scrutinized." },
    { title: "Campaigning", desc: "Parties campaign adhering to the Model Code of Conduct. Ends 48hrs before voting." },
    { title: "Polling Day", desc: "Voters cast their vote using Electronic Voting Machines (EVMs)." },
    { title: "Counting & Results", desc: "Votes are counted under strict security and results are declared." }
];

const timelineContainer = document.getElementById('timeline-container');
timelineData.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
    div.innerHTML = `
        <div class="timeline-content">
            <h3>${index + 1}. ${item.title}</h3>
            <p>${item.desc}</p>
        </div>
    `;
    timelineContainer.appendChild(div);
});

// 3. Flashcards Data & Generation
const flashcardsData = [
    { term: "EVM", def: "Electronic Voting Machine used to record votes securely and efficiently." },
    { term: "VVPAT", def: "Voter Verified Paper Audit Trail - Provides a paper slip verifying the vote cast." },
    { term: "NOTA", def: "None of the Above - Option for voters who do not wish to vote for any candidate." },
    { term: "ECI", def: "Election Commission of India - Autonomous constitutional authority responsible for administering elections." },
    { term: "MCC", def: "Model Code of Conduct - Guidelines by ECI for political parties and candidates during elections." },
    { term: "Returning Officer", def: "Official responsible for overseeing the election in a constituency." }
];

const flashcardsContainer = document.getElementById('flashcards-container');
flashcardsData.forEach(card => {
    const div = document.createElement('div');
    div.className = 'flashcard';
    div.innerHTML = `
        <div class="flashcard-inner">
            <div class="flashcard-front">${card.term}</div>
            <div class="flashcard-back">${card.def}</div>
        </div>
    `;
    div.addEventListener('click', () => div.classList.toggle('flipped'));
    flashcardsContainer.appendChild(div);
});

// 4. Quiz Logic
const quizData = [
    {
        q: "What is the minimum age to vote in India?",
        options: ["16 Years", "18 Years", "21 Years", "25 Years"],
        answer: 1,
        explanation: "The 61st Constitutional Amendment lowered the voting age from 21 to 18 years."
    },
    {
        q: "Who conducts the Lok Sabha elections in India?",
        options: ["Supreme Court", "Parliament", "Election Commission of India", "President"],
        answer: 2,
        explanation: "Article 324 grants the power of superintendence, direction, and control of elections to the ECI."
    },
    {
        q: "When must election campaigning stop before the polling day?",
        options: ["24 hours before", "48 hours before", "12 hours before", "72 hours before"],
        answer: 1,
        explanation: "Campaigning officially ends 48 hours before the conclusion of polls to ensure a silent period."
    },
    {
        q: "What does VVPAT stand for?",
        options: ["Voter Verified Paper Audit Trail", "Voting Validation Paper Audit Trail", "Voter Verification Process Action Trail", "Valid Voting Paper Audit Trial"],
        answer: 0,
        explanation: "VVPAT provides a physical paper trail allowing voters to verify that their vote was cast correctly."
    },
    {
        q: "How many members are there in the Lok Sabha?",
        options: ["250", "543", "552", "400"],
        answer: 1,
        explanation: "There are currently 543 elected members in the Lok Sabha representing different constituencies."
    }
];

let currentQuestion = 0;
let score = 0;

const startBtn = document.getElementById('start-quiz-btn');
const quizSetup = document.getElementById('quiz-setup');
const quizActive = document.getElementById('quiz-active');
const quizResults = document.getElementById('quiz-results');
const qText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const qCounter = document.getElementById('question-counter');
const qProgressBar = document.getElementById('quiz-progress-bar');
const nextBtn = document.getElementById('next-question-btn');
const feedbackDiv = document.getElementById('quiz-feedback');

startBtn.addEventListener('click', () => {
    quizSetup.classList.add('hidden');
    quizActive.classList.remove('hidden');
    loadQuestion();
});

function loadQuestion() {
    feedbackDiv.classList.add('hidden');
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';
    
    const q = quizData[currentQuestion];
    qText.textContent = q.q;
    qCounter.textContent = `Question ${currentQuestion + 1}/${quizData.length}`;
    qProgressBar.style.width = `${((currentQuestion) / quizData.length) * 100}%`;

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => selectOption(idx, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(idx, selectedBtn) {
    const q = quizData[currentQuestion];
    const isCorrect = idx === q.answer;
    
    // Disable all options
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answer) btn.classList.add('correct');
    });

    if (isCorrect) {
        score++;
        feedbackDiv.textContent = "Correct! " + q.explanation;
        feedbackDiv.className = 'feedback success';
    } else {
        selectedBtn.classList.add('incorrect');
        feedbackDiv.textContent = "Incorrect. " + q.explanation;
        feedbackDiv.className = 'feedback error';
    }
    
    feedbackDiv.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizActive.classList.add('hidden');
    quizResults.classList.remove('hidden');
    document.getElementById('final-score').textContent = score;
    
    let msg = "";
    if(score === 5) msg = "Excellent! You are an election expert.";
    else if(score >= 3) msg = "Good job! You have a solid understanding of the process.";
    else msg = "Keep learning! Check out the timeline and flashcards for more info.";
    
    document.getElementById('score-message').textContent = msg;
    qProgressBar.style.width = '100%';
}

document.getElementById('restart-quiz-btn').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizResults.classList.add('hidden');
    quizSetup.classList.remove('hidden');
});

// 5. Chat Interface Logic
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-chat-btn');
const chatMessages = document.getElementById('chat-messages');
const suggestionChips = document.querySelectorAll('.suggestion-chip');

// Pre-defined knowledge base for the mock AI
const botKnowledge = {
    "register": "To register to vote, you must be 18 years old. You can fill out Form 6 online via the National Voters' Service Portal (NVSP) or the Voter Helpline App.",
    "evm": "EVM stands for Electronic Voting Machine. It consists of a Control Unit and a Ballot Unit. They are highly secure, standalone machines not connected to any network.",
    "mcc": "The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI to regulate political parties and candidates prior to elections to ensure free and fair elections.",
    "voter id": "EPIC (Electors Photo Identity Card) is your Voter ID. You can download an e-EPIC from the NVSP portal if your mobile number is registered.",
    "eligibility": "Any Indian citizen aged 18 years or above as of January 1st of the year of revision of electoral rolls is eligible to vote, unless disqualified by law.",
    "default": "That's an interesting question about elections! The Election Commission of India oversees the entire process. Could you please specify if you're asking about registration, voting, or rules like the MCC?"
};

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    
    const icon = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    msgDiv.innerHTML = `
        <div class="avatar">${icon}</div>
        <div class="bubble">${text}</div>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processChat(message) {
    if (!message.trim()) return;
    
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate typing delay
    setTimeout(() => {
        let response = botKnowledge.default;
        const lowerMsg = message.toLowerCase();
        
        // Simple keyword matching for mock AI
        for (const [key, val] of Object.entries(botKnowledge)) {
            if (lowerMsg.includes(key)) {
                response = val;
                break;
            }
        }
        addMessage(response, 'bot');
    }, 600);
}

sendBtn.addEventListener('click', () => processChat(chatInput.value));
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processChat(chatInput.value);
});

suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
        processChat(chip.textContent);
    });
});
