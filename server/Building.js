const ClassRoom = require('./ClassRoom.js')

class Building{
    constructor(name, latitude, longitude, full_name){
        this.name = name;
        this.full_name = full_name;
        this.classrooms = [];
        this.latitude = latitude;
        this.longitude = longitude;

    }
    
    // Static container for ALL buildings
    static buildingContainer = [];

    // Method to create and add a building to the container
    static addBuilding(name, latitude, longitude) {
        try {
            const newBuilding = new Building(name, latitude, longitude);
            Building.buildingContainer.push(newBuilding);
    
            // Temporary print statement for debugging
            //console.log("New building added:");
            //console.log(newBuilding);
        } catch (error) {
            console.error("Failed to add building:", error.message);
        }
    }

    // Method to get all buildings from the container (Retreived by frontend)
    static getAllBuildings() {
        return Building.buildingContainer;
    }

    // Method to append building
    static appendClassroomToBuilding(building_name, classroom) {
        // Find desired building
        const building = Building.buildingContainer.find(b => b.name === building_name);
        
        if (building) {
            // Append the classroom to the building's classrooms array
            building.classrooms.push(classroom);
            //console.log(`Classroom added to ${building_name}`);
        } else {
            console.error(`Building ${building_name} not found`);
        }
    }

}

module.exports = Building;