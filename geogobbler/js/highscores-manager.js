/**
 * Highscores Manager
 * Handles score storage, retrieval, and management with support for
 * both localStorage and file-based storage via File System Access API
 */
class HighscoresManager {
    constructor() {
        this.storageAdapter = null;
        this.username = null;
        this.fileHandle = null;
        this.directoryHandle = null;
        this.needsFileRestore = false;
        this.init();
    }

    /**
     * Initialize storage adapter and load username
     */
    async init() {
        // Check storage preference
        const storagePreference = localStorage.getItem('geoguess_storage_type');
        
        if (storagePreference === 'file' && window.showDirectoryPicker) {
            // File storage is preferred, but we need to restore the handle
            // Mark that we need to restore it - we'll do this on first access
            this.needsFileRestore = true;
            // Temporarily use localStorage until we restore file access
            this.storageAdapter = new LocalStorageAdapter();
        } else {
            // Use localStorage
            this.storageAdapter = new LocalStorageAdapter();
        }

        // Load username
        this.username = localStorage.getItem('geoguess_username') || 'Anonymous';
    }

    /**
     * Restore file handle if needed
     * This should be called when user interaction is available (e.g., clicking a button)
     * @param {FileSystemDirectoryHandle} directoryHandle - The directory handle from the folder picker modal
     */
    async restoreFileHandle(directoryHandle) {
        if (!this.needsFileRestore && !directoryHandle) {
            return true;
        }

        if (!directoryHandle) {
            console.warn('No directory handle provided');
            return false;
        }

        try {
            // Create or get file handle
            const fileHandle = await directoryHandle.getFileHandle('geoguess-highscores.json', { create: true });
            
            // Store handles
            this.directoryHandle = directoryHandle;
            this.fileHandle = fileHandle;

            // Migrate data from localStorage to file if file is empty
            const fileAdapter = new FileStorageAdapter({ fileHandle, directoryHandle });
            const localStorageAdapter = new LocalStorageAdapter();
            
            const existingLocalData = await localStorageAdapter.load();
            const existingFileData = await fileAdapter.load();
            
            // If file is empty but localStorage has data, migrate it
            if (existingLocalData && existingLocalData.scores && 
                Object.keys(existingLocalData.scores).length > 0) {
                if (!existingFileData || !existingFileData.scores || 
                    Object.keys(existingFileData.scores).length === 0) {
                    await fileAdapter.save(existingLocalData);
                } else {
                    // File has data, merge them (prefer file data for duplicates)
                    const merged = this.mergeScoreData(existingFileData, existingLocalData);
                    await fileAdapter.save(merged);
                }
            }

            // Switch to file adapter
            this.storageAdapter = fileAdapter;
            this.needsFileRestore = false;
            
            return true;
        } catch (error) {
            console.error('Error restoring file handle:', error);
            return false;
        }
    }

    /**
     * Merge score data from two sources (prefer file data)
     */
    mergeScoreData(fileData, localStorageData) {
        const merged = { scores: {} };
        
        // Get all game modes
        const allModes = new Set([
            ...Object.keys(fileData.scores || {}),
            ...Object.keys(localStorageData.scores || {})
        ]);

        for (const mode of allModes) {
            merged.scores[mode] = { today: [], week: [], allTime: [] };
            
            for (const period of ['today', 'week', 'allTime']) {
                const fileScores = (fileData.scores?.[mode]?.[period] || []);
                const localScores = (localStorageData.scores?.[mode]?.[period] || []);
                
                // Combine and deduplicate (prefer file scores)
                const scoreMap = new Map();
                
                // Add file scores first
                fileScores.forEach(score => {
                    const key = `${score.username}-${score.score}-${score.timestamp}`;
                    scoreMap.set(key, score);
                });
                
                // Add local scores if not already present
                localScores.forEach(score => {
                    const key = `${score.username}-${score.score}-${score.timestamp}`;
                    if (!scoreMap.has(key)) {
                        scoreMap.set(key, score);
                    }
                });
                
                // Convert back to array and sort
                merged.scores[mode][period] = Array.from(scoreMap.values())
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 10);
            }
        }
        
        return merged;
    }

    /**
     * Get current username
     */
    getUsername() {
        return this.username;
    }

    /**
     * Set username
     */
    setUsername(username) {
        this.username = username || 'Anonymous';
        localStorage.setItem('geoguess_username', this.username);
    }

    /**
     * Get storage type
     */
    getStorageType() {
        if (this.needsFileRestore) {
            return 'file'; // Report as file even if not yet restored
        }
        return this.storageAdapter ? this.storageAdapter.getStorageType() : 'localStorage';
    }

    /**
     * Check if file handle needs restoration
     */
    needsRestore() {
        return this.needsFileRestore;
    }

    /**
     * Switch to file-based storage
     * @param {FileSystemDirectoryHandle} directoryHandle - The directory handle from the folder picker modal
     */
    async switchToFile(directoryHandle) {
        if (!directoryHandle) {
            return false;
        }

        try {
            // Create or get file handle
            const fileHandle = await directoryHandle.getFileHandle('geoguess-highscores.json', { create: true });
            
            // Store preference (can't serialize file handle - it will only exist in current session)
            localStorage.setItem('geoguess_storage_type', 'file');
            
            // Store handles in memory (they persist for current session only)
            this.directoryHandle = directoryHandle;
            this.fileHandle = fileHandle;

            // Create new adapter with file handle
            this.storageAdapter = new FileStorageAdapter({ fileHandle, directoryHandle });
            
            // Migrate existing data from localStorage if we had data there
            const localStorageAdapter = new LocalStorageAdapter();
            const existingLocalData = await localStorageAdapter.load();
            const existingFileData = await this.storageAdapter.load();
            
            // If localStorage has data but file doesn't, migrate it
            if (existingLocalData && existingLocalData.scores && 
                Object.keys(existingLocalData.scores).length > 0 &&
                (!existingFileData || !existingFileData.scores || Object.keys(existingFileData.scores).length === 0)) {
                await this.storageAdapter.save(existingLocalData);
            }

            return true;
        } catch (error) {
            console.error('Error switching to file storage:', error);
            throw error;
        }
    }

    /**
     * Switch to localStorage
     */
    async switchToLocalStorage() {
        // Migrate data from file to localStorage if needed
        if (this.storageAdapter && this.storageAdapter.getStorageType() === 'file') {
            try {
                const existingData = await this.storageAdapter.load();
                const localStorageAdapter = new LocalStorageAdapter();
                if (existingData && existingData.scores) {
                    await localStorageAdapter.save(existingData);
                }
            } catch (e) {
                console.warn('Could not migrate data from file to localStorage:', e);
            }
        }

        localStorage.setItem('geoguess_storage_type', 'localStorage');
        this.storageAdapter = new LocalStorageAdapter();
        
        // Clear file handles
        this.directoryHandle = null;
        this.fileHandle = null;
    }

    /**
     * Save a score for a game mode
     * @param {string} gameMode - The game mode (explorer, flag, shape, capital, topx)
     * @param {number} score - The score achieved
     * @param {number} rounds - The number of rounds played (default: 5)
     */
    async saveScore(gameMode, score, rounds = 5) {
        if (!this.storageAdapter) {
            await this.init();
        }

        // Refresh username from localStorage to ensure we have the latest value
        this.username = localStorage.getItem('geoguess_username') || 'Anonymous';

        // Try to restore file handle if needed (but don't block if user cancelled)
        if (this.needsFileRestore) {
            try {
                await this.restoreFileHandle();
            } catch (e) {
                // If restoration fails, continue with localStorage
                console.warn('Could not restore file handle, using localStorage:', e);
            }
        }

        const data = await this.storageAdapter.load();
        
        // Initialize structure if needed
        if (!data.scores) {
            data.scores = {};
        }
        if (!data.scores[gameMode]) {
            data.scores[gameMode] = { today: [], week: [], allTime: [] };
        }

        const scoreEntry = {
            username: this.username,
            score: score,
            timestamp: Date.now(),
            rounds: rounds
        };

        // Add to all-time (always)
        data.scores[gameMode].allTime.push(scoreEntry);
        data.scores[gameMode].allTime.sort((a, b) => b.score - a.score);
        data.scores[gameMode].allTime = data.scores[gameMode].allTime.slice(0, 10); // Top 10

        // Check if today
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (scoreEntry.timestamp >= todayStart.getTime()) {
            data.scores[gameMode].today.push(scoreEntry);
            data.scores[gameMode].today.sort((a, b) => b.score - a.score);
            data.scores[gameMode].today = data.scores[gameMode].today.slice(0, 10);
        }

        // Check if this week (Monday 00:00:00 to Sunday 23:59:59)
        const weekStart = this.getWeekStart(now);
        if (scoreEntry.timestamp >= weekStart.getTime()) {
            data.scores[gameMode].week.push(scoreEntry);
            data.scores[gameMode].week.sort((a, b) => b.score - a.score);
            data.scores[gameMode].week = data.scores[gameMode].week.slice(0, 10);
        }

        // Save back
        await this.storageAdapter.save(data);
    }

    /**
     * Get scores for a game mode and time period
     */
    async getScores(gameMode, timePeriod) {
        if (!this.storageAdapter) {
            await this.init();
        }

        // Try to restore file handle if needed (but don't block if user cancelled)
        if (this.needsFileRestore) {
            try {
                await this.restoreFileHandle();
            } catch (e) {
                // If restoration fails, continue with localStorage
                console.warn('Could not restore file handle, using localStorage:', e);
            }
        }

        const data = await this.storageAdapter.load();
        
        if (!data.scores || !data.scores[gameMode]) {
            return [];
        }

        let scores = data.scores[gameMode][timePeriod] || [];

        // Filter by time period if needed (to handle edge cases where time has passed)
        if (timePeriod === 'today') {
            const now = new Date();
            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            scores = scores.filter(s => s.timestamp >= todayStart.getTime());
        } else if (timePeriod === 'week') {
            const weekStart = this.getWeekStart(new Date());
            scores = scores.filter(s => s.timestamp >= weekStart.getTime());
        }

        return scores.sort((a, b) => b.score - a.score).slice(0, 10);
    }

    /**
     * Get all scores grouped by game and time period
     */
    async getAllScores() {
        if (!this.storageAdapter) {
            await this.init();
        }

        // Try to restore file handle if needed (but don't block if user cancelled)
        if (this.needsFileRestore) {
            try {
                await this.restoreFileHandle();
            } catch (e) {
                // If restoration fails, continue with localStorage
                console.warn('Could not restore file handle, using localStorage:', e);
            }
        }

        const data = await this.storageAdapter.load();
        return data.scores || {};
    }

    /**
     * Get the start of the current week (Monday 00:00:00)
     */
    getWeekStart(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        const weekStart = new Date(d.setDate(diff));
        // Reset time to 00:00:00.000
        weekStart.setHours(0, 0, 0, 0);
        return weekStart;
    }

    /**
     * Format timestamp as date string
     */
    formatDate(timestamp) {
        const date = new Date(timestamp);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
}

/**
 * LocalStorage Storage Adapter
 */
class LocalStorageAdapter {
    getStorageType() {
        return 'localStorage';
    }

    async load() {
        const dataStr = localStorage.getItem('geoguess_highscores');
        if (dataStr) {
            try {
                return JSON.parse(dataStr);
            } catch (e) {
                console.error('Error parsing localStorage highscores:', e);
                return { scores: {} };
            }
        }
        return { scores: {} };
    }

    async save(data) {
        localStorage.setItem('geoguess_highscores', JSON.stringify(data));
    }
}

/**
 * File System Storage Adapter
 */
class FileStorageAdapter {
    constructor({ fileHandle, directoryHandle } = {}) {
        this.fileHandle = fileHandle;
        this.directoryHandle = directoryHandle;
        this.fileName = 'geoguess-highscores.json';
    }

    getStorageType() {
        return 'file';
    }

    async load() {
        if (!this.fileHandle) {
            // Try to get file handle from directory
            if (this.directoryHandle) {
                try {
                    this.fileHandle = await this.directoryHandle.getFileHandle(this.fileName);
                } catch (e) {
                    console.error('Could not get file handle:', e);
                    return { scores: {} };
                }
            } else {
                return { scores: {} };
            }
        }

        try {
            const file = await this.fileHandle.getFile();
            const text = await file.text();
            if (text) {
                return JSON.parse(text);
            }
            return { scores: {} };
        } catch (e) {
            console.error('Error reading file:', e);
            return { scores: {} };
        }
    }

    async save(data) {
        if (!this.fileHandle) {
            // Try to get file handle from directory
            if (this.directoryHandle) {
                this.fileHandle = await this.directoryHandle.getFileHandle(this.fileName, { create: true });
            } else {
                throw new Error('No file handle available');
            }
        }

        const writable = await this.fileHandle.createWritable();
        await writable.write(JSON.stringify(data, null, 2));
        await writable.close();
    }
}
