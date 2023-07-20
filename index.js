fetch('https://directus-ienas.cloud.programmercepat.com/items/news')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    // Access the retrieved data here
    console.log(data.data);

    // Display the data in the UI
    const container = document.getElementById('data-container');

          // Populate the ID dropdown in the update form
    const updateFormDropdown = document.getElementById('news-id-update');
      updateFormDropdown.innerHTML = '<option value="" disabled selected>Select News ID</option>';
      data.data.forEach(news => {
        const option = document.createElement('option');
        option.value = news.id;
        option.textContent = news.id;
        updateFormDropdown.appendChild(option);
      });

       // Populate the ID dropdown in the delete form
      const deleteFormDropdown = document.getElementById('news-id-delete');
      deleteFormDropdown.innerHTML = '<option value="" disabled selected>Select News ID</option>';
      data.data.forEach(news => {
        const option = document.createElement('option');
        option.value = news.id;
        option.textContent = news.id;
        deleteFormDropdown.appendChild(option);
      });

    
    // Iterate over the data and create HTML elements to display it
    data.data.forEach(news => {
      const newsElement = document.createElement('div');
      newsElement.classList.add('news-wrapper'); // Add the news wrapper class

      newsElement.textContent = news.title;
      newsElement.textContent = news.description;
      const imageElement = document.createElement('img');
      imageElement.classList.add('news-image'); // Add the news image class
      imageElement.src = news.image_url;

      newsElement.appendChild(imageElement);
      container.appendChild(newsElement);

    });
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });


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