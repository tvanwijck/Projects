/**
 * COMPASS DATA
 * Questions for Compass Commander game mode
 * All bearings calculated from point2 to point1 (which direction is point1 from point2)
 * Bearing is in degrees (0-360°), where 0° = North, 90° = East, 180° = South, 270° = West
 */

// Helper function to calculate bearing between two coordinates
function calculateBearing(lat1, lon1, lat2, lon2) {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
              Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    return (bearing + 360) % 360; // Normalize to 0-360
}

// Create compass data by reusing distance data and calculating bearings
// Bearing is from point2 to point1 (direction of point1 from point2)
GAME_DATA.compass = [];

// Helper to add a compass question
function addCompassQuestion(point1, point2) {
    const [lat1, lon1] = point1.coords;
    const [lat2, lon2] = point2.coords;
    // Calculate bearing FROM point2 TO point1 (which direction is point1 from point2)
    // The calculateBearing function calculates bearing FROM (lat1, lon1) TO (lat2, lon2)
    // So to get bearing FROM point2 TO point1, we pass (lat2, lon2, lat1, lon1)
    const bearing = calculateBearing(lat2, lon2, lat1, lon1);
    GAME_DATA.compass.push({
        point1: point1,
        point2: point2,
        bearing: Math.round(bearing * 100) / 100 // Round to 2 decimal places
    });
}

// Reuse some interesting pairs from distance data
const distanceData = [
    // Europe Landmarks
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Big Ben", coords: [51.500812, -0.123799] } },
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Colosseum", coords: [41.890481, 12.490253] } },
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Sagrada Familia", coords: [41.40439551744445, 2.1757649578628007] } },
    { point1: { name: "Big Ben", coords: [51.500812, -0.123799] }, point2: { name: "Colosseum", coords: [41.890481, 12.490253] } },
    { point1: { name: "Colosseum", coords: [41.890481, 12.490253] }, point2: { name: "Acropolis", coords: [37.972103642875915, 23.726746206652006] } },
    
    // Europe to Americas
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Empire State Building", coords: [40.748817, -73.985428] } },
    { point1: { name: "Big Ben", coords: [51.500812, -0.123799] }, point2: { name: "Empire State Building", coords: [40.748817, -73.985428] } },
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] } },
    
    // Europe to Asia
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Tokyo", coords: [35.676192, 139.650311] } },
    { point1: { name: "Big Ben", coords: [51.500812, -0.123799] }, point2: { name: "Tokyo", coords: [35.676192, 139.650311] } },
    { point1: { name: "Colosseum", coords: [41.890481, 12.490253] }, point2: { name: "Taj Mahal", coords: [27.1691555, 78.0421269] } },
    
    // Americas
    { point1: { name: "Empire State Building", coords: [40.748817, -73.985428] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] } },
    { point1: { name: "New York City", coords: [40.712776, -74.005974] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] } },
    { point1: { name: "Los Angeles", coords: [34.052235, -118.243683] }, point2: { name: "San Francisco", coords: [37.774929, -122.419418] } },
    
    // Americas to Asia
    { point1: { name: "Empire State Building", coords: [40.748817, -73.985428] }, point2: { name: "Tokyo", coords: [35.676192, 139.650311] } },
    { point1: { name: "Los Angeles", coords: [34.052235, -118.243683] }, point2: { name: "Tokyo", coords: [35.676192, 139.650311] } },
    
    // Asia
    { point1: { name: "Tokyo", coords: [35.676192, 139.650311] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] } },
    { point1: { name: "Tokyo", coords: [35.676192, 139.650311] }, point2: { name: "Seoul", coords: [37.5510944348319, 126.98800761915595] } },
    { point1: { name: "Tokyo", coords: [35.676192, 139.650311] }, point2: { name: "Beijing", coords: [39.904211, 116.407395] } },
    { point1: { name: "Singapore", coords: [1.352083, 103.819836] }, point2: { name: "Bangkok", coords: [13.756331, 100.501762] } },
    
    // European Cities
    { point1: { name: "Paris", coords: [48.856614, 2.352222] }, point2: { name: "London", coords: [51.507351, -0.127758] } },
    { point1: { name: "Paris", coords: [48.856614, 2.352222] }, point2: { name: "Berlin", coords: [52.520008, 13.404954] } },
    { point1: { name: "Paris", coords: [48.856614, 2.352222] }, point2: { name: "Madrid", coords: [40.416775, -3.703790] } },
    { point1: { name: "London", coords: [51.507351, -0.127758] }, point2: { name: "Berlin", coords: [52.520008, 13.404954] } },
    { point1: { name: "Berlin", coords: [52.520008, 13.404954] }, point2: { name: "Rome", coords: [41.902782, 12.496366] } },
    { point1: { name: "Amsterdam", coords: [52.367573, 4.904139] }, point2: { name: "Prague", coords: [50.075538, 14.437800] } },
    { point1: { name: "Vienna", coords: [48.208174, 16.373819] }, point2: { name: "Budapest", coords: [47.497912, 19.040235] } },
    { point1: { name: "Stockholm", coords: [59.329323, 18.068581] }, point2: { name: "Copenhagen", coords: [55.676097, 12.568337] } },
    { point1: { name: "Moscow", coords: [55.755826, 37.617300] }, point2: { name: "St. Petersburg", coords: [59.934280, 30.335099] } },
    
    // Asian Cities
    { point1: { name: "Mumbai", coords: [19.076090, 72.877426] }, point2: { name: "Delhi", coords: [28.613939, 77.209021] } },
    { point1: { name: "Mumbai", coords: [19.076090, 72.877426] }, point2: { name: "Dubai", coords: [25.204849, 55.270782] } },
    { point1: { name: "Bangkok", coords: [13.756331, 100.501762] }, point2: { name: "Hong Kong", coords: [22.319304, 114.169361] } },
    { point1: { name: "Jakarta", coords: [-6.208763, 106.845599] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] } },
    { point1: { name: "Sydney", coords: [-33.868820, 151.209296] }, point2: { name: "Melbourne", coords: [-37.813628, 144.963058] } },
    { point1: { name: "Sydney", coords: [-33.868820, 151.209296] }, point2: { name: "Tokyo", coords: [35.676192, 139.650311] } },
    
    // American Cities
    { point1: { name: "Miami", coords: [25.761680, -80.191790] }, point2: { name: "New York City", coords: [40.712776, -74.005974] } },
    { point1: { name: "Miami", coords: [25.761680, -80.191790] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] } },
    { point1: { name: "Toronto", coords: [43.653226, -79.383184] }, point2: { name: "New York City", coords: [40.712776, -74.005974] } },
    { point1: { name: "Toronto", coords: [43.653226, -79.383184] }, point2: { name: "Chicago", coords: [41.878113, -87.629799] } },
    { point1: { name: "Mexico City", coords: [19.432608, -99.133208] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] } },
    { point1: { name: "São Paulo", coords: [-23.550520, -46.633308] }, point2: { name: "Rio de Janeiro", coords: [-22.906847, -43.172896] } },
    
    // Cross-continental
    { point1: { name: "Cairo", coords: [30.044420, 31.235712] }, point2: { name: "Dubai", coords: [25.204849, 55.270782] } },
    { point1: { name: "Cairo", coords: [30.044420, 31.235712] }, point2: { name: "Istanbul", coords: [41.008238, 28.978359] } },
    { point1: { name: "Johannesburg", coords: [-26.204103, 28.047305] }, point2: { name: "Cape Town", coords: [-33.924868, 18.424055] } },
    { point1: { name: "Sydney", coords: [-33.868820, 151.209296] }, point2: { name: "Auckland", coords: [-36.848460, 174.763332] } },
    
    // Landmarks
    { point1: { name: "Petra", coords: [30.3216354, 35.4801251] }, point2: { name: "Pyramids of Giza", coords: [29.979235, 31.134202] } },
    { point1: { name: "Petra", coords: [30.3216354, 35.4801251] }, point2: { name: "Taj Mahal", coords: [27.1691555, 78.0421269] } },
    { point1: { name: "Machu Picchu", coords: [-13.163068, -72.544961] }, point2: { name: "Rio de Janeiro", coords: [-22.906847, -43.172896] } },
    
    // Additional interesting pairs
    { point1: { name: "Barcelona", coords: [41.385063, 2.173404] }, point2: { name: "Rome", coords: [41.902782, 12.496366] } },
    { point1: { name: "Barcelona", coords: [41.385063, 2.173404] }, point2: { name: "Paris", coords: [48.856614, 2.352222] } },
    { point1: { name: "Amsterdam", coords: [52.367573, 4.904139] }, point2: { name: "Berlin", coords: [52.520008, 13.404954] } },
    { point1: { name: "Amsterdam", coords: [52.367573, 4.904139] }, point2: { name: "Paris", coords: [48.856614, 2.352222] } },
    { point1: { name: "Vienna", coords: [48.208174, 16.373819] }, point2: { name: "Prague", coords: [50.075538, 14.437800] } },
    { point1: { name: "Vienna", coords: [48.208174, 16.373819] }, point2: { name: "Rome", coords: [41.902782, 12.496366] } },
    
    { point1: { name: "Hong Kong", coords: [22.319304, 114.169361] }, point2: { name: "Shanghai", coords: [31.230391, 121.473701] } },
    { point1: { name: "Hong Kong", coords: [22.319304, 114.169361] }, point2: { name: "Tokyo", coords: [35.676192, 139.650311] } },
    { point1: { name: "Delhi", coords: [28.613939, 77.209021] }, point2: { name: "Mumbai", coords: [19.076090, 72.877426] } },
    { point1: { name: "Delhi", coords: [28.613939, 77.209021] }, point2: { name: "Dubai", coords: [25.204849, 55.270782] } },
    
    { point1: { name: "Vancouver", coords: [49.282729, -123.120738] }, point2: { name: "Seattle", coords: [47.606209, -122.332071] } },
    { point1: { name: "Vancouver", coords: [49.282729, -123.120738] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] } },
    { point1: { name: "Mexico City", coords: [19.432608, -99.133208] }, point2: { name: "Buenos Aires", coords: [-34.603722, -58.381592] } },
    
    { point1: { name: "Dubai", coords: [25.204849, 55.270782] }, point2: { name: "London", coords: [51.507351, -0.127758] } },
    { point1: { name: "Dubai", coords: [25.204849, 55.270782] }, point2: { name: "Sydney", coords: [-33.868820, 151.209296] } },
    { point1: { name: "Istanbul", coords: [41.008238, 28.978359] }, point2: { name: "Athens", coords: [37.983810, 23.727539] } },
    { point1: { name: "Istanbul", coords: [41.008238, 28.978359] }, point2: { name: "Moscow", coords: [55.755826, 37.617300] } },
    
    // More combinations
    { point1: { name: "Oslo", coords: [59.913869, 10.752245] }, point2: { name: "Stockholm", coords: [59.329323, 18.068581] } },
    { point1: { name: "Dublin", coords: [53.349805, -6.260310] }, point2: { name: "London", coords: [51.507351, -0.127758] } },
    { point1: { name: "Warsaw", coords: [52.229676, 21.012229] }, point2: { name: "Berlin", coords: [52.520008, 13.404954] } },
    { point1: { name: "Athens", coords: [37.983810, 23.727539] }, point2: { name: "Istanbul", coords: [41.008238, 28.978359] } },
    { point1: { name: "Brussels", coords: [50.850346, 4.351721] }, point2: { name: "Amsterdam", coords: [52.367573, 4.904139] } },
    { point1: { name: "Brussels", coords: [50.850346, 4.351721] }, point2: { name: "Paris", coords: [48.856614, 2.352222] } },
    
    { point1: { name: "Kuala Lumpur", coords: [3.139003, 101.686855] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] } },
    { point1: { name: "Ho Chi Minh City", coords: [10.823099, 106.629664] }, point2: { name: "Bangkok", coords: [13.756331, 100.501762] } },
    
    { point1: { name: "Montreal", coords: [45.501689, -73.567256] }, point2: { name: "Toronto", coords: [43.653226, -79.383184] } },
    { point1: { name: "Boston", coords: [42.360083, -71.058880] }, point2: { name: "New York City", coords: [40.712776, -74.005974] } },
    { point1: { name: "Washington D.C.", coords: [38.907192, -77.036873] }, point2: { name: "New York City", coords: [40.712776, -74.005974] } },
    { point1: { name: "Las Vegas", coords: [36.169941, -115.139832] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] } },
    
    { point1: { name: "Santiago", coords: [-33.448890, -70.669265] }, point2: { name: "Buenos Aires", coords: [-34.603722, -58.381592] } },
    { point1: { name: "Cape Town", coords: [-33.924868, 18.424055] }, point2: { name: "Johannesburg", coords: [-26.204103, 28.047305] } },
    { point1: { name: "Casablanca", coords: [33.573110, -7.589843] }, point2: { name: "Madrid", coords: [40.416775, -3.703790] } }
];

// Add all questions
distanceData.forEach(item => {
    addCompassQuestion(item.point1, item.point2);
});
