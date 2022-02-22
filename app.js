let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'
];

let index = 0;
let currentSentence = sentences[index];
let letterIndex = 0;
let currentLetter = currentSentence.substring(letterIndex, letterIndex + 1);
let timerOn = false;
let startDate;
let startTime;
let highlight = $('#yellow-block');
let numberOfMistakes = 0;



$("#keyboard-upper-container").hide();

$(document).keydown(function (event) {
    if (event.which === 16) {
        $("#keyboard-upper-container").show();
        $("#keyboard-lower-container").hide();
    }
})

$(document).keyup(function (event) {
    if (event.which === 16) {
        $("#keyboard-upper-container").hide();
        $("#keyboard-lower-container").show();
    }
})

$(document).keypress(function (event) {
    let key = $("#" + event.which);
    $(key).css("background-color", "yellow");
    $(document).keyup(function (event) {
        $(key).css("background-color", "#f5f5f5");
    });

});

$('#sentence').text(currentSentence);



$('#target-letter').text(currentLetter);

$(document).keypress(function (event) {
    if (timerOn === false) {
        startDate = new Date();
        startTime = startDate.getTime();
        timerOn = true;
    }


    if (event.which === sentences[index].charCodeAt(letterIndex)) {
        let correct = $('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');

        $('#feedback').append(correct);

        $(highlight).css('left', '+=18px');

        letterIndex++;



        currentLetter = currentSentence.substring(letterIndex, letterIndex + 1);


        $('#target-letter').text(currentLetter);




        if (letterIndex === currentSentence.length) {
            index++

            if (index === sentences.length) {
                let endDate = new Date();
                let endTime = endDate.getTime();
                let mins = (endTime - startTime) / 60000;

                let numberOfWords = 54;

                let wpm = Math.round(numberOfWords / mins - 2 * numberOfMistakes);

                let results = confirm(`You typed ${wpm} words per minute, would you like to try again?`);

                if (results == true) {
                    location.reload();
                }

            } else {
                currentSentence = sentences[index];

                $('#sentence').text(currentSentence);

                letterIndex = 0;

                currentLetter = currentSentence.substring(letterIndex, letterIndex + 1);

                $('#target-letter').text(currentLetter);

                $(highlight).css('left', '15px');

                $('#feedback').text("");
            }
        }
    } else {
        let incorrect = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');

        $('#feedback').append(incorrect);

        numberOfMistakes++;
    }


})

