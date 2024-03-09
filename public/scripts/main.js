(() => {
/**
 * Imports
*/
const categories = document.querySelectorAll('.category');

/**
 * Set the active category based on the URL
*/

function setActiveCategory() {
    const slug = window.location.pathname.split('/').pop();
    console.log(`This is the slug: ${slug}`);

    categories.forEach(category => {
        const categorySlug = category.getAttribute('data-slug');
        console.log(`This is the category slug: ${categorySlug}`);

        if (categorySlug === slug) {
            category.classList.add('shadow--active');
        } else if (categorySlug === '/' && slug === '') {
            category.classList.add('shadow--active'); // For the home page
        }
        else {
            category.classList.remove('shadow--active');
        }
    });
}

/** 
 * Initialize the page
*/

function init() {
    setActiveCategory();
};

// Call the init function when the page loads
init();
})();