(function($) {
    'use strict';

    function app() {
        return {
          init: function() {

        },

    getBet: function() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/');
        ajax.send();
        ajax.onreadystatechange = function() {
          if (ajax.readyState === 4) {
            var data = JSON.parse(ajax.responseText);            
          }
        };
      },

      postBet: function() {
        var ajax = new XMLHttpRequest();        
        ajax.open('POST', 'http://localhost:3000/');
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send(`image=${car.image}&brandModel=${car.brandModel}&year=${car.year}&plate=${car.plate}&color=${car.color}`);
        ajax.onreadystatechange = function() {
          if (ajax.readyState === 4) {
            console.log('Carro cadastrado!', ajax.responseText);
          }
        }
      },

      deleteBet: function (item) {
        var ajax = new XMLHttpRequest();
        ajax.open('DELETE', 'http://localhost:3000/');
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send({id});
        window.location.reload()
      },

      isReady: function() {
        return this.readyState === 4 && this.status === 200;
      }
    }
}  

app().init();

})(window.DOM);