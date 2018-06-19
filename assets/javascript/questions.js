var questions = random([
    {
        question: "Whats the largest living organism?",
        correctAnswer: "Giant Fungus",
        distractors: random(["Giant Fungus", "Blue Whale", "Redwood", "Elephant"]),
    },
    {
        question: "Whats the most common element in the human body?",
        correctAnswer: "Oxygen",
        distractors: random(["Oxygen", "Hydrogen", "Carbon", "Nitrogen"]),
    },
    {
        question: "Which of these do sharks not have?",
        correctAnswer: "Bones",
        distractors: random(["Bones", "Gills", "Heart", "Liver"]),
    },
    {
        question: "What human organ cleans 50 gallons of blood a day?",
        correctAnswer: "Kidneys",
        distractors: random(["Kidneys", "Liver", "Heart", "Pancreas"]),
    },
    {
        question: "Which of the following has more bones?",
        correctAnswer: "Baby",
        distractors: random(["Baby", "Adult", "Teenager", "All are the same"]),
    },
]);

function random(array) { 
    let counter = array.length;
   
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}