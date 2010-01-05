/**
 * Add an SQL operator select field in the middle of a KeyValueField
 * @class inputEx.KeyOpValueField
 * @constructor
 * @extend inputEx.KeyValueField
 */
inputEx.KeyOpValueField = function(searchFormDef) {
	
   this.nameIndex = {};
   var fieldNames = [], fieldLabels = [];
   for(var i = 0 ; i < searchFormDef.fields.length ; i++) {
      var field =  searchFormDef.fields[i];
      this.nameIndex[field.name] = field;
      fieldNames.push(field.name);
		fieldLabels.push(field.label || field.name);
   }
   
   var opts = {
      fields: [
         {type: 'select', selectValues: fieldNames, selectOptions: fieldLabels },
			{type: 'select', selectValues: ["=", ">", "<", ">=", "<=", "!=", "LIKE", "NOT LIKE", "IS NULL", "IS NOT NULL"] },
         searchFormDef.fields[0]
      ],
		parentEl: searchFormDef.parentEl
   };


   inputEx.KeyValueField.superclass.constructor.call(this, opts);
};
YAHOO.lang.extend( inputEx.KeyOpValueField, inputEx.KeyValueField, {});

inputEx.registerType("keyopvalue", inputEx.KeyOpValueField, {});
