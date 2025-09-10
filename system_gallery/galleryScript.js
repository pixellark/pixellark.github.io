document.addEventListener("DOMContentLoaded", function () {
    const products = Array.from(document.querySelectorAll(".product-card"));
    let itemsPerPage = 9;
    let currentPage = 1;
    let totalPages = Math.ceil(products.length / itemsPerPage);

    const pageCreate = document.querySelector('.pagination');

    function createPagination() {
        totalPages = Math.ceil(products.length / itemsPerPage);
        pageCreate.innerHTML = `
            <button class="pagination-btn"><i class="fas fa-chevron-left"></i></button>
            ${Array.from({ length: totalPages }, (_, i) => `<button class="pagination-btn ${i === 0 ? 'active' : ''}">${i + 1}</button>`).join('')}
            <button class="pagination-btn"><i class="fas fa-chevron-right"></i></button>
        `;
        attachPaginationEvents();
    }

    function showPage(page) {
        currentPage = page;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        products.forEach((item, index) => {
            item.style.display = (index >= start && index < end) ? "block" : "none";
        });

        const paginationButtons = document.querySelectorAll(".pagination-btn");
        paginationButtons.forEach(btn => btn.classList.remove("active"));

        const pageBtn = Array.from(paginationButtons).find(btn => btn.textContent.trim() == page);
        if (pageBtn) pageBtn.classList.add("active");

        paginationButtons[0].style.visibility = (currentPage === 1) ? "hidden" : "visible";
        paginationButtons[paginationButtons.length - 1].style.visibility = (currentPage === totalPages) ? "hidden" : "visible";
    }

    const filterSection = document.querySelector('.filter-section');

    function attachPaginationEvents() {
        const paginationButtons = document.querySelectorAll(".pagination-btn");
        paginationButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.querySelector("i.fas.fa-chevron-left")) {
                    if (currentPage > 1) showPage(currentPage - 1);
                } else if (btn.querySelector("i.fas.fa-chevron-right")) {
                    if (currentPage < totalPages) showPage(currentPage + 1);
                } else {
                    showPage(parseInt(btn.textContent));
                }
                filterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (this.dataset.view === 'grid') itemsPerPage = 9;
            else if (this.dataset.view === 'compact') itemsPerPage = 12;
            else itemsPerPage = 6;

            createPagination();
            showPage(1);
        });
    });

    createPagination();
    showPage(1);
});

// Filter and search functionality
function initGallery() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('productsGrid');
    const productCards = document.querySelectorAll('.product-card');

    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;
            filterProducts(category, searchInput.value, sortSelect.value);
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function () {
        const activeCategory = document.querySelector('.filter-tab.active').dataset.category;
        filterProducts(activeCategory, this.value, sortSelect.value);
    });

    // Sort functionality
    sortSelect.addEventListener('change', function () {
        const activeCategory = document.querySelector('.filter-tab.active').dataset.category;
        filterProducts(activeCategory, searchInput.value, this.value);
    });

    // View controls
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const view = this.dataset.view;
            setViewMode(view);
        });
    });

    // Product card interactions
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) rotateX(5deg) rotateY(5deg) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

function filterProducts(category, searchTerm, sortBy) {
    const productCards = document.querySelectorAll('.product-card');
    const loadingEl = document.getElementById('loadingProducts');

    // Show loading
    loadingEl.classList.add('active');

    setTimeout(() => {
        let visibleProducts = [];

        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardTitle = card.querySelector('.product-title').textContent.toLowerCase();
            const cardDescription = card.querySelector('.product-description').textContent.toLowerCase();

            // const matchesCategory = category === 'all' || cardCategory === category;
            const matchesCategory = category === 'all' || cardCategory.includes(category);
            const matchesSearch = searchTerm === '' ||
                cardTitle.includes(searchTerm.toLowerCase()) ||
                cardDescription.includes(searchTerm.toLowerCase());

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                visibleProducts.push(card);
            } else {
                card.style.display = 'none';
            }
        });

        // Sort products
        sortProducts(visibleProducts, sortBy);

        // Hide loading
        loadingEl.classList.remove('active');

        // Animate visible products
        visibleProducts.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 1000);
}

function sortProducts(products, sortBy) {
    const productsGrid = document.getElementById('productsGrid');

    products.sort((a, b) => {
        switch (sortBy) {
            case 'featured':
                return parseFloat(b.dataset.featuredx) - parseFloat(a.dataset.featuredx);
            case 'price-low':
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-high':
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'rating':
                return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
            case 'newest':
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            default:
                return 0;
        }
    });

    // Reorder DOM elements
    products.forEach(product => {
        productsGrid.appendChild(product);
    });
}

function setViewMode(view) {
    const productsGrid = document.getElementById('productsGrid');
    const productCards = document.querySelectorAll('.product-card');

    // Remove all view classes
    productsGrid.classList.remove('list-view', 'compact-view');
    productCards.forEach(card => {
        card.classList.remove('list-view', 'compact-view');
    });

    // Add new view class
    if (view === 'list') {
        productsGrid.classList.add('list-view');
        productCards.forEach(card => {
            card.classList.add('list-view');
        });
    } else if (view === 'compact') {
        productsGrid.classList.add('compact-view');
        productCards.forEach(card => {
            card.classList.add('compact-view');
        });
    }
}

// Initialize everything
function init() {
    initGallery();

    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.onclick = (event) => {
            event.stopPropagation(); // stop parent click
            alert('Under Development.');
        };
    });

    // Add ripple effects to buttons
    document.querySelectorAll('.btn-primary, .filter-tab, .view-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            if (this.classList.contains('btn-secondary')) return;

            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s ease-out;
                        pointer-events: none;
                    `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add advanced interactions
document.addEventListener('DOMContentLoaded', function () {
    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.gallery-hero');
        if (hero) {
            if (isMobile()) {
                hero.style.transform = `translateY(${scrolled * 0.1}px)`;
            } else {
                hero.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        }
    });

    // Advanced search with debouncing
    let searchTimeout;
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const activeCategory = document.querySelector('.filter-tab.active')?.dataset.category || 'all';
                const sortValue = document.getElementById('sortSelect')?.value || 'featured';
                filterProducts(activeCategory, this.value, sortValue);
            }, 300);
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all product cards for scroll animations
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });

    // Advanced keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === '/') {
            e.preventDefault();
            document.getElementById('searchInput')?.focus();
        }

        if (e.key === 'Escape') {
            document.getElementById('searchInput')?.blur();
        }
    });

    // Enhanced product card interactions
    document.querySelectorAll('.product-card').forEach(card => {
        // Add magnetic effect to buttons
        const buttons = card.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });

            button.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add 3D depth effect to product images
        const productImage = card.querySelector('.product-image');
        const productIcon = card.querySelector('.product-icon');

        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            if (productIcon) {
                productIcon.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        card.addEventListener('mouseleave', function () {
            if (productIcon) {
                productIcon.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
            }
        });
    });

    // Add smooth transitions to view mode changes
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.style.opacity = '0.5';
            productsGrid.style.transform = 'scale(0.95)';

            setTimeout(() => {
                productsGrid.style.opacity = '1';
                productsGrid.style.transform = 'scale(1)';
            }, 200);
        });
    });
});

// Performance optimization: Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
