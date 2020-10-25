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


  let min = localStorage.getItem("min");
  let max = localStorage.getItem("max");

  console.log(min, max);
  
  
  return {
    getMin: function() {
      return min;
    },
    getMax: function() {
      return max;
    },
    setMinAndMax: function(newMin, newMax) {
      min = newMin;
      max = newMax;
      localStorage.setItem("min", min);
      localStorage.setItem("max", max);
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
    minMaxBtn: "#max-min-btn",
    min: "#number-low",
    max: "#number-high"
  };

  showGuessError = function(message) {
    const error = document.querySelector(uiSelectors.guessError);
    error.innerHTML = message;
    error.style.display = "block";

    setTimeout(() => {
      error.style.display = "none";
    }, 3000);
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

      const guessBtn = document.querySelector(uiSelectors.guessBtn);
      const minMaxText = document.querySelector(uiSelectors.minMaxText);

      const min = NumberGuesserCtrl.getMin();
      const max = NumberGuesserCtrl.getMax();

      if (!min || !max) {
        minMaxText.innerHTML = '';
        console.log(guessBtn);
        guessBtn.style.display = 'none';
      } else {
        minMaxText.innerHTML = `Please select a number between <strong>${min}</strong> and <strong>${max}</strong>`
        guessBtn.style.display = 'block';
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

      if (names.length < 2) {
        guessBtn.style.display = 'none';
      }
    },
    getMemberInput: function() {
      return document.querySelector(UICtrl.getUISelectors().addMember).value;
    },
    getMinAndMaxInput: function() {
      const min = document.querySelector(UICtrl.getUISelectors().min).value;
      const max = document.querySelector(UICtrl.getUISelectors().max).value;

      if (min === '' || max === '') {
        showGuessError("Please enter a min and a max");
      } else {
        return {
          min: min,
          max: max
        }
      }
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
    document.querySelector(UICtrl.getUISelectors().minMaxBtn).addEventListener("click", selectMinAndMax);

  }

  const selectMinAndMax = function() {
    const minAndMax = UICtrl.getMinAndMaxInput();

    if (minAndMax != undefined) {
      const min = minAndMax.min;
      const max = minAndMax.max;
      NumberGuesserCtrl.setMinAndMax(min, max);
      UICtrl.displayNumberGuesser();
    }
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