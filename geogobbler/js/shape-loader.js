/**
 * Country Shape Loader
 * Loads and renders accurate country boundaries using TopoJSON
 */

class CountryShapeLoader {
    constructor() {
        this.worldData = null;
        this.countryPaths = new Map();
        this.projection = null;
        this.pathGenerator = null;
        this.initialized = false;
        
        // Country code mappings for common variations
        this.codeMappings = {
            'uk': 'gb',  // United Kingdom
            'gb': 'gb',
            'usa': 'us',
            'united states': 'us',
            'united kingdom': 'gb',
            'south korea': 'kr',
            'north korea': 'kp',
            'russia': 'ru',
            'czech republic': 'cz',
            'czechia': 'cz',
            'kosovo': 'xk',  // Kosovo uses XK code
            'ivory coast': 'ci',
            'cote d\'ivoire': 'ci',
            'republic of the congo': 'cg',
            'congo': 'cg',
            'democratic republic of the congo': 'cd',
            'east timor': 'tl',
            'timor-leste': 'tl',
            'swaziland': 'sz',
            'eswatini': 'sz',
            'cape verde': 'cv',
            'cabo verde': 'cv',
            'sao tome and principe': 'st',
            'são tomé and príncipe': 'st'
        };
        
        // ISO code to country name mapping (for when TopoJSON only has names)
        this.isoToName = {
            'us': 'united states of america',
            'ca': 'canada',
            'mx': 'mexico',
            'br': 'brazil',
            'ar': 'argentina',
            'cl': 'chile',
            'co': 'colombia',
            'pe': 'peru',
            've': 'venezuela',
            'ec': 'ecuador',
            'bo': 'bolivia',
            'py': 'paraguay',
            'uy': 'uruguay',
            'cr': 'costa rica',
            'pa': 'panama',
            'gt': 'guatemala',
            'hn': 'honduras',
            'ni': 'nicaragua',
            'sv': 'el salvador',
            'do': 'dominican republic',
            'cu': 'cuba',
            'jm': 'jamaica',
            'ht': 'haiti',
            'tt': 'trinidad and tobago',
            'gb': 'united kingdom',
            'ie': 'ireland',
            'fr': 'france',
            'de': 'germany',
            'it': 'italy',
            'es': 'spain',
            'pt': 'portugal',
            'nl': 'netherlands',
            'be': 'belgium',
            'ch': 'switzerland',
            'at': 'austria',
            'se': 'sweden',
            'no': 'norway',
            'dk': 'denmark',
            'fi': 'finland',
            'pl': 'poland',
            'cz': 'czech republic',
            'sk': 'slovakia',
            'hu': 'hungary',
            'ro': 'romania',
            'bg': 'bulgaria',
            'gr': 'greece',
            'tr': 'turkey',
            'ru': 'russia',
            'ua': 'ukraine',
            'by': 'belarus',
            'lt': 'lithuania',
            'lv': 'latvia',
            'ee': 'estonia',
            'si': 'slovenia',
            'hr': 'croatia',
            'rs': 'serbia',
            'ba': 'bosnia and herzegovina',
            'mk': 'north macedonia',
            'al': 'albania',
            'me': 'montenegro',
            'is': 'iceland',
            'jp': 'japan',
            'cn': 'china',
            'kr': 'south korea',
            'kp': 'north korea',
            'in': 'india',
            'id': 'indonesia',
            'th': 'thailand',
            'vn': 'vietnam',
            'ph': 'philippines',
            'my': 'malaysia',
            'sg': 'singapore',
            'pk': 'pakistan',
            'bd': 'bangladesh',
            'lk': 'sri lanka',
            'np': 'nepal',
            'mm': 'myanmar',
            'kh': 'cambodia',
            'la': 'laos',
            'mn': 'mongolia',
            'kz': 'kazakhstan',
            'uz': 'uzbekistan',
            'af': 'afghanistan',
            'iq': 'iraq',
            'ir': 'iran',
            'sa': 'saudi arabia',
            'ae': 'united arab emirates',
            'il': 'israel',
            'jo': 'jordan',
            'lb': 'lebanon',
            'sy': 'syria',
            'ye': 'yemen',
            'om': 'oman',
            'kw': 'kuwait',
            'qa': 'qatar',
            'bh': 'bahrain',
            'eg': 'egypt',
            'ly': 'libya',
            'sd': 'sudan',
            'et': 'ethiopia',
            'ke': 'kenya',
            'tz': 'tanzania',
            'ug': 'uganda',
            'rw': 'rwanda',
            'gh': 'ghana',
            'ng': 'nigeria',
            'za': 'south africa',
            'ma': 'morocco',
            'dz': 'algeria',
            'tn': 'tunisia',
            'sn': 'senegal',
            'ci': 'cote d\'ivoire',
            'cm': 'cameroon',
            'ao': 'angola',
            'mz': 'mozambique',
            'mg': 'madagascar',
            'au': 'australia',
            'nz': 'new zealand',
            'fj': 'fiji',
            'pg': 'papua new guinea',
            'nc': 'new caledonia',
            // Additional countries from newly added shapes
            'md': 'moldova',
            'ge': 'georgia',
            'am': 'armenia',
            'az': 'azerbaijan',
            'kg': 'kyrgyzstan',
            'tj': 'tajikistan',
            'tm': 'turkmenistan',
            'bo': 'bolivia',
            'py': 'paraguay',
            'uy': 'uruguay',
            'cr': 'costa rica',
            'pa': 'panama',
            'gt': 'guatemala',
            'cu': 'cuba',
            'do': 'dominican republic',
            'jm': 'jamaica',
            'ht': 'haiti',
            'al': 'albania',
            'mk': 'north macedonia',
            'me': 'montenegro',
            'ba': 'bosnia and herzegovina',
            'xk': 'kosovo',  // Kosovo uses XK as ISO code (not officially ISO 3166-1)
            'lu': 'luxembourg',
            'mt': 'malta',
            'cy': 'cyprus',
            // Additional missing countries
            'ye': 'yemen',
            'om': 'oman',
            'kw': 'kuwait',
            'qa': 'qatar',
            'bt': 'bhutan',
            'mv': 'maldives',
            'kp': 'north korea',
            'tw': 'taiwan',
            'hk': 'hong kong',
            'mo': 'macau',
            'ug': 'uganda',
            'dz': 'algeria',
            'ly': 'libya',
            'sd': 'sudan',
            'sn': 'senegal',
            'ci': 'cote d\'ivoire',
            'cm': 'cameroon',
            'ao': 'angola',
            'mz': 'mozambique',
            'mg': 'madagascar',
            'zw': 'zimbabwe',
            'zm': 'zambia',
            'mw': 'malawi',
            'rw': 'rwanda',
            'bi': 'burundi',
            'er': 'eritrea',
            'so': 'somalia',
            'dj': 'djibouti',
            'td': 'chad',
            'ne': 'niger',
            'ml': 'mali',
            'bf': 'burkina faso',
            'gn': 'guinea',
            'sl': 'sierra leone',
            'lr': 'liberia',
            'tg': 'togo',
            'bj': 'benin',
            'ga': 'gabon',
            'cg': 'republic of the congo',
            'cf': 'central african republic',
            'gq': 'equatorial guinea',
            'st': 'sao tome and principe',
            'gw': 'guinea-bissau',
            'gm': 'gambia',
            'mr': 'mauritania',
            'tt': 'trinidad and tobago',
            'bb': 'barbados',
            'bs': 'bahamas',
            'bz': 'belize',
            'hn': 'honduras',
            'sv': 'el salvador',
            'ni': 'nicaragua',
            'gy': 'guyana',
            'sr': 'suriname',
            'gf': 'french guiana',
            'sb': 'solomon islands',
            'vu': 'vanuatu',
            'ws': 'samoa',
            'to': 'tonga',
            'pw': 'palau',
            'fm': 'micronesia',
            'mh': 'marshall islands',
            'ki': 'kiribati',
            'nr': 'nauru',
            'tv': 'tuvalu',
            'tl': 'east timor',
            'bn': 'brunei',
            'mc': 'monaco',
            'li': 'liechtenstein',
            'sm': 'san marino',
            'ad': 'andorra',
            'va': 'vatican city',
            'bw': 'botswana',
            'na': 'namibia',
            'ls': 'lesotho',
            'sz': 'eswatini',
            'mu': 'mauritius',
            'sc': 'seychelles',
            'km': 'comoros',
            'cv': 'cape verde',
            'ss': 'south sudan',
            'sy': 'syria',
            'bh': 'bahrain'
        };
    }

    /**
     * Initialize the shape loader with world map data
     */
    async init() {
        if (this.initialized) return;

        try {
            // Load world TopoJSON data (50m resolution - highly detailed shapes)
            // Try multiple CDN sources
            let response;
            try {
                response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json');
            } catch (e) {
                try {
                    response = await fetch('https://unpkg.com/world-atlas@2/countries-50m.json');
                } catch (e2) {
                    // Fallback to 110m if 50m fails
                    console.warn('50m resolution failed, falling back to 110m');
                    response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
                }
            }
            const worldTopo = await response.json();
            
            this.worldData = topojson.feature(worldTopo, worldTopo.objects.countries);
            
            // Debug: Log first feature's properties to see structure
            if (this.worldData.features.length > 0) {
                const firstFeature = this.worldData.features[0];
                console.log('Sample country properties:', Object.keys(firstFeature.properties));
                console.log('Sample country data:', {
                    ISO_A2: firstFeature.properties.ISO_A2,
                    ISO_A3: firstFeature.properties.ISO_A3,
                    NAME: firstFeature.properties.NAME,
                    allProps: firstFeature.properties
                });
            }
            
            // Create projection (Natural Earth projection for better country shapes)
            this.projection = d3.geoNaturalEarth1()
                .scale(100)
                .translate([0, 0]);
            
            // Create path generator
            this.pathGenerator = d3.geoPath().projection(this.projection);
            
            // Pre-process all country paths
            this.preprocessPaths();
            
            this.initialized = true;
            console.log(`Country shapes loaded successfully. Total countries: ${this.worldData.features.length}, Cached paths: ${this.countryPaths.size}`);
        } catch (error) {
            console.error('Error loading country shapes:', error);
            // Fallback: try alternative CDN
            try {
                const altResponse = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
                const geojson = await altResponse.json();
                this.worldData = geojson;
                this.projection = d3.geoNaturalEarth1().scale(100).translate([0, 0]);
                this.pathGenerator = d3.geoPath().projection(this.projection);
                this.preprocessPaths();
                this.initialized = true;
            } catch (altError) {
                console.error('Failed to load country shapes from alternative source:', altError);
                // Last resort: log what we tried
                console.error('All shape data sources failed. Shapes will not be available.');
            }
        }
    }

    /**
     * Pre-process country paths for faster lookup
     */
    preprocessPaths() {
        if (!this.worldData || !this.pathGenerator) return;

        // Store all country names for mapping generation
        this.geoJsonCountryNames = new Map();
        
        this.worldData.features.forEach(feature => {
            const props = feature.properties;
            
            // Try multiple property name variations (TopoJSON can use different names)
            const iso2 = props.ISO_A2 || props.iso_a2 || props.ISO2 || props.iso2 || props.ISO_A2_EH || props.ISO_A2_1;
            const iso3 = props.ISO_A3 || props.iso_a3 || props.ISO3 || props.iso3 || props.ISO_A3_EH || props.ISO_A3_1;
            const name = props.NAME || props.name || props.NAME_LONG || props.NAME_EN || props.NAME_ENGLISH;
            
            // Store country name for mapping generation
            if (name) {
                const nameLower = name.toLowerCase();
                const nameNoSpaces = nameLower.replace(/\s+/g, '');
                
                // Store by both formats
                if (iso2) {
                    this.geoJsonCountryNames.set(iso2.toLowerCase(), {
                        original: name,
                        normalized: nameLower,
                        noSpaces: nameNoSpaces,
                        feature: feature
                    });
                }
                if (iso3 && iso3 !== iso2) {
                    this.geoJsonCountryNames.set(iso3.toLowerCase(), {
                        original: name,
                        normalized: nameLower,
                        noSpaces: nameNoSpaces,
                        feature: feature
                    });
                }
                // Also store by normalized name
                this.geoJsonCountryNames.set(nameNoSpaces, {
                    original: name,
                    normalized: nameLower,
                    noSpaces: nameNoSpaces,
                    feature: feature
                });
            }
            
            // Store by ISO_A2 (preferred), ISO_A3, and name
            if (iso2) {
                this.storeCountryPath(iso2.toLowerCase(), feature);
            }
            if (iso3 && iso3 !== iso2) {
                this.storeCountryPath(iso3.toLowerCase(), feature);
            }
            if (name) {
                // Store by name for fallback lookup
                const nameKey = name.toLowerCase().replace(/\s+/g, '');
                if (!this.countryPaths.has(nameKey)) {
                    this.storeCountryPath(nameKey, feature);
                }
                
                // Also store name variations for better matching
                const nameVariations = this.generateNameVariations(name);
                nameVariations.forEach(variation => {
                    const variationKey = variation.replace(/\s+/g, '');
                    if (!this.countryPaths.has(variationKey)) {
                        this.storeCountryPath(variationKey, feature);
                    }
                });
            }
        });
        
        // Log all country names for debugging and mapping generation
        const allNames = Array.from(this.geoJsonCountryNames.values())
            .map(v => v.original)
            .filter((v, i, arr) => arr.indexOf(v) === i) // unique
            .sort();
        console.log(`GeoJSON contains ${allNames.length} unique country names:`, allNames);
        console.log(`Preprocessed ${this.countryPaths.size} country paths`);
        
        // Generate comprehensive mapping using actual GeoJSON names
        this.generateIsoToNameMapping();
    }
    
    /**
     * Store a country path in the cache
     */
    storeCountryPath(key, feature) {
        const path = this.pathGenerator(feature);
        if (path) {
            // Calculate bounding box for viewBox
            const bounds = this.pathGenerator.bounds(feature);
            const width = bounds[1][0] - bounds[0][0];
            const height = bounds[1][1] - bounds[0][1];
            
            this.countryPaths.set(key, {
                path: path,
                viewBox: `${bounds[0][0]} ${bounds[0][1]} ${width} ${height}`,
                feature: feature // Store feature for later use
            });
        }
    }

    /**
     * Generate comprehensive ISO to country name mapping using actual GeoJSON data
     */
    generateIsoToNameMapping() {
        if (!this.geoJsonCountryNames || this.geoJsonCountryNames.size === 0) {
            console.warn('No GeoJSON country names available for mapping generation');
            return;
        }
        
        // Create a reverse mapping: normalized name -> ISO codes
        const nameToIso = new Map();
        
        // First, try to find ISO codes from the GeoJSON itself
        if (this.worldData) {
            this.worldData.features.forEach(feature => {
                const props = feature.properties;
                const iso2 = props.ISO_A2 || props.iso_a2 || props.ISO2 || props.iso2;
                const name = props.NAME || props.name || props.NAME_LONG || props.NAME_EN || props.NAME_ENGLISH;
                
                if (iso2 && name) {
                    const nameKey = name.toLowerCase().replace(/\s+/g, '');
                    if (!nameToIso.has(nameKey)) {
                        nameToIso.set(nameKey, iso2.toLowerCase());
                    }
                }
            });
        }
        
        // Now update isoToName with actual GeoJSON names
        // Use the existing isoToName as a starting point, but update with actual names
        const updatedMapping = {};
        
        for (const [isoCode, expectedName] of Object.entries(this.isoToName)) {
            const expectedNameNoSpaces = expectedName.toLowerCase().replace(/\s+/g, '');
            
            // Try to find matching country in GeoJSON
            let found = false;
            for (const [nameKey, nameData] of this.geoJsonCountryNames.entries()) {
                // Check if this name matches our expected name
                if (nameKey === expectedNameNoSpaces || 
                    nameData.noSpaces === expectedNameNoSpaces ||
                    nameData.normalized.includes(expectedName.toLowerCase()) ||
                    expectedName.toLowerCase().includes(nameData.normalized)) {
                    // Use the actual GeoJSON name
                    updatedMapping[isoCode] = nameData.noSpaces;
                    found = true;
                    break;
                }
            }
            
            // If not found, keep the original mapping
            if (!found) {
                updatedMapping[isoCode] = expectedNameNoSpaces;
            }
        }
        
        // Update the mapping
        this.isoToName = updatedMapping;
        console.log(`Generated ISO to name mapping for ${Object.keys(updatedMapping).length} countries`);
    }

    /**
     * Validate that a country mapping makes sense
     * @param {string} isoCode - ISO country code
     * @param {object} feature - GeoJSON feature that was matched
     * @returns {object} Validation result with isValid and message
     */
    validateMapping(isoCode, feature) {
        if (!feature || !feature.properties) {
            return { isValid: false, message: 'No feature provided' };
        }
        
        const props = feature.properties;
        const matchedName = (props.NAME || props.name || props.NAME_LONG || props.NAME_EN || props.NAME_ENGLISH || '').toLowerCase();
        const expectedName = this.isoToName[isoCode];
        
        if (!expectedName) {
            return { isValid: true, message: `No expected name for ${isoCode}, matched: ${matchedName}` };
        }
        
        const expectedNameLower = expectedName.toLowerCase();
        const matchedNameNoSpaces = matchedName.replace(/\s+/g, '');
        const expectedNameNoSpaces = expectedNameLower.replace(/\s+/g, '');
        
        // Check if matched name contains key words from expected name
        const expectedWords = expectedNameLower.split(/\s+/).filter(w => w.length > 2);
        const hasKeyWords = expectedWords.length > 0 && expectedWords.some(word => 
            matchedName.includes(word) || matchedNameNoSpaces.includes(word)
        );
        
        // Also check if it's an exact or close match
        const isExactMatch = matchedName === expectedNameLower || matchedNameNoSpaces === expectedNameNoSpaces;
        const isCloseMatch = matchedName.includes(expectedNameLower) || expectedNameLower.includes(matchedName);
        
        // Check for obvious mismatches (e.g., "thailand" should not match "south africa")
        const obviousMismatch = expectedWords.length > 0 && 
            !hasKeyWords && 
            !isExactMatch && 
            !isCloseMatch &&
            expectedWords.every(word => !matchedName.includes(word) && !matchedNameNoSpaces.includes(word));
        
        if (obviousMismatch) {
            return { 
                isValid: false, 
                message: `Suspicious mapping: ${isoCode} (expected: ${expectedName}) -> ${matchedName}` 
            };
        }
        
        if (isExactMatch || isCloseMatch || hasKeyWords) {
            return { 
                isValid: true, 
                message: `Valid mapping: ${isoCode} -> ${matchedName}` 
            };
        }
        
        // If we can't determine, assume it's valid but log it
        return { 
            isValid: true, 
            message: `Uncertain mapping: ${isoCode} (expected: ${expectedName}) -> ${matchedName}` 
        };
    }

    /**
     * Generate alternative name variations for a country
     * @param {string} countryName - Base country name
     * @returns {Array} Array of name variations
     */
    generateNameVariations(countryName) {
        const variations = [countryName.toLowerCase()];
        const nameLower = countryName.toLowerCase();
        
        // Common name variations mapping
        const nameVariations = {
            'czech republic': ['czechia', 'czech'],
            'north macedonia': ['macedonia', 'fyrom'],
            'bosnia and herzegovina': ['bosnia', 'bosnia & herzegovina', 'bih'],
            'united states of america': ['united states', 'usa', 'us'],
            'united kingdom': ['uk', 'great britain', 'britain'],
            'south korea': ['korea', 'republic of korea'],
            'north korea': ['korea', 'dprk', 'democratic peoples republic of korea'],
            'russia': ['russian federation'],
            'myanmar': ['burma'],
            'cambodia': ['kampuchea'],
            'swaziland': ['eswatini'],
            'cape verde': ['cabo verde'],
            'east timor': ['timor-leste', 'timor leste']
        };
        
        // Check if we have predefined variations
        if (nameVariations[nameLower]) {
            variations.push(...nameVariations[nameLower]);
        }
        
        // Generate variations by removing common words
        const words = nameLower.split(/\s+/);
        if (words.length > 1) {
            // Add version without "and", "of", "the"
            const filteredWords = words.filter(w => !['and', 'of', 'the', 'republic', 'kingdom', 'united'].includes(w));
            if (filteredWords.length > 0 && filteredWords.join('') !== nameLower.replace(/\s+/g, '')) {
                variations.push(filteredWords.join(''));
            }
        }
        
        // Add no-spaces version
        variations.push(nameLower.replace(/\s+/g, ''));
        
        // Remove duplicates and return
        return [...new Set(variations)];
    }

    /**
     * Priority-based matching: exact > starts-with > contains
     * Returns the feature if matched, null otherwise
     */
    findFeatureBySearchTerms(searchTerms, features) {
        if (!features || features.length === 0) return null;
        
        // First pass: exact matches (highest priority)
        for (const term of searchTerms) {
            for (const feature of features) {
                const props = feature.properties;
                const iso2 = (props.ISO_A2 || props.iso_a2 || props.ISO2 || props.iso2 || props.ISO_A2_EH || props.ISO_A2_1 || '').toLowerCase();
                const iso3 = (props.ISO_A3 || props.iso_a3 || props.ISO3 || props.iso3 || props.ISO_A3_EH || props.ISO_A3_1 || '').toLowerCase();
                const name = (props.NAME || props.name || props.NAME_LONG || props.NAME_EN || props.NAME_ENGLISH || '').toLowerCase();
                const nameNoSpaces = name.replace(/\s+/g, '');
                
                // Exact match
                if (iso2 === term || iso3 === term || name === term || nameNoSpaces === term) {
                    return feature;
                }
            }
        }
        
        // Second pass: starts-with matches
        for (const term of searchTerms) {
            for (const feature of features) {
                const props = feature.properties;
                const name = (props.NAME || props.name || props.NAME_LONG || props.NAME_EN || props.NAME_ENGLISH || '').toLowerCase();
                const nameNoSpaces = name.replace(/\s+/g, '');
                
                // Starts with match
                if (name.startsWith(term) || term.startsWith(name) || 
                    nameNoSpaces.startsWith(term) || term.startsWith(nameNoSpaces)) {
                    return feature;
                }
            }
        }
        
        // Third pass: contains match (lowest priority, only if no exact/starts-with match)
        for (const term of searchTerms) {
            for (const feature of features) {
                const props = feature.properties;
                const name = (props.NAME || props.name || props.NAME_LONG || props.NAME_EN || props.NAME_ENGLISH || '').toLowerCase();
                const nameNoSpaces = name.replace(/\s+/g, '');
                
                // Contains match (only one-way to avoid false positives)
                if (name.includes(term) || nameNoSpaces.includes(term)) {
                    return feature;
                }
            }
        }
        
        return null;
    }

    /**
     * Get SVG path for a country by ISO code
     * @param {string} countryCode - ISO 3166-1 alpha-2 code (e.g., 'us', 'gb', 'fr')
     * @returns {object|null} Object with path and viewBox, or null if not found
     */
    getCountryPath(countryCode) {
        if (!this.initialized) {
            console.warn('Shape loader not initialized. Call init() first.');
            return null;
        }

        let code = countryCode.toLowerCase();
        
        // Apply code mappings
        if (this.codeMappings[code]) {
            code = this.codeMappings[code];
        }
        
        // Try direct lookup
        if (this.countryPaths.has(code)) {
            return this.countryPaths.get(code);
        }

        // Try to find by searching through all features
        if (this.worldData) {
            // First, try to convert ISO code to country name if we have a mapping
            let searchTerms = [code];
            if (this.isoToName[code]) {
                const countryName = this.isoToName[code];
                // Generate all name variations for better matching
                const variations = this.generateNameVariations(countryName);
                searchTerms.push(...variations);
            }
            
            // Use priority-based matching
            const feature = this.findFeatureBySearchTerms(searchTerms, this.worldData.features);

            if (feature) {
                // Validate the mapping
                const validation = this.validateMapping(code, feature);
                if (!validation.isValid) {
                    console.warn(validation.message);
                }
                
                const path = this.pathGenerator(feature);
                if (path) {
                    const bounds = this.pathGenerator.bounds(feature);
                    const width = bounds[1][0] - bounds[0][0];
                    const height = bounds[1][1] - bounds[0][1];
                    
                    const result = {
                        path: path,
                        viewBox: `${bounds[0][0]} ${bounds[0][1]} ${width} ${height}`,
                        feature: feature
                    };
                    
                    // Cache it for future lookups (by both code and name)
                    this.countryPaths.set(code, result);
                    const featureName = (feature.properties.name || feature.properties.NAME || '').toLowerCase().replace(/\s+/g, '');
                    if (featureName) {
                        this.countryPaths.set(featureName, result);
                    }
                    return result;
                }
            }
        }

        // Debug: log available country codes for troubleshooting
        if (this.countryPaths.size > 0) {
            const sampleCodes = Array.from(this.countryPaths.keys()).slice(0, 10);
            console.warn(`Country shape not found for code: ${countryCode}. Sample available codes: ${sampleCodes.join(', ')}`);
        } else {
            console.warn(`Country shape not found for code: ${countryCode}. No paths cached.`);
        }
        return null;
    }

    /**
     * Render country shape as SVG with proper scaling
     * @param {string} countryCode - ISO country code
     * @param {HTMLElement} container - Container element to render into
     * @param {object} options - Rendering options (width, height, fill, stroke, etc.)
     */
    renderCountryShape(countryCode, container, options = {}) {
        if (!container) {
            console.error('Container element not found for shape rendering');
            return;
        }
        
        if (!this.initialized || !this.worldData || !this.pathGenerator) {
            container.innerHTML = `<div style="padding: 20px; text-align: center; color: #94a3b8;">Loading country shapes...</div>`;
            // Try to initialize if not done yet
            if (!this.initialized) {
                this.init().then(() => {
                    this.renderCountryShape(countryCode, container, options);
                });
            }
            return;
        }

        let code = countryCode.toLowerCase();
        console.log(`[Shape Render] Attempting to render shape for country code: ${countryCode} (normalized: ${code})`);
        
        // Apply code mappings
        if (this.codeMappings[code]) {
            code = this.codeMappings[code];
            console.log(`[Shape Render] Applied code mapping: ${countryCode} -> ${code}`);
        }
        
        // First, try to get cached path data
        const cachedData = this.getCountryPath(code);
        let feature = cachedData?.feature;
        
        console.log(`[Shape Render] Cached data found: ${!!cachedData}, Feature found: ${!!feature}`);

        // If not in cache, find the feature directly
        if (!feature) {
            // Try to convert ISO code to country name if we have a mapping
            let searchTerms = [code];
            if (this.isoToName[code]) {
                const countryName = this.isoToName[code];
                // Generate all name variations for better matching
                const variations = this.generateNameVariations(countryName);
                searchTerms.push(...variations);
                console.log(`[Shape Render] Using search terms: ${searchTerms.join(', ')}`);
            }
            
            // Use priority-based matching
            feature = this.findFeatureBySearchTerms(searchTerms, this.worldData.features);
            
            // If found, validate and cache it
            if (feature) {
                const matchedName = (feature.properties.name || feature.properties.NAME || 'unknown').toLowerCase();
                console.log(`[Shape Render] Found feature: ${matchedName}`);
                
                // Validate the mapping
                const validation = this.validateMapping(code, feature);
                if (!validation.isValid) {
                    console.warn(`[Shape Render] ${validation.message}`);
                } else {
                    console.log(`[Shape Render] ${validation.message}`);
                }
                
                // Cache it manually if not already cached
                const cachedData = this.getCountryPath(code);
                if (!cachedData) {
                    const path = this.pathGenerator(feature);
                    if (path) {
                        const bounds = this.pathGenerator.bounds(feature);
                        const width = bounds[1][0] - bounds[0][0];
                        const height = bounds[1][1] - bounds[0][1];
                        this.countryPaths.set(code, {
                            path: path,
                            viewBox: `${bounds[0][0]} ${bounds[0][1]} ${width} ${height}`,
                            feature: feature
                        });
                        console.log(`[Shape Render] Cached feature for code: ${code}`);
                    }
                }
            }
        } else {
            // Feature found in cache, validate it
            const validation = this.validateMapping(code, feature);
            if (!validation.isValid) {
                console.warn(`[Shape Render] ${validation.message}`);
            }
        }

        if (!feature) {
            // Debug: show what we're looking for
            console.warn(`[Shape Render] Country shape not found: ${countryCode}. Searching for code: ${code}`);
            container.innerHTML = `<div style="padding: 20px; text-align: center; color: #94a3b8;">Country shape not found: ${countryCode}</div>`;
            return;
        }
        
        // Log the matched country name
        const matchedName = (feature.properties.name || feature.properties.NAME || 'unknown');
        console.log(`[Shape Render] Rendering shape for ${countryCode} (${code}) -> ${matchedName}`);

        // Get container dimensions - use offsetWidth/offsetHeight as fallback
        let width = container.clientWidth || container.offsetWidth || 600;
        let height = container.clientHeight || container.offsetHeight || 350;
        
        // Ensure minimum dimensions
        if (width < 100) width = 600;
        if (height < 100) height = 350;
        
        console.log(`[Shape Render] Container dimensions: ${width}x${height}`);
        
        // Create a projection that fits this specific country
        const countryProjection = d3.geoNaturalEarth1();
        
        // Special handling for Fiji: use fitExtent with padding to show all islands
        if (code === 'fj') {
            // Calculate padding as percentage of container size
            const paddingPercent = 0.15; // 15% padding on all sides
            const paddingX = width * paddingPercent;
            const paddingY = height * paddingPercent;
            countryProjection.fitExtent(
                [[paddingX, paddingY], [width - paddingX, height - paddingY]],
                feature
            );
        } else {
            // Use fitSize to automatically scale and center the country
            countryProjection.fitSize([width, height], feature);
        }

        // Create path generator with the fitted projection
        const countryPath = d3.geoPath().projection(countryProjection);
        const path = countryPath(feature);

        if (!path) {
            console.error(`[Shape Render] Failed to generate path for country: ${countryCode}`, feature);
            container.innerHTML = `<div style="padding: 20px; text-align: center; color: #94a3b8;">Error rendering country shape: ${countryCode}</div>`;
            return;
        }
        
        console.log(`[Shape Render] Successfully generated path for ${countryCode}, path length: ${path.length}`);

        // Get the bounds of the projected path for viewBox
        const pathBounds = countryPath.bounds(feature);
        
        // Special handling for small island nations like Fiji
        // They need more padding to show all islands clearly
        let padding = 10;
        if (code === 'fj') {
            // Fiji: Increase padding significantly to show all islands
            // Calculate padding as a percentage of the bounds to ensure all islands are visible
            const boundsWidth = pathBounds[1][0] - pathBounds[0][0];
            const boundsHeight = pathBounds[1][1] - pathBounds[0][1];
            padding = Math.max(30, Math.min(boundsWidth, boundsHeight) * 0.2); // 20% of smallest dimension, min 30px
        }
        
        const viewBoxX = Math.max(0, pathBounds[0][0] - padding);
        const viewBoxY = Math.max(0, pathBounds[0][1] - padding);
        const viewBoxWidth = pathBounds[1][0] - pathBounds[0][0] + padding * 2;
        const viewBoxHeight = pathBounds[1][1] - pathBounds[0][1] + padding * 2;

        const {
            fill = 'var(--primary)',
            stroke = '#fff',
            strokeWidth = 2
        } = options;

        const svg = `
            <svg 
                viewBox="${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}" 
                width="100%" 
                height="350px" 
                class="shape-svg"
                preserveAspectRatio="xMidYMid meet"
                style="display: block; margin: 0 auto;"
            >
                <path 
                    d="${path}" 
                    class="shape-path"
                    fill="${fill}"
                    stroke="${stroke}"
                    stroke-width="${strokeWidth}"
                />
            </svg>
        `;

        container.innerHTML = svg;
    }
}

