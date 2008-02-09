YAHOO.namespace("inputEx");inputEx.messages={required:"This field is required",invalid:"This field is invalid",valid:"This field is valid"};inputEx.Field=function(A){this.options=A;this.options.messages=this.options.messages||{};this.options.messages.required=this.options.messages.required||inputEx.messages.required;this.options.messages.invalid=this.options.messages.invalid||inputEx.messages.invalid;this.options.messages.valid=this.options.messages.valid||inputEx.messages.valid;this.render();if(this.options.value){this.setValue(this.options.value)}this.initEvents();this.setClassFromState()};inputEx.Field.prototype.render=function(){this.divEl=document.createElement("DIV");this.el=document.createElement("INPUT");this.el.type="text";this.el.name=this.options.name;this.el.value=this.options.value||"";this.el.size=this.options.size||20;YAHOO.util.Dom.addClass(this.el,"inputEx-field");this.divEl.appendChild(this.el);if(!this.options.noicon){this.imgEl=document.createElement("div");this.imgEl.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;";YAHOO.util.Dom.addClass(this.imgEl,"inputEx-field-img");this.tooltip=new YAHOO.widget.Tooltip("random"+this.options.name,{context:this.imgEl,text:""});YAHOO.util.Dom.setStyle(this.tooltip.element,"z-index","999");this.divEl.appendChild(this.imgEl)}};inputEx.Field.prototype.getEl=function(){return this.divEl};inputEx.Field.prototype.initEvents=function(){YAHOO.util.Event.addListener(this.el,"input",this.onInput,this,true);YAHOO.util.Event.addListener(this.el,"focus",this.onFocus,this,true);YAHOO.util.Event.addListener(this.el,"blur",this.onBlur,this,true)};inputEx.Field.prototype.getValue=function(){return this.el.value};inputEx.Field.prototype.setValue=function(A){this.el.value=A};inputEx.Field.prototype.setClassFromState=function(){if(this.previousState){YAHOO.util.Dom.removeClass(this.getEl(),"inputEx-"+this.previousState)}this.previousState=this.getState();YAHOO.util.Dom.addClass(this.getEl(),"inputEx-"+this.previousState);this.setToolTipMessage()};inputEx.Field.prototype.setToolTipMessage=function(){if(this.tooltip){var A="";if(this.previousState=="required"){A='<div class="inputEx-tooltip-required"></div> <span>'+this.options.messages.required+"</span>"}else{if(this.previousState=="invalid"){A='<div class="inputEx-tooltip-exclamation"></div> <span>'+this.options.messages.invalid+"</span>"}else{A='<div class="inputEx-tooltip-validated"></div> <span>'+this.options.messages.valid+"</span>"}}this.tooltip.setBody(A)}};inputEx.Field.prototype.onFocus=function(A){YAHOO.util.Dom.addClass(this.getEl(),"inputEx-focused")};inputEx.Field.prototype.onBlur=function(A){YAHOO.util.Dom.removeClass(this.getEl(),"inputEx-focused")};inputEx.Field.stateEmpty="empty";inputEx.Field.stateRequired="required";inputEx.Field.stateValid="valid";inputEx.Field.stateInvalid="invalid";inputEx.Field.prototype.getState=function(){if(this.getValue()===""){if(this.options.required){return inputEx.Field.stateRequired}else{return inputEx.Field.stateEmpty}}if(this.validate()){return inputEx.Field.stateValid}else{return inputEx.Field.stateInvalid}};inputEx.Field.prototype.validate=function(){if(this.options.regexp){return this.getValue().match(this.options.regexp)}return true};inputEx.Field.prototype.onInput=function(A){if(this.options.numbers){YAHOO.util.Event.stopEvent(A);this.setValue((this.getValue()).replace(/[^0-9]/g,""))}this.setClassFromState()};inputEx.Field.prototype.close=function(){};inputEx.Field.prototype.disable=function(){this.el.disabled=true};inputEx.Field.prototype.enable=function(){this.el.disabled=false};inputEx.Form=function(A){this.options=A||{};this.render();YAHOO.util.Dom.addClass(this.form,this.options.className||"inputExForm");YAHOO.util.Event.addListener(this.form,"submit",this.options.onSubmit||this.onSubmit,this,true)};inputEx.Form.prototype.onSubmit=function(A){if(!this.validate()){YAHOO.util.Event.stopEvent(A)}};inputEx.Form.prototype.validate=function(){for(var B=0;B<this.inputs.length;B++){var A=this.inputs[B];var C=A.getState();if(C==inputEx.Field.stateRequired||C==inputEx.Field.stateInvalid){return false}}return true};inputEx.Form.prototype.getEl=function(){return this.form};inputEx.Form.prototype.getValue=function(){var B={};for(var A=0;A<this.inputs.length;A++){B[this.inputs[A].options.name]=this.inputs[A].getValue()}return B};inputEx.Form.prototype.enable=function(A){var D=!A;for(var B=0;B<this.inputs.length;B++){var C=this.inputs[B].getEl();C.disabled=D}};inputEx.Form.prototype.setValue=function(B){for(var A=0;A<this.inputs.length;A++){this.inputs[A].setValue(B[this.inputs[A].options.name]||"");this.inputs[A].setClassFromState()}};inputEx.Form.prototype.render=function(){this.form=document.createElement("FORM");this.form.setAttribute("autocomplete","off");var A=document.createElement("FIELDSET");var C=document.createElement("TABLE");this.tbody=document.createElement("TBODY");if(this.options.formName){this.form.name=this.options.formName}this.form.method=this.options.method||"POST";this.form.action=this.options.action||"";this.renderInputFields();this.renderButtons();C.appendChild(this.tbody);if(this.options.label){var B=document.createElement("LEGEND");B.innerHTML=this.options.label;A.appendChild(B)}A.appendChild(C);this.form.appendChild(A)};inputEx.Form.prototype.renderLabel=function(B,A){if(B.label){A.innerHTML=input.label}};inputEx.Form.prototype.renderInputFields=function(){var H,F,A,B;this.inputs=[];for(var C=0;C<this.options.inputs.length;C++){H=this.options.inputs[C];F=document.createElement("TR");A=document.createElement("TD");this.renderLabel(H,A);B=document.createElement("TD");if(!H.type){H.type=inputEx.Field}if(H.type==inputEx.HiddenField){YAHOO.util.Dom.addClass(F,"inputExForm-hiddenLine")}var E={};for(var G in H.inputParams){if(H.inputParams.hasOwnProperty(G)){E[G]=H.inputParams[G]}}if(H.group){E.name+="[0]"}this.inputs[C]=new H.type(E);B.appendChild(this.inputs[C].getEl());YAHOO.util.Dom.addClass(A,"inputExForm-label");F.appendChild(A);F.appendChild(B);this.tbody.appendChild(F);if(H.group){if(!this._groups){this._groups=[];this._groupDubNbr=[]}if(!this._groups[H.group]){this._groups[H.group]=[H];this._groupDubNbr[H.group]=1}else{this._groups[H.group].push(H)}}}if(this._groups){for(var I in this._groups){if(this._groups.hasOwnProperty(I)){F=document.createElement("TR");A=document.createElement("TD");B=document.createElement("TD");var D=document.createElement("input");D.type="button";D.value="+";YAHOO.util.Event.addListener(D,"click",this.addGroupEntries,this,true);B.appendChild(D);F.appendChild(A);F.appendChild(B);this.tbody.appendChild(F)}}}};inputEx.Form.prototype.addGroupEntries=function(){var I="fields";var A=this;for(var D=0;D<A._groups[I].length;D++){var E={};for(var G in A._groups[I][D].inputParams){if(A._groups[I][D].inputParams.hasOwnProperty(G)){E[G]=A._groups[I][D].inputParams[G]}}E.name+="["+this._groupDubNbr[I]+"]";var H=new A._groups[I][D].type(E);A.inputs.push(H);var F=document.createElement("TR");var C=document.createElement("TD");if(A._groups[I][D].label){C.innerHTML=A._groups[I][D].label}var B=document.createElement("TD");B.appendChild(H.getEl());F.appendChild(C);F.appendChild(B);this.tbody.insertBefore(F,this.tbody.childNodes[this.tbody.childNodes.length-2])}this._groupDubNbr[I]+=1};inputEx.Form.prototype.renderButtons=function(){var E=document.createElement("TR");var F=document.createElement("TD");var D=document.createElement("TD");var C,A;if(this.options.buttons){for(var B=0;B<this.options.buttons.length;B++){C=this.options.buttons[B];A=document.createElement("INPUT");A.type=C.type;A.value=C.value;if(C.onClick){A.onclick=C.onClick}D.appendChild(A)}}E.appendChild(F);E.appendChild(D);this.tbody.appendChild(E)};inputEx.Form.prototype.close=function(){for(var A=0;A<this.inputs.length;A++){this.inputs[A].close()}};inputEx.UpperCaseField=function(A){inputEx.UpperCaseField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.UpperCaseField,inputEx.Field);inputEx.UpperCaseField.prototype.onInput=function(A){this.setValue((this.getValue()).toUpperCase());this.setClassFromState()};inputEx.UneditableHtmlField=function(A){inputEx.UneditableHtmlField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.UneditableHtmlField,inputEx.Field);inputEx.UneditableHtmlField.prototype.render=function(){this.divEl=document.createElement("DIV")};inputEx.UneditableHtmlField.prototype.setValue=function(B){this.value=B;if(this.options.formatValue){this.divEl.innerHTML=this.options.formatValue(B)}else{if(this.options.formatDom){var A=this.options.formatDom(B);this.divEl.innerHTML="";if(A){this.divEl.appendChild(A)}}else{this.divEl.innerHTML=B}}};inputEx.UneditableHtmlField.prototype.getValue=function(){return this.value};inputEx.SelectField=function(A){inputEx.SelectField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.SelectField,inputEx.Field);inputEx.SelectField.prototype.render=function(){this.divEl=document.createElement("DIV");this.el=document.createElement("SELECT");this.el.name=this.options.name||"";if(this.options.multiple){this.el.multiple=true;this.el.size=this.options.selectValues.length}this.optionEls=[];for(var A=0;A<this.options.selectValues.length;A++){this.optionEls[A]=document.createElement("OPTION");this.optionEls[A].value=this.options.selectValues[A];this.optionEls[A].innerHTML=(this.options.selectOptions)?this.options.selectOptions[A]:this.options.selectValues[A];this.el.appendChild(this.optionEls[A])}this.divEl.appendChild(this.el)};inputEx.SelectField.prototype.setValue=function(D){var A=0;var C;for(var B=0;B<this.options.selectValues.length;B++){if(D===this.options.selectValues[B]){C=this.el.childNodes[B];C.selected="selected"}}};inputEx.checkBox=function(A){inputEx.checkBox.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.checkBox,inputEx.Field);inputEx.checkBox.prototype.render=function(){this.sentValues=this.options.sentValues||["Y","N"];this.checkedValue=this.sentValues[0];this.uncheckedValue=this.sentValues[1];this.divEl=document.createElement("DIV");this.el=document.createElement("INPUT");this.el.type="checkbox";this.el.checked=(this.options.checked===false)?false:true;this.divEl.appendChild(this.el);this.label=document.createElement("label");this.label.innerHTML=this.options.label||"";YAHOO.util.Dom.addClass(this.label,"inputExForm-checkbox-rightLabel");this.divEl.appendChild(this.label);this.hiddenEl=document.createElement("INPUT");this.hiddenEl.type="hidden";this.hiddenEl.name=this.options.name||"";this.hiddenEl.value=this.el.checked?this.checkedValue:this.uncheckedValue;this.divEl.appendChild(this.hiddenEl);YAHOO.util.Event.addListener(this.el,"change",this.toggleHiddenEl,this,true)};inputEx.checkBox.prototype.toggleHiddenEl=function(){this.hiddenEl.value=this.el.checked?this.checkedValue:this.uncheckedValue};inputEx.checkBox.prototype.getValue=function(){return this.el.checked?this.checkedValue:this.uncheckedValue};inputEx.checkBox.prototype.setValue=function(A){if(A===this.checkedValue){this.hiddenEl.value=A;this.el.checked=true}else{if(A===this.uncheckedValue){this.hiddenEl.value=A;this.el.checked=false}else{throw"Wrong value assignment in checkBox input"}}};inputEx.Textarea=function(A){inputEx.Textarea.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.Textarea,inputEx.Field);inputEx.Textarea.prototype.render=function(){this.divEl=document.createElement("DIV");this.el=document.createElement("TEXTAREA");this.el.value=this.options.value||"";this.el.rows=this.options.rows||6;this.el.cols=this.options.cols||23;YAHOO.util.Dom.addClass(this.el,"inputEx-field");this.divEl.appendChild(this.el)};inputEx.HiddenField=function(A){inputEx.HiddenField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.HiddenField,inputEx.Field);inputEx.HiddenField.prototype.render=function(){this.type=inputEx.HiddenField;this.divEl=document.createElement("DIV");this.el=document.createElement("INPUT");this.el.type="hidden";this.el.name=this.options.name||"";YAHOO.util.Dom.addClass(this.el,"inputEx-field");this.divEl.appendChild(this.el)};inputEx.PasswordField=function(A){inputEx.PasswordField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.PasswordField,inputEx.Field);inputEx.PasswordField.prototype.render=function(){inputEx.PasswordField.superclass.render.call(this);this.el.type="password"};inputEx.messages.invalidEmail="Invalid email, ex: sample@test.com";inputEx.EmailField=function(A){A.messages=A.messages||{};A.messages.invalid=inputEx.messages.invalidEmail;A.regexp=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;inputEx.EmailField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.EmailField,inputEx.Field);inputEx.EmailField.prototype.getValue=function(){return this.el.value.toLowerCase()};inputEx.IpadressField=function(A){A.regexp=/^(?:1\d?\d?|2(?:[0-4]\d?|[6789]|5[0-5]?)?|[3-9]\d?|0)(?:\.(?:1\d?\d?|2(?:[0-4]\d?|[6789]|5[0-5]?)?|[3-9]\d?|0)){3}$/;inputEx.IpadressField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.IpadressField,inputEx.Field);inputEx.FormattedField=function(A){inputEx.FormattedField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.FormattedField,inputEx.Field);inputEx.FormattedField.prototype.validate=function(){return !this.getFormattedValue().match("_")};inputEx.FormattedField.prototype.getFormattedValue=function(){return this.el.value};inputEx.FormattedField.prototype.onInput=function(F){var E=this.getFormattedValue();var B=E.split("");var D=this.options.format.split("");var G="";var H=true;var A=0;for(var C=0;C<D.length;C++){if(H&&((B.length<=C)||(D[C]=="#"&&("0123456789").indexOf(B[C])==-1)||(D[C]!="#"&&D[C]!=B[C]))){H=false}if(H){G+=B[C];if(C+1<D.length&&D[C+1]!="#"){G+=D[C+1];C++}A=C+1}else{G+=D[C].replace("#","_")}}this.el.value=G;this.el.selectionStart=A;this.el.selectionEnd=A;this.setClassFromState()};inputEx.FormattedField.prototype.initEvents=function(){inputEx.FormattedField.superclass.initEvents.call(this);YAHOO.util.Event.addListener(this.el,"keydown",this.onKeyDown,this,true)};inputEx.FormattedField.prototype.onKeyDown=function(B){if(B.keyCode==8){if(this.el.selectionStart==this.el.selectionEnd){var A=(this.getFormattedValue()).split("");if(("0123456789").indexOf(A[this.el.selectionStart-1])==-1){this.el.value=(this.getFormattedValue()).substr(0,this.el.selectionStart-1)}}}};inputEx.FormattedField.prototype.onBlur=function(A){inputEx.FormattedField.superclass.onBlur.call(this,A);if(this.getFormattedValue()==this.options.format.replace(/#/g,"_")){this.el.value=""}this.setClassFromState()};inputEx.DateField=function(A){A.format="##/##/####";A.dateFormat=A.dateFormat||"m/d/Y";inputEx.DateField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.DateField,inputEx.FormattedField);inputEx.DateField.prototype.validate=function(){var E=this.el.value;if(E.match("_")){return false}if(E===""){return false}var D=E.split("/");if((D.length!=3)||isNaN(parseInt(D[0]))||isNaN(parseInt(D[1]))||isNaN(parseInt(D[2]))){return false}var F=this.options.dateFormat.split("/");var H=parseInt(D[F.indexOf("d")],10);var G=parseInt(D[F.indexOf("Y")],10);var B=parseInt(D[F.indexOf("m")],10)-1;var C=new Date(G,B,H);var A=C.getFullYear();return((C.getDate()==H)&&(C.getMonth()==B)&&(A==G))};inputEx.DateField.prototype.render=function(){inputEx.DateField.superclass.render.call(this);this.el.size=10};inputEx.DateField.prototype.getValue=function(){if(this.el.value===""){return""}var B=this.getFormattedValue().split("/");var C=this.options.dateFormat.split("/");var E=parseInt(B[C.indexOf("d")],10);var D=parseInt(B[C.indexOf("Y")],10);var A=parseInt(B[C.indexOf("m")],10)-1;return(new Date(D,A,E))};inputEx.DateField.prototype.setValue=function(A){if(A===""){this.el.value="";return }if(A instanceof Date){str=this.options.dateFormat.replace("Y",A.getFullYear());str=str.replace("m",A.GetMonthNumberString());str=str.replace("d",A.GetDateString())}else{str=A}this.el.value=str};inputEx.messages.selectColor="Select a color :";inputEx.ColorField=function(A){inputEx.ColorField.superclass.constructor.call(this,A)};YAHOO.lang.extend(inputEx.ColorField,inputEx.Field);inputEx.ColorField.prototype.render=function(){this.divEl=document.createElement("DIV");this.el=document.createElement("INPUT");this.el.type="hidden";this.el.name=this.options.name;this.el.value=this.options.value||"#DD7870";YAHOO.util.Dom.addClass(this.el,"inputEx-field");this.colorEl=document.createElement("DIV");YAHOO.util.Dom.addClass(this.colorEl,"inputEx-field-color");YAHOO.util.Dom.setStyle(this.colorEl,"background-color",this.el.value);this.renderPopUp();this.divEl.appendChild(this.el);this.divEl.appendChild(this.colorEl)};inputEx.ColorField.prototype.renderPopUp=function(){this.displayTitle=this.options.displayTitle||false;var C=this.options.auto||1;this.colors=this.options.colors||this.setDefaultColors(C);this.length=this.colors.length;this.ratio=this.options.ratio||[16,9];this.squaresPerLine=Math.ceil(Math.sqrt(this.length*this.ratio[0]/this.ratio[1]));this.squaresPerColumn=Math.ceil(this.length/this.squaresPerLine);this.squaresOnLastLine=this.squaresPerLine-(this.squaresPerLine*this.squaresPerColumn-this.length);var B=30*this.squaresPerLine+10;this.visible=false;this.colorPopUp=document.createElement("div");YAHOO.util.Dom.setStyle(this.colorPopUp,"width",B+"px");YAHOO.util.Dom.setStyle(this.colorPopUp,"display","none");YAHOO.util.Dom.addClass(this.colorPopUp,"inputEx-color-popup");if(this.displayTitle){var D=document.createElement("div");D.innerHTML=inputEx.messages.selectColor;this.colorPopUp.appendChild(D)}var A=document.createElement("div");A.appendChild(this.renderColorGrid());this.colorPopUp.appendChild(A);this.divEl.appendChild(this.colorPopUp)};inputEx.ColorField.prototype.initEvents=function(){YAHOO.util.Event.addListener(this.colorEl,"click",this.toggleColorPopUp,this,true);YAHOO.util.Event.addListener(this.colorEl,"blur",this.closeColorPopUp,this,true)};inputEx.ColorField.prototype.toggleColorPopUp=function(){if(this.visible){this.colorPopUp.style.display="none"}else{this.colorPopUp.style.display="block"}this.visible=!this.visible};inputEx.ColorField.prototype.close=function(){this.closeColorPopUp()};inputEx.ColorField.prototype.closeColorPopUp=function(){this.colorPopUp.style.display="none";this.visible=false};inputEx.ColorField.prototype.renderColorGrid=function(){var F=document.createElement("TABLE");var D=document.createElement("TBODY");var G,A,C;for(var E=0;E<this.squaresPerColumn;E++){A=document.createElement("TR");for(var B=0;B<this.squaresPerLine;B++){C=document.createElement("TD");YAHOO.util.Dom.setStyle(C,"background-color","#fff");YAHOO.util.Dom.setStyle(C,"line-height","10px");YAHOO.util.Dom.setStyle(C,"cursor","default");C.innerHTML="&nbsp;";A.appendChild(C);if(E===(this.squaresPerColumn-1)&&B>=this.squaresOnLastLine){G=document.createElement("TD");YAHOO.util.Dom.setStyle(G,"background-color","#fff");YAHOO.util.Dom.setStyle(G,"line-height","10px");YAHOO.util.Dom.setStyle(G,"cursor","default");G.innerHTML="&nbsp;&nbsp;&nbsp;";A.appendChild(G)}else{G=document.createElement("TD");YAHOO.util.Dom.setStyle(G,"background-color","#"+this.colors[E*this.squaresPerLine+B]);YAHOO.util.Dom.setStyle(G,"line-height","10px");YAHOO.util.Dom.setStyle(G,"cursor","pointer");G.innerHTML="&nbsp;&nbsp;&nbsp;";YAHOO.util.Event.addListener(G,"click",this.onColorClick,this,true);A.appendChild(G)}}D.appendChild(A);C=document.createElement("TR");YAHOO.util.Dom.setStyle(C,"height","8px");D.appendChild(C)}F.appendChild(D);return F};inputEx.ColorField.prototype.onColorClick=function(C){var B=C.target;var A=YAHOO.util.Dom.getStyle(B,"background-color");YAHOO.util.Dom.setStyle(this.colorEl,"background-color",A);var D=function(E){var G=function(M){var J=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");var I=16;var L=parseInt(M,10);var K;var H="";if(!isNaN(L)){if(L==""){return"00"}while(L>0){K=0;while(L/Math.pow(I,K++)>=I){}H+=J[Math.floor(L/Math.pow(I,K-1))];if(L%I==0){H+="0"}L=(L%Math.pow(I,K-1))}if(H.length==1){return"0"+H}return H}else{return 0}};var F=E.split(/([(,)])/);return"#"+G(F[2])+G(F[4])+G(F[6])};this.el.value=D(A);this.visible=!this.visible;this.colorPopUp.style.display="none"};inputEx.ColorField.prototype.setDefaultColors=function(A){var B=[];B[0]=["FFEA99","FFFF66","FFCC99","FFCAB2","FF99AD","FFD6FF","FF6666","E8EEF7","ADC2FF","ADADFF","CCFFFF","D6EAAD","B5EDBC","CCFF99"];B[1]=["55AAFF","FFAAFF","FF7FAA","FF0202","FFD42A","F9F93B","DF8181","FEE3E2","D47FFF","2AD4FF","2AFFFF","AAFFD4"];B[2]=["000000","993300","333300","003300","003366","000080","333399","333333","800000","FF6600","808000","008000","008080","0000FF","666699","808080","FF0000","FF9900","99CC00","339966","33CCCC","3366FF","800080","969696","FF00FF","FFCC00","FFFF00","00FF00","00FFFF","00CCFF","993366","C0C0C0","FF99CC","FFCC99","FFFF99","CCFFCC","CCFFFF","99CCFF","CC99FF","F0F0F0"];return B[A-1]};inputEx.ColorField.prototype.setValue=function(A){this.el.value=A;YAHOO.util.Dom.setStyle(this.colorEl,"background-color",this.el.value)}