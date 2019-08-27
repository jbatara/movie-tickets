//global variable to act as our "database" that keeps track of tickets into a shopping cart
var shoppingCart = new Cart();

// FRONT END
$(document).ready(function() {

  $(".movieForm").submit(function(event) {
    event.preventDefault();
    var movieName = $("select.movieName").val();
    console.log(movieName);
    var movieTime = $("select.movieTime").val();
    var viewerAge = $("input#viewerAge").val();
    //this utilizes the TicketBreakdown constructor to create a Ticket Breakdown object from the user input
    var userTicket = new TicketBreakdown(movieName, movieTime, viewerAge);
    //This utilizes the addTicket method that we defined below to add the ticket to the global shopping cart (it pushes to the array under the hood)
    shoppingCart.addTicket(userTicket);
    console.log(shoppingCart);
  });

});




// BACK END
function Cart() {
  this.tickets = [];
  this.total = 0;
}

function TicketBreakdown(movieName, movieTime, viewerAge) {
  this.movieName = movieName;
  this.movieTime = movieTime;
  this.viewerAge = viewerAge;
  //every time a ticket is created, the price is automatically calculated with our method calcPrice defined below.
  this.ticketPrice = this.calcPrice();
}

Cart.prototype.addTicket = function(ticket) {
  this.tickets.push(ticket);
}

//This method calculates the price by decsending order of importance: age is cheapest, followed by any time before 5, followed by regular price ticket
TicketBreakdown.prototype.calcPrice = function() {
  if (this.viewerAge >= 65) {
    return 5;
  } else if (parseInt(this.movieTime) < 17) {
    return 7;
  } else {
    return 12;
  }
}
