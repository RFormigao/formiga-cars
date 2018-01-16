(function($, doc) {

  'use strict';
  
  function app() {
    return {

      init: function init() {
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function initEvents() {
        var $formVehicle = $('[data-js="form-insert-vehicle"]');
        $formVehicle.on('submit', this.handleFormVehicles);
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'company.json');
        ajax.send();
        ajax.addEventListener('readystatechange',this.getInfoCompany, false);
      },

      getInfoCompany: function getInfoCompany() {
        if (app().isRequestOk.call(this)) {
          var data   =  JSON.parse(this.responseText);
          $('[data-js="title"]').get()[0].textContent = data.name;
          $('[data-js="number"]').get()[0].textContent = data.phone;
        }
      },

      isRequestOk: function isRequestOk() {
        return this.readyState === 4 && this.status === 200;
      },

      handleFormVehicles: function handleFormVehicles(event) {
        event.preventDefault();   
        var $formFields = $('[data-js="input-field"]');   
        app().removeFirstLine();     
        app().addVehicle.call($formFields);
        app().optionsVehicle();
        $formFields.methodArray('forEach', app().clearFields);     
      },

      addVehicle: function addVehicle() {
        var table = app().table();
        this.get().forEach( function (item, index, array) {
          table.columnTable = doc.createElement("td"); 
          if ( array[index] === array[0] ) {
            table.imageTable.setAttribute ( "src", array[0].value );
            table.columnTable.appendChild(table.imageTable );
            table.lineTable.appendChild(table.columnTable ); 
            return; 
          }      
          table.columnTable.appendChild( doc.createTextNode( item.value ) );
          table.lineTable.appendChild(table.columnTable );   
        });
        table.bodyTable.get()[0].appendChild( table.lineTable );   
      },

      removeVehicle: function removeVehicle(event) {
        event.preventDefault();
        var tr = this.parentNode;
        var $table = app().table();
        $table.bodyTable.get()[0].removeChild(tr);
        
        if ($table.bodyTable.get()[0].children.length === 1) {
          var lineTable = $('[data-js="empty-register"]');
          var element = lineTable.get()[0].children[0];
          element.setAttribute ( "style", "display:table-cell;text-align:center; padding: 100px; text-transform:uppercase;" );
        }
      },

      table: function table() {
        return {
          bodyTable         : $('[data-js="table-body"]'),
          lineTable         : doc.createElement("tr"),
          imageTable        : doc.createElement("img"),
          columnTable       : doc.createElement("td"),
          optionRemoveTable : '<td data-js="remove-vehicle" > <a href="#"> Remover veiculo </a> </td>' 
        }
      },
      
      optionsVehicle: function optionsVehicle() {
        var table = app().table();
        var lastVehicle = table.bodyTable.element[0].lastChild;
        lastVehicle.insertAdjacentHTML('beforeend', table.optionRemoveTable);
        var self = this;
        var $removeVehicle = $('[data-js="remove-vehicle"]'); 
        var lastIndex = $removeVehicle.element.length - 1;
        $removeVehicle.get()[lastIndex].addEventListener('click', self.removeVehicle, false);
      },

      clearFields: function clearFields(item) {
        item.value = '';
      }, 

      removeFirstLine: function removeFirstLine() {
        var lineTable = $('[data-js="empty-register"]');
        var element = lineTable.get()[0].children[0];
        element.setAttribute ( "style", "display:none;" );
      }
      
    }
  }

  app().init();

})(window.DOM, document);
