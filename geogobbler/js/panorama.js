/**
 * Panorama Viewer Class
 * 360° photo sphere viewer using Three.js
 */
class PanoramaViewer {
    constructor(elementId) {
        this.container = document.getElementById(elementId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.sphere = null;
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        this.rotation = { x: 0, y: 0 };
        this.fov = 75;
        this.currentImage = null;
    }

    /**
     * Set and display a new panorama image
     * @param {string} url - URL to equirectangular panorama image
     * @param {object} metadata - Optional metadata including northRotation (0-360)
     */
    setImage(url, metadata = {}) {
        this.currentImage = url;
        this.metadata = metadata;
        
        // Clear existing viewer if it exists
        this.destroy();

        // Find or create viewer container (preserve the hint div)
        let viewerContainer = this.container.querySelector('.pano-viewer-container');
        
        // Remove old viewer container if it exists
        if (viewerContainer) {
            viewerContainer.remove();
        }
        
        // Create new viewer container
        viewerContainer = document.createElement('div');
        viewerContainer.className = 'pano-viewer-container';
        viewerContainer.style.width = '100%';
        viewerContainer.style.height = '100%';
        viewerContainer.style.position = 'absolute';
        viewerContainer.style.top = '0';
        viewerContainer.style.left = '0';
        viewerContainer.style.cursor = 'grab';
        this.container.appendChild(viewerContainer);

        // Check if Three.js is available
        if (typeof THREE === 'undefined') {
            viewerContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; flex-direction: column; padding: 20px; text-align: center;">
                    <p style="font-size: 1.2rem; margin-bottom: 10px;">Loading Three.js...</p>
                    <p style="font-size: 0.9rem; color: #94a3b8;">Please wait for the library to load.</p>
                </div>
            `;
            // Retry after a delay
            setTimeout(() => this.setImage(url), 500);
            return;
        }

        // Initialize Three.js scene
        this.initThreeJS(viewerContainer, url);
    }

    /**
     * Initialize Three.js scene with sphere
     */
    initThreeJS(container, imageUrl) {
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Ensure container has valid dimensions
        if (width === 0 || height === 0) {
            // Container not visible yet, retry after a short delay
            setTimeout(() => this.initThreeJS(container, imageUrl), 100);
            return;
        }

        // Create scene
        this.scene = new THREE.Scene();

        // Create camera
        this.camera = new THREE.PerspectiveCamera(this.fov, width / height, 0.1, 1000);
        this.camera.position.set(0, 0, 0);

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderer.domElement);

        // Create sphere geometry (inside-out sphere for panorama)
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        // Flip the geometry inside out
        geometry.scale(-1, 1, 1);

        // Load texture with CORS support
        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin('anonymous');
        loader.load(
            imageUrl,
            (texture) => {
                // Create material with texture
                const material = new THREE.MeshBasicMaterial({ map: texture });
                
                // Create mesh
                this.sphere = new THREE.Mesh(geometry, material);
                this.scene.add(this.sphere);
                
                // Apply north rotation if provided
                // northRotation: 0 = leftmost pixel, 180 = middle, 360 = rightmost pixel
                // In equirectangular: 0° = left edge, 180° = center, 360° = right edge
                // We need to rotate the camera's Y rotation to face north
                if (this.metadata && this.metadata.northRotation !== undefined && this.metadata.northRotation !== null) {
                    // Convert north rotation (0-360, where 180 is center/north) to camera rotation
                    // If north is at 180 (center), camera should look straight ahead (0 rotation)
                    // If north is at 0 (left), camera should rotate -180 degrees
                    // If north is at 360 (right), camera should rotate +180 degrees
                    const northRot = parseFloat(this.metadata.northRotation);
                    // Convert: north at 180 means 0 rotation, north at 0 means -180, north at 360 means +180
                    const cameraRotation = (northRot - 180) * (Math.PI / 180);
                    this.rotation.y = cameraRotation;
                }
                
                // Start animation loop
                this.animate();
            },
            undefined,
            (error) => {
                console.error('Error loading panorama texture:', error);
                console.error('Failed URL:', imageUrl);
                // Try fallback URL
                const fallbackUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/r128/examples/textures/equirectangular/venice_sunset_1k.jpg';
                if (imageUrl !== fallbackUrl) {
                    console.log('Trying fallback URL:', fallbackUrl);
                    loader.load(
                        fallbackUrl,
                        (texture) => {
                            const material = new THREE.MeshBasicMaterial({ map: texture });
                            this.sphere = new THREE.Mesh(geometry, material);
                            this.scene.add(this.sphere);
                            this.animate();
                        },
                        undefined,
                        (fallbackError) => {
                            console.error('Fallback also failed:', fallbackError);
                            container.innerHTML = `
                                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; flex-direction: column; padding: 20px; text-align: center;">
                                    <p style="font-size: 1.2rem; margin-bottom: 10px;">Error loading panorama</p>
                                    <p style="font-size: 0.9rem; color: #94a3b8; margin-bottom: 10px;">Failed to load image: ${imageUrl}</p>
                                    <p style="font-size: 0.8rem; color: #64748b;">Please add 360° panorama images to the images/ folder</p>
                                    <p style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">See images/README.md for instructions</p>
                                </div>
                            `;
                        }
                    );
                } else {
                    container.innerHTML = `
                        <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; flex-direction: column; padding: 20px; text-align: center;">
                            <p style="font-size: 1.2rem; margin-bottom: 10px;">Error loading panorama</p>
                            <p style="font-size: 0.9rem; color: #94a3b8; margin-bottom: 10px;">Failed to load image: ${imageUrl}</p>
                            <p style="font-size: 0.8rem; color: #64748b;">Please add 360° panorama images to the images/ folder</p>
                            <p style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">See images/README.md for instructions</p>
                        </div>
                    `;
                }
            }
        );

        // Initialize event listeners
        this.initListeners(container);

        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.camera && this.renderer && container) {
                const width = container.clientWidth;
                const height = container.clientHeight;
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(width, height);
            }
        });
    }

    /**
     * Initialize mouse and touch event listeners
     */
    initListeners(container) {
        // Mouse events
        container.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.previousMousePosition = { x: e.clientX, y: e.clientY };
            container.style.cursor = 'grabbing';
            e.preventDefault();
        });

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            if (container) container.style.cursor = 'grab';
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging || !this.camera) return;
            e.preventDefault();
            
            const deltaX = e.clientX - this.previousMousePosition.x;
            const deltaY = e.clientY - this.previousMousePosition.y;
            
            // Rotate camera (invert x-axis)
            this.rotation.y -= deltaX * 0.002;
            this.rotation.x += deltaY * 0.002;
            
            // Limit vertical rotation
            this.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotation.x));
            
            this.updateCameraRotation();
            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        // Touch events
        container.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            e.preventDefault();
        });

        document.addEventListener('touchend', () => {
            this.isDragging = false;
        });

        document.addEventListener('touchmove', (e) => {
            if (!this.isDragging || !this.camera) return;
            e.preventDefault();
            
            const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
            const deltaY = e.touches[0].clientY - this.previousMousePosition.y;
            
            // Rotate camera (invert x-axis)
            this.rotation.y -= deltaX * 0.002;
            this.rotation.x += deltaY * 0.002;
            
            // Limit vertical rotation
            this.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotation.x));
            
            this.updateCameraRotation();
            this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        });

        // Zoom with mouse wheel
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 5 : -5;
            this.fov = Math.max(30, Math.min(110, this.fov + delta));
            if (this.camera) {
                this.camera.fov = this.fov;
                this.camera.updateProjectionMatrix();
            }
        });
    }

    /**
     * Update camera rotation based on current rotation values
     */
    updateCameraRotation() {
        if (!this.camera) return;
        
        // Calculate rotation using spherical coordinates
        const x = Math.cos(this.rotation.x) * Math.cos(this.rotation.y);
        const y = Math.sin(this.rotation.x);
        const z = Math.cos(this.rotation.x) * Math.sin(this.rotation.y);
        
        // Look at the calculated direction
        this.camera.lookAt(x, y, z);
    }

    /**
     * Animation loop
     */
    animate() {
        if (!this.renderer || !this.scene || !this.camera) return;
        
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Update zoom level
     */
    updateZoom(level) {
        this.fov = Math.max(30, Math.min(110, parseFloat(level) * 30 + 30));
        if (this.camera) {
            this.camera.fov = this.fov;
            this.camera.updateProjectionMatrix();
        }
    }

    /**
     * Zoom in/out
     */
    zoom(delta) {
        this.fov = Math.max(30, Math.min(110, this.fov + delta * 5));
        if (this.camera) {
            this.camera.fov = this.fov;
            this.camera.updateProjectionMatrix();
        }
    }

    /**
     * Destroy the viewer instance
     */
    destroy() {
        if (this.renderer) {
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
            this.renderer.dispose();
            this.renderer = null;
        }
        
        if (this.sphere) {
            if (this.sphere.material) {
                if (this.sphere.material.map) {
                    this.sphere.material.map.dispose();
                }
                this.sphere.material.dispose();
            }
            if (this.sphere.geometry) {
                this.sphere.geometry.dispose();
            }
            this.sphere = null;
        }
        
        this.scene = null;
        this.camera = null;
    }

    /**
     * Get current viewer instance
     */
    getViewer() {
        return this.renderer ? this.renderer.domElement : null;
    }
}

