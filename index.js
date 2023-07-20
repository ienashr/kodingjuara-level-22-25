const fetchData = () => {
            fetch('https://directus-ienas.cloud.programmercepat.com/items/news')
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);

                    const container = document.getElementById('data-container');
                    container.innerHTML = '';

                    const updateFormDropdown = document.getElementById('news-id-update');
                    updateFormDropdown.innerHTML = '<option value="" disabled selected>Select News ID</option>';
                    data.data.forEach(news => {
                        const option = document.createElement('option');
                        option.value = news.id;
                        option.textContent = news.id;
                        updateFormDropdown.appendChild(option);
                    });

                    const deleteFormDropdown = document.getElementById('news-id-delete');
                    deleteFormDropdown.innerHTML = '<option value="" disabled selected>Select News ID</option>';
                    data.data.forEach(news => {
                        const option = document.createElement('option');
                        option.value = news.id;
                        option.textContent = news.id;
                        deleteFormDropdown.appendChild(option);
                    });

                    data.data.forEach(news => {
                        const newsWrapper = document.createElement('div');
                        newsWrapper.classList.add('news-wrapper'); // Add the news wrapper class

                        const imageElement = document.createElement('img');
                        imageElement.classList.add('news-image'); // Add the news image class
                        imageElement.src = news.image_url; // Assuming the image URL is available in the 'image' property

                        const contentWrapper = document.createElement('div');
                        contentWrapper.classList.add('news-content'); // Add the news content class

                        const titleElement = document.createElement('h3');
                        titleElement.textContent = news.title;

                        const descriptionElement = document.createElement('p');
                        descriptionElement.textContent = news.description;

                        contentWrapper.appendChild(titleElement);
                        contentWrapper.appendChild(descriptionElement);

                        newsWrapper.appendChild(imageElement);
                        newsWrapper.appendChild(contentWrapper);

                        container.appendChild(newsWrapper);
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
              const image = document.getElementById('news-image-create').value;

          
            const data = {
                title: title,
              description: description,
                image_url: image 
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
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });

        document.getElementById('update-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const newsId = document.getElementById('news-id-update').value;
      const title = document.getElementById('news-title-update').value;
      const description = document.getElementById('news-description-update').value;
      const image = document.getElementById('news-image-create').value;


      const data = {
        title: title,
        description: description,
        image_url: image
      };

      fetch(`https://directus-ienas.cloud.programmercepat.com/items/news/${newsId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseData => {
          console.log('Response:', responseData);
          fetchData(); // Refresh the data after updating the news
        })
        .catch(error => {
          console.error('Error:', error);
        });
        });
    
          document.getElementById('delete-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const newsId = document.getElementById('news-id-delete').value;

      fetch(`https://directus-ienas.cloud.programmercepat.com/items/news/${newsId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            console.log('News deleted successfully');
            fetchData(); // Refresh the data after deleting the news
          } else {
            console.error('Error deleting news:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });

document.getElementById('delete-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const newsId = document.getElementById('news-id-delete').value;

      fetch(`https://directus-ienas.cloud.programmercepat.com/items/news/${newsId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            console.log('News deleted successfully');
            fetchData(); // Refresh the data after deleting the news
          } else {
            console.error('Error deleting news:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });   

// Fetch initial data on page load
    fetchData();