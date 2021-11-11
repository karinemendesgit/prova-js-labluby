(function(window, document) {
  'use strict';

   const app = (function() {
    let selectNumbers = [];
    let betType;
    let total = 0;
    return {
      init: function() {
        this.selectDataBase();
      },

      selectDataBase: function() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', './games.json');
        ajax.send();
        ajax.addEventListener('readystatechange', function() {
          if(ajax.status === 200 && ajax.readyState === 4) {
            let data = JSON.parse(ajax.responseText);
            app.firstActionsState(data.types);
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
        paragInCart.setAttribute('class', 'emptyCart')
        paragInCart.innerHTML= 'Carrinho Vazio';
        $itemsCart.appendChild(paragInCart);
      },

      selectBet: function name(dataGame, selectBetType) {
        dataGame.map(function (item, index) {
          selectNumbers = [];
          let $button = document.createElement('button');
          $button.setAttribute('class', 'bet-type')
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
        button.border = `2px solid ${color}`;
      },

      buttonActiveMode: function(e, $button, item) {
        e.preventDefault();
        selectNumbers = [];
        $button.style.backgroundColor = item.color;
        $button.style.color = '#FFFFFF';
        $button.setAttribute('selected', 'true');
        let betButtons = document.querySelectorAll('.bet-type');
        betType = item;
        this.setDescription();
        app().generateBetTable(item);
      },

      choiceNumbersTable: function (number) {
        const $betNumbers = document.querySelector('.numbers');
        $betNumbers.innerHTML = '';
        for (let i = 1; i <= number.range; i++) {
          const $button = document.createElement('button');
          $button.setAttribute('selected', 'false');
          $button.setAttribute('id', i);
          $button.setAttribute('data-js', 'number');
          $button.innerHTML = i > 9 ? i : '0' + i;
          $button.addEventListener('click', function() {
            let limit = number['max-number'] - selectNumbers.length;
            if ($button.getAttribute('selected') === 'false' && limit !== 0) {
              selectNumbers.push(Number($button.getAttribute('id')));
              $button.setAttribute('selected','true');
              $button.style.border =`1px solid ${number.color}`;
            } else if ($button.getAttribute('selected') === 'true') {
              let indexDeleted = selectNumbers.indexOf(Number($button.getAttribute('id')));
              selectNumbers.splice(indexDeleted, 1);
              $button.setAttribute('selected', 'false');
              $button.style.border = 'none';
              limit = number['max-number'] - selectNumbers.length;
            } if (limit == 0) {
              window.alert('A quantidade máxima de números já foi preenchida');
            }              
          });
          $betNumbers.appendChild($button);
        }
      },

      clearBet: function() {
        if(selectNumbers.length == 0) {
          window.alert('Não há nenhum número selecionado');
          return;
        }
        let buttons = document.querySelectorAll('[data-js="number"]');
        buttons.forEach(item => {
          item.setAttribute('selected', 'false');
          item.style.border = 'none';
          selectNumbers = [];
        });
      },

      randomGame: function() {
        let buttons = document.querySelectorAll('[data-js="number"]');
        let limit = Number(betType['max-number']) - selectNumbers.length;
        if (limit === 0) {
          window.alert('Não há mais números a serem preenchidos.')
        }
        let counter = 0;
        while (counter < limit) {
          let random = Math.floor(Math.random() * (betType.range - 1) + 1);
          if (selectNumbers.indexOf(random) == -1) {
            selectNumbers.push(random);
            counter++;
          }
        }
        buttons.forEach(item => {
          if(selectNumbers.indexOf(Number(item.id)) !== -1) {
            item.style.border = `1px solid ${betType.color}`;
            item.setAttribute('selected', 'true');
          }
        });
      },

      setDescription: function() {
        const $descriptionText = document.querySelector('[data-js="bet-description"]');
        $descriptionText.innerHTML = betType.description;
      },

      cartList: function() {
        const $totalTxt = document.querySelector('[data-js="game-list-total"]');
        const $divCart = document.querySelector('[data-js="game-list"]');
        const $divElement = document.createElement('div');
        const $dataDiv = document.createElement('div');
        const $image = document.createElement('img');
        const $btnDelete = document.createElement('button');
        const $numbersP = document.createElement('p');
        const $valueP = document.createElement('p');
        const $betTypeSpan = document.createElement('span');
        const $getNumber = document.querySelectorAll('[data-js = div-cart]');

        if($getNumber.length == 0){
          let $textCart = document.querySelector('.emptyCart');
          $textCart.remove();
        }                    
        let numbersInDescription = betType.description.match(/\d+/g);
        let menor = Math.min(...numbersInDescription);
        let price = betType.price;
        if(selectNumbers.length < menor ){
          window.alert(`Selecione ${betType['max-number']} números para adicionar ao carrinho`);
          return;
        }
                
        total += price;
        $totalTxt.innerHTML = 'Total R$' + total.toFixed(2).replace('.',',');
        $betTypeSpan.innerHTML = betType.type;             
        $divElement.setAttribute('data-js','div-cart');                
        $numbersP.innerHTML = selectNumbers.join(', ');     
        $valueP.innerHTML = $betTypeSpan.outerHTML + " R$ " + String(price.toFixed(2)).replace('.',',');
        $dataDiv.appendChild($numbersP);
        $dataDiv.appendChild($valueP);
        $btnDelete.appendChild($image);
        $divElement.setAttribute('priceInSection',`${betType.price}`);
        $divElement.appendChild($btnDelete);
        $divElement.appendChild($dataDiv);
        $divCart.appendChild($divElement);
        $btnDelete.addEventListener('click',(e)=> app.trashBetGame(e));
        app.clearBalls();
        },

        trashBetGame: function(e){
          e.preventDefault();
          const $totalTxt = document.querySelector('[data-js=cart-value-total]');
          const $element = e.target;
          const btn = $element.parentNode;
          const $div = btn.parentNode;
          let $valor = $div.getAttribute('priceInSection');
          total -= $valor;
          $div.remove();
          const $getNumber = document.querySelectorAll('[data-js = div-cart]');

          if($getNumber.length == 0){
            this.emptyCart();
          }
          $totalTxt.innerHTML = 'Total R$' + total.toFixed(2).replace('.',',');
        }   
    }
})()

app.init();

})(window, document);