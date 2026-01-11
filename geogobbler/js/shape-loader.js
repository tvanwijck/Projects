/**
 * Country Shape Loader
 * Loads and displays individual high-detail country shape SVG images directly
 */

class CountryShapeLoader {
    constructor() {
        this.loadedShapes = new Map(); // Cache: ISO code -> SVG text
        this.initialized = true; // No initialization needed - fetch on demand
        
        // Country code mappings for common variations
        this.codeMappings = {
            'uk': 'gb',  // United Kingdom
            'usa': 'us',
            'united states': 'us',
            'united kingdom': 'gb',
        };
        
        // SVG source URLs to try (in order)
        // Using jsDelivr CDN for better reliability and CORS support
        this.svgSources = [
            // Try interactive-svg-maps via jsDelivr (most likely to work)
            (code) => `https://cdn.jsdelivr.net/gh/ahuseyn/interactive-svg-maps@master/maps/${code}.svg`,
            (code) => `https://cdn.jsdelivr.net/gh/ahuseyn/interactive-svg-maps@master/maps/${code.toUpperCase()}.svg`,
            // Try raw GitHub for interactive-svg-maps
            (code) => `https://raw.githubusercontent.com/ahuseyn/interactive-svg-maps/master/maps/${code}.svg`,
            (code) => `https://raw.githubusercontent.com/ahuseyn/interactive-svg-maps/master/maps/${code.toUpperCase()}.svg`,
            // Try mapsicon via jsDelivr
            (code) => `https://cdn.jsdelivr.net/gh/djaiss/mapsicon@master/all/${code}/${code}.svg`,
            (code) => `https://cdn.jsdelivr.net/gh/djaiss/mapsicon@master/all/${code.toUpperCase()}/${code.toUpperCase()}.svg`,
            // Try raw GitHub for mapsicon
            (code) => `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${code}/${code}.svg`,
            // Try using CORS proxy for world-country-outlines (last resort)
            (code) => `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.world-country-outlines.site/countries/${code}.svg`)}`,
        ];
    }
    
    /**
     * Initialize (no-op - we fetch on demand)
     */
    async init() {
        // No initialization needed - we fetch SVGs on demand
        return Promise.resolve();
    }
    
    /**
     * Fetch country SVG from source
     * @param {string} code - ISO country code
     * @returns {Promise<string|null>} SVG text or null if not found
     */
    async fetchCountrySVG(code) {
        // Try each source URL pattern
        for (const sourceFn of this.svgSources) {
            try {
                const url = sourceFn(code);
                console.log(`[Shape Loader] Fetching SVG from: ${url}`);
                
                // Use fetch with no-cors mode as fallback for CORS issues
                let response;
                try {
                    response = await fetch(url, { 
                        mode: 'cors',
                        cache: 'default'
                    });
                } catch (corsError) {
                    // If CORS fails, try with no-cors (but we can't read response body)
                    console.log(`[Shape Loader] CORS error for ${url}, trying alternative approach`);
                    // For CORS-blocked resources, we'd need to use an image tag instead
                    // But let's continue to next source first
                    continue;
                }
                
                if (response.ok) {
                    const svgText = await response.text();
                    // Verify it's actually SVG content
                    if (svgText.trim().startsWith('<svg') || svgText.trim().startsWith('<?xml')) {
                        console.log(`[Shape Loader] Successfully loaded SVG for ${code} from ${url}`);
                        return svgText;
                    } else {
                        console.warn(`[Shape Loader] Response from ${url} is not valid SVG (first 100 chars: ${svgText.substring(0, 100)})`);
                    }
                } else {
                    console.log(`[Shape Loader] Failed to fetch from ${url}: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                // Only log if it's not a CORS error (those are expected for some sources)
                if (!error.message.includes('CORS') && !error.message.includes('Failed to fetch')) {
                    console.log(`[Shape Loader] Error fetching from ${sourceFn(code)}:`, error.message);
                }
                // Continue to next source
            }
        }
        
        return null;
    }
    
    /**
     * Apply styling to SVG document
     * @param {Document} svgDoc - Parsed SVG document
     * @param {string} fillColor - Fill color
     * @param {string} strokeColor - Stroke color
     * @param {number} strokeWidth - Stroke width
     */
    applySVGStyling(svgDoc, fillColor, strokeColor, strokeWidth) {
        const svgElement = svgDoc.documentElement;
        
        // Find all path elements and apply styling
        const paths = svgElement.querySelectorAll('path, polygon, circle, ellipse, rect');
        paths.forEach(path => {
            path.setAttribute('fill', fillColor);
            path.setAttribute('stroke', strokeColor);
            path.setAttribute('stroke-width', strokeWidth.toString());
        });
        
        // Also apply to groups that might contain paths
        const groups = svgElement.querySelectorAll('g');
        groups.forEach(group => {
            // Only style if group doesn't have styled children already
            const hasStyledChildren = group.querySelector('path[fill], polygon[fill]');
            if (!hasStyledChildren) {
                group.setAttribute('fill', fillColor);
                group.setAttribute('stroke', strokeColor);
                group.setAttribute('stroke-width', strokeWidth.toString());
            }
        });
    }
    
    /**
     * Display SVG in container
     * @param {Document} svgDoc - Parsed SVG document
     * @param {HTMLElement} container - Container element
     * @param {number} width - Container width
     * @param {number} height - Container height
     */
    displaySVG(svgDoc, container, width, height) {
        const svgElement = svgDoc.documentElement;
        
        // Get or preserve original viewBox
        let viewBox = svgElement.getAttribute('viewBox');
        const originalWidth = parseFloat(svgElement.getAttribute('width')) || width;
        const originalHeight = parseFloat(svgElement.getAttribute('height')) || height;
        
        // If no viewBox, create one from dimensions
        if (!viewBox) {
            viewBox = `0 0 ${originalWidth} ${originalHeight}`;
        }
        
        // Clone the SVG element
        const svgNS = 'http://www.w3.org/2000/svg';
        const finalSVG = document.createElementNS(svgNS, 'svg');
        finalSVG.setAttribute('width', width.toString());
        finalSVG.setAttribute('height', height.toString());
        finalSVG.setAttribute('viewBox', viewBox);
        finalSVG.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        finalSVG.style.display = 'block';
        
        // Clone all children from original SVG
        const children = Array.from(svgElement.children);
        children.forEach(child => {
            finalSVG.appendChild(child.cloneNode(true));
        });
        
        // Clear container and append
        container.innerHTML = '';
        container.appendChild(finalSVG);
    }
    
    /**
     * Render country shape using direct SVG image loading
     * @param {string} countryCode - ISO country code
     * @param {HTMLElement} container - Container element to render into
     * @param {object} options - Rendering options (fill, stroke, strokeWidth, etc.)
     */
    async renderCountryShape(countryCode, container, options = {}) {
        if (!container) {
            console.error('[Shape Loader] Container element not found for shape rendering');
            return;
        }
        
        let code = countryCode.toLowerCase();
        console.log(`[Shape Render] Attempting to render shape for country code: ${countryCode} (normalized: ${code})`);
        
        // Apply code mappings
        if (this.codeMappings[code]) {
            code = this.codeMappings[code];
            console.log(`[Shape Render] Applied code mapping: ${countryCode} -> ${code}`);
        }
        
        // Get container dimensions
        let width = container.clientWidth || container.offsetWidth || 600;
        let height = container.clientHeight || container.offsetHeight || 350;
        
        // Ensure minimum dimensions
        if (width < 100) width = 600;
        if (height < 100) height = 350;
        
        // Default styling options
        const {
            fill = 'var(--primary)',
            stroke = '#fff',
            strokeWidth = 2
        } = options;
        
        // Convert CSS color to RGB if needed
        const getRGBColor = (color) => {
            if (color.startsWith('var(--')) {
                const style = getComputedStyle(document.documentElement);
                const value = style.getPropertyValue(color.slice(4, -1));
                return value.trim() || '#4f46e5';
            }
            return color;
        };
        
        const fillColor = getRGBColor(fill);
        const strokeColor = getRGBColor(stroke);
        
        // Show loading state
        container.innerHTML = `<div style="padding: 20px; text-align: center; color: #94a3b8;">Loading country shape...</div>`;
        
        // Check cache first
        if (this.loadedShapes.has(code)) {
            try {
                const cachedSVG = this.loadedShapes.get(code);
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(cachedSVG, 'image/svg+xml');
                
                // Check for parsing errors
                const parserError = svgDoc.querySelector('parsererror');
                if (parserError) {
                    console.error('[Shape Render] Cached SVG has parsing error, fetching fresh');
                    this.loadedShapes.delete(code); // Remove bad cache entry
                } else {
                    // Apply styling and display
                    this.applySVGStyling(svgDoc, fillColor, strokeColor, strokeWidth);
                    this.displaySVG(svgDoc, container, width, height);
                    console.log(`[Shape Render] Successfully displayed cached shape for ${countryCode}`);
                    return;
                }
            } catch (error) {
                console.warn(`[Shape Render] Error using cached SVG for ${countryCode}:`, error);
                this.loadedShapes.delete(code); // Remove bad cache entry
            }
        }
        
        // Fetch SVG if not cached or cache failed
        try {
            const svgText = await this.fetchCountrySVG(code);
            
            if (svgText) {
                // Parse SVG
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                
                // Check for parsing errors
                const parserError = svgDoc.querySelector('parsererror');
                if (parserError) {
                    console.error(`[Shape Render] SVG parsing error for ${countryCode}:`, parserError.textContent);
                    container.innerHTML = `<div style="padding: 20px; text-align: center; color: #94a3b8;">Error: Invalid SVG format for ${countryCode}</div>`;
                    return;
                }
                
                // Cache the SVG text
                this.loadedShapes.set(code, svgText);
                
                // Apply styling
                this.applySVGStyling(svgDoc, fillColor, strokeColor, strokeWidth);
                
                // Display
                this.displaySVG(svgDoc, container, width, height);
                
                console.log(`[Shape Render] Successfully loaded and displayed shape for ${countryCode}`);
            } else {
                // All sources failed
                console.error(`[Shape Render] Failed to load shape for ${countryCode} from all sources`);
                container.innerHTML = `<div style="padding: 20px; text-align: center; color: #94a3b8;">Country shape not found: ${countryCode}</div>`;
            }
        } catch (error) {
            console.error(`[Shape Render] Error rendering shape for ${countryCode}:`, error);
            container.innerHTML = `<div style="padding: 20px; text-align: center; color: #94a3b8;">Error loading country shape: ${countryCode}</div>`;
        }
    }
    
    /**
     * Cleanup (clear cache if needed)
     */
    cleanup() {
        // Optionally clear cache if memory is a concern
        // this.loadedShapes.clear();
    }
}
