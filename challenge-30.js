(function(DOM, doc) {

  'use strict';
  
  function app() {

    return {
      init: function init() {
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function initEvents() {
        var $formVehicle = new DOM('[data-js="form-insert-vehicle"]');
        $formVehicle.on('submit', this.handleFormVehicles);
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'https://raw.githubusercontent.com/RFormigao/curso-javascript-ninja/master/challenge-29/company.json');
        ajax.send();
        ajax.addEventListener('readystatechange',this.getInfoCompany, false);
      },

      getInfoCompany: function getInfoCompany() {
        if (app().isRequestOk.call(this)) {
          var data   =  JSON.parse(this.responseText);
          var $title = new DOM('[data-js="title"]');
          var $phone = new DOM('[data-js="number"]');
          $title.get()[0].textContent = data.name;
          $phone.get()[0].textContent = data.phone;
        }
      },

      isRequestOk: function isRequestOk() {
        return this.readyState === 4 && this.status === 200;
      },

      handleFormVehicles: function handleFormVehicles(event) {
        event.preventDefault();   
        var $formFields = new DOM('[data-js="input-field"]');        
        app().addVehicle.call($formFields);
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

      table: function table() {
        return {
          bodyTable   : new DOM('[data-js="table-body"]'),
          lineTable   : doc.createElement("tr"),
          imageTable  : doc.createElement("img"),
          columnTable : doc.createElement("td")
        }
      },
      
      clearFields: function clearFields(item) {
        item.value = '';
      }
    }
  }

  app().init();

})(window.DOM, document);
