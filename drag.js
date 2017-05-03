

var tatCount = 0;

var tats = {
    spring_tat: 0,
    summer_tat: 0,
    fall_tat: 0,
    winter_tat: 0,
    urban_tat: 0,
    fruit_tat: 0
};

$(init);

function incrementTotal(num) {
    if (!num) {
        num = 1
    }
    $('#tats-added').text(tatCount+=num);
    $('#total-cost').text(tatCount * 6 + ".00");
}

function decrementTotal(num) {
    if (!num) {
        num = 1
    }
    $('#tats-added').text(tatCount-=num);
    $('#total-cost').text(tatCount * 6 + ".00");
}

function init() {

    var tatFoot = $("<div>")
        .addClass('tat-foot')
        .hide();

    // add a minus button
    $("<button>")
        .text("-")
        .addClass("minus-btn")
        .addClass("plus-minus-btn")
        .appendTo(tatFoot)
        .click(function() {
            var tatName = $(this).closest('.tat').attr('id');
            console.log(tatName);
            if (tats[tatName] > 1) {
                decrementTotal();
                tats[tatName] -= 1;
                $(this).siblings('.tat-count-text').text(tats[tatName]);
            } else if (tats[tatName] == 1) {
                decrementTotal();
                tats[tatName] -= 1;
                $(this).closest('.tat').appendTo('#unchosen-tats');
                $(this).parent().hide(600);
            }
        });

    // add the count text
    $("<span>")
        .text("0")
        .addClass("tat-count-text")
        .appendTo(tatFoot);


    // add a plus button
    $("<button>")
        .text("+")
        .addClass("plus-btn")
        .addClass("plus-minus-btn")
        .appendTo(tatFoot)
        .click(function() {
            incrementTotal();
            var tatName = $(this).closest('.tat').attr('id');
            console.log(tatName);
            tats[tatName] += 1;
            console.log(tats[tatName]);
            $(this).siblings('.tat-count-text').text(tats[tatName]);
        });

    // append to all tat class items
    $(".tat").append(tatFoot);

    $( "#unchosen-tats").sortable({
        connectWith: ".connectedSortable",
        receive: function(event, ui) {
            var tatName = ui.item.attr('id');
            removed = tats[tatName];
            decrementTotal(removed);
            tats[tatName] = 0;
            ui.item.children('.tat-foot').hide(500);
        }
    }).disableSelection();

    $( "#chosen-tats").sortable({
        connectWith: ".connectedSortable",
        receive: function(event, ui) {
            incrementTotal();
            var tatName = ui.item.attr('id');
            tats[tatName] = 1;
            ui.item.children().children('.tat-count-text').text(tats[tatName]);
            ui.item.children('.tat-foot').show(200);
        },
        out: function(event, ui) {

        }

    }).disableSelection();
}

function resizeContainer(tag) {
    let MINIMUM_HEIGHT = 400;

    var length = $(tag + " .tat").length;
    console.log(length);
    var newHeight = length * 116 / 2;
    console.log(newHeight);
    newHeight = (newHeight < MINIMUM_HEIGHT)?(MINIMUM_HEIGHT):(newHeight);
    $(tag).height(newHeight);
}



