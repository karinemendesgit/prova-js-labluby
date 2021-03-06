(function(window, document) {
  'use strict';

   const app = (function() {
    let selectNumbers = [];
    let betType;
    let total = 0;
    let numbers = [];
    return {
      init: function() {
        this.selectDataBase();
      },

      selectDataBase: function() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', './games.json');
        ajax.send();
        ajax.addEventListener('readystatechange', function() {
          if(this.status === 200 && this.readyState === 4) {
            let data = JSON.parse(this.responseText);
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
        app.selectBet(dataGame, selectBetType);
        app.setBetName();
        btnClear.addEventListener('click', this.clearBet);
        btnRandom.addEventListener('click', this.randomGame);
        btnAdd.addEventListener('click', this.cartList);
      },

      selectBet: function (dataGame, selectBetType) {
        dataGame.map(function (item, index) {
          selectNumbers = [];
          let $button = document.createElement('button');
          $button.setAttribute('class', 'bet-type')
          $button.setAttribute('selected', false);
          app.buttonClassBetStyle($button.style, item.color);
          if (index == 0) {
            $button.setAttribute('selected', true);
            $button.style.backgroundColor = item.color;
            $button.style.color = '#FFFFFF';
            betType = item;
            app.setDescription();
            app.choiceNumbersTable(item);
          }
          $button.innerHTML = item.type;
          $button.addEventListener('click', (e) => app.buttonActiveMode(e, $button, item));
          selectBetType.appendChild($button);
        });
      },

      setBetName: function() {
        const $betName = document.querySelector('.bet-name');
        $betName.innerHTML = (betType.type).toUpperCase();
      },

      setDescription: function() {
        const $descriptionText = document.querySelector('[data-js="bet-description"]');
        $descriptionText.innerHTML = betType.description;
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
        let betNumbers = document.querySelectorAll('.bet-type');
        betNumbers.forEach(item => {
          if(item !== e.target && item.getAttribute('selected') === 'true') {
            let background = item.style.color;
            item.style.color = item.style.backgroundColor;
            item.style.backgroundColor = background;
            item.setAttribute('selected', 'false');
          }
        })
        betType = item;
        this.setBetName();
        this.setDescription();
        app.choiceNumbersTable(item);
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
            let limit = Number(betType['max-number']) - selectNumbers.length;
            if ($button.getAttribute('selected') === 'false' && limit !== 0) {
              selectNumbers.push(Number($button.getAttribute('id')));
              $button.setAttribute('selected','true');
              $button.style.border =`3px solid ${number.color}`;
            } else if ($button.getAttribute('selected') === 'true') {
              let indexDeleted = selectNumbers.indexOf(Number($button.getAttribute('id')));
              selectNumbers.splice(indexDeleted, 1);
              $button.setAttribute('selected', 'false');
              $button.style.border = 'none';
              if (selectNumbers.length < Number(betType['max-number'])) {
                return window.alert(`Selecione ${betType['max-number']} n??meros para adicionar ao carrinho. Adicione mais ${limit} n??meros para finalizar.`);
              };    
            } 
            if (limit == 0) {
              return window.alert('A quantidade m??xima de n??meros j?? foi preenchida');
            }
              
          });
          $betNumbers.appendChild($button);
        }
      },

      clearBet: function() {
        if(selectNumbers.length == 0) {
          return window.alert('N??o h?? nenhum n??mero selecionado');
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
          window.alert('N??o h?? mais n??meros a serem preenchidos.')
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
            item.style.border = `3px solid ${betType.color}`;
            item.setAttribute('selected', 'true');
          }
        });
      },     

      emptyCart: function() {
        let $itemsCart = document.querySelector('[data-js="game-list"]');
        let paragInCart = document.createElement('div');
        paragInCart.setAttribute('class', 'emptyCart')
        paragInCart.innerHTML= 'Carrinho Vazio';
        $itemsCart.appendChild(paragInCart);
      },

      verifyNumber: function (noRepeat) {
        let differentNumber = false;
        numbers.forEach((num) => {
            if (num.toString() == noRepeat.toString()) {
                differentNumber = true;
            }
        });
        return differentNumber;
      },

      cartList: function() {
        let noRepeat = [...selectNumbers];
        if (noRepeat.length != betType['max-number']) {
          if (noRepeat.length < betType['max-number']) {
            let limit = Number(betType['max-number']) - noRepeat.length;
            window.alert(`Selecione ${betType['max-number']} n??meros para adicionar ao carrinho. Adicione mais ${limit} n??meros para finalizar.`);
          }
      } else {
          noRepeat.sort((a, b) => a - b);

          if (app.verifyNumber(noRepeat)) {
            alert('Aposta feita anteriormente com os mesmos n??meros!');
          } else {
            numbers.push(noRepeat);
            const $totalTxt = document.querySelector('[data-js="game-list-total"]');
            const $divCart = document.querySelector('[data-js="game-list"]');
            $divCart.style.fontStyle = 'italic';
            $divCart.setAttribute('class', 'divCart');
            const $divElement = document.createElement('div');                    
            const $dataDiv = document.createElement('div');
            $dataDiv.setAttribute('class', 'divData');
            $dataDiv.style.borderLeft = `4px solid ${betType.color}`;
            const $image = document.createElement('img');
            $image.src = "./Assets/trash.svg";
            const $btnDelete = document.createElement('button');
            $btnDelete.style.border = 'none';
            $btnDelete.style.backgroundColor = '#ffffff';
            const $numbersP = document.createElement('p');
            const $valueP = document.createElement('p');
            $valueP.setAttribute('class', 'value');
            const $betTypeSpan = document.createElement('span');
            $betTypeSpan.style.color = betType.color;
            const $getNumber = document.querySelectorAll('[data-js="div-cart"]');
            if($getNumber.length == 0){
              let $textCart = document.querySelector('.emptyCart');
              $textCart.remove();
            }
            let price = betType.price;
            total += price;
            $totalTxt.innerHTML = 'CART TOTAL R$' + total.toFixed(2).replace('.',',');
            $betTypeSpan.innerHTML = betType.type;       
            $divElement.setAttribute('data-js','div-cart');                
            $numbersP.innerHTML = noRepeat.sort(function (a, b) {
              return a - b}).join(', ');
            $valueP.innerHTML = $betTypeSpan.outerHTML + " R$ " + String(price.toFixed(2)).replace('.',',');
            $dataDiv.appendChild($numbersP);
            $dataDiv.appendChild($valueP);
            $btnDelete.appendChild($image);
            $divElement.setAttribute('priceInSection',`${betType.price}`);
            $divElement.appendChild($btnDelete);
            $divElement.appendChild($dataDiv);
            $divCart.appendChild($divElement);
            $btnDelete.addEventListener('click',(e) => app.trashBetGame(e));
            app.clearBet();
            }
          }
        },

        trashBetGame: function(e){
          e.preventDefault();
          const $totalTxt = document.querySelector('[data-js="game-list-total"]');
          const $element = e.target;
          const btn = $element.parentNode;
          const $div = btn.parentNode;
          let $valor = $div.getAttribute('priceInSection');
          total -= $valor;
          $div.remove();
          const $getNumber = document.querySelectorAll('[data-js="div-cart"]');

          if($getNumber.length == 0){
            this.emptyCart();
          }
          $totalTxt.innerHTML = 'CART TOTAL R$' + total.toFixed(2).replace('.',',');
        }
    }
})();

app.init();

})(window, document);