"use strict"

var modelValidator = require("../dataModelValidator");
var ChaiJS = require("chai");
var expect = ChaiJS.expect;
var dataModel = require("../dataModel");

describe("dataModelValidator", function(){
  it("returns true when passing", function() {
    expect(modelValidator.validateDataModel(dataModel)).to.be.true;
  });
  it("should throw and exception for invalid type", function() {
  	dataModel.life_event.title.type="float";
  	expect(function(){modelValidator.validateDataModel(dataModel)}).to.throw();
  });
  describe("IsValidType",function(){
        it("Should return false for not defined valid type",function(){
        	expect(modelValidator.isValidType("float",["string","boolean","int"])).to.be.false;
        });
        it("Should return true for defined valid type",function(){
        	expect(modelValidator.isValidType("float",["string","boolean","float"])).to.be.true;
        });
  });
  describe("IsValidEntity",function(){
        it("Should return false if entity doesn't exist on the model",function(){
        	expect(modelValidator.isValidEntity("rivers",dataModel)).to.be.false;
        });
        it("Should return true if entity exist on the model",function(){
        	expect(modelValidator.isValidEntity("life_event",dataModel)).to.be.true;
        });
  });
});