'use strict';

let assert = require('assert');

let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

// CodePlan 
//crewMember is a class
	// in the constructor assign name, job and special skill
	// this.ship is null
	// will have a method called entership
//ship is a class
	// in the constructor assign name, type, ability an empty crew array and missionStatement method

//ships need crewmembers to be mission ready

/*
class Transformer {
  constructor(name,type,color){
    this.name = name;
    this.type = type;
    this.color = color;
    this.transformerTeam = null;
  }
  printOutName = () => {
    console.log(this.name);
  }
  assignToTeam = (transformerTeam) => {
    //console.log('assign to team', transformerTeam, this);
    transformerTeam.crew.push(this);
    //this.transformerTeam = transformerTeam.name;
    this.transformerTeam = transformerTeam;
  }
}

class TransformersTeam {
  constructor(name,id,purpose){
    this.name = name;
    this.id = id;
    this.purpose = purpose;
    this.crew = [];
  }
}
//const megatron = new Transformer('megatron','gun','silver');
const optimusPrime = new Transformer('optimus prime', 'truck', 'blue');
const autoBots = new TransformersTeam('Auto Bots',1337,'Roll Out');
optimusPrime.assignToTeam(autoBots);

*/

// Your code here

class CrewMember {
  constructor(name,job,specialSkill,ship) {
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = ship;
  }
  // Getter
  job() {
    return this.job;
  }
  // Method
  enterShip(shipEnterred) {
    shipEnterred.crew.push(this);
    this.ship = shipEnterred;
  }
    
}
class Ship {
  constructor(name,type,ability){
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
  }
  missionStatement() {
    if ( this.crew.length > 0 ) {
      console.log(this.ability);
      return this.ability;
    } else {
      console.log("Can't perform a mission yet.");
      return "Can't perform a mission yet.";
    }
  }
}


let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
crewMember1.enterShip(mav);
crewMember2.enterShip(hermes);
hermes.missionStatement()
mav.missionStatement()


//tests
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
