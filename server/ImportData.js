const XLSX = require('xlsx');
const Building = require('./Building.js')



// --------------------   Buildings and Building Cordinates   --------------------
// Load Buildings and Cordinates file
class ImportData {
    constructor() {
      if (this instanceof StaticClass) {
        throw Error('A static class cannot be instantiated.');
      }
    }
    // Loads the buildings. Only execute one time.
    static loadBuildings() {
        const workbook = XLSX.readFile('coordinates_output.xlsx');
        
        // Select the first and only sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert the sheet to JSON
        const data = XLSX.utils.sheet_to_json(worksheet);
        
        // Populate the building container
        try{ 
            for (let i = 0; i < data.length; i++) {
                const building_name = data[i].prefix;
                const building_latitude = data[i].lat;
                const building_longitude = data[i].long;
        
                Building.addBuilding(building_name, building_latitude,building_longitude);
                
                // Debugging console logs:
                // console.log(building_name);
                // console.log(building_latitude);
                // console.log(building_longitude);
                // console.log("Row Data:", data[i]); // Add this line to debug
                
            }
            console.log("IMPORTED SUCCESFULLY, (" + Building.buildingContainer.length + ") buildings with cordinates");
        } catch (error) {
            console.error("Failed to add building-cordinate data:", error.message);
        }
        
    }
  }


//console.log(data);

// --------------------   Buildings and Building Cordinates   --------------------

