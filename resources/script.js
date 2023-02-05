let result = [];
let result_history;
let n = 'd6';
let die_rolled = false;
let i = 0;
$('#roll').click(function() {
    result = [];
    n = $('#n').val().split('d');
    let die = n[0]; let sides = n[1];
    $('#dice-container').empty();
    if (!sides) {
        alert('Please enter a number of sides.');
    } else {
        if (!die) {
            die = 1;
        };
        if (die < 5) {
            let die_col = 100 / die;
            $('.fixed-top').css(`grid-template-columns`, `repeat(auto-fill, ${die_col}%)`);
        }
            else {
            $('.fixed-top').css('grid-template-columns', 'repeat(auto-fill, 25%)'); 
        }
        rollDice(die, sides);
    }
});

rollDice = (die, sides) => {
    $('#roll').css('display', 'none');
    for (i = 0; i < die; i++) {
        let die_code = `
        <div class="dice" id="die-number-${i}">
        <div class="dot side1" id="die-side-${i}">1</div>
        <div class="dot side2">2</div>
        <div class="dot side3">3</div>
        <div class="dot side4">4</div>
        <div class="dot side5">5</div>
        <div class="dot side6">6</div>
        </div>
    `;
        $('#dice-container').append(die_code);
    };
    for (i = 0; i < die; i++) {
        result.push(Math.floor(Math.random() * sides) + 1);
        };
        results_store.push(result.join(', '));
    $('.dice').each(function() {
        sides = $('#n').val();
        for (i = 0; i < die; i++) {
            $(this).find(`#die-side-${i}`).html(result[i]);
            $(`#die-number-${i}`).css('animation', 'spin ease-out infinite 1s, mtop ease-out infinite 1s');
        $(this).css('display', 'block');
        };
        // after 1s, stop the animation.
        setTimeout(function() {
            $('.dice').css('animation', 'none');
            $('#roll').css('display', 'block');
        }
        , 900);
        
    });
    add_to_history();
    };

// Prints results to the table.
let results_store = [];

// Adds to result history.
const add_to_history = () => {
$('#results-table').append(`<tr>
<td>Roll ${results_store.length}: </td>
<td>[${results_store.slice(-1)}]</td>`);
};

// Download results.

const downloadFile = () => {
    let data_results = []; 
    for (i = 0; i < results_store.length; i++) {
    data_results.push('Roll ' + (i + 1) + ':;' +  results_store[i].toString().replaceAll(',',';') + '\n');
    };
    data_results = data_results.toString().replaceAll(',','');
    data_results = data_results.replaceAll(';',',');
    console.log(data_results);
    let csvContent = "data:text/csv;charset=utf-8," + data_results;
    let encodedUri = encodeURI(csvContent);
    console.log(`CSV: ` + csvContent)
   window.open(encodedUri);
};