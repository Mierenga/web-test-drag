
$(init);
function init() {
    $('.drag').draggable();
    $('.drop').droppable({
        drop: function () {
            $(".drag").draggable("option", "containment", ".drop");
        }
    });
}
