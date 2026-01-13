/**
 * DISTANCE DATA
 * Questions for Distance Decider game mode
 * All distances calculated using Haversine formula (great-circle distance)
 */

// Helper function to calculate distance (for reference, distances are pre-calculated)
// Distance = haversineDistance(point1.coords, point2.coords)

GAME_DATA.distance = [
    // Europe Landmarks
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Big Ben", coords: [51.500812, -0.123799] }, distance: 344 },
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Colosseum", coords: [41.890481, 12.490253] }, distance: 1107 },
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Sagrada Familia", coords: [41.40439551744445, 2.1757649578628007] }, distance: 829 },
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Acropolis", coords: [37.972103642875915, 23.726746206652006] }, distance: 2098 },
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Charles Bridge", coords: [50.08663381533131, 14.410233872729247] }, distance: 883 },
    { point1: { name: "Big Ben", coords: [51.500812, -0.123799] }, point2: { name: "Colosseum", coords: [41.890481, 12.490253] }, distance: 1436 },
    { point1: { name: "Big Ben", coords: [51.500812, -0.123799] }, point2: { name: "Sagrada Familia", coords: [41.40439551744445, 2.1757649578628007] }, distance: 1144 },
    { point1: { name: "Big Ben", coords: [51.500812, -0.123799] }, point2: { name: "Acropolis", coords: [37.972103642875915, 23.726746206652006] }, distance: 2393 },
    { point1: { name: "Colosseum", coords: [41.890481, 12.490253] }, point2: { name: "Acropolis", coords: [37.972103642875915, 23.726746206652006] }, distance: 1050 },
    { point1: { name: "Colosseum", coords: [41.890481, 12.490253] }, point2: { name: "Sagrada Familia", coords: [41.40439551744445, 2.1757649578628007] }, distance: 858 },
    
    // Europe to Americas
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Empire State Building", coords: [40.748817, -73.985428] }, distance: 5837 },
    { point1: { name: "Big Ben", coords: [51.500812, -0.123799] }, point2: { name: "Empire State Building", coords: [40.748817, -73.985428] }, distance: 5585 },
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] }, distance: 9105 },
    { point1: { name: "Big Ben", coords: [51.500812, -0.123799] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] }, distance: 8755 },
    { point1: { name: "Colosseum", coords: [41.890481, 12.490253] }, point2: { name: "New York City", coords: [40.712776, -74.005974] }, distance: 6868 },
    { point1: { name: "Sagrada Familia", coords: [41.40439551744445, 2.1757649578628007] }, point2: { name: "New York City", coords: [40.712776, -74.005974] }, distance: 6163 },
    
    // Europe to Asia
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Tokyo", coords: [35.676192, 139.650311] }, distance: 9719 },
    { point1: { name: "Big Ben", coords: [51.500812, -0.123799] }, point2: { name: "Tokyo", coords: [35.676192, 139.650311] }, distance: 9566 },
    { point1: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] }, distance: 10853 },
    { point1: { name: "Big Ben", coords: [51.500812, -0.123799] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] }, distance: 10895 },
    { point1: { name: "Colosseum", coords: [41.890481, 12.490253] }, point2: { name: "Taj Mahal", coords: [27.1691555, 78.0421269] }, distance: 5891 },
    { point1: { name: "Acropolis", coords: [37.972103642875915, 23.726746206652006] }, point2: { name: "Taj Mahal", coords: [27.1691555, 78.0421269] }, distance: 4913 },
    { point1: { name: "Colosseum", coords: [41.890481, 12.490253] }, point2: { name: "Great Wall", coords: [40.43158189328044, 116.56447849733998] }, distance: 8086 },
    
    // Americas
    { point1: { name: "Empire State Building", coords: [40.748817, -73.985428] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] }, distance: 3944 },
    { point1: { name: "New York City", coords: [40.712776, -74.005974] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] }, distance: 3945 },
    { point1: { name: "Empire State Building", coords: [40.748817, -73.985428] }, point2: { name: "Chicago", coords: [41.878113, -87.629799] }, distance: 1145 },
    { point1: { name: "Los Angeles", coords: [34.052235, -118.243683] }, point2: { name: "Chicago", coords: [41.878113, -87.629799] }, distance: 2806 },
    { point1: { name: "New York City", coords: [40.712776, -74.005974] }, point2: { name: "San Francisco", coords: [37.774929, -122.419418] }, distance: 4139 },
    { point1: { name: "Los Angeles", coords: [34.052235, -118.243683] }, point2: { name: "San Francisco", coords: [37.774929, -122.419418] }, distance: 559 },
    
    // Americas to Asia
    { point1: { name: "Empire State Building", coords: [40.748817, -73.985428] }, point2: { name: "Tokyo", coords: [35.676192, 139.650311] }, distance: 10858 },
    { point1: { name: "Los Angeles", coords: [34.052235, -118.243683] }, point2: { name: "Tokyo", coords: [35.676192, 139.650311] }, distance: 8815 },
    { point1: { name: "New York City", coords: [40.712776, -74.005974] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] }, distance: 15347 },
    { point1: { name: "Los Angeles", coords: [34.052235, -118.243683] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] }, distance: 14143 },
    
    // Asia
    { point1: { name: "Tokyo", coords: [35.676192, 139.650311] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] }, distance: 5317 },
    { point1: { name: "Tokyo", coords: [35.676192, 139.650311] }, point2: { name: "Seoul", coords: [37.5510944348319, 126.98800761915595] }, distance: 1159 },
    { point1: { name: "Tokyo", coords: [35.676192, 139.650311] }, point2: { name: "Beijing", coords: [39.904211, 116.407395] }, distance: 2096 },
    { point1: { name: "Tokyo", coords: [35.676192, 139.650311] }, point2: { name: "Shanghai", coords: [31.230391, 121.473701] }, distance: 1765 },
    { point1: { name: "Singapore", coords: [1.352083, 103.819836] }, point2: { name: "Bangkok", coords: [13.756331, 100.501762] }, distance: 1414 },
    { point1: { name: "Singapore", coords: [1.352083, 103.819836] }, point2: { name: "Hong Kong", coords: [22.319304, 114.169361] }, distance: 2588 },
    { point1: { name: "Taj Mahal", coords: [27.1691555, 78.0421269] }, point2: { name: "Great Wall", coords: [40.43158189328044, 116.56447849733998] }, distance: 4022 },
    { point1: { name: "Taj Mahal", coords: [27.1691555, 78.0421269] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] }, distance: 4106 },
    { point1: { name: "Seoul", coords: [37.5510944348319, 126.98800761915595] }, point2: { name: "Beijing", coords: [39.904211, 116.407395] }, distance: 957 },
    
    // Special Locations
    { point1: { name: "North Pole", coords: [90, 0] }, point2: { name: "South Pole", coords: [-90, 0] }, distance: 20015 },
    { point1: { name: "North Pole", coords: [90, 0] }, point2: { name: "Equator (0,0)", coords: [0, 0] }, distance: 10008 },
    { point1: { name: "South Pole", coords: [-90, 0] }, point2: { name: "Equator (0,0)", coords: [0, 0] }, distance: 10008 },
    
    // Additional European Cities
    { point1: { name: "Paris", coords: [48.856614, 2.352222] }, point2: { name: "London", coords: [51.507351, -0.127758] }, distance: 344 },
    { point1: { name: "Paris", coords: [48.856614, 2.352222] }, point2: { name: "Berlin", coords: [52.520008, 13.404954] }, distance: 878 },
    { point1: { name: "Paris", coords: [48.856614, 2.352222] }, point2: { name: "Madrid", coords: [40.416775, -3.703790] }, distance: 1053 },
    { point1: { name: "Paris", coords: [48.856614, 2.352222] }, point2: { name: "Rome", coords: [41.902782, 12.496366] }, distance: 1107 },
    { point1: { name: "London", coords: [51.507351, -0.127758] }, point2: { name: "Berlin", coords: [52.520008, 13.404954] }, distance: 933 },
    { point1: { name: "London", coords: [51.507351, -0.127758] }, point2: { name: "Madrid", coords: [40.416775, -3.703790] }, distance: 1263 },
    { point1: { name: "Berlin", coords: [52.520008, 13.404954] }, point2: { name: "Rome", coords: [41.902782, 12.496366] }, distance: 1182 },
    { point1: { name: "Madrid", coords: [40.416775, -3.703790] }, point2: { name: "Rome", coords: [41.902782, 12.496366] }, distance: 1365 },
    { point1: { name: "Lisbon", coords: [38.722252, -9.139337] }, point2: { name: "Barcelona", coords: [41.385063, 2.173404] }, distance: 1006 },
    { point1: { name: "Amsterdam", coords: [52.367573, 4.904139] }, point2: { name: "Prague", coords: [50.075538, 14.437800] }, distance: 717 },
    { point1: { name: "Vienna", coords: [48.208174, 16.373819] }, point2: { name: "Budapest", coords: [47.497912, 19.040235] }, distance: 216 },
    { point1: { name: "Stockholm", coords: [59.329323, 18.068581] }, point2: { name: "Copenhagen", coords: [55.676097, 12.568337] }, distance: 522 },
    { point1: { name: "Moscow", coords: [55.755826, 37.617300] }, point2: { name: "St. Petersburg", coords: [59.934280, 30.335099] }, distance: 634 },
    
    // Additional Asian Cities
    { point1: { name: "Mumbai", coords: [19.076090, 72.877426] }, point2: { name: "Delhi", coords: [28.613939, 77.209021] }, distance: 1154 },
    { point1: { name: "Mumbai", coords: [19.076090, 72.877426] }, point2: { name: "Dubai", coords: [25.204849, 55.270782] }, distance: 1934 },
    { point1: { name: "Bangkok", coords: [13.756331, 100.501762] }, point2: { name: "Hong Kong", coords: [22.319304, 114.169361] }, distance: 1728 },
    { point1: { name: "Bangkok", coords: [13.756331, 100.501762] }, point2: { name: "Manila", coords: [14.599512, 120.984222] }, distance: 2198 },
    { point1: { name: "Jakarta", coords: [-6.208763, 106.845599] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] }, distance: 887 },
    { point1: { name: "Sydney", coords: [-33.868820, 151.209296] }, point2: { name: "Melbourne", coords: [-37.813628, 144.963058] }, distance: 713 },
    { point1: { name: "Sydney", coords: [-33.868820, 151.209296] }, point2: { name: "Tokyo", coords: [35.676192, 139.650311] }, distance: 7818 },
    
    // Additional American Cities
    { point1: { name: "Miami", coords: [25.761680, -80.191790] }, point2: { name: "New York City", coords: [40.712776, -74.005974] }, distance: 1760 },
    { point1: { name: "Miami", coords: [25.761680, -80.191790] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] }, distance: 3783 },
    { point1: { name: "Toronto", coords: [43.653226, -79.383184] }, point2: { name: "New York City", coords: [40.712776, -74.005974] }, distance: 549 },
    { point1: { name: "Toronto", coords: [43.653226, -79.383184] }, point2: { name: "Chicago", coords: [41.878113, -87.629799] }, distance: 701 },
    { point1: { name: "Mexico City", coords: [19.432608, -99.133208] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] }, distance: 2494 },
    { point1: { name: "São Paulo", coords: [-23.550520, -46.633308] }, point2: { name: "Rio de Janeiro", coords: [-22.906847, -43.172896] }, distance: 358 },
    { point1: { name: "Buenos Aires", coords: [-34.603722, -58.381592] }, point2: { name: "São Paulo", coords: [-23.550520, -46.633308] }, distance: 1694 },
    
    // Cross-continental
    { point1: { name: "Cairo", coords: [30.044420, 31.235712] }, point2: { name: "Dubai", coords: [25.204849, 55.270782] }, distance: 2889 },
    { point1: { name: "Cairo", coords: [30.044420, 31.235712] }, point2: { name: "Istanbul", coords: [41.008238, 28.978359] }, distance: 1226 },
    { point1: { name: "Johannesburg", coords: [-26.204103, 28.047305] }, point2: { name: "Cape Town", coords: [-33.924868, 18.424055] }, distance: 1263 },
    { point1: { name: "Sydney", coords: [-33.868820, 151.209296] }, point2: { name: "Auckland", coords: [-36.848460, 174.763332] }, distance: 2156 },
    
    // More landmark combinations
    { point1: { name: "Petra", coords: [30.3216354, 35.4801251] }, point2: { name: "Pyramids of Giza", coords: [29.979235, 31.134202] }, distance: 457 },
    { point1: { name: "Petra", coords: [30.3216354, 35.4801251] }, point2: { name: "Taj Mahal", coords: [27.1691555, 78.0421269] }, distance: 3827 },
    { point1: { name: "Machu Picchu", coords: [-13.163068, -72.544961] }, point2: { name: "Rio de Janeiro", coords: [-22.906847, -43.172896] }, distance: 2995 },
    { point1: { name: "Machu Picchu", coords: [-13.163068, -72.544961] }, point2: { name: "Mexico City", coords: [19.432608, -99.133208] }, distance: 4200 },
    
    // Additional combinations for variety (using existing landmarks from explorer-data)
    { point1: { name: "Lisboa", coords: [38.699138013821575, -9.17743619115321] }, point2: { name: "Madrid", coords: [40.416775, -3.703790] }, distance: 502 },
    { point1: { name: "Lisboa", coords: [38.699138013821575, -9.17743619115321] }, point2: { name: "Paris", coords: [48.856614, 2.352222] }, distance: 1454 },
    { point1: { name: "Lisboa", coords: [38.699138013821575, -9.17743619115321] }, point2: { name: "Barcelona", coords: [41.385063, 2.173404] }, distance: 1001 },
    { point1: { name: "Lisboa", coords: [38.699138013821575, -9.17743619115321] }, point2: { name: "London", coords: [51.507351, -0.127758] }, distance: 1593 },
    { point1: { name: "Lisboa", coords: [38.699138013821575, -9.17743619115321] }, point2: { name: "New York City", coords: [40.712776, -74.005974] }, distance: 5373 },
    { point1: { name: "Lisboa", coords: [38.699138013821575, -9.17743619115321] }, point2: { name: "São Paulo", coords: [-23.550520, -46.633308] }, distance: 7581 },
    
    { point1: { name: "Tehran", coords: [35.6979886, 51.3395563] }, point2: { name: "Dubai", coords: [25.204849, 55.270782] }, distance: 1270 },
    { point1: { name: "Tehran", coords: [35.6979886, 51.3395563] }, point2: { name: "Istanbul", coords: [41.008238, 28.978359] }, distance: 1783 },
    { point1: { name: "Tehran", coords: [35.6979886, 51.3395563] }, point2: { name: "Delhi", coords: [28.613939, 77.209021] }, distance: 2326 },
    { point1: { name: "Tehran", coords: [35.6979886, 51.3395563] }, point2: { name: "Moscow", coords: [55.755826, 37.617300] }, distance: 2136 },
    { point1: { name: "Tehran", coords: [35.6979886, 51.3395563] }, point2: { name: "Beijing", coords: [39.904211, 116.407395] }, distance: 5766 },
    
    { point1: { name: "Seoul", coords: [37.5510944348319, 126.98800761915595] }, point2: { name: "Shanghai", coords: [31.230391, 121.473701] }, distance: 868 },
    { point1: { name: "Seoul", coords: [37.5510944348319, 126.98800761915595] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] }, distance: 4740 },
    { point1: { name: "Seoul", coords: [37.5510944348319, 126.98800761915595] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] }, distance: 9598 },
    { point1: { name: "Seoul", coords: [37.5510944348319, 126.98800761915595] }, point2: { name: "New York City", coords: [40.712776, -74.005974] }, distance: 11055 },
    
    // More European city combinations
    { point1: { name: "Barcelona", coords: [41.385063, 2.173404] }, point2: { name: "Rome", coords: [41.902782, 12.496366] }, distance: 857 },
    { point1: { name: "Barcelona", coords: [41.385063, 2.173404] }, point2: { name: "Paris", coords: [48.856614, 2.352222] }, distance: 829 },
    { point1: { name: "Barcelona", coords: [41.385063, 2.173404] }, point2: { name: "Istanbul", coords: [41.008238, 28.978359] }, distance: 2211 },
    { point1: { name: "Barcelona", coords: [41.385063, 2.173404] }, point2: { name: "London", coords: [51.507351, -0.127758] }, distance: 1144 },
    
    { point1: { name: "Amsterdam", coords: [52.367573, 4.904139] }, point2: { name: "Berlin", coords: [52.520008, 13.404954] }, distance: 577 },
    { point1: { name: "Amsterdam", coords: [52.367573, 4.904139] }, point2: { name: "Paris", coords: [48.856614, 2.352222] }, distance: 431 },
    { point1: { name: "Amsterdam", coords: [52.367573, 4.904139] }, point2: { name: "London", coords: [51.507351, -0.127758] }, distance: 357 },
    { point1: { name: "Amsterdam", coords: [52.367573, 4.904139] }, point2: { name: "Copenhagen", coords: [55.676097, 12.568337] }, distance: 622 },
    
    { point1: { name: "Vienna", coords: [48.208174, 16.373819] }, point2: { name: "Prague", coords: [50.075538, 14.437800] }, distance: 253 },
    { point1: { name: "Vienna", coords: [48.208174, 16.373819] }, point2: { name: "Warsaw", coords: [52.229676, 21.012229] }, distance: 546 },
    { point1: { name: "Vienna", coords: [48.208174, 16.373819] }, point2: { name: "Rome", coords: [41.902782, 12.496366] }, distance: 762 },
    
    // More Asian combinations
    { point1: { name: "Hong Kong", coords: [22.319304, 114.169361] }, point2: { name: "Taipei", coords: [25.032969, 121.565418] }, distance: 807 },
    { point1: { name: "Hong Kong", coords: [22.319304, 114.169361] }, point2: { name: "Manila", coords: [14.599512, 120.984222] }, distance: 1115 },
    { point1: { name: "Hong Kong", coords: [22.319304, 114.169361] }, point2: { name: "Shanghai", coords: [31.230391, 121.473701] }, distance: 1227 },
    { point1: { name: "Hong Kong", coords: [22.319304, 114.169361] }, point2: { name: "Tokyo", coords: [35.676192, 139.650311] }, distance: 2895 },
    
    { point1: { name: "Delhi", coords: [28.613939, 77.209021] }, point2: { name: "Mumbai", coords: [19.076090, 72.877426] }, distance: 1154 },
    { point1: { name: "Delhi", coords: [28.613939, 77.209021] }, point2: { name: "Kolkata", coords: [22.572645, 88.363892] }, distance: 1304 },
    { point1: { name: "Delhi", coords: [28.613939, 77.209021] }, point2: { name: "Bangalore", coords: [12.971599, 77.594566] }, distance: 1740 },
    { point1: { name: "Delhi", coords: [28.613939, 77.209021] }, point2: { name: "Dubai", coords: [25.204849, 55.270782] }, distance: 2197 },
    
    // More American combinations
    { point1: { name: "Vancouver", coords: [49.282729, -123.120738] }, point2: { name: "Seattle", coords: [47.606209, -122.332071] }, distance: 208 },
    { point1: { name: "Vancouver", coords: [49.282729, -123.120738] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] }, distance: 1770 },
    { point1: { name: "Vancouver", coords: [49.282729, -123.120738] }, point2: { name: "Toronto", coords: [43.653226, -79.383184] }, distance: 3354 },
    
    { point1: { name: "Mexico City", coords: [19.432608, -99.133208] }, point2: { name: "Buenos Aires", coords: [-34.603722, -58.381592] }, distance: 7030 },
    { point1: { name: "Mexico City", coords: [19.432608, -99.133208] }, point2: { name: "Lima", coords: [-12.046374, -77.042793] }, distance: 4181 },
    { point1: { name: "Mexico City", coords: [19.432608, -99.133208] }, point2: { name: "Bogotá", coords: [4.7110, -74.0721] }, distance: 2566 },
    
    // Additional cross-continental
    { point1: { name: "Dubai", coords: [25.204849, 55.270782] }, point2: { name: "London", coords: [51.507351, -0.127758] }, distance: 5492 },
    { point1: { name: "Dubai", coords: [25.204849, 55.270782] }, point2: { name: "Sydney", coords: [-33.868820, 151.209296] }, distance: 12029 },
    { point1: { name: "Dubai", coords: [25.204849, 55.270782] }, point2: { name: "Mumbai", coords: [19.076090, 72.877426] }, distance: 1934 },
    { point1: { name: "Dubai", coords: [25.204849, 55.270782] }, point2: { name: "Istanbul", coords: [41.008238, 28.978359] }, distance: 3031 },
    
    { point1: { name: "Istanbul", coords: [41.008238, 28.978359] }, point2: { name: "Athens", coords: [37.983810, 23.727539] }, distance: 806 },
    { point1: { name: "Istanbul", coords: [41.008238, 28.978359] }, point2: { name: "Moscow", coords: [55.755826, 37.617300] }, distance: 1755 },
    { point1: { name: "Istanbul", coords: [41.008238, 28.978359] }, point2: { name: "Rome", coords: [41.902782, 12.496366] }, distance: 1369 },
    
    // More landmark to city combinations
    { point1: { name: "Statue of Liberty", coords: [40.689247, -74.044502] }, point2: { name: "Golden Gate Bridge", coords: [37.819929, -122.478255] }, distance: 4128 },
    { point1: { name: "Statue of Liberty", coords: [40.689247, -74.044502] }, point2: { name: "Eiffel Tower", coords: [48.854122, 2.302195] }, distance: 5836 },
    { point1: { name: "Christ the Redeemer", coords: [-22.951916, -43.210487] }, point2: { name: "São Paulo", coords: [-23.550520, -46.633308] }, distance: 357 },
    { point1: { name: "Christ the Redeemer", coords: [-22.951916, -43.210487] }, point2: { name: "Buenos Aires", coords: [-34.603722, -58.381592] }, distance: 1960 },
    
    // Additional combinations to reach ~200
    { point1: { name: "Oslo", coords: [59.913869, 10.752245] }, point2: { name: "Stockholm", coords: [59.329323, 18.068581] }, distance: 417 },
    { point1: { name: "Oslo", coords: [59.913869, 10.752245] }, point2: { name: "Copenhagen", coords: [55.676097, 12.568337] }, distance: 486 },
    { point1: { name: "Helsinki", coords: [60.169856, 24.938379] }, point2: { name: "St. Petersburg", coords: [59.934280, 30.335099] }, distance: 307 },
    { point1: { name: "Dublin", coords: [53.349805, -6.260310] }, point2: { name: "London", coords: [51.507351, -0.127758] }, distance: 463 },
    { point1: { name: "Warsaw", coords: [52.229676, 21.012229] }, point2: { name: "Berlin", coords: [52.520008, 13.404954] }, distance: 523 },
    { point1: { name: "Warsaw", coords: [52.229676, 21.012229] }, point2: { name: "Moscow", coords: [55.755826, 37.617300] }, distance: 1158 },
    { point1: { name: "Athens", coords: [37.983810, 23.727539] }, point2: { name: "Istanbul", coords: [41.008238, 28.978359] }, distance: 806 },
    { point1: { name: "Zurich", coords: [47.376887, 8.541694] }, point2: { name: "Milan", coords: [45.464211, 9.191383] }, distance: 219 },
    { point1: { name: "Munich", coords: [48.135124, 11.581981] }, point2: { name: "Vienna", coords: [48.208174, 16.373819] }, distance: 357 },
    { point1: { name: "Brussels", coords: [50.850346, 4.351721] }, point2: { name: "Amsterdam", coords: [52.367573, 4.904139] }, distance: 174 },
    { point1: { name: "Brussels", coords: [50.850346, 4.351721] }, point2: { name: "Paris", coords: [48.856614, 2.352222] }, distance: 262 },
    
    { point1: { name: "Kuala Lumpur", coords: [3.139003, 101.686855] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] }, distance: 318 },
    { point1: { name: "Kuala Lumpur", coords: [3.139003, 101.686855] }, point2: { name: "Bangkok", coords: [13.756331, 100.501762] }, distance: 1130 },
    { point1: { name: "Ho Chi Minh City", coords: [10.823099, 106.629664] }, point2: { name: "Bangkok", coords: [13.756331, 100.501762] }, distance: 765 },
    { point1: { name: "Ho Chi Minh City", coords: [10.823099, 106.629664] }, point2: { name: "Singapore", coords: [1.352083, 103.819836] }, distance: 1093 },
    { point1: { name: "Manila", coords: [14.599512, 120.984222] }, point2: { name: "Jakarta", coords: [-6.208763, 106.845599] }, distance: 2445 },
    { point1: { name: "Jakarta", coords: [-6.208763, 106.845599] }, point2: { name: "Bangkok", coords: [13.756331, 100.501762] }, distance: 1325 },
    
    { point1: { name: "Perth", coords: [-31.950527, 115.860458] }, point2: { name: "Sydney", coords: [-33.868820, 151.209296] }, distance: 3291 },
    { point1: { name: "Melbourne", coords: [-37.813628, 144.963058] }, point2: { name: "Sydney", coords: [-33.868820, 151.209296] }, distance: 713 },
    { point1: { name: "Brisbane", coords: [-27.469771, 153.025124] }, point2: { name: "Sydney", coords: [-33.868820, 151.209296] }, distance: 732 },
    
    { point1: { name: "Montreal", coords: [45.501689, -73.567256] }, point2: { name: "Toronto", coords: [43.653226, -79.383184] }, distance: 503 },
    { point1: { name: "Montreal", coords: [45.501689, -73.567256] }, point2: { name: "New York City", coords: [40.712776, -74.005974] }, distance: 534 },
    { point1: { name: "Boston", coords: [42.360083, -71.058880] }, point2: { name: "New York City", coords: [40.712776, -74.005974] }, distance: 306 },
    { point1: { name: "Washington D.C.", coords: [38.907192, -77.036873] }, point2: { name: "New York City", coords: [40.712776, -74.005974] }, distance: 329 },
    { point1: { name: "Las Vegas", coords: [36.169941, -115.139832] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] }, distance: 396 },
    { point1: { name: "Phoenix", coords: [33.448377, -112.074037] }, point2: { name: "Los Angeles", coords: [34.052235, -118.243683] }, distance: 571 },
    { point1: { name: "Dallas", coords: [32.776664, -96.796988] }, point2: { name: "Chicago", coords: [41.878113, -87.629799] }, distance: 1292 },
    { point1: { name: "Houston", coords: [29.760427, -95.369803] }, point2: { name: "Dallas", coords: [32.776664, -96.796988] }, distance: 362 },
    
    { point1: { name: "Santiago", coords: [-33.448890, -70.669265] }, point2: { name: "Buenos Aires", coords: [-34.603722, -58.381592] }, distance: 1406 },
    { point1: { name: "Santiago", coords: [-33.448890, -70.669265] }, point2: { name: "Lima", coords: [-12.046374, -77.042793] }, distance: 2453 },
    { point1: { name: "Bogotá", coords: [4.7110, -74.0721] }, point2: { name: "Caracas", coords: [10.480594, -66.903606] }, distance: 1020 },
    
    // Final combinations
    { point1: { name: "Cape Town", coords: [-33.924868, 18.424055] }, point2: { name: "Johannesburg", coords: [-26.204103, 28.047305] }, distance: 1263 },
    { point1: { name: "Cape Town", coords: [-33.924868, 18.424055] }, point2: { name: "Nairobi", coords: [-1.292066, 36.821945] }, distance: 4400 },
    { point1: { name: "Lagos", coords: [6.524379, 3.379206] }, point2: { name: "Cairo", coords: [30.044420, 31.235712] }, distance: 4039 },
    { point1: { name: "Casablanca", coords: [33.573110, -7.589843] }, point2: { name: "Madrid", coords: [40.416775, -3.703790] }, distance: 759 },
    { point1: { name: "Casablanca", coords: [33.573110, -7.589843] }, point2: { name: "Paris", coords: [48.856614, 2.352222] }, distance: 1564 }
];
