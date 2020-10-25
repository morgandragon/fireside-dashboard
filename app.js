////////////////////////////
// Table Order Controller //
////////////////////////////

const TableOrderCtrl = (function() {

  const getNameData = function() {
    if (localStorage.getItem('table-order-names') === null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('table-order-names'));
    }
  }

  const updateLocalStorage = function() {
    localStorage.setItem("table-order-names", JSON.stringify(names));
  }

  let names = getNameData();

  return {
    getNames: function() {
      return names;
    },
    randomizeNames() {
      for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
      }
      updateLocalStorage();
    }, 
    removeName(name) {
      const index = names.indexOf(name);
      if (index >= 0) {
        names.splice(index, 1);
      }
      updateLocalStorage();
    },
    addMember(name) {
      names = getNameData();
      names.push(name);
      updateLocalStorage();
    }
  }

})();

///////////////////////////////
// Number Guesser Controller //
///////////////////////////////

const NumberGuesserCtrl = (function() {


  let min;
  let max;

  console.log(`${min}, ${max}`)
  
  
  return {
    getMin: function() {
      return min;
    },
    getMax: function() {
      return max;
    }
  }

})();

////////////////////
// UI Controller //
///////////////////

const UICtrl = (function() {

  const uiSelectors = {
    randomizeBtn : "#randomize-button",
    tableOrderList : "#table-order-list",
    addMemberBtn : "#add-member-button",
    addMember: "#add-member",
    minMaxText: "#min-and-max-text",
    guessSuccess: "#guess-success",
    guessError: "#guess-error",
    numberGuesserList: "#number-guess-list",
    guessBtn: "#guess-btn",
  };

  return {
    displayTableOrder: function() {
      document.querySelector(uiSelectors.addMember).value = '';
      const tableOrderList = document.querySelector(uiSelectors.tableOrderList);
      tableOrderList.innerHTML = '';

      const names = TableOrderCtrl.getNames();
      names.forEach(function(name) {
        const li = document.createElement("li");
        li.className = "list-group-item list-group-item-secondary d-flex justify-content-between align-items-center";
        li.innerHTML = `${name} <a class = "btn btn-secondary btn-sm" id="remove-${name}" href="#">remove</i></a>`;
        document.querySelector(uiSelectors.tableOrderList).insertAdjacentElement('beforeend', li);
      });

      const randomizeBtn = document.querySelector(uiSelectors.randomizeBtn);
      if (names.length < 2) {
        randomizeBtn.style.display = 'none';
      } else {
        randomizeBtn.style.display = 'block';
      }

    },
    displayNumberGuesser: function() {

      if (NumberGuesserCtrl.getMin() === undefined || NumberGuesserCtrl.getMax() === undefined) {
        document.querySelector(uiSelectors.minMaxText).innerHTML = '';
      }

      document.querySelector(uiSelectors.guessSuccess).style.display = 'none';
      document.querySelector(uiSelectors.guessError).style.display = 'none';

      const numberGuesserList = document.querySelector(uiSelectors.numberGuesserList);
      numberGuesserList.innerHTML = '';

      const names = TableOrderCtrl.getNames();

      names.forEach(function(name) {

        const li = document.createElement("li");
        li.className = "list-group-item list-group-item-secondary d-flex justify-content-between align-items-center";
        li.innerHTML = `
          ${name}
          <input type="number" class="form-control" id="guess-${name}" placeholder="Guess" style="width:35%">
        `;
        numberGuesserList.insertAdjacentElement('beforeend', li);

      });

      const guessBtn = document.querySelector(uiSelectors.guessBtn);
      if (names.length < 2) {
        guessBtn.style.display = 'none';
      } else {
        guessBtn.style.display = 'block';
      }
    },
    getMemberInput: function() {
      return document.querySelector(UICtrl.getUISelectors().addMember).value;
    },
    getReaderInput: function() {
      return document.querySelector(UICtrl.getUISelectors().addReader).value;
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
    document.querySelector(UICtrl.getUISelectors().addMemberBtn).addEventListener("click", addMember);

  }

  const randomizeTableOrder = function() {
    TableOrderCtrl.randomizeNames();
    UICtrl.displayTableOrder();
    UICtrl.displayNumberGuesser();
  }

  const removeUser = function(e) {
    if (e.target.id.includes('remove')) {
      const removeArr = e.target.id.split('-');
      const name = removeArr[1];
      TableOrderCtrl.removeName(name);
      UICtrl.displayTableOrder();
      UICtrl.displayNumberGuesser();
    }
  }

  const addMember = function(e) {
    e.preventDefault();
    const member = UICtrl.getMemberInput();
    TableOrderCtrl.addMember(member);
    UICtrl.displayTableOrder();
    UICtrl.displayNumberGuesser();
  }

  return {
    init: function() {
      UICtrl.displayTableOrder();
      UICtrl.displayNumberGuesser();
      loadEventListeners();
    }
  }

})();


App.init();