const Blueprint = require('factorio-blueprint');
const fs = require('fs');

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
  artillery_targeting_remote: {
    type: 'item'
  },
  uranium_processing: {
    type: 'recipe'
  },
  nuclear_fuel_reprocessing: {
    type: 'recipe'
  },
  kovarex_enrichment_process: {
    type: 'recipe'
  }
})

function toTitleCase(str) {
    return str.toLowerCase()
			    .split('_')
			    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			    .join(' ');
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

  var bookStr = Blueprint.toBook(bookBlueprints)

  var savePath = path.join(booksPath, folder + ".txt")
  fs.writeFile(savePath, bookStr, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log(bookName + ": " + bookBlueprints.length + " blueprints compiled")
  });
})
