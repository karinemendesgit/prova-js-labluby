(function(window, document) {
  'use strict';

  function app() {
    let selectNumbers = [];
    let total = 0;
    return {
      init: function() {
        initEvents();
      },

      initEvents: function() {
        this.selectDataBase();
      },

      selectDataBase: function() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', './games.json');
        ajax.send();
        ajax.addEventListener('readystatechange', function() {
          if(ajax.status === 200 && ajax.readyState === 4) {
            let data = JSON.parse(ajax.responseText);
            app().firstActionsState(data.types);
          }
        });
      },

      firstActionsState: function (dataGame) {
        const selectBetType = document.querySelector('.bet-types');
        const btnClear = document.querySelector('[data-js="clear-game"]');
        const btnRandom = document.querySelector('[data-js="random-game"]');
        const btnAdd = document.querySelector('[data-js="add-game"]');
        this.emptyCart();
        app().selectBet(dataGame, selectBetType)
        btnClear.addEventListener('click', this.clearBet);
        btnRandom.addEventListener('click', this.randomGame);
        btnAdd.addEventListener('click', this.setNumbersInCart);
      },

      emptyCart: function() {
        let $itemsCart = document.querySelector('.item');
        let paragInCart = document.createElement('p');
        paragInCart.innerHTML= 'Carrinho Vazio';
        $itemsCart.appendChild(paragInCart);
      },

      selectBet: function name(dataGame, selectBetType) {
        dataGame.map(function (item, index) {
          selectNumbers = [];
          let $button = document.querySelector('.bet-types');
          $button.setAttribute('selected', false);
          app().buttonClassBetStyle($button.style, item.color);
          if (index == 0) {
            $button.setAttribute('selected', true);
            $button.style.backgroundColor = item.color;
            $button.style.color = '#FFFFFF';
            betType = item;
            app().setDescription();
            app().generateBetTable(item);
          }
          $button.innerHTML = item.type;
          $button.addEventListener('click', (e) => app().buttonActiveMode(e, $button, item));
          selectBetType.appendChild($button);
        });
      }, 
      
      buttonClassBetStyle: function(button, color) {
        button.backgroundColor = '#FFFFFF';
        button.color = color;
        button.width = '113px';
        button.height = '34px';
        button.border = `2px solid ${color}`;
        button.fontStyle = 'italic';
        button.fontWeight = 'bold';
        button.fontSize = '14px';
        button.borderRadius = '100px';
      },

      buttonActiveMode: function (e, $button, item) {
        e.preventDefault();
        selectNumbers = [];
        $button.style.backgroundColor = item.color;
        $button.style.color = '#FFFFFF';
        $button.setAttribute('selected', 'true');
      },

      clearBet: function () {

      },


    }
}  

app().init();

})(window, document);