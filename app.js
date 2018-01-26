(function($, doc) {

  'use strict';
  
  function app() {
    return {

      init: function init() {
        this.companyInfo();
        this.initEvents();
        this.getVehicle('all');
      },

      initEvents: function initEvents() {
        var $formVehicle = $('[data-js="form-insert-vehicle"]');
        $formVehicle.on('submit', this.handleVehicles);
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'company.json');
        ajax.send();
        ajax.addEventListener('readystatechange',this.getInfoCompany, false);
      },

      getInfoCompany: function getInfoCompany() {
        if (app().isRequestOk.call(this)) {
          var data = JSON.parse(this.responseText);
          $('[data-js="title"]').get()[0].textContent = data.name;
          $('[data-js="number"]').get()[0].textContent = data.phone;
        }
      },

      isRequestOk: function isRequestOk() {
        return this.readyState === 4 && this.status === 200;
      },

      vehicle: function vehicle() {
        var $vehicle = $('[data-js="input-field"]');   
        return {
          image      : $vehicle.get()[0].value,
          brandModel : $vehicle.get()[1].value.toUpperCase(),
          year       : $vehicle.get()[2].value.toUpperCase(),
          plate      : $vehicle.get()[3].value.toUpperCase(),
          color      : $vehicle.get()[4].value.toUpperCase()
        }
      },

      handleVehicles: function handleVehicles(event) {
        event.preventDefault();   
        app().addVehicle();
        app().getVehicle('any'); 
      },

      addVehicle: function addVehicle() {
        var vehicle = this.vehicle();
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://localhost:3000/car');
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send('image=' + vehicle.image + '&brandModel=' + vehicle.brandModel + '&year=' + vehicle.year + '&plate=' + vehicle.plate + '&color=' + vehicle.color + '');
        app().clearFields();
      },

      getVehicle: function getVehicle( type ) {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/car');
        ajax.send();        
        if (type === 'all')
          return ajax.addEventListener('readystatechange',this.setVehicle, false);           
        if (type === 'any')
          return ajax.addEventListener('readystatechange',this.setAnyVehicle, false);           
      },

      removeVehicle: function removeVehicle( event ) {
        event.preventDefault();
        var vehicle = this.parentNode.parentNode;
        var ajax = new XMLHttpRequest();        
        ajax.open('DELETE', 'http://localhost:3000/car');
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send('plate='+vehicle.children[3].innerText);

        return ajax.addEventListener('readystatechange', function () {
          if (app().isRequestOk.call(this)) {            
            app().table().removeTr(tr);
            app().table().removeFirstLine();
          }
        }, false);                         
      },

      setVehicle: function setVehicle() {
        if (app().isRequestOk.call(this)) {
          var data = JSON.parse(this.responseText);
          data.forEach( app().table().addVehicleTable );
          app().table().removeFirstLine();
          app().table().getPlateForDelete();      
        }
      },

      setAnyVehicle: function setAnyVehicle() {
        if (app().isRequestOk.call(this)) {
          var data = JSON.parse(this.responseText);
          app().table().addVehicleTable(data.pop()); 
          app().table().removeFirstLine();
          app().table().getPlateForDelete();  
        }
      },

      clearFields: function clearFields() {
        var $vehicle = $('[data-js="input-field"]');   
        $vehicle.methodArray('forEach', function (item) {
          item.value = '';
        });
      }, 

      replaceContent: function replaceContent(element, value) {
        return element.replace(/\[content\]/, value);
      },

      table: function table() {
        
        return {
          body   : $('[data-js="table-body"]'),
          empty  : $('[data-js="empty-register"]'), 
          line   : '<tr> </tr>',
          image  : '<td> <img src="[content]"> </td>',
          column : '<td> [content] </td>',
          remove : '<td> <a data-js="remove-vehicle" href="#"> Remover veiculo </a> </td>',
          
          createTr: function createTr() {
            this.body.get()[0].insertAdjacentHTML('beforeend', this.line);
          },
          
          createImage: function createImage(image) {
            var counter = this.counterElements() - 1;
            this.body.get()[0].children[counter].innerHTML += app().replaceContent(this.image, image);    
          },

          addVehicleTable: function addVehicleTable(vehicle) {
            table().createTr();
            table().createImage(vehicle.image);
            table().createTd(vehicle);
            table().createOptionRemove();
          },
          
          createTd: function createTd(vehicle) {
            var counter = this.counterElements() - 1;
            delete vehicle.image;
            for (var index in vehicle) {
               this.body.get()[0].children[counter].innerHTML += app().replaceContent(this.column, vehicle[index]);          
            }   
          },
          
          createOptionRemove: function createOptionRemove() {
            var counter = this.counterElements() - 1;
            this.body.get()[0].children[counter].innerHTML += this.remove;                   
          }, 
          
          counterElements: function counterElements() {
            return this.body.get()[0].children.length;
          },
          
          removeFirstLine: function removeFirstLine() {
            if (this.counterElements() !== 1) 
              this.empty.get()[0].children[0].setAttribute ( "style", "display:none;" );
            else
              this.empty.get()[0].children[0].setAttribute ( "style", "display:table-cell;text-align:center; padding: 100px; text-transform:uppercase;" );
          },

          getPlateForDelete: function getPlateForDelete() {
            $('[data-js="remove-vehicle"]').methodArray('forEach', function (vehicle) {
              vehicle.addEventListener('click', app().removeVehicle , false);
            });
          },

          removeTr: function removeTr(tr) {
            tr.remove();
          }
        }
      }      
    }
  }

  app().init();

})(window.DOM, document);
