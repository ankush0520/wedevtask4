document.addEventListener('DOMContentLoaded', () => {
    const trendingList = document.getElementById('trending-list');
    const seriesList = document.getElementById('series-list');
    const recommendedList = document.getElementById('recommended-list');

    const sampleContent = [
        { id: 1, title: "Movie 1", type: "movie", description: "Description for Movie 1", image: "path/to/image1.jpg" },
        { id: 2, title: "Series 1", type: "series", description: "Description for Series 1", image: "path/to/image2.jpg" },
        // Add more sample content here
    ];

    function renderContent(listElement, content) {
        content.forEach(item => {
            const div = document.createElement('div');
            div.className = 'content-item';
            div.innerHTML = `<img src="${item.image}" alt="${item.title}">
                             <p>${item.title}</p>`;
            div.addEventListener('click', () => {
                localStorage.setItem('contentDetails', JSON.stringify(item));
                window.location.href = 'content.html';
            });
            listElement.appendChild(div);
        });
    }

    renderContent(trendingList, sampleContent.filter(item => item.type === 'movie'));
    renderContent(seriesList, sampleContent.filter(item => item.type === 'series'));
    renderContent(recommendedList, sampleContent);

    if (window.location.pathname.includes('content.html')) {
        const contentDetails = JSON.parse(localStorage.getItem('contentDetails'));
        document.getElementById('content-title').innerText = contentDetails.title;
        document.getElementById('content-description').innerText = contentDetails.description;
        document.getElementById('content-image').src = contentDetails.image;
    }

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const allContent = document.querySelectorAll('.content-item');
        allContent.forEach(item => {
            const title = item.querySelector('p').innerText.toLowerCase();
            if (title.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple mock authentication
            if (username === 'user' && password === 'password') {
                localStorage.setItem('authenticated', 'true');
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    if (!localStorage.getItem('authenticated') && window.location.pathname !== '/login.html') {
        window.location.href = 'login.html';
    }
});
