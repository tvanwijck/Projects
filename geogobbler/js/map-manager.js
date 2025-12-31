/**
 * Map Manager Class
 * Handles Leaflet map, markers, and distance calculation using Haversine formula
 */
class MapManager {
    constructor(mapId) {
        this.mapId = mapId;
        this.map = null;
        this.marker = null;
        this.resultLine = null;
        this.correctMarker = null;
        this.userGuess = null;
        this.initialized = false;
        this.baseLayer = null;
        this.overlayLayers = {};
        this.currentBaseStyle = 'voyager';
        
        // Map style configurations
        this.mapStyles = {
            'voyager': {
                name: 'Voyager',
                url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19
            },
            'positron': {
                name: 'Positron',
                url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19
            },
            'dark-matter': {
                name: 'Dark Matter',
                url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19
            },
            'osm': {
                name: 'OpenStreetMap',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                subdomains: 'abc',
                maxZoom: 19
            },
            'topo': {
                name: 'Topographic',
                url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
                subdomains: 'abc',
                maxZoom: 17
            },
            'satellite': {
                name: 'Satellite',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
                subdomains: '',
                maxZoom: 19,
                tileFormat: 'esri' // Special format: {z}/{y}/{x}
            }
        };
        
        // Overlay layer configurations
        this.overlayConfigs = {
            'cycle': {
                name: 'Cycle Routes',
                url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.cyclosm.org">CyclOSM</a>',
                subdomains: 'abc',
                maxZoom: 20,
                opacity: 0.7
            },
            'railway': {
                name: 'Railways',
                url: 'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.openrailwaymap.org">OpenRailwayMap</a>',
                subdomains: 'abc',
                maxZoom: 19,
                opacity: 0.7
            }
        };
    }
    
    /**
     * Initialize the map (call after Leaflet is loaded)
     */
    initializeMap() {
        if (this.initialized || typeof L === 'undefined') {
            return;
        }
        
        try {
            const mapElement = document.getElementById(this.mapId);
            if (!mapElement) {
                console.error('Map element not found:', this.mapId);
                return;
            }
            
            // Initialize Leaflet
            this.map = L.map(this.mapId, { zoomControl: false }).setView([20, 0], 2);
            
            // Initialize base layer with default style (Voyager)
            this.switchBaseLayer('voyager');
            
            // Initialize overlay layers (but don't add to map yet)
            this.initializeOverlayLayers();
            
            this.initialized = true;
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    }
    
    /**
     * Initialize overlay layers
     */
    initializeOverlayLayers() {
        for (const [key, config] of Object.entries(this.overlayConfigs)) {
            const layerOptions = {
                attribution: config.attribution,
                maxZoom: config.maxZoom,
                opacity: config.opacity || 1
            };
            
            if (config.subdomains) {
                layerOptions.subdomains = config.subdomains;
            }
            
            this.overlayLayers[key] = L.tileLayer(config.url, layerOptions);
        }
    }
    
    /**
     * Switch base map layer
     * @param {string} styleName - Name of the style to switch to
     */
    switchBaseLayer(styleName) {
        if (!this.map || !this.mapStyles[styleName]) {
            console.warn('Invalid map style or map not initialized:', styleName);
            return;
        }
        
        const style = this.mapStyles[styleName];
        
        // Remove current base layer if it exists
        if (this.baseLayer) {
            this.map.removeLayer(this.baseLayer);
        }
        
        // Create new base layer
        const layerOptions = {
            attribution: style.attribution,
            maxZoom: style.maxZoom
        };
        
        if (style.subdomains) {
            layerOptions.subdomains = style.subdomains;
        }
        
        // Handle Esri format (different tile URL pattern: {z}/{y}/{x} instead of {z}/{x}/{y})
        if (style.tileFormat === 'esri') {
            // Create layer with placeholder URL first
            this.baseLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}', layerOptions);
            // Override getTileUrl to use Esri's {z}/{y}/{x} format
            this.baseLayer.getTileUrl = function(coords) {
                return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/' + 
                       coords.z + '/' + coords.y + '/' + coords.x;
            };
        } else {
            this.baseLayer = L.tileLayer(style.url, layerOptions);
        }
        
        // Add new base layer to map
        this.baseLayer.addTo(this.map);
        this.currentBaseStyle = styleName;
        
        // Update UI if selector exists
        const styleSelect = document.getElementById('map-style-select');
        if (styleSelect) {
            styleSelect.value = styleName;
        }
    }
    
    /**
     * Toggle overlay layer on/off
     * @param {string} overlayName - Name of the overlay ('cycle' or 'railway')
     * @param {boolean} enabled - Whether to show or hide the overlay
     */
    toggleOverlay(overlayName, enabled) {
        if (!this.map || !this.overlayLayers[overlayName]) {
            console.warn('Invalid overlay or map not initialized:', overlayName);
            return;
        }
        
        if (enabled) {
            this.overlayLayers[overlayName].addTo(this.map);
        } else {
            this.map.removeLayer(this.overlayLayers[overlayName]);
        }
    }
    
    /**
     * Get available map styles
     * @returns {Object} Map styles configuration
     */
    getMapStyles() {
        return this.mapStyles;
    }
    
    /**
     * Get available overlay layers
     * @returns {Object} Overlay layers configuration
     */
    getOverlayLayers() {
        return this.overlayConfigs;
    }

    /**
     * Initialize map click listener and UI controls
     */
    init() {
        // Make sure map is initialized first
        if (!this.initialized) {
            this.initializeMap();
        }
        
        // Wait a bit for map to be ready, then add click listener
        setTimeout(() => {
            if (this.map) {
                this.map.on('click', (e) => {
                    this.placeGuess(e.latlng);
                });
            }
            
            // Initialize UI controls
            this.initUIControls();
        }, 100);
    }
    
    /**
     * Initialize UI controls for map style and overlays
     */
    initUIControls() {
        // Map style selector
        const styleSelect = document.getElementById('map-style-select');
        if (styleSelect) {
            styleSelect.addEventListener('change', (e) => {
                this.switchBaseLayer(e.target.value);
            });
            // Set initial value
            styleSelect.value = this.currentBaseStyle;
        }
        
        // Overlay toggles
        const cycleToggle = document.getElementById('overlay-cycle');
        if (cycleToggle) {
            cycleToggle.addEventListener('change', (e) => {
                this.toggleOverlay('cycle', e.target.checked);
            });
        }
        
        const railwayToggle = document.getElementById('overlay-railway');
        if (railwayToggle) {
            railwayToggle.addEventListener('change', (e) => {
                this.toggleOverlay('railway', e.target.checked);
            });
        }
    }

    /**
     * Place a guess marker on the map
     * @param {L.LatLng} latlng - Leaflet LatLng object
     */
    placeGuess(latlng) {
        if (!this.map) {
            console.warn('Map not initialized yet');
            return;
        }
        if (this.marker) this.map.removeLayer(this.marker);
        this.marker = L.marker(latlng).addTo(this.map);
        this.userGuess = latlng;
        const btn = document.getElementById('submit-guess-btn');
        if (btn) btn.disabled = false;
    }

    /**
     * Reset map to initial state (preserves map style and overlays)
     */
    reset() {
        if (!this.map) {
            this.initializeMap();
            return;
        }
        if (this.marker) this.map.removeLayer(this.marker);
        if (this.resultLine) this.map.removeLayer(this.resultLine);
        if (this.correctMarker) this.map.removeLayer(this.correctMarker);
        this.marker = null;
        this.userGuess = null;
        this.resultLine = null;
        this.correctMarker = null;
        const btn = document.getElementById('submit-guess-btn');
        if (btn) btn.disabled = true;
        // Reset map view (preserves current map style and overlay state)
        this.map.setView([20, 0], 2);
    }

    /**
     * Calculate distance between two points using Haversine formula
     * @param {Array} point1 - [lat, lng]
     * @param {Array} point2 - [lat, lng]
     * @returns {number} Distance in kilometers
     */
    haversineDistance(point1, point2) {
        const R = 6371; // Earth's radius in kilometers
        const [lat1, lon1] = point1;
        const [lat2, lon2] = point2;
        
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        
        return distance;
    }

    /**
     * Convert degrees to radians
     * @param {number} degrees
     * @returns {number} radians
     */
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    /**
     * Show result on map and calculate score
     * @param {Array} actualCoords - [lat, lng] of correct location
     * @returns {number} Score points
     */
    showResult(actualCoords) {
        if (!this.userGuess || !this.map) return 0;

        // Add correct marker
        this.correctMarker = L.circleMarker(actualCoords, { 
            radius: 8, 
            color: '#10b981', 
            fillOpacity: 1 
        }).addTo(this.map);
        
        // Draw line between guess and actual location
        this.resultLine = L.polyline([this.userGuess, actualCoords], { 
            color: '#f59e0b', 
            weight: 3, 
            dashArray: '5, 10' 
        }).addTo(this.map);
        
        // Fit bounds to show both points
        this.map.fitBounds(L.latLngBounds([this.userGuess, actualCoords]), { padding: [50, 50] });

        // Calculate distance using Haversine formula
        const distance = Math.round(this.haversineDistance(
            [this.userGuess.lat, this.userGuess.lng],
            actualCoords
        ));
        
        return this.calculateScore(distance);
    }

    /**
     * Calculate score based on distance
     * @param {number} distance - Distance in kilometers
     * @returns {number} Score points
     */
    calculateScore(distance) {
        // Max score 5000, exponential decay
        if (distance < 50) return 5000;
        return Math.round(5000 * Math.exp(-distance / 2000));
    }

    /**
     * Get distance between user guess and actual location
     * @param {Array} actualCoords - [lat, lng] of correct location
     * @returns {number} Distance in kilometers
     */
    getDistance(actualCoords) {
        if (!this.userGuess) return 0;
        return Math.round(this.haversineDistance(
            [this.userGuess.lat, this.userGuess.lng],
            actualCoords
        ));
    }
}

