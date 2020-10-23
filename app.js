////////////////////////////
// Table Order Controller //
////////////////////////////

const TableOrderCtrl = (function() {

  // TODO remove hard coded names
  const names = ["Dorian", "Tai", "Falgar", "Sullivan", "Xander"];

  return {
    getNames: function() {
      return names;
    }
  }

})();

////////////////////
// UI Controller //
///////////////////

const UICtrl = (function() {

  return {
    displayTableOrder: function() {
      const names = TableOrderCtrl.getNames();
      names.forEach(function(name) {
        const li = document.createElement("li");
        li.className = "list-group-item list-group-item-secondary";
        li.innerHTML = name;
        document.querySelector('#table-order-list').insertAdjacentElement('beforeend', li);
      });
    }
  }

})();

////////////////////
// App Controller //
////////////////////

const App = (function() {

  return {
    init: function() {
      UICtrl.displayTableOrder();
    }
  }

})();


App.init();