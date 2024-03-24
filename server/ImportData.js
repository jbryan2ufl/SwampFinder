const XLSX = require('xlsx');
const Building = require('./Building.js')
const ClassRoom = require('./ClassRoom.js')


// Function to separate data before and after underscore
function separateData(str) {
    if (typeof str !== 'string' || str.trim() === '') {
        throw new Error("Invalid input: Input must be a non-empty string:"+str);
    }

    const parts = str.split('_'); // Split the string at the underscore
    if (parts.length === 2) { // Ensure there is one underscore
        const beforeUnderscore = parts[0]; // Get the part before underscore
        const afterUnderscore = parts[1]; // Get the part after underscore
        return { beforeUnderscore, afterUnderscore };
    } else {
        throw new Error("Invalid format: Input must contain exactly one underscore.");
    }
}

//Class handles data import
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
                const building_name = data.at(i).prefix;
                const building_latitude = data.at(i).lat;
                const building_longitude = data.at(i).long;
                const full_name = data.at(i).building_name;
        
                Building.addBuilding(building_name, building_latitude,building_longitude, full_name);
                
                // Debugging console logs:
                // console.log(building_name);
                // console.log(building_latitude);
                // console.log(building_longitude);
                // console.log("Row Data:", data[i]); // Add this line to debug
                

            }
        }
        
        
    }
    // Populates ALL classrooms for ALL buildings
    static loadClassRooms() {
        const workbook = XLSX.readFile('RoomsData.xlsx');
        var count = workbook.SheetNames.length;
        
        console.log("INFO: Attempting to load(" + count + ") Classrooms to buildings");
        for(let s = 0; s < (count); s++){
            // Select a sheet (Classroom)
            const sheetName = workbook.SheetNames[s];
            const worksheet = workbook.Sheets[sheetName];
            
            //console.log("TEST: sheetname = "+sheetName+"  ---> count = "+s);

            const { beforeUnderscore: building_name, afterUnderscore: room_number } = separateData(sheetName)
            
            // Convert the sheet (Classroom) to JSON
            const sheet_data = XLSX.utils.sheet_to_json(worksheet);
            const columnNames = Object.keys(sheet_data[1]);
            //console.log("Column Names:", columnNames, " and columnNames[0] = ",columnNames[2]);

            var timeTable = [];
            var count2 = 0; 
            for(let i = 0; i < 14; i++){
                timeTable[i] = []; //initializing as two dimentional array

                timeTable[i][0] = sheet_data[i].M;
                timeTable[i][1] = sheet_data[i].T;
                timeTable[i][2] = sheet_data[i].W;
                timeTable[i][3] = sheet_data[i].R;
                timeTable[i][4] = sheet_data[i].F;
                timeTable[i][5] = sheet_data[i].S;
                count2++;
            }
            //console.log("INFO: for classroom ("+count+"), "+count2+" of (14) period rows processed. Data -->"+ timeTable);
            //const numRows = timeTable.length;
            //const numCols = timeTable[0].length;

            //console.log("Size of timeTable: Rows =", numRows, ", Columns =", numCols);




            const classroom = new ClassRoom(building_name, room_number, timeTable)
            Building.appendClassroomToBuilding(building_name, classroom);

        }
        console.log("INFO: Finished to load Classrooms. Look for any errors above of failed loads above this line");

    }
        
}

//console.log(data);

// --------------------   Buildings and Building Cordinates   --------------------


ImportData.loadBuildings();
ImportData.loadClassRooms();
//console.log(Building.buildingContainer);
//console.log(Building.buildingContainer[1].classrooms[0].name);


module.exports = ImportData;