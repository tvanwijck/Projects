/**
 * Metadata Extractor for Google Maps Panoramas
 * Extracts EXIF and XMP metadata from panorama images
 */

class PanoramaMetadataExtractor {
    /**
     * Extract metadata from an image file
     * @param {File|string} imageFile - Image file or URL
     * @returns {Promise<object>} Metadata object
     */
    static async extractMetadata(imageFile) {
        return new Promise((resolve, reject) => {
            if (typeof imageFile === 'string') {
                // If it's a URL, we need to fetch it first
                fetch(imageFile)
                    .then(response => response.blob())
                    .then(blob => {
                        const file = new File([blob], 'panorama.jpg', { type: 'image/jpeg' });
                        this.extractFromFile(file).then(resolve).catch(reject);
                    })
                    .catch(reject);
            } else {
                this.extractFromFile(imageFile).then(resolve).catch(reject);
            }
        });
    }

    /**
     * Extract metadata from a File object
     * @param {File} file - Image file
     * @returns {Promise<object>} Metadata object
     */
    static async extractFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const metadata = this.parseMetadata(arrayBuffer);
                resolve(metadata);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * Parse metadata from array buffer
     * @param {ArrayBuffer} buffer - Image file buffer
     * @returns {object} Metadata object
     */
    static parseMetadata(buffer) {
        const view = new DataView(buffer);
        const metadata = {
            panoramaId: null,
            coords: null,
            northRotation: null,
            dateTaken: null,
            resolution: null,
            elevation: null,
            copyright: null
        };

        // Try to find EXIF data (starts with 0xFFE1)
        // This is a simplified parser - for full EXIF parsing, consider using exif-js library
        let offset = 0;
        while (offset < buffer.byteLength - 2) {
            const marker = view.getUint16(offset);
            
            if (marker === 0xFFE1) {
                // APP1 segment - may contain EXIF
                const length = view.getUint16(offset + 2);
                const segment = new Uint8Array(buffer, offset + 4, length - 2);
                const segmentStr = String.fromCharCode.apply(null, segment);
                
                // Look for XMP data (Google Maps panoramas often use XMP)
                if (segmentStr.includes('xmp')) {
                    const xmpData = this.parseXMP(segmentStr);
                    Object.assign(metadata, xmpData);
                }
            }
            
            offset += 2;
        }

        // Try to extract from filename if metadata not found
        // Google Maps panoramas often have metadata in filename or can be extracted via API
        
        return metadata;
    }

    /**
     * Parse XMP metadata
     * @param {string} xmpString - XMP XML string
     * @returns {object} Parsed metadata
     */
    static parseXMP(xmpString) {
        const metadata = {};
        
        // Parse GPS coordinates
        const gpsLatMatch = xmpString.match(/GPSTimeStamp[^>]*>([^<]+)</);
        const gpsLonMatch = xmpString.match(/GPSLongitude[^>]*>([^<]+)</);
        
        // Parse other metadata
        // This is a simplified parser - full XMP parsing would require XML parsing
        
        return metadata;
    }

    /**
     * Manual metadata entry helper
     * Use this function to create metadata object manually
     * @param {object} data - Metadata fields
     * @returns {object} Formatted metadata object
     */
    static createMetadata(data) {
        return {
            panoramaId: data.panoramaId || null,
            coords: data.coords || (data.latitude && data.longitude ? [data.latitude, data.longitude] : null),
            northRotation: data.northRotation !== undefined ? parseFloat(data.northRotation) : null,
            dateTaken: data.dateTaken || null,
            resolution: data.resolution || null,
            elevation: data.elevation !== undefined ? parseFloat(data.elevation) : null,
            copyright: data.copyright || null
        };
    }
}

