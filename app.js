////////////////////////////
// Table Order Controller //
////////////////////////////

const TableOrderCtrl = (function() {

  // TODO remove hard coded names
  const names = ["Dorian", "Tai", "Falgar", "Sullivan", "Xander"];

  return {
    getNames: function() {
      return names;
    },
    randomizeNames() {
      for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
      }
    }
  }

})();

////////////////////
// UI Controller //
///////////////////

const UICtrl = (function() {

  const uiSelectors = {
    randomizeBtn : "#randomize-button",
    tableOrderList : "#table-order-list"
  };

  return {
    displayTableOrder: function() {
      const tableOrderList = document.querySelector(uiSelectors.tableOrderList);
      tableOrderList.innerHTML = '';
      
      const names = TableOrderCtrl.getNames();
      names.forEach(function(name) {
        const li = document.createElement("li");
        li.className = "list-group-item list-group-item-secondary";
        li.innerHTML = name;
        document.querySelector(uiSelectors.tableOrderList).insertAdjacentElement('beforeend', li);
      });
    },
    getUISelectors: function() {
      return uiSelectors;
    }
  }

})();

////////////////////
// App Controller //
////////////////////

const App = (function() {

  // load event listeners
  const loadEventListeners = function() {

    document.querySelector(UICtrl.getUISelectors().randomizeBtn).addEventListener("click", randomizeTableOrder);

  }

  const randomizeTableOrder = function() {
    TableOrderCtrl.randomizeNames();
    UICtrl.displayTableOrder();
  }

  return {
    init: function() {
      loadEventListeners();
      UICtrl.displayTableOrder();
    }
  }

})();


App.init();