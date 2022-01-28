window.onload = function() {
    let id = document
        .getElementById("eventbrite-button")
        .getAttribute("eventId");

    var exampleCallback = function() {
        console.log("Order complete!");
    };

    window.EBWidgets.createWidget({
        widgetType: "checkout",
        eventId: id,
        modal: true,
        modalTriggerElementId: "eventbrite-button",
        onOrderComplete: exampleCallback,
    });
};