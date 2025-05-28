async function getNasaPhoto(apiKey = 'DOmEoiZ5NwXtG3hTJVuRMibe3XIBduziBbYMglZK') {
                        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
                        const container = document.getElementById('nasa-photo'); // Mover para cá para usar no catch também

                        try {
                            const response = await fetch(url);
                            if (!response.ok) {
                                throw new Error(`Erro HTTP: ${response.status}`);
                            }

                            const data = await response.json();
                            // const container = document.getElementById('nasa-photo'); // Já definido acima
                            container.innerHTML = `
                    <h3>${data.title}</h3>
                    ${data.media_type === 'image'
                                    ? `<img src="${data.url}" alt="${data.title}" style="max-width: 100%; border-radius: 10px;">`
                                    : `<iframe src="${data.url}" width="560" height="315" frameborder="0" allowfullscreen style="max-width: 100%; border-radius: 10px;"></iframe>`
                                }
                    <p style="text-align: left; margin-top: 10px;">${data.explanation}</p>
                `;
                        } catch (error) {
                            // const container = document.getElementById('nasa-photo'); // Já definido acima
                            container.innerHTML = `<p style="color:red;">Erro ao carregar a foto: ${error.message}</p>`;
                            console.error('Erro na requisição:', error.message, error); // Logar o objeto de erro completo
                        }
                    }
                    getNasaPhoto();