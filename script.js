// Matrix Animation
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff41";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
// Mobile Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Section Switching
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.chapter-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo(0, 0);
    }

    // Set active button in sidebar
    const activeBtn = Array.from(document.querySelectorAll('.nav-btn')).find(btn => {
        return btn.getAttribute('onclick').includes(`'${sectionId}'`);
    });
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Special handling for quiz
    if (sectionId === 'quiz') {
        loadQuiz();
    }

    // Close sidebar and overlay on mobile after clicking
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
}


// Quiz System
const quizData = [
    {
        question: "1. According to the lecture, what is the fundamental definition of a computer?",
        options: [
            "A communication protocol that routes packets between network hosts.",
            "An electronic device that takes raw data and processes it into meaningful information.",
            "A mechanical system dedicated to storing and retrieving databases.",
            "A software application used to establish wide area networks."
        ],
        correct: 1,
        explanation: "الكمبيوتر في تعريفه الأساسي هو جهاز إلكتروني بياخد البيانات الخام (Raw Data) ويحولها لمعلومات مفيدة تقدر تستخدمها."
    },
    {
        question: "2. Which of the following is classified as a software component rather than a hardware component?",
        options: ["Input Component", "Central Processing Unit", "Random Access Memory", "Device Driver"],
        correct: 3,
        explanation: "الـ Device Driver هو 'برنامج' بياخد أوامره للسوفت وير عشان يشغل الهارد وير، أما الباقي فهي قطع ملموسة."
    },
    {
        question: "3. Within a modern computer system, what is the primary role of the Arithmetic Logic Unit (ALU)?",
        options: [
            "Storing data permanently when power is off.",
            "Providing physical connection for cables.",
            "Displaying processed information visually.",
            "Performing mathematical calculations and logical comparisons."
        ],
        correct: 3,
        explanation: "الـ ALU هي المسؤولة عن كل العمليات الحسابية (Math) والمنطقية (Logic) وهي جزء من الـ CPU."
    },
    {
        question: "4. Which core technology was the hallmark of First Generation computers?",
        options: ["Transistors", "Vacuum Tubes", "Integrated Circuits", "Microprocessors"],
        correct: 1,
        explanation: "الجيل الأول (1940-1956) اشتهر باستخدام 'الأنابيب المفرغة' اللي كانت بتولد حرارة عالية وحجمها ضخم."
    },
    {
        question: "5. The development of Transistors is associated with which generation of computers?",
        options: ["First Generation", "Second Generation", "Third Generation", "Fourth Generation"],
        correct: 1,
        explanation: "الترانزستور كان 'البطل' في الجيل الثاني، وساعد في تصغير حجم الكمبيوتر وزيادة سرعته."
    },
    {
        question: "6. Which characteristic best describes Fifth Generation computers?",
        options: [
            "Shift from relays to Vacuum Tubes.",
            "Introduction of first commercial Microprocessors.",
            "The use of Artificial Intelligence and Bio-chips.",
            "The invention of the Integrated Circuit (IC)."
        ],
        correct: 2,
        explanation: "الجيل الخامس هو الجيل اللي إحنا في بدايته، وبيعتمد على الذكاء الاصطناعي والـ Bio-chips والحوسبة الفائقة."
    },
    {
        question: "7. How does the lecture define a 'Computer Network'?",
        options: [
            "Physical wiring inside a single computer tower.",
            "A collection of interconnected computers and devices.",
            "A specific software program used to block viruses.",
            "A massive hard drive used to back up organizational data."
        ],
        correct: 1,
        explanation: "الشبكة ببساطة هي شوية أجهزة (كمبيوترات، طابعات، موبايلات) متوصلة ببعض عشان يشاركوا البيانات."
    },
    {
        question: "8. Which network component is primarily responsible for logically enforcing security rules?",
        options: ["Hub", "Switch", "Host", "Firewall"],
        correct: 3,
        explanation: "الـ Firewall هو حارس الأمن اللي بيفلتر البيانات ويحمي الشبكة من أي دخول غير مصرح به."
    },
    {
        question: "9. In the context of computer networks, what is a 'Protocol'?",
        options: [
            "A centralized server for IP addresses.",
            "A set of rules governing communication and transmission.",
            "The physical cable linking two computers.",
            "A hardware device used to connect different LANs."
        ],
        correct: 1,
        explanation: "البروتوكول هو 'اللغة' اللي الأجهزة بتمشي عليها عشان تقدر تتفاهم مع بعض وتنقل البيانات صح."
    },
    {
        question: "10. Which type of network covers a single building or localized campus area?",
        options: ["Wide Area Network (WAN)", "Personal Area Network (PAN)", "Local Area Network (LAN)", "Metropolitan Area Network (MAN)"],
        correct: 2,
        explanation: "الـ LAN (أو الشبكة المحلية) هي اللي بتغطي مكان واحد زي بيت، شركة، أو جامعة."
    },
    {
        question: "11. If an organization wants to cover an entire city, which classification fits best?",
        options: ["Local Area Network (LAN)", "Metropolitan Area Network (MAN)", "Wide Area Network (WAN)", "Global Area Network (GAN)"],
        correct: 1,
        explanation: "الـ MAN بتغطي مدينة كاملة (Metropolitan) وبتكون أوسع من الـ LAN وأصغر من الـ WAN."
    },
    {
        question: "12. How is the 'Internet' defined in the lecture materials?",
        options: [
            "An internal, private network for one corporation.",
            "The global network of networks spread all over the world.",
            "A software application for browsing web pages.",
            "A collection of hardware firewalls protecting LANs."
        ],
        correct: 1,
        explanation: "الإنترنت هو الشبكة العالمية اللي رابطة كل الشبكات ببعضها في كل أنحاء الكوكب."
    },
    {
        question: "13. What does the Internet use as the identification address for any node?",
        options: ["IP address", "MAC address", "Email address", "Physical home address"],
        correct: 0,
        explanation: "الـ IP Address هو العنوان الفريد (زي رقم القومي) لكل جهاز داخل على الإنترنت."
    },
    {
        question: "14. The complete communication stack for the Internet is based on which protocol?",
        options: ["SMTP/POP3", "HTTP/HTML", "OSI/ISO", "TCP/IP"],
        correct: 3,
        explanation: "الـ TCP/IP هو البروتوكول الأساسي اللي الإنترنت مبني عليه عشان يضمن وصول البيانات صح لمكانها."
    },
    {
        question: "15. Which of the following is an example of an internet-based service?",
        options: ["Offline data defragmentation", "Remote healthcare", "Motherboard replacement", "Local hardware assembly"],
        correct: 1,
        explanation: "الرعاية الصحية عن بعد (Remote healthcare) بتعتمد كلياً على وجود إنترنت واتصال عالي السرعة."
    },
    {
        question: "16. Which technology is highlighted as an emerging trend alongside Quantum Computing?",
        options: ["Cathode Ray Tubes", "Nanotechnology", "Dial-up Modems", "Magnetic Drums"],
        correct: 1,
        explanation: "الـ Nanotechnology هي المستقبل مع الحوسبة الكمية، وبتهدف لبناء أجهزة متطورة جداً بحجم الذرات."
    },
    {
        question: "17. Turning daily receipts into a profit report is an example of which function?",
        options: [
            "Deploying a physical hardware firewall.",
            "Routing packets across the TCP/IP stack.",
            "Establishing a secure MAN network.",
            "Processing raw data into meaningful information."
        ],
        correct: 3,
        explanation: "دي بالظبط عملية المعالجة الأساسية: أخدت 'بيانات خام' (فواتير) وحولتها لـ 'معلومة مفيدة' (تقرير أرباح)."
    },
    {
        question: "18. Which device connects multiple networks and directs data traffic?",
        options: ["Cable", "Router", "Hub", "Host"],
        correct: 1,
        explanation: "الراوتر (Router) هو الموجه، بيعرف إزاي يربط شبكة بشبكة تانية ويوجه البيانات للطريق الصح."
    },
    {
        question: "19. Services like 'e-Banking' or 'Online Shopping' are made possible by:",
        options: ["Personal Area Network (PAN)", "The Internet", "A standalone CPU", "A localized isolated Intranet"],
        correct: 1,
        explanation: "من غير الإنترنت مش هيكون فيه خدمات بنوك أونلاين ولا شوبينج عالمي."
    },
    {
        question: "20. Which computer hardware component is defined as an Input Component?",
        options: ["Printer", "Speaker", "Monitor", "Keyboard"],
        correct: 3,
        explanation: "الكيبورد بتستخدم لـ 'إدخال' المعلومات للكمبيوتر، عكس الشاشة والسماعات اللي 'بتطلع' معلومات (Output)."
    },
    {
        question: "21. What is the primary purpose of Encryption in cybersecurity?",
        options: [
            "To increase the speed of data transmission.",
            "To convert data into an unreadable format for unauthorized users.",
            "To delete sensitive data after it is read.",
            "To provide physical security for network servers."
        ],
        correct: 1,
        explanation: "التشفير هدفه الأساسي هو حماية البيانات عن طريق تحويلها لشكل غير مفهوم (Ciphertext) محدش يقدر يقرأه غير اللي معاه المفتاح."
    },
    {
        question: "22. In a Caesar Cipher with a Key of 3, what is the encrypted form of the letter 'C'?",
        options: ["E", "F", "D", "G"],
        correct: 1,
        explanation: "بما إن المفتاح 3، بنحرك الحرف 3 خطوات: C -> D -> E -> F. يبقى الناتج F."
    },
    {
        question: "23. Which type of cipher rearranges the order of characters rather than changing the characters themselves?",
        options: ["Substitution Cipher", "Caesar Cipher", "Transposition Cipher", "Quantum Cipher"],
        correct: 2,
        explanation: "الـ Transposition Cipher (زي الـ Columnar) مش بيغير الحروف، لكن بيلغبط ترتيبها بس."
    },
    {
        question: "24. A 'Brute Force Attack' on a Caesar Cipher involves:",
        options: [
            "Intercepting the physical network cable.",
            "Trying all 26 possible key combinations.",
            "Using a supercomputer to crack quantum keys.",
            "Guessing the user's login password."
        ],
        correct: 1,
        explanation: "الـ Brute Force يعني تجربة كل الاحتمالات. وفي قيصر الاحتمالات هي 26 مفتاح بس، فسهل جداً تجربهم كلهم."
    },
    {
        question: "25. In Columnar Transposition, what do you do if the message doesn't perfectly fill the grid?",
        options: [
            "Leave the remaining cells empty.",
            "Delete the extra cells.",
            "Fill the empty cells with dummy characters like 'x'.",
            "Restart the encryption with a smaller key."
        ],
        correct: 2,
        explanation: "لو الجدول مكملش للاخر، بنحط حروف وهمية (Null characters) زي الـ 'x' عشان نكمل شكل الجدول ونقدر نقرأ الأعمدة صح."
    },
    {
        question: "26. What is the mathematical formula for Caesar Cipher encryption?",
        options: [
            "Cipher = (Plain - Key) % 26",
            "Cipher = (Plain + Key) % 26",
            "Cipher = (Plain * Key) / 26",
            "Cipher = (Plain + Key) % 10"
        ],
        correct: 1,
        explanation: "المعادلة هي (Plain + Key) % 26. الـ % 26 وظيفتها ترجعنا لبداية الأبجدية لو الرقم طلع أكبر من 25."
    }
];

let score = 0;
let answeredCount = 0;

function updateProgress() {
    const progress = (answeredCount / quizData.length) * 100;
    document.getElementById('quiz-progress').style.width = `${progress}%`;
    document.getElementById('progress-text').innerText = `Progress: ${Math.round(progress)}%`;
}

function showXP(amount) {
    const container = document.getElementById('xp-container');
    const xp = document.createElement('div');
    xp.className = 'xp-popup xp-animate';
    xp.innerText = `+${amount} XP`;
    container.appendChild(xp);

    setTimeout(() => {
        xp.remove();
    }, 1000);
}

function loadQuiz() {
    const quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = '';
    score = 0;
    answeredCount = 0;
    updateProgress(); // Initialize progress bar

    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${item.question}</p>`;

        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'options-grid';

        item.options.forEach((option, oIndex) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = option;
            btn.onclick = () => checkAnswer(btn, index, oIndex);
            optionsGrid.appendChild(btn);
        });

        const explanation = document.createElement('div');
        explanation.className = 'explanation-box';
        explanation.id = `exp-${index}`;
        explanation.innerHTML = `<strong>💡 ليه دي الإجابة؟</strong> ${item.explanation}`;

        questionDiv.appendChild(optionsGrid);
        questionDiv.appendChild(explanation);
        quizContent.appendChild(questionDiv);
    });
}

function checkAnswer(btn, qIndex, selectedIndex) {
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll('.option-btn');
    const explanation = document.getElementById(`exp-${qIndex}`);

    // Disable all buttons in this question
    buttons.forEach(b => b.disabled = true);

    if (selectedIndex === quizData[qIndex].correct) {
        btn.classList.add('correct');
        score++;
        showXP(10);
    } else {
        btn.classList.add('wrong');
        buttons[quizData[qIndex].correct].classList.add('correct');
    }

    // Show explanation
    explanation.classList.add('show');

    answeredCount++;
    updateProgress();

    if (answeredCount === quizData.length) {
        const resultDiv = document.getElementById('quiz-result');
        const xpEarned = score * 10;
        resultDiv.innerHTML = `
            <h3>Mission Accomplished! 🛡️</h3>
            <p style="font-size: 2rem; color: var(--neon-green); margin: 10px 0;">+${xpEarned} XP Total</p>
            <p>سكورك النهائي: ${score} من ${quizData.length}</p>
            <p>${score >= 15 ? 'عاش يا وحش السايبر! مستواك ممتاز.' : 'محتاج تراجع الشابتر تاني وتركز في المصطلحات.'}</p>
            <button class="nav-btn" onclick="showSection('ch1')" style="width: auto; margin-top: 15px; background: var(--accent-blue); color: white;">مراجعة الشابتر</button>
        `;
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

