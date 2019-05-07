const Blueprint = require('factorio-blueprint');
const fs = require('fs');
var path = require('path');
const zlib = require('zlib');

var blueprintsPath = './blueprints'
var booksPath = './out/books'

Blueprint.setEntityData({
  nuclear_fuel: {
    type: 'item'
  },
  solid_fuel_from_light_oil: {
    type: 'item'
  },
  automation_science_pack: {
    type: 'item'
  },
  chemical_science_pack: {
    type: 'item'
  },
  logistic_science_pack: {
    type: 'item'
  },
  signal_check: {
    type: 'item'
  },
  utility_science_pack: {
    type: 'item'
  },
  cliff_explosives: {
    type: 'item'
  },
  artillery_wagon: {
    type: 'item'
  },
  signal_info: {
    type: 'item'
  },
  signal_dot: {
    type: 'item'
  },
  belt_immunity_equipment: {
    type: 'item'
  },
  artillery_shell: {
    type: 'item'
  },
})

function toTitleCase(str) {
    return str.toLowerCase()
			    .split('_')
			    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			    .join(' ');
}

// Because the function in factorio-blueprint return undefined 
function toBookFixed(blueprints, activeIndex = 0) {
  let obj = {
    blueprint_book: {
      blueprints: blueprints.map(bp => bp.toObject()),
      item: 'blueprint-book',
      active_index: activeIndex,
      version: 0
    }
  }

  return '0' + zlib.deflateSync(JSON.stringify(obj)).toString('base64');
}

var folders = fs.readdirSync(blueprintsPath)

console.log("=================== " + folders.length + " directories found ===================")

// Make a book for each directory
folders.forEach(function (folder, index) {
  var folderPath = path.join(blueprintsPath, folder);
  var bookName = toTitleCase(folder)

  var bookBlueprints = []

  var files = fs.readdirSync(folderPath)

  files.forEach(function (file, index) {
    var filePath = path.join(folderPath, file);
    if (fs.lstatSync(filePath).isFile())
    {
      var blueprintStr = fs.readFileSync(filePath,'utf8');
      const importedBlueprint = new Blueprint(blueprintStr)
      bookBlueprints.push(importedBlueprint);
    }
  })

  var bookStr = toBookFixed(bookBlueprints)

  var savePath = path.join(booksPath, folder + ".txt")
  fs.writeFile(savePath, bookStr, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log(bookName + ": " + bookBlueprints.length + " blueprints compiled")
  });
})


/*
// Create a blueprint with nothing in it
const myBlueprint = new Blueprint();

// Modify the blueprint!
myBlueprint.createEntity('transport-belt', { x: 0, y: 0 }, Blueprint.UP);
//importedBlueprint.entities[0].remove();

var blueprints = [myBlueprint]
activeIndex = 0



console.log(bookStr)
// Export the string to use in-game
//console.log(Blueprint.toBook([myBlueprint]));
*/