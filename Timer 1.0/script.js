// Initialize Quill editor
const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, false] }],
      [{ 'align': [] }],
      ['clean']
    ]
  },
  placeholder: 'What are you working on?'
});

// DOM Elements
const timeDisplay = document.getElementById('time');
const projectInput = document.getElementById('project');
const descriptionInput = document.getElementById('description');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const timeEntriesList = document.getElementById('timeEntries');

// Custom Dialog Functionality
let customDialog;

document.addEventListener('DOMContentLoaded', () => {
    customDialog = {
        dialog: document.getElementById('custom-dialog'),
        title: document.querySelector('.dialog-title'),
        message: document.querySelector('.dialog-message'),
        buttonsContainer: document.querySelector('.dialog-buttons'),
        
        show(title, message, buttons) {
            return new Promise((resolve) => {
                this.title.textContent = title;
                this.message.textContent = message;
                
                // Clear previous buttons
                this.buttonsContainer.innerHTML = '';
                
                // Add new buttons
                buttons.forEach(btn => {
                    const button = document.createElement('button');
                    button.className = `dialog-btn dialog-btn-${btn.type}`;
                    button.innerHTML = `<span>${btn.text}</span>`;
                    button.addEventListener('click', () => {
                        this.hide();
                        resolve(btn.type);
                        this.cleanup();
                    });
                    this.buttonsContainer.appendChild(button);
                });
                
                this.dialog.classList.add('show');
                
                const handleKeyDown = (e) => {
                    if (e.key === 'Escape') {
                        this.hide();
                        resolve('cancel');
                        this.cleanup();
                    }
                };

                const handleOutsideClick = (e) => {
                    if (e.target === this.dialog) {
                        this.hide();
                        resolve('cancel');
                        this.cleanup();
                    }
                };
                
                document.addEventListener('keydown', handleKeyDown);
                this.dialog.addEventListener('click', handleOutsideClick);

                // Store cleanup function
                this.cleanup = () => {
                    document.removeEventListener('keydown', handleKeyDown);
                    this.dialog.removeEventListener('click', handleOutsideClick);
                };
            });
        },
        
        hide() {
            this.dialog.classList.remove('show');
        }
    };
});

// Monkey elements
const monkeyIcon = document.getElementById('monkey-trigger');
const monkeyContainer = document.getElementById('monkey-container');
const headerTitle = document.getElementById('header-title');
const monkeyTimeText = document.getElementById('monkey-time-text');

// Monkey emojis array (excluding the main monkey icon)
const monkeyEmojis = ['🙈', '🙉', '🙊', '🐵'];

// Function to spawn a random monkey at a random position
function spawnMonkey() {
    console.log('Spawning monkey...'); // Debug log
    
    // Change header text to "It's Monkey Time!"
    headerTitle.textContent = 'It\'s Monkey Time!';
    headerTitle.classList.add('monkey-time-active');
    
    // Trigger the "It's Monkey Time!" animation
    monkeyTimeText.classList.add('show');
    setTimeout(() => {
        monkeyTimeText.classList.remove('show');
    }, 2000);
    
    // Create a new monkey element
    const monkey = document.createElement('div');
    monkey.className = 'random-monkey';
    
    // Get a random monkey emoji
    const randomEmoji = monkeyEmojis[Math.floor(Math.random() * monkeyEmojis.length)];
    monkey.textContent = randomEmoji;
    
    // Set random position
    const maxX = window.innerWidth - 50;
    const maxY = window.innerHeight - 50;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    monkey.style.left = randomX + 'px';
    monkey.style.top = randomY + 'px';
    
    // Add to container
    monkeyContainer.appendChild(monkey);
}

// Function to clear all spawned monkeys
function clearMonkeys() {
    console.log('Clearing monkeys...'); // Debug log
    monkeyContainer.innerHTML = '';
    headerTitle.textContent = 'Time your time';
    headerTitle.classList.remove('monkey-time-active');
}

// Add event listeners for monkey functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing monkey functionality...'); // Debug log
    if (monkeyIcon && monkeyContainer && headerTitle) {
        monkeyIcon.addEventListener('click', spawnMonkey);
        headerTitle.addEventListener('click', function() {
            if (headerTitle.classList.contains('monkey-time-active')) {
                clearMonkeys();
            }
        });
        console.log('Monkey functionality initialized!');
    } else {
        console.error('Some monkey elements not found:', {
            icon: !!monkeyIcon,
            container: !!monkeyContainer,
            headerTitle: !!headerTitle
        });
    }
});

// Timer variables
let startTime;
let elapsedTime = 0;
let timerInterval;
let isPaused = false;

// Time entries array
let timeEntries = JSON.parse(localStorage.getItem('timeEntries')) || [];

// Format time in HH:MM:SS.ms
function formatTime(seconds, showMilliseconds = false) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (!showMilliseconds) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    
    const ms = Math.floor((seconds % 1) * 100);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}<span class="milliseconds">.${String(ms).padStart(2, '0')}</span>`;
}

// Format date in DD/MM/YYYY HH:mm format
function formatDateTime(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Start timer
function startTimer() {
    if (isPaused || elapsedTime > 0) {
        // If resuming from pause or continuing after stop, adjust startTime to account for elapsed time
        startTime = Date.now() - (elapsedTime * 1000);
    } else {
        // If starting fresh
        startTime = Date.now();
        elapsedTime = 0;
    }
    
    // Update every 10ms for smooth millisecond display
    timerInterval = setInterval(updateTimer, 10);
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    stopBtn.style.display = 'inline-block';
}

// Pause timer
function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    // Keep the current elapsedTime
    startBtn.style.display = 'inline-block';
    startBtn.textContent = 'Continue';
    pauseBtn.style.display = 'none';
}

// Replace the confirm in stopTimer function
async function stopTimer() {
    clearInterval(timerInterval);
    const duration = Math.floor((Date.now() - startTime) / 1000);
    
    if (duration > 0) {
        const action = await customDialog.show(
            'Save Time Entry',
            'Do you want to save this time entry?',
            [
                { type: 'reset', text: 'Cancel recording' },
                { type: 'cancel', text: 'Continue recording' },
                { type: 'confirm', text: 'Save' }
            ]
        );
        
        if (action === 'confirm') {
            // Save the entry
            const entry = {
                id: Date.now().toString(),
                project: projectInput.value || 'Untitled Project',
                description: quill.root.innerHTML || 'No description',
                duration: duration,
                startTime: formatDateTime(new Date(startTime)),
                endTime: formatDateTime(new Date())
            };
            
            timeEntries.unshift(entry);
            localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
            renderTimeEntries();
            
            // Reset all timer variables and inputs
            resetTimer();
        } else if (action === 'cancel') {
            // Continue recording - preserve the elapsed time
            elapsedTime = duration;
            startTimer();
        } else if (action === 'reset') {
            // Reset everything
            resetTimer();
        }
    }
}

// Update timer display
function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = (currentTime - startTime) / 1000;
    timeDisplay.innerHTML = formatTime(elapsedTime, true);
}

// Copy entry to clipboard
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        copyToClipboard(this.dataset.entryId, this);
    });
});

function copyToClipboard(entryId, btnElement) {
    const entry = timeEntries.find(e => e.id === entryId);
    if (entry) {
        // Convert alignment classes to inline styles
        let desc = entry.description.replace(/class=\"ql-align-(\w+)\"/g, 'style="text-align: $1"');

        // Robustly style all headings (h1, h2, h3) with Oswald, correct size, color, border, and preserve alignment
        desc = desc.replace(/<(h[1-3])(\s+[^>]*)?>([\s\S]*?)<\/h[1-3]>/g, (match, tag, attrs = '', content) => {
            // Extract existing style (if any)
            let textAlign = '';
            let otherStyles = '';
            const styleMatch = attrs && attrs.match(/style=\"([^\"]*)\"/);
            if (styleMatch) {
                // Extract text-align if present
                const alignMatch = styleMatch[1].match(/text-align:\s*\w+/);
                if (alignMatch) textAlign = alignMatch[0] + ';';
                // Remove text-align from other styles
                otherStyles = styleMatch[1].replace(/text-align:\s*\w+;?/g, '');
            }
            // Oswald styles per heading
            let oswaldStyle = "font-family: 'Oswald', sans-serif; font-weight: 600; margin-bottom: 0.5rem; margin-top: 0.5em;";
            if (tag === 'h1') {
                oswaldStyle += " font-size: 1.4rem; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem;";
            } else if (tag === 'h2') {
                oswaldStyle += " font-size: 1.2rem; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.2rem;";
            } else if (tag === 'h3') {
                oswaldStyle += " font-size: 1.1rem; color: #374151;";
            }
            // Merge styles
            const finalStyle = `${oswaldStyle} ${textAlign} ${otherStyles}`.trim();
            return `<${tag} style=\"${finalStyle}\">${content}</${tag}>`;
        });

        const htmlContent = `
            <div style=\"font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\">
                <h3 style=\"margin-bottom: 8px; color: #111827; font-family: 'Oswald', sans-serif; font-size: 1.1rem; font-weight: 600;\">${entry.project}</h3>
                <div style=\"margin-bottom: 8px; color: #4b5563; font-family: 'Nunito', sans-serif;\">
                    ${desc}
                </div>
                <p style=\"font-size: 0.875rem; color: #6b7280;\"><span style=\"font-family: 'Oswald', 'Nunito', monospace;\">Time:</span> <span style=\"font-family: 'Nunito', sans-serif;\">${formatTime(entry.duration, true)}</span></p>
                <p style=\"font-size: 0.875rem; color: #6b7280;\"><span style=\"font-family: 'Oswald', 'Nunito', monospace;\">Start:</span> <span style=\"font-family: 'Nunito', sans-serif;\">${entry.startTime}</span></p>
                <p style=\"font-size: 0.875rem; color: #6b7280;\"><span style=\"font-family: 'Oswald', 'Nunito', monospace;\">End:</span> <span style=\"font-family: 'Nunito', sans-serif;\">${entry.endTime}</span></p>
            </div>
        `;

        // Create a Blob with the HTML content
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const clipboardItem = new ClipboardItem({ 'text/html': blob });

        // Copy to clipboard
        navigator.clipboard.write([clipboardItem])
            .then(() => {
                // Visual feedback that copy worked
                const copyBtn = btnElement;
                if (copyBtn) {
                    const clipboardIcon = copyBtn.querySelector('.clipboard-icon');
                    if (clipboardIcon) {
                        // Swap the icon src and alt temporarily
                        const originalSrc = clipboardIcon.src;
                        const originalAlt = clipboardIcon.alt;
                        clipboardIcon.src = './Assets/clipboard_copied.png';
                        clipboardIcon.alt = 'Copied';
                        clipboardIcon.onerror = function() {
                            clipboardIcon.alt = 'Image not found!';
                        };
                        setTimeout(() => {
                            clipboardIcon.src = originalSrc;
                            clipboardIcon.alt = originalAlt;
                            clipboardIcon.onerror = null;
                        }, 1000);
                    } else {
                        console.log('Clipboard icon not found in button', copyBtn);
                    }
                } else {
                    console.log('Copy button not found for entryId', entryId);
                }
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                // Fallback to plain text if HTML copy fails
                const text = `Time: ${formatTime(entry.duration, true)}\nProject: ${entry.project}\nDescription: ${entry.description}\nStart: ${entry.startTime}\nEnd: ${entry.endTime}`;
                navigator.clipboard.writeText(text);
            });
    }
}

// Spreadsheet Dialog Functionality
let spreadsheetDialog;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize spreadsheet dialog
    spreadsheetDialog = {
        dialog: document.getElementById('spreadsheet-dialog'),
        closeBtn: document.querySelector('.spreadsheet-close'),
        copyBtn: document.querySelector('.spreadsheet-copy-btn'),
        tableBody: document.querySelector('.spreadsheet-table tbody'),
        
        show(entry) {
            // Clear previous content
            this.tableBody.innerHTML = '';
            
            // Create table row with entry data
            const row = document.createElement('tr');
            row.innerHTML = `
                <td contenteditable="true">${entry.project}</td>
                <td contenteditable="true"><div class="entry-description">${entry.description}</div></td>
                <td contenteditable="true">${formatTime(entry.duration, false)}</td>
                <td contenteditable="true">${entry.startTime}</td>
                <td contenteditable="true">${entry.endTime}</td>
            `;
            
            this.tableBody.appendChild(row);
            this.dialog.classList.add('show');
            
            // Store the entry ID for later use
            this.currentEntryId = entry.id;
        },
        
        hide() {
            this.dialog.classList.remove('show');
            this.currentEntryId = null;
        },
        
        // Function to get current table data
        getTableData() {
            const headers = Array.from(this.dialog.querySelectorAll('.spreadsheet-table th'))
                .map(th => th.textContent);
            
            const row = this.tableBody.querySelector('tr');
            const values = Array.from(row.querySelectorAll('td'))
                .map(td => td.textContent);
            
            return { headers, values };
        },

        // Function to copy table data to clipboard
        copyToClipboard() {
            const { headers, values } = this.getTableData();
            
            // Create TSV content
            const tsvContent = [
                headers.join('\t'),
                values.join('\t')
            ].join('\n');

            // Try to copy as TSV first
            navigator.clipboard.writeText(tsvContent)
                .then(() => {
                    // Visual feedback
                    const btn = this.copyBtn;
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '✓ Copied!';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy as TSV:', err);
                    // Fallback to HTML if TSV fails
                    let htmlTable = `<table style=\"border-collapse:collapse; width:100%;\">`;
                    htmlTable += `<tr>`;
                    headers.forEach(header => {
                        htmlTable += `<th style='font-weight:bold; text-align:center; vertical-align:middle; padding:4px; white-space:normal; overflow-wrap:break-word;'>${header}</th>`;
                    });
                    htmlTable += `</tr>`;
                    htmlTable += `<tr>`;
                    htmlTable += `<td style='text-align:left; vertical-align:middle; padding:4px; white-space:normal; overflow-wrap:break-word;'>${values[0]}</td>`;
                    htmlTable += `<td style='text-align:left; vertical-align:middle; padding:4px; white-space:normal; overflow-wrap:break-word;'>${values[1]}</td>`;
                    htmlTable += `<td style='text-align:center; vertical-align:middle; padding:4px; white-space:normal; overflow-wrap:break-word;'>${values[2]}</td>`;
                    htmlTable += `<td style='text-align:center; vertical-align:middle; padding:4px; white-space:normal; overflow-wrap:break-word;'>${values[3]}</td>`;
                    htmlTable += `<td style='text-align:center; vertical-align:middle; padding:4px; white-space:normal; overflow-wrap:break-word;'>${values[4]}</td>`;
                    htmlTable += `</tr>`;
                    htmlTable += `</table>`;
                    const blob = new Blob([htmlTable], { type: 'text/html' });
                    const clipboardItem = new ClipboardItem({ 'text/html': blob });
                    navigator.clipboard.write([clipboardItem]);
                });
        }
    };
    
    // Add event listeners
    spreadsheetDialog.closeBtn.addEventListener('click', () => {
        spreadsheetDialog.hide();
    });
    
    spreadsheetDialog.dialog.addEventListener('click', (e) => {
        if (e.target === spreadsheetDialog.dialog) {
            spreadsheetDialog.hide();
        }
    });
    
    spreadsheetDialog.copyBtn.addEventListener('click', () => {
        spreadsheetDialog.copyToClipboard();
    });
});

// Date Range Picker Functionality
let dateRangeStart = null;
let dateRangeEnd = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize date range picker
    const startDateInput = document.getElementById('datepicker-range-start');
    const endDateInput = document.getElementById('datepicker-range-end');
    const viewAllDatesBtn = document.getElementById('view-all-dates');

    // Add event listeners for date inputs
    startDateInput.addEventListener('change', handleDateRangeChange);
    endDateInput.addEventListener('change', handleDateRangeChange);
    viewAllDatesBtn.addEventListener('click', resetDateRange);

    // Initialize date picker with flatpickr
    flatpickr(startDateInput, {
        dateFormat: "d/m/Y",
        onChange: function(selectedDates) {
            dateRangeStart = selectedDates[0];
            handleDateRangeChange();
        }
    });

    flatpickr(endDateInput, {
        dateFormat: "d/m/Y",
        onChange: function(selectedDates) {
            dateRangeEnd = selectedDates[0];
            handleDateRangeChange();
        }
    });
});

function handleDateRangeChange() {
    if (dateRangeStart && dateRangeEnd) {
        filterTimeEntries();
    }
}

function resetDateRange() {
    dateRangeStart = null;
    dateRangeEnd = null;
    document.getElementById('datepicker-range-start').value = '';
    document.getElementById('datepicker-range-end').value = '';
    selectedProjects.clear();
    renderTimeEntries(); // Show all entries
}

function filterTimeEntries() {
    if (dateRangeStart && dateRangeEnd) {
        const filteredEntries = timeEntries.filter(entry => {
            // Parse the entry date from DD/MM/YYYY format
            const [day, month, year] = entry.startTime.split(' ')[0].split('/');
            const entryDate = new Date(year, month - 1, day);
            
            // Set start date to beginning of day (00:00:00)
            const startDate = new Date(dateRangeStart);
            startDate.setHours(0, 0, 0, 0);
            
            // Set end date to end of day (23:59:59)
            const endDate = new Date(dateRangeEnd);
            endDate.setHours(23, 59, 59, 999);
            
            // Check if entry is within date range and selected projects
            const isInDateRange = entryDate >= startDate && entryDate <= endDate;
            const isInSelectedProjects = selectedProjects.size === 0 || selectedProjects.has(entry.project);
            
            return isInDateRange && isInSelectedProjects;
        });
        renderTimeEntries(filteredEntries);
    } else {
        // If no date range, only filter by projects
        filterByProjects();
    }
}

// Modify renderTimeEntries to accept filtered entries
function renderTimeEntries(entriesToRender = timeEntries) {
    timeEntriesList.innerHTML = entriesToRender.map(entry => `
        <div class="entry">
            <div class="entry-details">
                <h3>${entry.project}</h3>
                <div class="entry-description">${entry.description}</div>
                <div class="entry-meta">
                    <p class="text-sm text-gray-400"><span style="font-family: 'Oswald', 'Nunito', monospace;">Time:</span> <span style="font-family: 'Nunito', sans-serif;">${formatTime(entry.duration, false)}</span></p>
                    <p class="text-sm text-gray-400"><span style="font-family: 'Oswald', 'Nunito', monospace;">Start:</span> <span style="font-family: 'Nunito', sans-serif;">${entry.startTime}</span></p>
                    <p class="text-sm text-gray-400"><span style="font-family: 'Oswald', 'Nunito', monospace;">End:</span> <span style="font-family: 'Nunito', sans-serif;">${entry.endTime}</span></p>
                </div>
            </div>
            <div class="entry-time">
                <span class="entry-duration">${formatTime(entry.duration, false)}</span>
                <button 
                    class="spreadsheet-btn"
                    data-entry-id="${entry.id}"
                    data-tooltip="View as table data"
                ><img src="./Assets/spreadsheet_icon.png" alt="Spreadsheet" class="spreadsheet-icon" /></button>
                <button 
                    class="copy-btn"
                    data-entry-id="${entry.id}"
                    data-tooltip="Copy as text"
                ><img src="./Assets/clipboard.png" alt="Copy as text" title="Copy as text" class="clipboard-icon" /></button>
                <button 
                    class="delete-btn"
                    data-entry-id="${entry.id}"
                    data-tooltip="Delete entry"
                ><img src="./Assets/trash-empty-blue.png" alt="Delete entry" title="Delete entry" class="trash-icon" /></button>
            </div>
        </div>
    `).join('');

    // Add event listeners after rendering
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            copyToClipboard(this.dataset.entryId, this);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteEntry(btn.dataset.entryId));
    });

    // Add spreadsheet button event listeners
    document.querySelectorAll('.spreadsheet-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const entry = timeEntries.find(e => e.id === btn.dataset.entryId);
            if (entry) {
                spreadsheetDialog.show(entry);
            }
        });
    });

    // Add event listener for copy-all-btn after DOMContentLoaded and after renderTimeEntries
    function handleCopyAllEntries() {
        if (!timeEntries.length) return;
        // Build the HTML content for all entries, similar to single entry copy
        const allHtml = timeEntries.map(entry => {
            // Convert alignment classes to inline styles
            let desc = entry.description.replace(/class=\"ql-align-(\w+)\"/g, 'style="text-align: $1"');
            desc = desc.replace(/<(h[1-3])(\s+[^>]*)?>([\s\S]*?)<\/h[1-3]>/g, (match, tag, attrs = '', content) => {
                let textAlign = '';
                let otherStyles = '';
                const styleMatch = attrs && attrs.match(/style=\"([^\"]*)\"/);
                if (styleMatch) {
                    const alignMatch = styleMatch[1].match(/text-align:\s*\w+/);
                    if (alignMatch) textAlign = alignMatch[0] + ';';
                    otherStyles = styleMatch[1].replace(/text-align:\s*\w+;?/g, '');
                }
                let oswaldStyle = "font-family: 'Oswald', sans-serif; font-weight: 600; margin-bottom: 0.5rem; margin-top: 0.5em;";
                if (tag === 'h1') {
                    oswaldStyle += " font-size: 1.4rem; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem;";
                } else if (tag === 'h2') {
                    oswaldStyle += " font-size: 1.2rem; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.2rem;";
                } else if (tag === 'h3') {
                    oswaldStyle += " font-size: 1.1rem; color: #374151;";
                }
                const finalStyle = `${oswaldStyle} ${textAlign} ${otherStyles}`.trim();
                return `<${tag} style=\"${finalStyle}\">${content}</${tag}>`;
            });
            return `
                <div style=\"font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-bottom: 2em;\">
                    <h3 style=\"margin-bottom: 8px; color: #111827; font-family: 'Oswald', sans-serif; font-size: 1.1rem; font-weight: 600;\">${entry.project}</h3>
                    <div style=\"margin-bottom: 8px; color: #4b5563; font-family: 'Nunito', sans-serif;\">${desc}</div>
                    <p style=\"font-size: 0.875rem; color: #6b7280;\"><span style=\"font-family: 'Oswald', 'Nunito', monospace;\">Time:</span> <span style=\"font-family: 'Nunito', sans-serif;\">${formatTime(entry.duration, true)}</span></p>
                    <p style=\"font-size: 0.875rem; color: #6b7280;\"><span style=\"font-family: 'Oswald', 'Nunito', monospace;\">Start:</span> <span style=\"font-family: 'Nunito', sans-serif;\">${entry.startTime}</span></p>
                    <p style=\"font-size: 0.875rem; color: #6b7280;\"><span style=\"font-family: 'Oswald', 'Nunito', monospace;\">End:</span> <span style=\"font-family: 'Nunito', sans-serif;\">${entry.endTime}</span></p>
                </div>
            `;
        }).join('');
        const blob = new Blob([allHtml], { type: 'text/html' });
        const clipboardItem = new ClipboardItem({ 'text/html': blob });
        navigator.clipboard.write([clipboardItem])
            .then(() => {
                // Visual feedback: swap icon to clipboard_copied.png, revert after 1s
                const btn = document.querySelector('.copy-all-btn');
                if (btn) {
                    const clipboardIcon = btn.querySelector('.clipboard-icon');
                    if (clipboardIcon) {
                        const originalSrc = clipboardIcon.src;
                        const originalAlt = clipboardIcon.alt;
                        clipboardIcon.src = './Assets/clipboard_copied.png';
                        clipboardIcon.alt = 'Copied';
                        clipboardIcon.onerror = function() {
                            clipboardIcon.alt = 'Image not found!';
                        };
                        setTimeout(() => {
                            clipboardIcon.src = originalSrc;
                            clipboardIcon.alt = originalAlt;
                            clipboardIcon.onerror = null;
                        }, 1000);
                    }
                }
            })
            .catch(err => {
                // Fallback to plain text if HTML copy fails
                const text = timeEntries.map(entry => `Time: ${formatTime(entry.duration, true)}\nProject: ${entry.project}\nDescription: ${entry.description}\nStart: ${entry.startTime}\nEnd: ${entry.endTime}`).join('\n\n');
                navigator.clipboard.writeText(text);
            });
    }
    // Attach event listener after every render
    function attachCopyAllBtnListener() {
        const btn = document.querySelector('.copy-all-btn');
        if (btn) {
            btn.removeEventListener('click', handleCopyAllEntries); // Prevent duplicate
            btn.addEventListener('click', handleCopyAllEntries);
        }
    }
    // Attach after DOMContentLoaded
    attachCopyAllBtnListener();
    // Patch renderTimeEntries to re-attach after each render
    const origRenderTimeEntries = renderTimeEntries;
    renderTimeEntries = function(...args) {
        origRenderTimeEntries.apply(this, args);
        attachCopyAllBtnListener();
    };
}

// Replace the confirm in deleteEntry function
async function deleteEntry(entryId) {
    const shouldDelete = await customDialog.show(
        'Delete Entry',
        'Are you sure you want to delete this entry?',
        [
            { type: 'cancel', text: 'Cancel' },
            { type: 'confirm', text: 'Delete' }
        ]
    );
    
    if (shouldDelete === 'confirm') {
        timeEntries = timeEntries.filter(entry => entry.id !== entryId);
        localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
        renderTimeEntries();
    }
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
stopBtn.addEventListener('click', stopTimer);

// Initial render
renderTimeEntries();

// Dark mode toggle logic
const darkModeToggle = document.getElementById('dark-mode-toggle');
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
    if (darkModeToggle) darkModeToggle.src = './Assets/light_mode_toggle.png';
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
    if (darkModeToggle) darkModeToggle.src = './Assets/dark_mode_toggle.png';
  }
}
// On load, apply saved dark mode preference
window.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const isDark = localStorage.getItem('darkMode') === 'true';
  setDarkMode(isDark);
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      const isDark = !document.body.classList.contains('dark-mode');
      setDarkMode(isDark);
    });
  }
});

// All Entries Dialog Functionality
let allEntriesDialog;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all entries dialog
    const allEntriesDialogElement = document.getElementById('all-entries-dialog');
    
    allEntriesDialog = {
        dialog: allEntriesDialogElement,
        closeBtn: allEntriesDialogElement.querySelector('.spreadsheet-close'),
        copyBtn: allEntriesDialogElement.querySelector('.spreadsheet-copy-btn'),
        tableBody: allEntriesDialogElement.querySelector('.spreadsheet-table tbody'),
        
        show() {
            // Clear previous content
            this.tableBody.innerHTML = '';
            
            // Add all entries to the table
            timeEntries.forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td contenteditable="true">${entry.project}</td>
                    <td contenteditable="true"><div class="entry-description">${entry.description}</div></td>
                    <td contenteditable="true">${formatTime(entry.duration, false)}</td>
                    <td contenteditable="true">${entry.startTime}</td>
                    <td contenteditable="true">${entry.endTime}</td>
                `;
                this.tableBody.appendChild(row);
            });
            
            this.dialog.classList.add('show');
        },
        
        hide() {
            this.dialog.classList.remove('show');
        },
        
        // Function to get all table data
        getAllTableData() {
            const headers = Array.from(this.dialog.querySelectorAll('.spreadsheet-table th'))
                .map(th => th.textContent);
            
            const rows = Array.from(this.tableBody.querySelectorAll('tr'))
                .map(row => Array.from(row.querySelectorAll('td'))
                    .map(td => td.textContent));
            
            return { headers, rows };
        },

        // Function to copy all table data to clipboard
        copyToClipboard() {
            const { headers, rows } = this.getAllTableData();
            
            // Create TSV content
            const tsvContent = [
                headers.join('\t'),
                ...rows.map(row => row.join('\t'))
            ].join('\n');

            // Try to copy as TSV first
            navigator.clipboard.writeText(tsvContent)
                .then(() => {
                    // Visual feedback
                    const btn = this.copyBtn;
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '✓ Copied!';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy as TSV:', err);
                    // Fallback to HTML if TSV fails
                    let htmlTable = `<table style=\"border-collapse:collapse; width:100%;\">`;
                    htmlTable += `<tr>`;
                    headers.forEach(header => {
                        htmlTable += `<th style='font-weight:bold; text-align:center; vertical-align:middle; padding:4px; white-space:normal; overflow-wrap:break-word;'>${header}</th>`;
                    });
                    htmlTable += `</tr>`;
                    rows.forEach(row => {
                        htmlTable += `<tr>`;
                        htmlTable += `<td style='text-align:left; vertical-align:middle; padding:4px; white-space:normal; overflow-wrap:break-word;'>${row[0]}</td>`;
                        htmlTable += `<td style='text-align:left; vertical-align:middle; padding:4px; white-space:normal; overflow-wrap:break-word;'>${row[1]}</td>`;
                        htmlTable += `<td style='text-align:center; vertical-align:middle; padding:4px; white-space:normal; overflow-wrap:break-word;'>${row[2]}</td>`;
                        htmlTable += `<td style='text-align:center; vertical-align:middle; padding:4px; white-space:normal; overflow-wrap:break-word;'>${row[3]}</td>`;
                        htmlTable += `<td style='text-align:center; vertical-align:middle; padding:4px; white-space:normal; overflow-wrap:break-word;'>${row[4]}</td>`;
                        htmlTable += `</tr>`;
                    });
                    htmlTable += `</table>`;
                    const blob = new Blob([htmlTable], { type: 'text/html' });
                    const clipboardItem = new ClipboardItem({ 'text/html': blob });
                    navigator.clipboard.write([clipboardItem]);
                });
        }
    };
    
    // Add event listeners for all entries dialog
    allEntriesDialog.closeBtn.addEventListener('click', () => {
        allEntriesDialog.hide();
    });
    
    allEntriesDialog.dialog.addEventListener('click', (e) => {
        if (e.target === allEntriesDialog.dialog) {
            allEntriesDialog.hide();
        }
    });
    
    allEntriesDialog.copyBtn.addEventListener('click', () => {
        allEntriesDialog.copyToClipboard();
    });

    // Add event listener for view all button
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            allEntriesDialog.show();
        });
    }
});

// Add a new function to reset the timer
function resetTimer() {
    elapsedTime = 0;
    isPaused = false;
    timeDisplay.textContent = formatTime(0, false);
    projectInput.value = '';
    quill.setContents([]);
    startBtn.style.display = 'inline-block';
    startBtn.textContent = 'Start';
    pauseBtn.style.display = 'none';
    stopBtn.style.display = 'none';
}

// Custom instant tooltip for icon buttons in .time-entries-container
(function() {
    // Tooltip for .time-entries-container icons (show above, centered)
    function showTooltip(e) {
        const target = e.currentTarget;
        const tooltip = document.getElementById('custom-tooltip');
        if (!tooltip) return;
        const text = target.getAttribute('data-tooltip');
        if (!text) return;
        tooltip.textContent = text;
        tooltip.classList.add('show');
        tooltip.style.display = 'block';
        const rect = target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        let top = rect.top - tooltipRect.height - 8;
        if (top < 0) top = rect.bottom + 8;
        let left = rect.left + (rect.width - tooltipRect.width) / 2;
        if (left < 0) left = 8;
        if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 8;
        tooltip.style.position = 'fixed';
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }
    function hideTooltip(e) {
        const tooltip = document.getElementById('custom-tooltip');
        if (!tooltip) return;
        tooltip.classList.remove('show');
        tooltip.style.display = 'none';
    }
    function moveTooltip(e) {
        showTooltip(e);
    }
    function attachTooltipListeners() {
        const card = document.querySelector('.time-entries-container');
        if (!card) return;
        const btns = card.querySelectorAll('button, .project-filter-icon');
        btns.forEach(btn => {
            btn.removeEventListener('mouseenter', showTooltip);
            btn.removeEventListener('mouseleave', hideTooltip);
            btn.removeEventListener('mousemove', moveTooltip);
            btn.addEventListener('mouseenter', showTooltip);
            btn.addEventListener('mouseleave', hideTooltip);
            btn.addEventListener('mousemove', moveTooltip);
        });
    }
    document.addEventListener('DOMContentLoaded', attachTooltipListeners);
    const origRenderTimeEntries = renderTimeEntries;
    renderTimeEntries = function(...args) {
        origRenderTimeEntries.apply(this, args);
        attachTooltipListeners();
    };
})();

(function() {
    // Tooltip for header icons (custom positions)
    function showHeaderTooltip(e) {
        const target = e.currentTarget;
        const tooltip = document.getElementById('custom-tooltip');
        if (!tooltip) return;
        const text = target.getAttribute('data-tooltip');
        if (!text) return;
        tooltip.textContent = text;
        tooltip.classList.add('show');
        tooltip.style.display = 'block';
        const rect = target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        let top, left;
        if (target.id === 'monkey-trigger') {
            // Show to the left, vertically centered
            top = rect.top + (rect.height - tooltipRect.height) / 2;
            left = rect.left - tooltipRect.width - 8;
            if (left < 0) left = rect.right + 8; // fallback to right if not enough space
        } else if (target.id === 'dark-mode-toggle') {
            // Show to the right, vertically centered
            top = rect.top + (rect.height - tooltipRect.height) / 2;
            left = rect.right + 8;
            if (left + tooltipRect.width > window.innerWidth) left = rect.left - tooltipRect.width - 8; // fallback to left if not enough space
        } else {
            // Default: show below
            top = rect.bottom + 8;
            if (top + tooltipRect.height > window.innerHeight) top = rect.top - tooltipRect.height - 8;
            left = rect.left + (rect.width - tooltipRect.width) / 2;
        }
        if (top < 0) top = 8;
        if (left < 0) left = 8;
        if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 8;
        tooltip.style.position = 'fixed';
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }
    function hideHeaderTooltip(e) {
        const tooltip = document.getElementById('custom-tooltip');
        if (!tooltip) return;
        tooltip.classList.remove('show');
        tooltip.style.display = 'none';
    }
    function moveHeaderTooltip(e) {
        showHeaderTooltip(e);
    }
    function attachHeaderTooltipListeners() {
        const headerIcons = [
            document.getElementById('dark-mode-toggle'),
            document.getElementById('monkey-trigger')
        ];
        headerIcons.forEach(icon => {
            if (!icon) return;
            icon.removeEventListener('mouseenter', showHeaderTooltip);
            icon.removeEventListener('mouseleave', hideHeaderTooltip);
            icon.removeEventListener('mousemove', moveHeaderTooltip);
            icon.addEventListener('mouseenter', showHeaderTooltip);
            icon.addEventListener('mouseleave', hideHeaderTooltip);
            icon.addEventListener('mousemove', moveHeaderTooltip);
        });
    }
    document.addEventListener('DOMContentLoaded', attachHeaderTooltipListeners);
})();

// Project Filter Functionality
let selectedProjects = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const projectFilterIcon = document.getElementById('project-filter-icon');
    const projectFilterDropdown = document.getElementById('project-filter-dropdown');
    const projectFilterList = document.querySelector('.project-filter-list');
    const projectFilterConfirm = document.querySelector('.project-filter-confirm');
    const projectFilterClose = document.querySelector('.project-filter-close');

    // Function to update project list
    function updateProjectList() {
        // Get unique project names from time entries
        const projects = [...new Set(timeEntries.map(entry => entry.project))];
        
        // Clear existing list
        projectFilterList.innerHTML = '';
        
        // Add project checkboxes
        projects.forEach(project => {
            const item = document.createElement('div');
            item.className = 'project-filter-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `project-${project}`;
            checkbox.checked = selectedProjects.has(project);
            
            const label = document.createElement('label');
            label.htmlFor = `project-${project}`;
            label.textContent = project;
            
            item.appendChild(checkbox);
            item.appendChild(label);
            projectFilterList.appendChild(item);
            
            // Add click handler for the entire item
            item.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                if (checkbox.checked) {
                    selectedProjects.add(project);
                } else {
                    selectedProjects.delete(project);
                }
            });
        });
    }

    // Toggle dropdown
    projectFilterIcon.addEventListener('click', () => {
        projectFilterDropdown.classList.toggle('show');
        if (projectFilterDropdown.classList.contains('show')) {
            updateProjectList();
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!projectFilterIcon.contains(e.target) && 
            !projectFilterDropdown.contains(e.target)) {
            projectFilterDropdown.classList.remove('show');
        }
    });

    // Handle confirm button
    projectFilterConfirm.addEventListener('click', () => {
        filterByProjects();
        projectFilterDropdown.classList.remove('show');
    });

    // Handle close button
    projectFilterClose.addEventListener('click', () => {
        projectFilterDropdown.classList.remove('show');
    });
});

// Function to filter entries by selected projects
function filterByProjects() {
    if (selectedProjects.size === 0) {
        renderTimeEntries(); // Show all entries if no projects selected
        return;
    }

    const filteredEntries = timeEntries.filter(entry => 
        selectedProjects.has(entry.project)
    );
    renderTimeEntries(filteredEntries);
} 