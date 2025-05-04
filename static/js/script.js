// Health Impact Calculator
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    const calculateBtn = document.getElementById('calculate');
    const cigarettesInput = document.getElementById('cigarettes');
    const yearsInput = document.getElementById('years');
    
    function updateCalculator() {
        const cigarettes = parseInt(cigarettesInput.value) || 0;
        const years = parseInt(yearsInput.value) || 0;
        
        // Calculate impacts
        const lungImpact = Math.min(100, Math.round((cigarettes * years) / 2));
        const heartRisk = Math.min(100, Math.round((cigarettes * years) / 1.5));
        const moneySpent = Math.round((cigarettes * 365 * years * 10) / 20);
        const lifeImpact = Math.min(15, Math.round((cigarettes * years) / 20));
        
        // Update results
        document.getElementById('lungs-result').textContent = `-${lungImpact}% de capacité`;
        document.getElementById('heart-result').textContent = `+${heartRisk}% de risque`;
        document.getElementById('money-result').textContent = `${moneySpent}€ dépensés`;
        document.getElementById('life-result').textContent = `-${lifeImpact} ans d'espérance de vie`;
    }
    
    if (calculateBtn && cigarettesInput && yearsInput) {
        calculateBtn.addEventListener('click', updateCalculator);
        cigarettesInput.addEventListener('input', updateCalculator);
        yearsInput.addEventListener('input', updateCalculator);
        updateCalculator();
    }

    // Dependency Test
    const quizData = [
        {
            question: "Combien de cigarettes fumez-vous par jour ?",
            options: ["0", "1-5", "6-10", "11-20", "Plus de 20"],
            points: [0, 1, 2, 3, 4]
        },
        {
            question: "Fumez-vous dans l'heure qui suit votre réveil ?",
            options: ["Non", "Oui"],
            points: [0, 2]
        },
        {
            question: "Trouvez-vous difficile de ne pas fumer dans les endroits où c'est interdit ?",
            options: ["Non", "Oui"],
            points: [0, 1]
        }
    ];

    const quizContainer = document.getElementById('quiz');
    const submitButton = document.getElementById('submitQuiz');

    function createQuiz() {
        if (!quizContainer) return;
        
        quizData.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            questionDiv.innerHTML = `
                <h4>${question.question}</h4>
                ${question.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${question.points[i]}">
                        ${option}
                    </label>
                `).join('')}
            `;
            quizContainer.appendChild(questionDiv);
        });
    }

    if (submitButton) {
        submitButton.addEventListener('click', () => {
            let totalPoints = 0;
            quizData.forEach((_, index) => {
                const selected = document.querySelector(`input[name="q${index}"]:checked`);
                if (selected) totalPoints += parseInt(selected.value);
            });

            let result;
            if (totalPoints <= 2) result = "Faible dépendance";
            else if (totalPoints <= 4) result = "Dépendance modérée";
            else result = "Forte dépendance";

            alert(`Votre score: ${totalPoints}\nNiveau de dépendance: ${result}`);
        });
    }

    createQuiz();

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            // Save preference
            localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
        });
    }
});
