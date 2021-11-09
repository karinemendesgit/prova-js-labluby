(function(window, document) {
  'use strict';

  function app() {
    return {
      init: function() {
        this.selectBet()
      },

      selectBet: function() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', './games.json');
        ajax.send();
        ajax.addEventListener('readystatechange', this.getBetRule)
      },

      getBetRule: function() {
        if(this.status === 200 && this.readyState === 4) {
          let data = JSON.parse(this.responseText);
          app.firstActionsState(data.types);
        }
      },

      firstActionsState: function (dataGame) {
        const selectBetType = document.querySelector('.bet-types');
        const btnClear = document.querySelector('[data-js="clear-game"]');
        const btnRandom = document.querySelector('[data-js="random-game"]');
        const btnAdd = document.querySelector('[data-js="add-game"]');
        this.cartInitialLayout();
        app.selectBet(dataGame, selectBetType)
        btnClear.addEventListener('click', this.clearBet);
        btnRandom.addEventListener('click', this.randomGame);
        btnAdd.addEventListener('click', this.setNumbersInCart);
      },

      cartInitialLayout: function() {
        let $itemsCart = document.querySelector('[data-js="game-list"]');
        let 
      },

      selectBet: function name(dataGame, selectBetType) {
        dataGame.map(function (item, index) {
          let selectNumbers = [];
          let $button
        })
      },      

      clearBet: function () {

      },

      isReady: function() {
        return this.readyState === 4 && this.status === 200;
      }
    }
}  

app().init();

})(window, document);