import React, { useState, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import spreadsheetIcon from '../../Assets/spreadsheet_icon.png';
import clipboardIcon from '../../Assets/clipboard.png';
import clipboardCopiedIcon from '../../Assets/clipboard_copied.png';
import filterIcon from '../../Assets/filter-icon.png';
import trashIcon from '../../Assets/trash-empty.png';
import './TimeEntries.css';

const TimeEntries = ({ entries, onDelete, onRefresh, onCopy, onViewSpreadsheet, onNoEntries, onCopyAllError }) => {
  const [showProjectFilter, setShowProjectFilter] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [tempSelectedProjects, setTempSelectedProjects] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [copyAllSuccess, setCopyAllSuccess] = useState(false);
  const startPickerRef = useRef(null);
  const endPickerRef = useRef(null);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Helper to format date as YYYY-MM-DD in local time
  function formatLocalDate(date) {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const getUniqueProjects = () => {
    return [...new Set(entries.map(entry => entry.project))];
  };

  const filteredEntries = entries.filter(entry => {
    // Project filter
    if (selectedProjects.length > 0 && !selectedProjects.includes(entry.project)) {
      return false;
    }
    
    // Date range filter
    if (dateRange.start || dateRange.end) {
      // Compare only the date part in local time
      const entryDateObj = new Date(entry.start_time);
      const entryDate = formatLocalDate(entryDateObj);
      const startDate = dateRange.start;
      const endDate = dateRange.end;
      
      if (startDate && entryDate < startDate) return false;
      if (endDate && entryDate > endDate) return false;
    }
    
    return true;
  });

  const copyAllEntries = async () => {
    if (filteredEntries.length === 0) {
      onNoEntries();
      return;
    }

    try {
      // Function to convert Quill classes to inline styles for Google Docs compatibility
      const convertQuillToInlineStyles = (htmlContent) => {
        if (!htmlContent) return '';
        
        let convertedHtml = htmlContent;
        
        // Convert alignment classes to inline styles
        convertedHtml = convertedHtml.replace(/class="([^"]*ql-align-(\w+)[^"]*)"([^>]*)>/g, (match, fullClass, alignment) => {
          const otherClasses = fullClass.replace(`ql-align-${alignment}`, '').trim();
          const otherAttrs = match.match(/class="[^"]*"([^>]*)>/)?.[1] || '';
          const styleAttr = `style="text-align: ${alignment};"`;
          return `class="${otherClasses}" ${styleAttr}${otherAttrs}>`;
        });
        
        // Convert heading styles to inline styles
        convertedHtml = convertedHtml.replace(/<(h[1-3])([^>]*)>/g, (match, tag, attrs) => {
          let fontSize, fontWeight, color, marginBottom;
          
          switch (tag) {
            case 'h1':
              fontSize = '1.4rem';
              fontWeight = '600';
              color = '#1f2937';
              marginBottom = '0.5rem';
              break;
            case 'h2':
              fontSize = '1.2rem';
              fontWeight = '600';
              color = '#1f2937';
              marginBottom = '0.5rem';
              break;
            case 'h3':
              fontSize = '1.1rem';
              fontWeight = '600';
              color = '#374151';
              marginBottom = '0.5rem';
              break;
            default:
              return match;
          }
          
          const styleAttr = `style="font-family: 'Oswald', sans-serif; font-size: ${fontSize}; font-weight: ${fontWeight}; color: ${color}; margin-bottom: ${marginBottom}; margin-top: 0.5em;"`;
          
          // Check if there's already a style attribute
          if (attrs.includes('style=')) {
            return `<${tag}${attrs.replace(/style="([^"]*)"/, `style="$1; font-family: 'Oswald', sans-serif; font-size: ${fontSize}; font-weight: ${fontWeight}; color: ${color}; margin-bottom: ${marginBottom}; margin-top: 0.5em;"`)}>`;
          } else {
            return `<${tag}${attrs} ${styleAttr}>`;
          }
        });
        
        // Convert list indentation classes to inline styles
        convertedHtml = convertedHtml.replace(/class="([^"]*ql-indent-(\d+)[^"]*)"([^>]*)>/g, (match, fullClass, indentLevel) => {
          const otherClasses = fullClass.replace(`ql-indent-${indentLevel}`, '').trim();
          const otherAttrs = match.match(/class="[^"]*"([^>]*)>/)?.[1] || '';
          const paddingLeft = `${parseInt(indentLevel) * 2}em`;
          const styleAttr = `style="padding-left: ${paddingLeft};"`;
          return `class="${otherClasses}" ${styleAttr}${otherAttrs}>`;
        });
        
        return convertedHtml;
      };

      // Create HTML content for all entries with proper styling
      const allEntriesHtml = filteredEntries.map(entry => {
        const convertedDescription = convertQuillToInlineStyles(entry.description);
        return `
          <div style="font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-bottom: 2em;">
            <h3 style="margin-bottom: 8px; color: #111827; font-family: 'Oswald', sans-serif; font-size: 1.1rem; font-weight: 600;">${entry.project}</h3>
            <div style="margin-bottom: 8px; color: #4b5563; font-family: 'Nunito', sans-serif;">
              ${convertedDescription || ''}
            </div>
            <p style="font-size: 0.875rem; color: #6b7280;"><span style="font-family: 'Oswald', 'Nunito', monospace;">Time:</span> <span style="font-family: 'Nunito', sans-serif;">${formatTime(entry.duration)}</span></p>
            <p style="font-size: 0.875rem; color: #6b7280;"><span style="font-family: 'Oswald', 'Nunito', monospace;">Start:</span> <span style="font-family: 'Nunito', sans-serif;">${formatDateTime(entry.start_time)}</span></p>
            <p style="font-size: 0.875rem; color: #6b7280;"><span style="font-family: 'Oswald', 'Nunito', monospace;">End:</span> <span style="font-family: 'Nunito', sans-serif;">${formatDateTime(entry.end_time)}</span></p>
          </div>
        `;
      }).join('');

      const blob = new Blob([allEntriesHtml], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([clipboardItem]);
      setCopyAllSuccess(true);
      setTimeout(() => setCopyAllSuccess(false), 1000);
    } catch (error) {
      console.error('Failed to copy:', error);
      if (onCopyAllError) onCopyAllError();
    }
  };

  const toggleProjectFilter = () => {
    setTempSelectedProjects(selectedProjects);
    setShowProjectFilter(!showProjectFilter);
  };

  const handleProjectToggle = (project) => {
    setTempSelectedProjects(prev =>
      prev.includes(project)
        ? prev.filter(p => p !== project)
        : [...prev, project]
    );
  };

  const confirmProjectFilter = () => {
    setSelectedProjects(tempSelectedProjects);
    setShowProjectFilter(false);
  };

  const clearProjectFilter = () => {
    setTempSelectedProjects([]);
  };

  const clearDateFilter = () => {
    setDateRange({ start: '', end: '' });
    setSelectedProjects([]);
  };

  // Flatpickr options
  const flatpickrOptions = {
    dateFormat: 'Y-m-d',
    allowInput: false,
    disableMobile: true,
    theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light',
  };

  return (
    <div className="time-entries-container">
      <div className="entries-header">
        <h2>Time Entries</h2>
        <div className="entries-actions">
          <button 
            className="view-all-btn" 
            data-tooltip="View all as table data"
            onClick={() => onViewSpreadsheet(entries)}
          >
            <img src={spreadsheetIcon} alt="Spreadsheet" className="spreadsheet-icon" />
          </button>
          <button 
            className="copy-all-btn" 
            data-tooltip="Copy all as text"
            onClick={copyAllEntries}
          >
            <img src={copyAllSuccess ? clipboardCopiedIcon : clipboardIcon} alt="Copy all as text" className="clipboard-icon" />
          </button>
        </div>
      </div>

      {/* Project Filter Icon Row */}
      <div className="project-filter-row">
        <div className="project-filter-aligner">
          <span className="project-filter-icon-wrapper" data-tooltip="Filter by project">
            <img 
              src={filterIcon} 
              className="project-filter-icon" 
              alt="Filter by project" 
              onClick={toggleProjectFilter}
            />
          </span>
          {showProjectFilter && (
            <div className="project-filter-dropdown">
              <div className="project-filter-header">
                <button className="project-filter-confirm" onClick={confirmProjectFilter}>
                  Confirm
                </button>
                <button className="project-filter-close" onClick={toggleProjectFilter}>×</button>
              </div>
              <div className="project-filter-list">
                {getUniqueProjects().map(project => (
                  <label key={project} className="project-filter-item">
                    <input
                      type="checkbox"
                      checked={tempSelectedProjects.includes(project)}
                      onChange={() => handleProjectToggle(project)}
                    />
                    <span>{project}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Date Filter Section */}
      <div className="date-filter-section">
        <div className="date-range-picker">
          <div className="date-input-group">
            <button
              type="button"
              className="date-picker-btn"
              onClick={() => startPickerRef.current.flatpickr.open()}
            >
              {dateRange.start ? new Date(dateRange.start).toLocaleDateString('en-GB') : 'Select start date'}
            </button>
            <Flatpickr
              ref={startPickerRef}
              options={flatpickrOptions}
              value={dateRange.start}
              onChange={(selectedDates) => {
                if (selectedDates && selectedDates[0]) {
                  const formattedDate = formatLocalDate(selectedDates[0]);
                  setDateRange(prev => ({ ...prev, start: formattedDate }));
                }
              }}
              className="visually-hidden"
            />
          </div>
          <div className="date-input-group">
            <button
              type="button"
              className="date-picker-btn"
              onClick={() => endPickerRef.current.flatpickr.open()}
            >
              {dateRange.end ? new Date(dateRange.end).toLocaleDateString('en-GB') : 'Select end date'}
            </button>
            <Flatpickr
              ref={endPickerRef}
              options={flatpickrOptions}
              value={dateRange.end}
              onChange={(selectedDates) => {
                if (selectedDates && selectedDates[0]) {
                  const formattedDate = formatLocalDate(selectedDates[0]);
                  setDateRange(prev => ({ ...prev, end: formattedDate }));
                }
              }}
              className="visually-hidden"
            />
          </div>
        </div>
        <button 
          className="view-all-dates-btn"
          onClick={clearDateFilter}
        >
          View all
        </button>
      </div>

      <div className="entries-list">
        {filteredEntries.length === 0 ? (
          <div className="no-entries">
            <p>No time entries found.</p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="time-entry">
              <div className="entry-card-row">
                <div className="entry-main-col">
                  <h3 className="entry-project">{entry.project}</h3>
                  {entry.description && (
                    <div 
                      className="entry-description quill-content"
                      dangerouslySetInnerHTML={{ __html: entry.description }}
                    />
                  )}
                  <div className="entry-divider" />
                  <div className="entry-info-col">
                    <div className="entry-info-row">
                      <span className="time-label">Time:</span>
                      <span className="time-value">{formatTime(entry.duration)}</span>
                    </div>
                    <div className="entry-info-row">
                      <span className="time-label">Start:</span>
                      <span className="time-value">{formatDateTime(entry.start_time)}</span>
                    </div>
                    <div className="entry-info-row">
                      <span className="time-label">End:</span>
                      <span className="time-value">{formatDateTime(entry.end_time)}</span>
                    </div>
                  </div>
                </div>
                <div className="entry-actions-col">
                  <span className="entry-top-time">{formatTime(entry.duration)}</span>
                  <button
                    className="spreadsheet-entry-btn"
                    data-tooltip="View as table data"
                    onClick={() => onViewSpreadsheet([entry])}
                  >
                    <img src={spreadsheetIcon} alt="View as table data" className="spreadsheet-icon" />
                  </button>
                  <button
                    className="copy-entry-btn"
                    data-tooltip="Copy as text"
                    data-entry-id={entry.id}
                    onClick={() => onCopy(entry)}
                  >
                    <img src={clipboardIcon} alt="Copy" className="clipboard-icon" />
                  </button>
                  <button
                    className="delete-entry-btn"
                    data-tooltip="Delete entry"
                    onClick={() => onDelete(entry.id)}
                  >
                    <img src={trashIcon} alt="Delete" className="trash-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TimeEntries; 