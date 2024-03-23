class Building{
    constructor(name, latitude, longitude){
        this.name = name;
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

    // Method to get all buildings from the container
    static getAllBuildings() {
        return Building.buildingContainer;
    }

}

module.exports = Building;