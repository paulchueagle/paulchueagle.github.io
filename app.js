// Scientific Profile App Logic

document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Setup ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Toggle between dark and light themes
  themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  });

  // --- Publication Searching & Filtering ---
  const searchInput = document.getElementById('pub-search');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');

  let activeFilter = 'all';
  let searchQuery = '';

  function filterPublications() {
    pubCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.querySelector('.pub-title').textContent.toLowerCase();
      const authors = card.querySelector('.pub-authors').textContent.toLowerCase();
      const venue = card.querySelector('.pub-venue').textContent.toLowerCase();
      const searchContent = `${title} ${authors} ${venue}`;

      const matchesFilter = (activeFilter === 'all' || category === activeFilter);
      const matchesSearch = searchContent.includes(searchQuery);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Search input handler
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    filterPublications();
  });

  // Filter buttons click handler
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      filterPublications();
    });
  });

  // --- Citation Copying (BibTeX) ---
  const copyBtns = document.querySelectorAll('.copy-bib-btn');
  const toast = document.getElementById('toast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const bibtex = btn.getAttribute('data-bib');
      
      navigator.clipboard.writeText(bibtex).then(() => {
        // Show success toast notification
        toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  });
});
