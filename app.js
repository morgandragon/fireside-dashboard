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
    }, removeName(name) {
      console.log(`removing ${name}`)
      const index = names.indexOf(name);
      if (index >= 0) {
        names.splice(index, 1);
      }
      console.log(names);
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
        li.className = "list-group-item list-group-item-secondary d-flex justify-content-between align-items-center";
        li.innerHTML = `${name} <a class = "btn btn-secondary btn-sm" id="remove-${name}" href="#">remove</i></a>`;
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
    document.querySelector(UICtrl.getUISelectors().tableOrderList).addEventListener("click", removeUser);

  }

  const randomizeTableOrder = function() {
    TableOrderCtrl.randomizeNames();
    UICtrl.displayTableOrder();
  }

  const removeUser = function(e) {

    console.log(e.target);

    console.log(e.target.id);

    if (e.target.id.includes('remove')) {
      const removeArr = e.target.id.split('-');
      const name = removeArr[1];
      TableOrderCtrl.removeName(name);
      UICtrl.displayTableOrder();
      console.log(name);
    }
  }

  return {
    init: function() {
      UICtrl.displayTableOrder();
      loadEventListeners();
    }
  }

})();


App.init();