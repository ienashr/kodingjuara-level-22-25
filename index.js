  const fetchData = () => {
            fetch('https://directus-ienas.cloud.programmercepat.com/items/news')
                .then(response => response.json())
                .then(data => {
                    const container = document.getElementById('data-container');
                    container.innerHTML = '';

                    data.forEach(news => {
                        const newsElement = document.createElement('div');
                        newsElement.innerHTML = `
                  <h3>${news.title}</h3>
                  <p>${news.description}</p>
                `;
                        container.appendChild(newsElement);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };

        document.getElementById('create-form').addEventListener('submit', function (event) {
            event.preventDefault();

            const title = document.getElementById('news-title-create').value;
            const description = document.getElementById('news-description-create').value;

            const data = {
                title: title,
                description: description
            };

            fetch('https://directus-ienas.cloud.programmercepat.com/items/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log('Response:', responseData);
                    fetchData(); // Refresh the data after creating the news
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });