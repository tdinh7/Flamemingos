$(document).ready(function () {

    loadAllDataFromCSV();
    var counter = 0;
    var totalQuestions = 0;
    var totalCorrectAnswer = 0;
    var time = '';
    var allDataFromCSV = null;
    var currentDataIndex = 0;
    var startEndBtnText = 'Start Game';
    $('#gameDiv').hide();

    $('#spnFirstWord').hide();
    $('#spnSecondWord').hide();
    $('#spnThirdWord').hide();
    $('#spnFourthWord').hide();

    $('#btnStartAndEnd').text(startEndBtnText);

    setInterval(function () {
        counter++;
        time = counter + " seconds";
        if (counter > 59) {
            var minutes = counter / 60;
            minutes = Math.trunc(minutes);
            var seconds = counter % 60;
            time = minutes + " minutes " + seconds + " seconds";
        }
        $('#counter').text(time);
        if (counter >= 1200) { // 20 minutes to complete the game
            showGrade();
        }
    }, 1000);

    $('#btnStartAndEnd').on('click', function () {

        counter = 0;
        $('#counter').show();
        $('#tdTotalQuestions').text(totalQuestions);
        $('#grade').text('');
        var btnText = $('#btnStartAndEnd').text();
        if (btnText == startEndBtnText) {

            alert('solve all riddles within 20 minutes');
            
            var btnText = $('#btnStartAndEnd').text('Give Up');
            $('#gameDiv').show();

            $('.clsAnswer').val('');
            $('#txtFinalAnswer').val('');
            
            $('#tdRiddle').text(allDataFromCSV[currentDataIndex].Riddle);
            $('#tdJumbleWord1').text(shuffle(allDataFromCSV[currentDataIndex].JumbleWord1.Item1));
            $('#tdJumbleWord2').text(shuffle(allDataFromCSV[currentDataIndex].JumbleWord2.Item1));
            $('#tdJumbleWord3').text(shuffle(allDataFromCSV[currentDataIndex].JumbleWord3.Item1));
            $('#tdJumbleWord4').text(shuffle(allDataFromCSV[currentDataIndex].JumbleWord4.Item1));
        }
        else {
           // $('#gameDiv').hide();
            var btnText = $('#btnStartAndEnd').text(startEndBtnText);
             alert('You are failed');
             $("#txtFirstWord").val(allDataFromCSV[currentDataIndex].JumbleWord1.Item1);
             $("#txtSecondWord").val(allDataFromCSV[currentDataIndex].JumbleWord2.Item1);
             $("#txtThirdWord").val(allDataFromCSV[currentDataIndex].JumbleWord3.Item1);
             $("#txtFourthWord").val(allDataFromCSV[currentDataIndex].JumbleWord4.Item1);
             $("#txtFinalAnswer").val(allDataFromCSV[currentDataIndex].Answer);
             currentDataIndex = 0;
             counter = 0;
             totalCorrectAnswer = 0;
             $('#counter').hide();
             $('#tdTotalCorrectAnswers').text(totalCorrectAnswer);
             $('#totalTimeTaken').text('');
            

           
            
            
           
           // $('#txtFirstWord').text(allDataFromCSV[currentDataIndex].JumbleWord1);

        }
        
    });

    $('#btnCheck').on('click', function () {
        var firstAnswer = $('#txtFirstWord').val();
        var secondAnswer = $('#txtSecondWord').val();
        var thirdAnswer = $('#txtThirdWord').val();
        var fourthAnswer = $('#txtFourthWord').val();
        if (firstAnswer == '' || secondAnswer == '' || thirdAnswer == '' || fourthAnswer == '') {
            alert('please solve all the riddles first.');
            return false;
        }
        if ($('#txtFinalAnswer').val().toLocaleLowerCase().trim() == allDataFromCSV[currentDataIndex].Answer.toLocaleLowerCase()) {
            alert('Congratulation ! Your answer is correct.');
            totalCorrectAnswer++;
            currentDataIndex++;
            $('#tdRiddle').text(allDataFromCSV[currentDataIndex].Riddle);
            $('#tdJumbleWord1').text(shuffle(allDataFromCSV[currentDataIndex].JumbleWord1.Item1));
            $('#tdJumbleWord2').text(shuffle(allDataFromCSV[currentDataIndex].JumbleWord2.Item1));
            $('#tdJumbleWord3').text(shuffle(allDataFromCSV[currentDataIndex].JumbleWord3.Item1));
            $('#tdJumbleWord4').text(shuffle(allDataFromCSV[currentDataIndex].JumbleWord4.Item1));

            $('#spnFirstWord').hide();
            $('#spnSecondWord').hide();
            $('#spnThirdWord').hide();
            $('#spnFourthWord').hide();

            $('.clsAnswer').val('');
            $('#txtFinalAnswer').val('');

            //$('.clsAnswer').prop('readonly', 'false');
            $('.clsAnswer').removeAttr('readonly');

            $('.clsHint').text('');

            

            $('#tdTotalCorrectAnswers').text(totalCorrectAnswer);

            $('#totalTimeTaken').text(time);
            showGrade();
            


            if (allDataFromCSV.length == currentDataIndex) {
                
                showGrade();
            }
        }
        else {
            alert('Your answer is incorrect! Please try again');
        }
    });

    $(document).on('click', 'table tbody tr td span', function () {
        var firstTD = $(this).parentsUntil('tbody').find('td')[0];
        console.log(firstTD.innerHTML);
        $(this).parentsUntil('tbody').find('td')[0].innerHTML = shuffle(firstTD.innerHTML);
    });
   
    $('#txtFirstWord').on('change', function () {
        if (allDataFromCSV[currentDataIndex].JumbleWord1.Item1.toLocaleLowerCase() == $('#txtFirstWord').val().toLocaleLowerCase()) {
            $('#tdHint1').text('Hint : '+ allDataFromCSV[currentDataIndex].JumbleWord1.Item2);
            $('#spnFirstWord').show();
            $('#txtFirstWord').attr('readonly', 'true');
        }
    });
    $('#txtSecondWord').on('change', function () {
        if (allDataFromCSV[currentDataIndex].JumbleWord2.Item1.toLocaleLowerCase() == $('#txtSecondWord').val().toLocaleLowerCase()) {
            $('#tdHint2').text('Hint : ' + allDataFromCSV[currentDataIndex].JumbleWord2.Item2);
            $('#spnSecondWord').show();
            $('#txtSecondWord').attr('readonly', 'true');
        }
    });
    $('#txtThirdWord').on('change', function () {
        if (allDataFromCSV[currentDataIndex].JumbleWord3.Item1.toLocaleLowerCase() == $('#txtThirdWord').val().toLocaleLowerCase()) {
            $('#tdHint3').text('Hint : ' + allDataFromCSV[currentDataIndex].JumbleWord3.Item2);
            $('#spnThirdWord').show();
            $('#txtThirdWord').attr('readonly', 'true');
        }
    });
    $('#txtFourthWord').on('change', function () {
        if (allDataFromCSV[currentDataIndex].JumbleWord4.Item1.toLocaleLowerCase() == $('#txtFourthWord').val().toLocaleLowerCase()) {
            $('#tdHint4').text('Hint : ' + allDataFromCSV[currentDataIndex].JumbleWord4.Item2);
            $('#spnFourthWord').show();
            $('#txtFourthWord').attr('readonly', 'true');
        }
    });

    function loadAllDataFromCSV() {
        $.post("/Home/GetAllDataFromCsvFile", function (data) {
            allDataFromCSV = data;
           // console.log(allDataFromCSV[0]);
            totalQuestions = data.length;
        });
    }
    function showGrade() {
        $('#counter').hide();
        var grade = (totalCorrectAnswer * 100) / allDataFromCSV.length;
        $('#grade').text(grade + "%");

        // logic to display grade
        //...........................
    }
    function shuffle(str) {
        a = [];
        for (var k = 0; k < str.length; k++) {
            a.push(str.charAt(k));
        }
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }

        var result = "";
        for (var l = 0; l < a.length; l++) {
            result += a[l];
        }

        return result;

    };
});