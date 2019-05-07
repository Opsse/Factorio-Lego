const Blueprint = require('factorio-blueprint');
const fs = require('fs');
var path = require('path');

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

fs.readdir(blueprintsPath, function (err, folders) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  console.log("=================== " + folders.length + " directories found ===================")

  // Make a book for each directory
  folders.forEach(function (folder, index) {
  	var folderPath = path.join(blueprintsPath, folder);
  	var bookName = toTitleCase(folder)

    var bookBlueprints = []

    fs.readdir(folderPath, function (err, files) {
      if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
      }

      files.forEach(function (file, index) {
        var filePath = path.join(folderPath, file);
        if (fs.lstatSync(filePath).isFile())
        {
          var encodedText = fs.readFileSync(filePath,'utf8');
          const importedBlueprint = new Blueprint(encodedText)
          bookBlueprints.push(importedBlueprint);
        }
      })
    })

    console.log(bookBlueprints)
    Blueprint.toBook(bookBlueprints)

    console.log(bookName + ": " + bookBlueprints.length + " blueprints compiled")
  })
})


/*
var text = fs.readFileSync('./frames/frame_1x1.txt','utf8');

console.log(text);

// Import a blueprint using a blueprint string
const importedBlueprint = new Blueprint("");

// Modify the blueprint!
myBlueprint.createEntity('transport-belt', { x: 0, y: 0 }, Blueprint.UP);
//importedBlueprint.entities[0].remove();

// Export the string to use in-game
console.log(myBlueprint.encode());
*/