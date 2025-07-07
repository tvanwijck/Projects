import React, { useState } from 'react';
import spreadsheetIcon from '../../Assets/spreadsheet_icon.png';
import './SpreadsheetDialog.css';

const SpreadsheetDialog = ({ isOpen, entries, onClose, onCopyError }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen) return null;

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

  const copyToClipboard = async () => {
    // Function to convert HTML to plain text for spreadsheet data (single cell)
    const convertHtmlToPlainText = (htmlContent) => {
      if (!htmlContent) return '';
      
      // Create a temporary div to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      // Function to process text nodes and elements recursively
      const processNode = (node, indent = 0) => {
        let result = '';
        
        if (node.nodeType === Node.TEXT_NODE) {
          result += node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const tagName = node.tagName.toLowerCase();
          
          // Handle different HTML elements - keep everything in single cell
          switch (tagName) {
            case 'h1':
            case 'h2':
            case 'h3':
              result += ' ' + node.textContent + ' ';
              break;
            case 'p':
              if (node.textContent.trim()) {
                result += ' ' + node.textContent + ' ';
              }
              break;
            case 'br':
              result += ' ';
              break;
            case 'ul':
            case 'ol':
              result += ' ';
              for (let i = 0; i < node.children.length; i++) {
                result += processNode(node.children[i], indent + 2);
              }
              result += ' ';
              break;
            case 'li':
              const bullet = tagName === 'ul' ? '• ' : `${node.parentNode.children.length > 0 ? Array.from(node.parentNode.children).indexOf(node) + 1 : 1}. `;
              result += bullet + node.textContent + ' ';
              break;
            case 'strong':
            case 'b':
              result += node.textContent;
              break;
            case 'em':
            case 'i':
              result += node.textContent;
              break;
            case 'u':
              result += node.textContent;
              break;
            case 's':
            case 'strike':
              result += node.textContent;
              break;
            case 'div':
              // Handle alignment classes - just add content without alignment
              if (node.className && (node.className.includes('ql-align-center') || node.className.includes('ql-align-right'))) {
                result += ' ' + node.textContent + ' ';
              } else {
                // Process child nodes
                for (let i = 0; i < node.childNodes.length; i++) {
                  result += processNode(node.childNodes[i], indent);
                }
              }
              break;
            default:
              // Process child nodes for unknown elements
              for (let i = 0; i < node.childNodes.length; i++) {
                result += processNode(node.childNodes[i], indent);
              }
              break;
          }
        }
        
        return result;
      };
      
      // Process all child nodes
      let formattedText = '';
      for (let i = 0; i < tempDiv.childNodes.length; i++) {
        formattedText += processNode(tempDiv.childNodes[i]);
      }
      
      // Clean up extra whitespace and normalize
      return formattedText
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/^\s+|\s+$/g, '') // Trim leading/trailing whitespace
        .replace(/\t/g, ' ') // Replace tabs with spaces
        .replace(/\n/g, ' '); // Replace newlines with spaces
    };

    try {
      const headers = ['Project', 'Description', 'Duration', 'Start Time', 'End Time'];
      const rows = entries.map(entry => [
        entry.project,
        convertHtmlToPlainText(entry.description),
        formatTime(entry.duration),
        formatDateTime(entry.start_time),
        formatDateTime(entry.end_time)
      ]);

      // Create TSV content for spreadsheet compatibility
      const tsvContent = [
        headers.join('\t'),
        ...rows.map(row => row.map(cell => cell.replace(/\t/g, ' ')).join('\t'))
      ].join('\n');

      // Create CSV content as alternative
      const csvContent = [
        headers.map(h => `"${h}"`).join(','),
        ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""').replace(/\n/g, ' ')}"`).join(','))
      ].join('\n');

      // Copy both formats for better compatibility
      const clipboardItem = new ClipboardItem({
        'text/tab-separated-values': new Blob([tsvContent], { type: 'text/tab-separated-values' }),
        'text/csv': new Blob([csvContent], { type: 'text/csv' }),
        'text/plain': new Blob([tsvContent], { type: 'text/plain' })
      });

      await navigator.clipboard.write([clipboardItem]);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1000);
    } catch (error) {
      console.error('Failed to copy:', error);
      
      // Fallback to plain text if ClipboardItem is not supported
      try {
        const headers = ['Project', 'Description', 'Duration', 'Start Time', 'End Time'];
        const rows = entries.map(entry => [
          entry.project,
          convertHtmlToPlainText(entry.description),
          formatTime(entry.duration),
          formatDateTime(entry.start_time),
          formatDateTime(entry.end_time)
        ]);

        const tsvContent = [
          headers.join('\t'),
          ...rows.map(row => row.map(cell => cell.replace(/\t/g, ' ')).join('\t'))
        ].join('\n');

        await navigator.clipboard.writeText(tsvContent);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 1000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
        if (onCopyError) onCopyError();
      }
    }
  };

  return (
    <div className="spreadsheet-dialog show" onClick={onClose}>
      <div className="spreadsheet-content" onClick={(e) => e.stopPropagation()}>
        <div className="spreadsheet-header">
          <h3 className="spreadsheet-title">Time Entry Details</h3>
          <button className="spreadsheet-close" onClick={onClose}>×</button>
        </div>
        <div className="spreadsheet-table-container">
          <table className="spreadsheet-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.project}</td>
                  <td>
                    <div className="entry-description" 
                         dangerouslySetInnerHTML={{ __html: entry.description || '' }} />
                  </td>
                  <td>{formatTime(entry.duration)}</td>
                  <td>{formatDateTime(entry.start_time)}</td>
                  <td>{formatDateTime(entry.end_time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="spreadsheet-actions">
          <button className="spreadsheet-copy-btn" onClick={copyToClipboard}>
            <img src={spreadsheetIcon} alt="Spreadsheet" className="spreadsheet-icon" />
            {copySuccess ? 'Copied ✔' : 'Copy as spreadsheet data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetDialog; 