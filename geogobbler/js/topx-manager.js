/**
 * Top X Manager Class
 * Handles drag-and-drop ranking interface for Top X game
 */
class TopXManager {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = null;
        this.items = [];
        this.draggedElement = null;
        this.dragOverElement = null;
    }

    /**
     * Initialize the ranking interface
     * @param {Array} items - Array of country names to rank
     */
    init(items) {
        this.items = [...items];
        this.container = document.getElementById(this.containerId);
        if (!this.container) {
            console.error(`Container ${this.containerId} not found`);
            return;
        }
        this.render();
    }

    /**
     * Render the ranking interface
     */
    render() {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        
        // Create ranking list
        const list = document.createElement('div');
        list.className = 'topx-ranking-list';
        
        this.items.forEach((item, index) => {
            const itemEl = this.createRankingItem(item, index);
            list.appendChild(itemEl);
        });
        
        this.container.appendChild(list);
        this.attachEventListeners();
    }

    /**
     * Create a ranking item element
     * @param {string} item - Country name
     * @param {number} index - Current index
     * @returns {HTMLElement} - Ranking item element
     */
    createRankingItem(item, index) {
        const itemEl = document.createElement('div');
        itemEl.className = 'topx-item';
        itemEl.draggable = true;
        itemEl.dataset.item = item;
        itemEl.dataset.index = index;
        
        const rankNumber = document.createElement('span');
        rankNumber.className = 'topx-rank-number';
        rankNumber.textContent = index + 1;
        
        const itemName = document.createElement('span');
        itemName.className = 'topx-item-name';
        itemName.textContent = item;
        
        const dragHandle = document.createElement('span');
        dragHandle.className = 'topx-drag-handle';
        dragHandle.innerHTML = '<i class="fa-solid fa-grip-vertical"></i>';
        
        itemEl.appendChild(rankNumber);
        itemEl.appendChild(itemName);
        itemEl.appendChild(dragHandle);
        
        return itemEl;
    }

    /**
     * Attach event listeners for drag and drop
     */
    attachEventListeners() {
        const items = this.container.querySelectorAll('.topx-item');
        
        items.forEach(item => {
            item.addEventListener('dragstart', (e) => this.handleDragStart(e));
            item.addEventListener('dragend', (e) => this.handleDragEnd(e));
            item.addEventListener('dragover', (e) => this.handleDragOver(e));
            item.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            item.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            item.addEventListener('drop', (e) => this.handleDrop(e));
        });
    }

    /**
     * Handle drag start
     */
    handleDragStart(e) {
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.outerHTML);
    }

    /**
     * Handle drag end
     */
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        
        // Remove drag-over class from all items
        const items = this.container.querySelectorAll('.topx-item');
        items.forEach(item => {
            item.classList.remove('drag-over');
        });
        
        this.draggedElement = null;
        this.dragOverElement = null;
        this.updateRankNumbers();
    }

    /**
     * Handle drag over
     */
    handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    /**
     * Handle drag enter
     */
    handleDragEnter(e) {
        const item = e.target.closest('.topx-item');
        if (item && item !== this.draggedElement) {
            item.classList.add('drag-over');
            this.dragOverElement = item;
        }
    }

    /**
     * Handle drag leave
     */
    handleDragLeave(e) {
        const item = e.target.closest('.topx-item');
        if (item) {
            item.classList.remove('drag-over');
        }
    }

    /**
     * Handle drop
     */
    handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        
        const dropTarget = e.target.closest('.topx-item');
        if (!dropTarget || dropTarget === this.draggedElement) {
            return false;
        }
        
        // Get indices
        const draggedIndex = parseInt(this.draggedElement.dataset.index);
        const dropIndex = parseInt(dropTarget.dataset.index);
        
        // Reorder items array
        const [removed] = this.items.splice(draggedIndex, 1);
        this.items.splice(dropIndex, 0, removed);
        
        // Reorder DOM elements
        if (draggedIndex < dropIndex) {
            dropTarget.parentNode.insertBefore(this.draggedElement, dropTarget.nextSibling);
        } else {
            dropTarget.parentNode.insertBefore(this.draggedElement, dropTarget);
        }
        
        // Update indices
        this.updateIndices();
        this.updateRankNumbers();
        
        return false;
    }

    /**
     * Update indices of all items
     */
    updateIndices() {
        const items = this.container.querySelectorAll('.topx-item');
        items.forEach((item, index) => {
            item.dataset.index = index;
        });
    }

    /**
     * Update rank numbers displayed
     */
    updateRankNumbers() {
        const items = this.container.querySelectorAll('.topx-item');
        items.forEach((item, index) => {
            const rankNumber = item.querySelector('.topx-rank-number');
            if (rankNumber) {
                rankNumber.textContent = index + 1;
            }
        });
    }

    /**
     * Get current ranking
     * @returns {Array} - Array of country names in current order
     */
    getRanking() {
        return [...this.items];
    }

    /**
     * Reset to initial state
     */
    reset() {
        this.items = [];
        this.draggedElement = null;
        this.dragOverElement = null;
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    /**
     * Shuffle items randomly
     */
    shuffle() {
        // Fisher-Yates shuffle
        for (let i = this.items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
        }
        this.render();
    }
}

