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
        var $tableBody = new DOM('[data-js="table-body"]');     
        var lineTable  = doc.createElement("tr");
        var length     = this.get().length;
        var image      = doc.createElement("img");
        var td         = '';
        app().createTd.call(this, lineTable, length, image, td);
        $tableBody.get()[0].appendChild(lineTable);   
      },
      
      clearFields: function clearFields(item) {
        item.value = '';
      },
      
      createTd: function createTd(lineTable, length, image, td) {
        for (let i = 0; i < length; i++) {
          td = doc.createElement("td");
          if ( this.get()[i] === this.get()[0] ) {
            image.setAttribute ( "src", this.get()[0].value );
            td.appendChild( image );
            lineTable.appendChild( td ); 
          } else {
            td.appendChild( doc.createTextNode( this.get()[i].value ) );
            lineTable.appendChild( td );            
          }
        }
      }
    }
  }

  app().init();

})(window.DOM, document);
