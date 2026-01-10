/**
 * Game Engine Class
 * Orchestrates the entire application
 */
class GameEngine {
    constructor() {
        this.score = 0;
        this.round = 1;
        this.maxRounds = this.loadRoundsSetting();
        this.currentMode = 'explorer';
        
        this.pano = new PanoramaViewer('pano-view');
        this.mapManager = new MapManager('guess-map');
        this.shapeLoader = new CountryShapeLoader();
        this.topxManager = new TopXManager('topx-ranking-container');
        this.highscoresManager = new HighscoresManager();
        
        this.dataPool = [];
        this.usedItems = []; // Track used questions to prevent duplicates
        
        // Highscores display state
        this.currentTimePeriod = 'allTime';
        this.currentGameFilter = 'all';
    }

    /**
     * Initialize the game
     */
    init() {
        // Initialize map first
        if (typeof L !== 'undefined') {
            this.mapManager.initializeMap();
            this.mapManager.init();
        } else {
            console.warn('Leaflet not loaded yet, will retry');
            setTimeout(() => {
                if (typeof L !== 'undefined') {
                    this.mapManager.initializeMap();
                    this.mapManager.init();
                }
            }, 500);
        }
        // Initialize country shape loader
        if (typeof d3 !== 'undefined' && typeof topojson !== 'undefined') {
            this.shapeLoader.init().then(() => {
                console.log('Country shapes ready');
            }).catch(err => {
                console.error('Failed to initialize country shapes:', err);
            });
        } else {
            console.warn('D3.js or TopoJSON not loaded. Country shapes may not work.');
        }
        
        // Start with homepage
        this.showHomePage();
        
        // Initialize split view resizer
        this.initSplitResizer();
        
        // Initialize highscores UI
        this.initHighscoresUI();
    }

    /**
     * Initialize the split view resizer for dragging
     */
    initSplitResizer() {
        const resizer = document.getElementById('split-resizer');
        const panoView = document.getElementById('pano-view');
        const mapContainer = document.getElementById('guess-map-container');
        
        if (!resizer || !panoView || !mapContainer) return;
        
        let isResizing = false;
        let startX = 0;
        let startWidth = 0;
        
        resizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startWidth = panoView.offsetWidth;
            resizer.classList.add('dragging');
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            const diff = e.clientX - startX;
            const newWidth = startWidth + diff;
            const splitView = document.getElementById('split-view');
            const maxWidth = splitView.offsetWidth - 200; // Min 200px for map
            
            // Constrain the width
            const constrainedWidth = Math.max(200, Math.min(maxWidth, newWidth));
            panoView.style.width = constrainedWidth + 'px';
            
            // Update map if it's a Leaflet map
            if (this.mapManager && this.mapManager.map) {
                setTimeout(() => {
                    this.mapManager.map.invalidateSize();
                }, 0);
            }
            
            // Trigger resize event for panorama viewer
            window.dispatchEvent(new Event('resize'));
        });
        
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                resizer.classList.remove('dragging');
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
            }
        });
        
        // Touch support for mobile
        resizer.addEventListener('touchstart', (e) => {
            isResizing = true;
            startX = e.touches[0].clientX;
            startWidth = panoView.offsetWidth;
            resizer.classList.add('dragging');
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isResizing) return;
            
            const diff = e.touches[0].clientX - startX;
            const newWidth = startWidth + diff;
            const splitView = document.getElementById('split-view');
            const maxWidth = splitView.offsetWidth - 200;
            
            const constrainedWidth = Math.max(200, Math.min(maxWidth, newWidth));
            panoView.style.width = constrainedWidth + 'px';
            
            if (this.mapManager && this.mapManager.map) {
                setTimeout(() => {
                    this.mapManager.map.invalidateSize();
                }, 0);
            }
            
            // Trigger resize event for panorama viewer
            window.dispatchEvent(new Event('resize'));
        });
        
        document.addEventListener('touchend', () => {
            if (isResizing) {
                isResizing = false;
                resizer.classList.remove('dragging');
            }
        });
    }

    /**
     * Check if an item has already been used in the current game
     * @param {Object} item - The item to check
     * @returns {boolean} - True if item has been used
     */
    isItemUsed(item) {
        if (!item) return false;
        
        return this.usedItems.some(used => {
            // For explorer: compare by name
            if (this.currentMode === 'explorer') {
                return used.name === item.name;
            }
            // For flags: compare by code
            if (this.currentMode === 'flag') {
                return used.code === item.code;
            }
            // For shapes: compare by id
            if (this.currentMode === 'shape') {
                return used.id === item.id;
            }
            // For capitals: compare by country
            if (this.currentMode === 'capital') {
                return used.country === item.country;
            }
            // For topx: compare by question text
            if (this.currentMode === 'topx') {
                return used.question === item.question;
            }
            return false;
        });
    }

    /**
     * Get available items (not yet used in current game)
     * @returns {Array} - Array of available items
     */
    getAvailableItems() {
        return this.dataPool.filter(item => !this.isItemUsed(item));
    }

    /**
     * Load rounds setting from localStorage
     * @returns {number} - Number of rounds (default: 5)
     */
    loadRoundsSetting() {
        const savedRounds = localStorage.getItem('geoguess_rounds');
        if (savedRounds) {
            const rounds = parseInt(savedRounds, 10);
            if ([5, 10, 20].includes(rounds)) {
                return rounds;
            }
        }
        return 5; // Default to 5 rounds
    }

    /**
     * Update rounds setting and save to localStorage
     * @param {number} rounds - Number of rounds (5, 10, or 20)
     */
    updateRoundsSetting(rounds) {
        if (![5, 10, 20].includes(rounds)) {
            console.warn('Invalid rounds value:', rounds);
            return;
        }
        localStorage.setItem('geoguess_rounds', rounds.toString());
        this.maxRounds = rounds;
        
        // Update UI if a game is active
        this.updateUI();
        
        // Update rounds dots to reflect current setting
        document.querySelectorAll('.rounds-dot').forEach(dot => {
            const dotRounds = parseInt(dot.dataset.rounds, 10);
            if (dotRounds === rounds) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    /**
     * Show homepage
     */
    showHomePage() {
        this.currentMode = 'home';
        
        // Sync rounds setting with dots
        const currentRounds = this.loadRoundsSetting();
        this.maxRounds = currentRounds;
        this.updateRoundsSetting(currentRounds); // This will update the dots visually
        
        // Hide score board on homepage
        const scoreBoard = document.querySelector('.score-board');
        if (scoreBoard) scoreBoard.style.display = 'none';
        
        // Sidebar UI - remove active state
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

        // Screen Switch
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const homeScreen = document.getElementById('screen-home');
        if (homeScreen) homeScreen.classList.add('active');
        
        // Close any open modals
        const modal = document.getElementById('result-modal');
        if (modal) modal.style.display = 'none';
    }

    /**
     * Switch game mode
     * @param {string} mode - Game mode: 'explorer', 'flag', 'shape', or 'capital'
     */
    switchMode(mode) {
        // Don't switch if already in home mode and trying to go to home
        if (mode === 'home') {
            this.showHomePage();
            return;
        }
        
        // Handle highscores mode
        if (mode === 'highscores') {
            this.showHighscoresPage();
            return;
        }
        
        this.currentMode = mode;
        this.round = 1;
        this.score = 0;
        this.usedItems = []; // Reset used items when starting a new game
        this.updateUI();

        // Show score board when playing a game
        const scoreBoard = document.querySelector('.score-board');
        if (scoreBoard) scoreBoard.style.display = 'flex';

        // Sidebar UI
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const modeBtn = document.querySelector(`button[onclick="game.switchMode('${mode}')"]`);
        if (modeBtn) modeBtn.classList.add('active');

        // Screen Switch
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById(`screen-${mode}`);
        if (screen) screen.classList.add('active');

        // Start Mode
        if (mode === 'explorer') {
            // Ensure map is initialized and recalculate size when screen becomes visible
            if (this.mapManager && !this.mapManager.initialized) {
                this.mapManager.initializeMap();
                this.mapManager.init();
            }
            // Invalidate map size after screen becomes visible (small delay to ensure DOM update)
            setTimeout(() => {
                if (this.mapManager && this.mapManager.map) {
                    this.mapManager.map.invalidateSize();
                }
            }, 100);
            
            this.dataPool = [...GAME_DATA.explorer];
            this.startExplorerRound();
        } else if (mode === 'flag') {
            this.dataPool = [...GAME_DATA.flags];
            this.startQuizRound('flag');
        } else if (mode === 'shape') {
            this.dataPool = [...GAME_DATA.shapes];
            this.startQuizRound('shape');
        } else if (mode === 'capital') {
            this.dataPool = [...GAME_DATA.capitals];
            this.startQuizRound('capital');
        } else if (mode === 'topx') {
            this.dataPool = [...GAME_DATA.topx.questions];
            this.startTopXRound();
        }
    }

    /**
     * Update UI elements
     */
    updateUI() {
        const scoreEl = document.getElementById('total-score');
        const roundEl = document.getElementById('round-num');
        if (scoreEl) scoreEl.innerText = this.score;
        if (roundEl) roundEl.innerText = `${this.round}/${this.maxRounds}`;
    }

    // --- EXPLORER LOGIC ---
    
    /**
     * Start a new explorer round
     */
    startExplorerRound() {
        if (this.round > this.maxRounds) {
            this.showEndGameModal();
            return;
        }
        this.mapManager.reset();
        
        // Get available items (not yet used)
        const availableItems = this.getAvailableItems();
        
        // If no available items, reset used items (edge case: more rounds than items)
        if (availableItems.length === 0) {
            this.usedItems = [];
            availableItems.push(...this.dataPool);
        }
        
        // Randomly pick location from available items
        const locationData = availableItems[Math.floor(Math.random() * availableItems.length)];
        this.currentData = locationData;
        
        // Mark as used
        this.usedItems.push(locationData);
        
        // Set Panorama with metadata
        const metadata = {
            panoramaId: locationData.panoramaId,
            northRotation: locationData.northRotation,
            dateTaken: locationData.dateTaken,
            resolution: locationData.resolution,
            elevation: locationData.elevation,
            copyright: locationData.copyright
        };
        this.pano.setImage(locationData.img, metadata);
        
        // Setup Guess Button
        const btn = document.getElementById('submit-guess-btn');
        if (btn) {
            btn.onclick = () => this.submitExplorerGuess();
        }

        this.updateUI();
    }

    /**
     * Submit explorer guess and show results
     */
    submitExplorerGuess() {
        const points = this.mapManager.showResult(this.currentData.coords);
        this.score += points;
        
        const distance = this.mapManager.getDistance(this.currentData.coords);
        let message = "";
        if (distance < 100) message = "Incredible! Almost exact.";
        else if (distance < 1000) message = "Great job! Very close.";
        else if (distance < 3000) message = "Not bad, you're in the right region.";
        else message = "A bit far off, but keep exploring!";

        this.showResultModal(points, `${message}<br><br>It was <strong>${this.currentData.name}</strong>.<br>Distance: ${distance} km`);
    }

    // --- QUIZ LOGIC (Flag, Shape, Capital) ---
    
    /**
     * Start a new quiz round
     * @param {string} type - Quiz type: 'flag', 'shape', or 'capital'
     */
    startQuizRound(type) {
        if (this.round > this.maxRounds) {
            this.showEndGameModal();
            return;
        }

        // Get available items (not yet used)
        const availableItems = this.getAvailableItems();
        
        // If no available items, reset used items (edge case: more rounds than items)
        if (availableItems.length === 0) {
            this.usedItems = [];
            availableItems.push(...this.dataPool);
        }

        // Pick correct answer from available items
        const correctIndex = Math.floor(Math.random() * availableItems.length);
        const correctItem = availableItems[correctIndex];
        this.currentData = correctItem;
        
        // Mark as used
        this.usedItems.push(correctItem);

        let options = [];
        let correctValue = null;

        if (type === 'capital') {
            // For capital mode: use cities from the same country
            const allCities = [...correctItem.cities];
            // Remove the capital from cities list if it exists
            const citiesWithoutCapital = allCities.filter(city => city !== correctItem.capital);
            
            // Correct answer is the capital
            correctValue = correctItem.capital;
            
            // Start with capital
            options = [correctItem.capital];
            
            // Add 8 wrong options from the same country's cities
            while (options.length < 9 && citiesWithoutCapital.length > 0) {
                const randomIndex = Math.floor(Math.random() * citiesWithoutCapital.length);
                const randomCity = citiesWithoutCapital[randomIndex];
                if (!options.includes(randomCity)) {
                    options.push(randomCity);
                }
                // Remove used city to avoid duplicates
                citiesWithoutCapital.splice(randomIndex, 1);
            }
            
            // If we don't have enough cities, fill with other capitals (fallback)
            while (options.length < 9) {
                const randomItem = this.dataPool[Math.floor(Math.random() * this.dataPool.length)];
                if (randomItem !== correctItem && !options.includes(randomItem.capital)) {
                    options.push(randomItem.capital);
                }
            }
        } else {
            // For flag and shape modes: use other countries
            correctValue = correctItem;
            options = [correctItem];
            
            // Generate 8 wrong options
            while (options.length < 9) {
                const randomItem = this.dataPool[Math.floor(Math.random() * this.dataPool.length)];
                // Check if item is not already in options
                const isDuplicate = options.some(opt => {
                    if (typeof opt === 'object' && typeof randomItem === 'object') {
                        return opt.name === randomItem.name || (opt.code && opt.code === randomItem.code) || (opt.id && opt.id === randomItem.id);
                    }
                    return opt === randomItem;
                });
                if (!isDuplicate) {
                    options.push(randomItem);
                }
            }
        }
        
        // Shuffle options
        options.sort(() => Math.random() - 0.5);

        // Render content based on type
        if (type === 'flag') {
            const flagImg = document.getElementById('flag-img');
            if (flagImg) flagImg.src = `https://flagcdn.com/w640/${correctItem.code}.png`;
            this.renderOptions('flag-options', options, correctValue);
        } else if (type === 'shape') {
            const shapeContainer = document.getElementById('shape-container');
            if (shapeContainer) {
                // Always prioritize TopoJSON for detailed shapes
                if (this.shapeLoader) {
                    // Try to render with TopoJSON (will initialize if needed)
                    const renderTopoJSON = () => {
                        this.shapeLoader.renderCountryShape(correctItem.id, shapeContainer, {
                            fill: 'var(--primary)',
                            stroke: '#fff',
                            strokeWidth: 2
                        });
                    };
                    
                    if (this.shapeLoader.initialized) {
                        renderTopoJSON();
                    } else {
                        // Show loading message and initialize TopoJSON
                        shapeContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: #94a3b8;">Loading detailed country shape...</div>`;
                        this.shapeLoader.init().then(() => {
                            renderTopoJSON();
                        }).catch((error) => {
                            console.error('Failed to load TopoJSON shapes:', error);
                            // Only use simple SVG fallback if TopoJSON completely fails AND path exists
                            if (correctItem.path && correctItem.path.trim() !== '') {
                                console.warn('Falling back to simple SVG path for:', correctItem.name);
                                shapeContainer.innerHTML = `<svg viewBox="${correctItem.viewBox || '0 0 800 500'}" class="shape-svg"><path d="${correctItem.path}" class="shape-path" fill="var(--primary)" stroke="#fff" stroke-width="2" /></svg>`;
                            } else {
                                shapeContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: #94a3b8;">Unable to load shape for ${correctItem.name}. Please refresh the page.</div>`;
                            }
                        });
                    }
                } else {
                    // Shape loader not available - use simple SVG only if path exists
                    if (correctItem.path && correctItem.path.trim() !== '') {
                        shapeContainer.innerHTML = `<svg viewBox="${correctItem.viewBox || '0 0 800 500'}" class="shape-svg"><path d="${correctItem.path}" class="shape-path" fill="var(--primary)" stroke="#fff" stroke-width="2" /></svg>`;
                    } else {
                        shapeContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: #94a3b8;">Shape loader not available. Please refresh the page.</div>`;
                    }
                }
            }
            this.renderOptions('shape-options', options, correctValue);
        } else if (type === 'capital') {
            const countryNameEl = document.getElementById('capital-country-name');
            if (countryNameEl) countryNameEl.innerText = correctItem.country;
            this.renderOptions('capital-options', options, correctValue);
        }

        this.updateUI();
    }

    /**
     * Render quiz options
     * @param {string} containerId - ID of container element
     * @param {Array} options - Array of options (objects or strings)
     * @param {Object|string} correctValue - Correct answer
     */
    renderOptions(containerId, options, correctValue) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            // Fix: Handle both objects and strings
            btn.innerText = typeof opt === 'object' ? (opt.name || opt.capital || opt) : opt;
            btn.onclick = (e) => this.submitQuizAnswer(e, opt, correctValue, container);
            container.appendChild(btn);
        });
    }

    /**
     * Submit quiz answer
     * @param {Event} e - Click event
     * @param {Object|string} selected - Selected option
     * @param {Object|string} correct - Correct answer
     * @param {HTMLElement} container - Options container
     */
    submitQuizAnswer(e, selected, correct, container) {
        // Disable all buttons
        const buttons = container.querySelectorAll('.option-btn');
        buttons.forEach(b => b.disabled = true);

        // Compare selected with correct answer
        let isCorrect = false;
        
        if (typeof selected === 'string' && typeof correct === 'string') {
            isCorrect = selected === correct;
        } else if (typeof selected === 'object' && typeof correct === 'object') {
            // Compare objects by name, code, or id
            isCorrect = selected.name === correct.name || 
                       (selected.code && selected.code === correct.code) ||
                       (selected.id && selected.id === correct.id);
        } else {
            isCorrect = false;
        }
        
        if (isCorrect) {
            e.target.classList.add('correct');
            this.score += 1000;
            this.showResultModal(1000, "Correct! Well done.");
        } else {
            e.target.classList.add('wrong');
            // Highlight correct one
            buttons.forEach(b => {
                const btnText = b.innerText;
                let isCorrectBtn = false;
                
                if (typeof correct === 'string') {
                    isCorrectBtn = btnText === correct;
                } else if (typeof correct === 'object') {
                    const correctText = correct.name || correct.capital || correct;
                    isCorrectBtn = btnText === correctText;
                }
                
                if (isCorrectBtn) {
                    b.classList.add('correct');
                }
            });
            
            const correctText = typeof correct === 'object' ? (correct.name || correct.capital || correct) : correct;
            this.showResultModal(0, `Wrong! The correct answer was <strong>${correctText}</strong>.`);
        }
    }

    // --- GENERAL FLOW ---
    
    /**
     * Show result modal
     * @param {number} points - Points earned
     * @param {string} details - Details message (HTML)
     */
    showResultModal(points, details) {
        const scoreEl = document.getElementById('modal-score-val');
        const detailsEl = document.getElementById('modal-details');
        const titleEl = document.getElementById('modal-title');
        const modal = document.getElementById('result-modal');
        const viewMapBtn = document.getElementById('view-map-btn');
        const collapsedModal = document.getElementById('collapsed-modal');
        const nextRoundBtn = document.getElementById('next-round-btn');
        const goHomeBtn = document.getElementById('go-home-btn');
        const playAgainBtn = document.getElementById('play-again-btn');
        
        // Reset modal state
        if (modal) {
            modal.classList.remove('no-blur');
            modal.style.display = 'flex';
        }
        if (collapsedModal) {
            collapsedModal.style.display = 'none';
        }
        
        // Show/hide View Map button based on mode
        if (viewMapBtn) {
            viewMapBtn.style.display = this.currentMode === 'explorer' ? 'flex' : 'none';
        }
        
        // Show next round button, hide end game buttons
        if (nextRoundBtn) nextRoundBtn.style.display = 'flex';
        if (goHomeBtn) goHomeBtn.style.display = 'none';
        if (playAgainBtn) playAgainBtn.style.display = 'none';
        
        if (scoreEl) scoreEl.innerText = `+${points}`;
        if (detailsEl) detailsEl.innerHTML = details;
        if (titleEl) titleEl.innerText = points > 0 ? "Round Complete" : "Oops!";
        
        // Store details for collapsed modal
        this.lastModalDetails = details;
        this.lastModalPoints = points;
        
        this.updateUI();
    }

    /**
     * Show map view - collapse modal and remove blur
     */
    showMapView() {
        const modal = document.getElementById('result-modal');
        const modalContent = modal?.querySelector('.modal-content');
        const collapsedModal = document.getElementById('collapsed-modal');
        const collapsedDistance = document.getElementById('collapsed-distance');
        const guessBtn = document.getElementById('submit-guess-btn');
        
        if (!modal || !collapsedModal) return;
        
        // Extract distance from details
        let distanceText = 'Distance: 0 km';
        if (this.lastModalDetails) {
            const distanceMatch = this.lastModalDetails.match(/Distance:\s*(\d+)\s*km/i);
            if (distanceMatch) {
                distanceText = `Distance: ${distanceMatch[1]} km`;
            }
        }
        
        // Animate modal collapse
        if (modalContent) {
            modalContent.classList.add('collapsing');
        }
        
        // Remove blur and background after animation starts
        setTimeout(() => {
            modal.classList.add('no-blur');
            
            // Hide full modal content
            setTimeout(() => {
                if (modalContent) {
                    modalContent.style.display = 'none';
                }
                
                // Show collapsed modal
                if (collapsedDistance) {
                    collapsedDistance.textContent = distanceText;
                }
                collapsedModal.style.display = 'block';
                
                // Disable guess button
                if (guessBtn) {
                    guessBtn.disabled = true;
                    guessBtn.style.opacity = '0.5';
                    guessBtn.style.cursor = 'not-allowed';
                }
                
                // Ensure map and panorama are interactive
                // The map should already be interactive, but we ensure pointer events work
                const mapContainer = document.getElementById('guess-map');
                const panoView = document.getElementById('pano-view');
                
                if (mapContainer) {
                    mapContainer.style.pointerEvents = 'auto';
                }
                if (panoView) {
                    panoView.style.pointerEvents = 'auto';
                }
            }, 200);
        }, 100);
    }
    
    /**
     * Show end game modal
     */
    showEndGameModal() {
        const scoreEl = document.getElementById('modal-score-val');
        const detailsEl = document.getElementById('modal-details');
        const titleEl = document.getElementById('modal-title');
        const modal = document.getElementById('result-modal');
        const viewMapBtn = document.getElementById('view-map-btn');
        const collapsedModal = document.getElementById('collapsed-modal');
        const nextRoundBtn = document.getElementById('next-round-btn');
        const goHomeBtn = document.getElementById('go-home-btn');
        const playAgainBtn = document.getElementById('play-again-btn');
        
        // Hide View Map button and collapsed modal for end game
        if (viewMapBtn) viewMapBtn.style.display = 'none';
        if (collapsedModal) collapsedModal.style.display = 'none';
        
        // Show end game buttons
        if (goHomeBtn) goHomeBtn.style.display = 'flex';
        if (playAgainBtn) playAgainBtn.style.display = 'flex';
        
        // Reset modal state
        if (modal) {
            modal.classList.remove('no-blur');
            modal.style.display = 'flex';
        }
        
        if (scoreEl) scoreEl.innerText = this.score;
        if (detailsEl) detailsEl.innerHTML = "Game Over! You've completed all rounds.";
        if (titleEl) titleEl.innerText = "Final Score";
        
        // Save score to highscores
        if (this.highscoresManager && this.currentMode !== 'home' && this.currentMode !== 'highscores') {
            this.highscoresManager.saveScore(this.currentMode, this.score, this.maxRounds).catch(err => {
                console.error('Error saving score:', err);
            });
        }
    }

    /**
     * Restart the current game
     */
    restartGame() {
        const modal = document.getElementById('result-modal');
        const nextRoundBtn = document.getElementById('next-round-btn');
        const goHomeBtn = document.getElementById('go-home-btn');
        const playAgainBtn = document.getElementById('play-again-btn');
        
        // Hide modal
        if (modal) modal.style.display = 'none';
        
        // Reset game state
        this.round = 1;
        this.score = 0;
        this.usedItems = [];
        this.updateUI();
        
        // Hide end game buttons, show next round button
        if (goHomeBtn) goHomeBtn.style.display = 'none';
        if (playAgainBtn) playAgainBtn.style.display = 'none';
        if (nextRoundBtn) nextRoundBtn.style.display = 'flex';
        
        // Start new round of the same game
        if (this.currentMode === 'explorer') {
            this.startExplorerRound();
        } else if (this.currentMode === 'topx') {
            this.startTopXRound();
        } else {
            this.startQuizRound(this.currentMode);
        }
    }

    /**
     * Move to next round
     */
    nextRound() {
        const modal = document.getElementById('result-modal');
        const modalContent = modal?.querySelector('.modal-content');
        const collapsedModal = document.getElementById('collapsed-modal');
        const guessBtn = document.getElementById('submit-guess-btn');
        
        // Reset modal states
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('no-blur');
        }
        if (modalContent) {
            modalContent.style.display = 'block';
            modalContent.classList.remove('collapsing');
        }
        if (collapsedModal) {
            collapsedModal.style.display = 'none';
        }
        
        // Re-enable guess button
        if (guessBtn) {
            guessBtn.disabled = false;
            guessBtn.style.opacity = '1';
            guessBtn.style.cursor = 'pointer';
        }
        
        this.round++;
        if (this.currentMode === 'explorer') {
            this.startExplorerRound();
        } else if (this.currentMode === 'topx') {
            this.startTopXRound();
        } else {
            this.startQuizRound(this.currentMode);
        }
    }

    // --- TOP X LOGIC ---
    
    /**
     * Start a new Top X round
     */
    startTopXRound() {
        if (this.round > this.maxRounds) {
            this.showEndGameModal();
            return;
        }

        // Get available questions (not yet used)
        const availableQuestions = this.getAvailableItems();
        
        // If no available questions, reset used items
        if (availableQuestions.length === 0) {
            this.usedItems = [];
            availableQuestions.push(...this.dataPool);
        }

        // Pick random question
        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        const question = availableQuestions[questionIndex];
        this.currentData = question;
        
        // Mark as used
        this.usedItems.push(question);

        // Display question
        const questionEl = document.getElementById('topx-question');
        if (questionEl) {
            questionEl.textContent = question.question;
        }

        // Initialize ranking interface with shuffled options
        const options = [...question.options];
        this.topxManager.init(options);
        this.topxManager.shuffle(); // Shuffle for random initial order

        // Setup submit button
        const submitBtn = document.getElementById('topx-submit-btn');
        if (submitBtn) {
            submitBtn.onclick = () => this.submitTopXAnswer();
            submitBtn.disabled = false;
        }

        this.updateUI();
    }

    /**
     * Submit Top X answer and calculate score
     */
    submitTopXAnswer() {
        const submitBtn = document.getElementById('topx-submit-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
        }

        const userRanking = this.topxManager.getRanking();
        const correctRanking = this.currentData.correctRanking;
        
        // Calculate score using Spearman correlation
        const correlation = this.calculateSpearmanCorrelation(userRanking, correctRanking);
        const points = Math.round(5000 * correlation);
        this.score += points;

        // Show results
        let message = "";
        if (correlation === 1.0) {
            message = "Perfect! You got the ranking exactly right!";
        } else if (correlation >= 0.8) {
            message = "Excellent! Very close to the correct ranking.";
        } else if (correlation >= 0.6) {
            message = "Good job! You got most of it right.";
        } else if (correlation >= 0.4) {
            message = "Not bad, but there's room for improvement.";
        } else {
            message = "Keep trying! Check the correct ranking below.";
        }

        // Highlight correct/incorrect positions
        this.highlightRankingResults(userRanking, correctRanking);

        const correctRankingText = correctRanking.map((country, index) => 
            `${index + 1}. ${country}`
        ).join('<br>');

        this.showResultModal(
            points, 
            `${message}<br><br><strong>Correct Ranking:</strong><br>${correctRankingText}`
        );
    }

    /**
     * Calculate Spearman rank correlation coefficient
     * @param {Array} userRanking - User's ranking
     * @param {Array} correctRanking - Correct ranking
     * @returns {number} - Correlation coefficient (0 to 1)
     */
    calculateSpearmanCorrelation(userRanking, correctRanking) {
        if (userRanking.length !== correctRanking.length) {
            return 0;
        }

        // Create rank maps
        const userRanks = new Map();
        const correctRanks = new Map();
        
        userRanking.forEach((item, index) => {
            userRanks.set(item, index + 1);
        });
        
        correctRanking.forEach((item, index) => {
            correctRanks.set(item, index + 1);
        });

        // Calculate differences
        let sumSquaredDiff = 0;
        const n = userRanking.length;
        
        userRanking.forEach(item => {
            const userRank = userRanks.get(item);
            const correctRank = correctRanks.get(item);
            if (userRank !== undefined && correctRank !== undefined) {
                const diff = userRank - correctRank;
                sumSquaredDiff += diff * diff;
            }
        });

        // Spearman correlation: 1 - (6 * sum(d²)) / (n * (n² - 1))
        const correlation = 1 - (6 * sumSquaredDiff) / (n * (n * n - 1));
        
        // Ensure result is between 0 and 1
        return Math.max(0, Math.min(1, correlation));
    }

    /**
     * Highlight ranking results (correct/incorrect positions)
     * @param {Array} userRanking - User's ranking
     * @param {Array} correctRanking - Correct ranking
     */
    highlightRankingResults(userRanking, correctRanking) {
        const items = document.querySelectorAll('.topx-item');
        const correctRanks = new Map();
        
        correctRanking.forEach((country, index) => {
            correctRanks.set(country, index);
        });

        items.forEach(item => {
            const country = item.dataset.item;
            const userIndex = parseInt(item.dataset.index);
            const correctIndex = correctRanks.get(country);
            
            item.classList.remove('correct-position', 'wrong-position');
            
            if (userIndex === correctIndex) {
                item.classList.add('correct-position');
            } else {
                item.classList.add('wrong-position');
            }
        });
    }

    // --- HIGHSCORES LOGIC ---

    /**
     * Initialize highscores UI
     */
    initHighscoresUI() {
        // Load username into input
        const usernameInput = document.getElementById('highscore-username-input');
        if (usernameInput) {
            usernameInput.value = this.highscoresManager.getUsername();
        }

        // Update storage type indicator
        this.updateStorageIndicator();
    }

    /**
     * Update storage type indicator
     */
    updateStorageIndicator() {
        const indicator = document.getElementById('storage-type-indicator');
        if (indicator) {
            const storageType = this.highscoresManager.getStorageType();
            indicator.textContent = storageType === 'file' ? 'File Storage' : 'Browser Storage';
        }
    }

    /**
     * Switch to highscores page
     */
    async showHighscoresPage() {
        this.currentMode = 'highscores';
        
        // Hide score board
        const scoreBoard = document.querySelector('.score-board');
        if (scoreBoard) scoreBoard.style.display = 'none';

        // Sidebar UI - remove active state from game buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if (btn.onclick && btn.onclick.toString().includes('highscores')) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Screen Switch
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const highscoresScreen = document.getElementById('screen-highscores');
        if (highscoresScreen) highscoresScreen.classList.add('active');

        // Update username input and storage indicator
        const usernameInput = document.getElementById('highscore-username-input');
        if (usernameInput) {
            usernameInput.value = this.highscoresManager.getUsername();
        }
        this.updateStorageIndicator();

        // Try to restore file handle if needed
        if (this.highscoresManager.needsRestore()) {
            const shouldRestore = await this.showConfirmModal(
                'Restore File Storage',
                'You previously selected file storage for your highscores. For security reasons, your browser requires you to select the folder again after refreshing the page.\n\nClick OK to select your highscores folder, or Cancel to use browser storage instead.'
            );
            
            if (shouldRestore) {
                try {
                    const directoryHandle = await this.showFolderPickerModal(
                        'Please select the folder where your highscores file is located.'
                    );
                    
                    if (directoryHandle) {
                        const restored = await this.highscoresManager.restoreFileHandle(directoryHandle);
                        if (restored) {
                            this.updateStorageIndicator();
                            // Show a brief notification that file storage was restored
                            await this.showAlertModal('Success', 'File storage restored successfully! Your highscores are now loaded from the file.');
                        } else {
                            // User cancelled - switch to localStorage
                            await this.highscoresManager.switchToLocalStorage();
                            this.updateStorageIndicator();
                            await this.showAlertModal('Switched Storage', 'Switched to browser storage. Your highscores are now saved in your browser.');
                        }
                    } else {
                        // User cancelled - switch to localStorage
                        await this.highscoresManager.switchToLocalStorage();
                        this.updateStorageIndicator();
                    }
                } catch (error) {
                    console.error('Could not restore file storage:', error);
                    await this.showAlertModal('Error', 'Could not restore file storage. Switching to browser storage.');
                    await this.highscoresManager.switchToLocalStorage();
                    this.updateStorageIndicator();
                }
            } else {
                // User chose not to restore - switch to localStorage
                await this.highscoresManager.switchToLocalStorage();
                this.updateStorageIndicator();
            }
        }

        // Populate username filter and update display
        await this.populateUsernameFilter();
        this.updateHighscoresDisplay();
    }

    /**
     * Populate username filter dropdown with unique usernames
     */
    async populateUsernameFilter() {
        const usernameSelect = document.getElementById('highscore-username-select');
        if (!usernameSelect) return;

        try {
            // Get all scores to extract unique usernames
            const allScores = await this.highscoresManager.getAllScores();
            const usernames = new Set();
            
            // Extract unique usernames from all scores
            for (const gameMode of ['explorer', 'flag', 'shape', 'capital', 'topx']) {
                const scores = await this.highscoresManager.getScores(gameMode, 'allTime');
                scores.forEach(score => {
                    if (score.username && score.username.trim()) {
                        usernames.add(score.username);
                    }
                });
            }

            // Sort usernames alphabetically
            const sortedUsernames = Array.from(usernames).sort();

            // Clear existing options except "All Users"
            usernameSelect.innerHTML = '<option value="all">All Users</option>';
            
            // Add username options
            sortedUsernames.forEach(username => {
                const option = document.createElement('option');
                option.value = username;
                option.textContent = username;
                usernameSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error populating username filter:', error);
        }
    }

    /**
     * Update highscores display
     */
    async updateHighscoresDisplay() {
        const content = document.getElementById('highscores-content');
        if (!content) return;

        const gameFilter = document.getElementById('highscore-game-select')?.value || 'all';
        const usernameFilter = document.getElementById('highscore-username-select')?.value || 'all';
        const roundsFilter = document.getElementById('highscore-rounds-select')?.value || 'any';
        this.currentGameFilter = gameFilter;

        try {
            if (gameFilter === 'all') {
                // Show all games
                const allScores = await this.highscoresManager.getAllScores();
                const gameNames = {
                    explorer: 'GeoGobbler',
                    flag: 'Flag Fusilier',
                    shape: 'Shape Shifter',
                    capital: 'Capital Capitalizer',
                    topx: 'Rank Rectifier'
                };

                let html = '';
                for (const [gameMode, gameName] of Object.entries(gameNames)) {
                    let scores = await this.highscoresManager.getScores(gameMode, this.currentTimePeriod);
                    
                    // Apply username filter
                    if (usernameFilter !== 'all') {
                        scores = scores.filter(score => score.username === usernameFilter);
                    }
                    
                    // Apply rounds filter
                    if (roundsFilter !== 'any') {
                        const roundsValue = parseInt(roundsFilter, 10);
                        scores = scores.filter(score => {
                            // Only show scores with matching rounds value
                            // Legacy scores (without rounds property) are excluded when filtering by specific rounds
                            return score.rounds === roundsValue;
                        });
                    }
                    
                    if (scores.length > 0) {
                        html += `<h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--accent);">${gameName}</h3>`;
                        html += this.renderScoresTable(scores);
                    }
                }

                if (!html) {
                    content.innerHTML = this.getEmptyStateHTML();
                } else {
                    content.innerHTML = html;
                }
            } else {
                // Show single game
                let scores = await this.highscoresManager.getScores(gameFilter, this.currentTimePeriod);
                
                // Apply username filter
                if (usernameFilter !== 'all') {
                    scores = scores.filter(score => score.username === usernameFilter);
                }
                
                // Apply rounds filter
                if (roundsFilter !== 'any') {
                    const roundsValue = parseInt(roundsFilter, 10);
                    scores = scores.filter(score => {
                        // Only show scores with matching rounds value
                        // Legacy scores (without rounds property) are excluded when filtering by specific rounds
                        return score.rounds === roundsValue;
                    });
                }
                
                if (scores.length === 0) {
                    content.innerHTML = this.getEmptyStateHTML();
                } else {
                    content.innerHTML = this.renderScoresTable(scores);
                }
            }
        } catch (error) {
            console.error('Error loading highscores:', error);
            content.innerHTML = '<div class="empty-scores"><p>Error loading highscores. Please try again.</p></div>';
        }
    }

    /**
     * Render scores table
     */
    renderScoresTable(scores) {
        const currentUsername = this.highscoresManager.getUsername();
        
        let html = '<table class="highscores-table"><thead><tr>';
        html += '<th>Rank</th><th>Username</th><th>Score</th><th>Rounds</th><th>Date</th>';
        html += '</tr></thead><tbody>';

        scores.forEach((score, index) => {
            const isOwnScore = score.username === currentUsername;
            const rowClass = isOwnScore ? 'style="background: rgba(79, 70, 229, 0.2);"' : '';
            // Handle legacy scores without rounds property (default to 5 or show N/A)
            const rounds = score.rounds !== undefined ? score.rounds : 'N/A';
            html += `<tr ${rowClass}>`;
            html += `<td class="rank-cell">${index + 1}</td>`;
            html += `<td class="username-cell">${this.escapeHtml(score.username)}</td>`;
            html += `<td class="score-cell">${score.score.toLocaleString()}</td>`;
            html += `<td class="rounds-cell">${rounds}</td>`;
            html += `<td class="date-cell">${this.highscoresManager.formatDate(score.timestamp)}</td>`;
            html += '</tr>';
        });

        html += '</tbody></table>';
        return html;
    }

    /**
     * Get empty state HTML
     */
    getEmptyStateHTML() {
        return `
            <div class="empty-scores">
                <i class="fa-solid fa-trophy"></i>
                <p>No scores yet. Play a game to set your first highscore!</p>
            </div>
        `;
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Switch time period
     */
    switchTimePeriod(period) {
        this.currentTimePeriod = period;
        
        // Update tab states
        document.querySelectorAll('.period-tab').forEach(tab => {
            if (tab.dataset.period === period) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update display (username filter will be preserved)
        this.updateHighscoresDisplay();
    }

    /**
     * Save username
     */
    saveUsername() {
        const usernameInput = document.getElementById('highscore-username-input');
        if (usernameInput) {
            const username = usernameInput.value.trim();
            this.highscoresManager.setUsername(username);
            // Update display if current username changed
            this.updateHighscoresDisplay();
        }
    }

    /**
     * Show custom confirm modal
     * Returns a Promise that resolves to true if OK is clicked, false if Cancel
     */
    showConfirmModal(title, message) {
        return new Promise((resolve) => {
            this.confirmModalResolve = resolve;
            const modal = document.getElementById('custom-confirm-modal');
            const titleEl = document.getElementById('confirm-modal-title');
            const messageEl = document.getElementById('confirm-modal-message');
            
            titleEl.textContent = title || 'Confirm';
            messageEl.textContent = message;
            modal.style.display = 'flex';
            
            // Add keyboard support
            this.confirmModalKeyHandler = (e) => {
                if (e.key === 'Escape') {
                    this.closeConfirmModal(false);
                } else if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.closeConfirmModal(true);
                }
            };
            document.addEventListener('keydown', this.confirmModalKeyHandler);
            
            // Focus the OK button
            setTimeout(() => {
                document.getElementById('confirm-modal-ok')?.focus();
            }, 100);
        });
    }

    /**
     * Close confirm modal
     */
    closeConfirmModal(result = false) {
        const modal = document.getElementById('custom-confirm-modal');
        modal.style.display = 'none';
        if (this.confirmModalKeyHandler) {
            document.removeEventListener('keydown', this.confirmModalKeyHandler);
            this.confirmModalKeyHandler = null;
        }
        if (this.confirmModalResolve) {
            this.confirmModalResolve(result);
            this.confirmModalResolve = null;
        }
    }

    /**
     * Show custom alert modal
     * Returns a Promise that resolves when OK is clicked
     */
    showAlertModal(title, message) {
        return new Promise((resolve) => {
            this.alertModalResolve = resolve;
            const modal = document.getElementById('custom-alert-modal');
            const titleEl = document.getElementById('alert-modal-title');
            const messageEl = document.getElementById('alert-modal-message');
            
            titleEl.textContent = title || 'Alert';
            messageEl.textContent = message;
            modal.style.display = 'flex';
            
            // Add keyboard support
            this.alertModalKeyHandler = (e) => {
                if (e.key === 'Escape' || e.key === 'Enter') {
                    this.closeAlertModal();
                }
            };
            document.addEventListener('keydown', this.alertModalKeyHandler);
            
            // Focus the OK button
            setTimeout(() => {
                document.getElementById('alert-modal-ok')?.focus();
            }, 100);
        });
    }

    /**
     * Close alert modal
     */
    closeAlertModal() {
        const modal = document.getElementById('custom-alert-modal');
        modal.style.display = 'none';
        if (this.alertModalKeyHandler) {
            document.removeEventListener('keydown', this.alertModalKeyHandler);
            this.alertModalKeyHandler = null;
        }
        if (this.alertModalResolve) {
            this.alertModalResolve();
            this.alertModalResolve = null;
        }
    }

    /**
     * Show folder picker modal and trigger folder selection
     * Returns a Promise that resolves with the directory handle or null if cancelled
     */
    async showFolderPickerModal(message) {
        return new Promise(async (resolve) => {
            this.folderPickerResolve = resolve;
            const modal = document.getElementById('folder-picker-modal');
            const messageEl = document.getElementById('folder-picker-message');
            const loadingEl = document.getElementById('folder-picker-loading');
            const contentEl = document.getElementById('folder-picker-content');
            const selectBtn = document.getElementById('folder-picker-select');
            const cancelBtn = document.getElementById('folder-picker-cancel');
            
            messageEl.textContent = message || 'Please select a folder where you want to save your highscores file.';
            loadingEl.style.display = 'none';
            contentEl.style.display = 'block';
            selectBtn.style.display = 'flex';
            cancelBtn.style.display = 'flex';
            modal.style.display = 'flex';
        });
    }

    /**
     * Trigger the native folder picker (called from the modal button)
     */
    async triggerFolderPicker() {
        if (!window.showDirectoryPicker) {
            await this.closeFolderPickerModal();
            await this.showAlertModal('Not Supported', 'File System Access API is not supported in this browser. Please use Chrome or Edge.');
            return;
        }

        const modal = document.getElementById('folder-picker-modal');
        const loadingEl = document.getElementById('folder-picker-loading');
        const contentEl = document.getElementById('folder-picker-content');
        const selectBtn = document.getElementById('folder-picker-select');
        const cancelBtn = document.getElementById('folder-picker-cancel');

        // Show loading state
        contentEl.style.display = 'none';
        loadingEl.style.display = 'block';
        selectBtn.style.display = 'none';
        cancelBtn.style.display = 'none';

        try {
            const directoryHandle = await window.showDirectoryPicker();
            await this.closeFolderPickerModal(directoryHandle);
        } catch (error) {
            if (error.name === 'AbortError') {
                // User cancelled
                await this.closeFolderPickerModal(null);
            } else {
                // Error occurred
                await this.closeFolderPickerModal(null);
                await this.showAlertModal('Error', 'Could not access the selected folder: ' + error.message);
            }
        }
    }

    /**
     * Close folder picker modal
     */
    async closeFolderPickerModal(result = null) {
        const modal = document.getElementById('folder-picker-modal');
        modal.style.display = 'none';
        if (this.folderPickerResolve) {
            this.folderPickerResolve(result);
            this.folderPickerResolve = null;
        }
    }

    /**
     * Switch storage method
     */
    async switchStorage() {
        const currentType = this.highscoresManager.getStorageType();
        
        try {
            // If file storage is preferred but not yet restored, try to restore it
            if (currentType === 'file' && this.highscoresManager.needsRestore()) {
                const directoryHandle = await this.showFolderPickerModal(
                    'Please select the folder where your highscores file is located.'
                );
                
                if (directoryHandle) {
                    const restored = await this.highscoresManager.restoreFileHandle(directoryHandle);
                    if (restored) {
                        this.updateStorageIndicator();
                        await this.showAlertModal('Success', 'File storage restored! Your highscores are now saved to the selected file on your device.');
                        this.updateHighscoresDisplay();
                        return;
                    }
                }
                
                // User cancelled or error - ask if they want to switch to localStorage instead
                const shouldSwitch = await this.showConfirmModal(
                    'Restore Failed',
                    'Could not restore file storage. Would you like to switch to browser storage instead?'
                );
                if (shouldSwitch) {
                    await this.highscoresManager.switchToLocalStorage();
                    this.updateStorageIndicator();
                    this.updateHighscoresDisplay();
                }
                return;
            }

            if (currentType === 'localStorage') {
                // Switch to file
                if (!window.showDirectoryPicker) {
                    await this.showAlertModal('Not Supported', 'File System Access API is not supported in this browser. Please use Chrome or Edge.');
                    return;
                }
                
                const directoryHandle = await this.showFolderPickerModal(
                    'Please select a folder where you want to save your highscores file.'
                );
                
                if (directoryHandle) {
                    const switched = await this.highscoresManager.switchToFile(directoryHandle);
                    if (switched) {
                        this.updateStorageIndicator();
                        await this.showAlertModal('Success', 'Switched to file storage. Your highscores are now saved to a file on your device. This will persist even after clearing browser cache.');
                        this.updateHighscoresDisplay();
                    }
                }
            } else {
                // Switch to localStorage
                await this.highscoresManager.switchToLocalStorage();
                this.updateStorageIndicator();
                await this.showAlertModal('Switched Storage', 'Switched to browser storage. Your highscores are now saved in your browser.');
                this.updateHighscoresDisplay();
            }
        } catch (error) {
            console.error('Error switching storage:', error);
            await this.showAlertModal('Error', 'Error switching storage: ' + error.message);
        }
    }
}

// Initialize Game - make sure game is globally accessible
let game;

// Wait for both DOM and libraries to be ready
function initializeGame() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGame);
        return;
    }
    
    // Wait for Leaflet to load (no longer need Photo Sphere Viewer)
    function tryInit() {
        if (typeof L !== 'undefined') {
            game = new GameEngine();
            game.init();
            // Make game accessible globally for onclick handlers
            window.game = game;
        } else {
            // Retry after 100ms (max 50 tries = 5 seconds)
            let tries = 0;
            const maxTries = 50;
            const checkInterval = setInterval(() => {
                tries++;
                if (typeof L !== 'undefined') {
                    clearInterval(checkInterval);
                    game = new GameEngine();
                    game.init();
                    window.game = game;
                } else if (tries >= maxTries) {
                    clearInterval(checkInterval);
                    console.error('Leaflet failed to load. L:', typeof L);
                    // Initialize anyway - map will use fallback
                    game = new GameEngine();
                    game.init();
                    window.game = game;
                }
            }, 100);
        }
    }
    
    tryInit();
}

// Start initialization
if (document.readyState === 'complete') {
    initializeGame();
} else {
    document.addEventListener('DOMContentLoaded', initializeGame);
}

