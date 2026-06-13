document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('itinerary-container');
  const addBtn = document.getElementById('add-event-btn');
  const exportBtn = document.getElementById('export-btn');
  
  const dialog = document.getElementById('event-dialog');
  const exportDialog = document.getElementById('export-dialog');
  const form = document.getElementById('event-form');
  const cancelBtn = document.getElementById('cancel-btn');
  const closeExportBtn = document.getElementById('close-export-btn');
  const dialogTitle = document.getElementById('dialog-title');
  const exportTextarea = document.getElementById('export-textarea');
  const docsContainer = document.getElementById('docs-container');
  const addDocBtn = document.getElementById('add-doc-btn');

  // Initialize state from LocalStorage or fallback to window.itineraryData
  let events = [];
  const storedData = localStorage.getItem('greece_trip_events');
  if (storedData) {
    try {
      events = JSON.parse(storedData);
    } catch(e) {
      events = window.itineraryData || [];
    }
  } else {
    events = window.itineraryData || [];
    saveData();
  }

  // Tab switching logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active to clicked
      btn.classList.add('active');
      document.getElementById(`${btn.dataset.tab}-container`).classList.add('active');
    });
  });

  function renderCosts() {
    const costsContainer = document.getElementById('costs-container');
    if (!costsContainer) return;
    
    let total = 0;
    const categoryTotals = {
      flight: 0,
      hotel: 0,
      ferry: 0,
      car: 0,
      activity: 0,
      other: 0
    };

    events.forEach(event => {
      const cost = parseFloat(event.cost) || 0;
      total += cost;
      if (categoryTotals[event.type] !== undefined) {
        categoryTotals[event.type] += cost;
      } else {
        categoryTotals.other += cost;
      }
    });

    costsContainer.innerHTML = `
      <div class="cost-total-card">
        <h2>Total Estimated Cost</h2>
        <div class="grand-total">€${total.toFixed(2)}</div>
      </div>
      <div class="cost-breakdown">
        ${Object.entries(categoryTotals)
          .filter(([_, amount]) => amount > 0)
          .map(([type, amount]) => `
            <div class="cost-category">
              <div class="category-name">
                <div class="event-icon-wrapper" style="width: 40px; height: 40px;">
                  ${getIcon(type)}
                </div>
                <span style="text-transform: capitalize;">${type}</span>
              </div>
              <div class="category-amount">€${amount.toFixed(2)}</div>
            </div>
          `).join('')}
      </div>
    `;
  }

  function saveData() {
    events.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA.getTime() === dateB.getTime()) {
        return (a.time || '').localeCompare(b.time || '');
      }
      return dateA - dateB;
    });
    localStorage.setItem('greece_trip_events', JSON.stringify(events));
  }

  // SVG Icons for the pastel theme
  const getIcon = (type) => {
    const base = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`;
    switch(type) {
      case 'flight': return `${base}<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.6c-.2.6.2 1.2.8 1.4L8 14l-4.5 4.5-2.8-.7c-.6-.1-1.1.3-1.2.9l-.3 1.3c-.1.6.4 1.1 1 1l3.5-.8 4.5-4.5 2.1 4.7c.2.6.8 1 1.4.8l3.6-1.2c.5-.2.8-.6.7-1.1z"/></svg>`;
      case 'hotel': return `${base}<path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h6"/></svg>`;
      case 'car': return `${base}<path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0m-6 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0"/></svg>`;
      case 'ferry': return `${base}<path d="M2 18h20"/><path d="M4 14v4"/><path d="M20 14v4"/><path d="M8 10v4"/><path d="M16 10v4"/><path d="M5 14h14l-1.5-6h-11z"/><path d="M10 6h4"/><path d="M12 2v4"/></svg>`;
      case 'activity': return `${base}<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`;
      default: return `${base}<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    }
  };

  function renderEvents() {
    container.innerHTML = '';
    
    if (events.length === 0) {
      container.innerHTML = '<p style="text-align:center; color:var(--text-secondary)">No events found. Add one!</p>';
      return;
    }

    const now = new Date();
    let nextEventId = null;

    events.forEach(event => {
      const eventDate = new Date(event.date);
      const isPast = eventDate < new Date(now.toDateString());
      
      if (!isPast && !nextEventId) {
        nextEventId = event.id;
      }

      const timelineItem = document.createElement('div');
      timelineItem.className = 'timeline-item';
      if (isPast) timelineItem.classList.add('past-event');

      const dateStr = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      let docsHtml = '';
      if (event.docs && event.docs.length > 0) {
        docsHtml = `<div class="docs-list">
          ${event.docs.map(doc => `
            <a href="${doc.url}" target="_blank" class="doc-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              ${doc.name}
            </a>
          `).join('')}
        </div>`;
      }

      timelineItem.innerHTML = `
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          <div class="timeline-line"></div>
        </div>
        
        <div class="event-card" id="${event.id}">
          <div class="event-header">
            <div class="event-date-time">
              <div class="event-time">${event.time || ''}</div>
              <div class="event-date">${dateStr}</div>
            </div>
            <div class="event-icon-wrapper">
              ${getIcon(event.type)}
            </div>
          </div>
          
          <div>
            <h2 class="event-title">${event.title}</h2>
            <p class="event-desc">${event.description}</p>
          </div>
          
          <div class="event-details">
            ${event.location ? `
              <div class="detail-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                ${event.mapLink ? `<a href="${event.mapLink}" target="_blank">${event.location}</a>` : event.location}
              </div>
            ` : ''}
            
            ${event.contacts ? `
              <div class="detail-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                ${event.contacts}
              </div>
            ` : ''}
            
            ${docsHtml}
            
            <div class="card-actions">
              <button class="action-btn edit-btn" data-id="${event.id}">Edit</button>
              <button class="action-btn delete delete-btn" data-id="${event.id}">Delete</button>
            </div>
          </div>
        </div>
      `;

      container.appendChild(timelineItem);
    });

    if (nextEventId) {
      const nextCard = document.getElementById(nextEventId);
      if (nextCard) {
        nextCard.closest('.timeline-item').classList.add('next-event');
      }
    }

    // Attach event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => openEditDialog(e.target.dataset.id));
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => deleteEvent(e.target.dataset.id));
    });

    // Update costs view
    renderCosts();
  }

  function deleteEvent(id) {
    if(confirm('Are you sure you want to delete this event?')) {
      events = events.filter(e => e.id !== id);
      saveData();
      renderEvents();
    }
  }

  function renderDocsInputs(docs) {
    docsContainer.innerHTML = '';
    if (docs && docs.length > 0) {
      docs.forEach(doc => addDocInputRow(doc.name, doc.url));
    }
  }

  function addDocInputRow(name = '', url = '') {
    const row = document.createElement('div');
    row.className = 'doc-row';
    row.innerHTML = `
      <input type="text" class="doc-name-input" placeholder="Name (e.g. Ticket)" value="${name}" required>
      <input type="text" class="doc-url-input" placeholder="URL (e.g. ./ticket.pdf)" value="${url}" required>
      <button type="button" class="btn-remove-doc">X</button>
    `;
    row.querySelector('.btn-remove-doc').addEventListener('click', () => {
      row.remove();
    });
    docsContainer.appendChild(row);
  }

  addDocBtn.addEventListener('click', () => {
    addDocInputRow();
  });

  function openEditDialog(id) {
    const event = events.find(e => e.id === id);
    if (!event) return;
    
    dialogTitle.textContent = 'Edit Event';
    document.getElementById('event-id').value = event.id;
    document.getElementById('event-type').value = event.type;
    document.getElementById('event-title').value = event.title;
    document.getElementById('event-date').value = event.date;
    document.getElementById('event-time').value = event.time || '';
    document.getElementById('event-desc').value = event.description || '';
    document.getElementById('event-location').value = event.location || '';
    document.getElementById('event-map').value = event.mapLink || '';
    document.getElementById('event-contacts').value = event.contacts || '';
    document.getElementById('event-cost').value = event.cost || '';
    
    renderDocsInputs(event.docs || []);
    
    dialog.showModal();
  }

  function openAddDialog() {
    dialogTitle.textContent = 'Add Event';
    form.reset();
    document.getElementById('event-id').value = '';
    document.getElementById('event-cost').value = '';
    renderDocsInputs([]);
    dialog.showModal();
  }

  addBtn.addEventListener('click', openAddDialog);
  
  cancelBtn.addEventListener('click', () => {
    dialog.close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const idField = document.getElementById('event-id').value;
    
    // Collect docs
    const collectedDocs = [];
    docsContainer.querySelectorAll('.doc-row').forEach(row => {
      const name = row.querySelector('.doc-name-input').value.trim();
      const url = row.querySelector('.doc-url-input').value.trim();
      if (name && url) {
        collectedDocs.push({ name, url });
      }
    });
    
    const updatedEvent = {
      id: idField || `event-${Date.now()}`,
      type: document.getElementById('event-type').value,
      title: document.getElementById('event-title').value,
      date: document.getElementById('event-date').value,
      time: document.getElementById('event-time').value,
      description: document.getElementById('event-desc').value,
      location: document.getElementById('event-location').value,
      mapLink: document.getElementById('event-map').value,
      contacts: document.getElementById('event-contacts').value,
      cost: parseFloat(document.getElementById('event-cost').value) || 0,
      docs: collectedDocs
    };

    if (idField) {
      const index = events.findIndex(e => e.id === idField);
      if (index !== -1) {
        events[index] = updatedEvent;
      }
    } else {
      events.push(updatedEvent);
    }

    saveData();
    renderEvents();
    dialog.close();
  });

  // Export functionality
  exportBtn.addEventListener('click', () => {
    const jsStr = `const itineraryData = ${JSON.stringify(events, null, 2)};\n\nwindow.itineraryData = itineraryData;`;
    exportTextarea.value = jsStr;
    exportDialog.showModal();
  });

  closeExportBtn.addEventListener('click', () => {
    exportDialog.close();
  });

  // Initial render
  renderEvents();
});

// Register Service Worker for PWA and handle automatic updates
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('Service Worker registered', reg);
        
        // Check for updates periodically or on load
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                console.log('New update activated. Reloading...');
                window.location.reload();
              }
            });
          }
        });
      })
      .catch(err => console.error('Service Worker registration failed', err));

    // Listen for controller changes to reload immediately
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  });
}
