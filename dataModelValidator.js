/*
  Write your docs here
*/
"use strict";
var check = require('check-types');
var validator = exports;
validator.validateDataModel = function validateDataModel(dataModelJSON){
  var validTypes = ["string","boolean","date","hasMany"];
  var errors=[];
  for (var entity in dataModelJSON){
      for( var field in dataModelJSON[entity]){
	    if(check.not.defined(dataModelJSON[entity][field].type)){
            errors.push("Undefined type for field " +field+ " inside entity " +entity);
		}else if(!this.isValidType(dataModelJSON[entity][field].type,validTypes)){
		    errors.push("Invalid type for field " +field+ " inside " +entity);
		}else if(dataModelJSON[entity][field].type==="hasMany"){
			if(check.not.defined(dataModelJSON[entity][field].entity)){
				errors.push("Entity undefined for field " +field+ " inside " +entity);
			}else if(!this.isValidEntity(dataModelJSON[entity][field].entity,dataModelJSON)){
                errors.push("Entity "+ dataModelJSON[entity][field].entity + 
                	" for field " +field+ " doesn't exist inside this model");
			}
		}
	  }
  }
  if(errors.length>0){
        throw errors.join("\n");
    }else{
    	return true;
    }
};
validator.isValidType=function isValidType(fieldType,validTypes){
  if(validTypes.indexOf(fieldType)!==-1){
	return true;
  }else{
	return false;
  }
};
validator.isValidEntity=function isValidEntity(fieldEntity,dataModel){
	var isValid=false;
	for (var entity in dataModel){
		if(entity===fieldEntity){
			isValid=true;
		}
	}
	return isValid;
};
