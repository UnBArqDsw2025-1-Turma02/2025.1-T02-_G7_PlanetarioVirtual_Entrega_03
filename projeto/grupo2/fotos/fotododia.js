function setupApodUI() {
    const container = document.getElementById('nasa-photo');
    if (!container) {
        console.error("ERRO: Container #nasa-photo não encontrado no HTML.");
        return;
    }

    const controlPanelStyle = "flex: 1 1 300px; min-width: 280px; background-color: #1c1c1e; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; flex-direction: column; gap: 12px;";
    const labelStyle = "color: #f0f0f0; margin-bottom: 4px; font-size: 0.9rem; display:block; text-align:left;";
    const inputStyle = "width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #444; background-color: #333; color: #eee; box-sizing: border-box; font-size: 0.95rem;";
    const selectStyle = inputStyle;
    const buttonStyle = "width: 100%; padding: 12px; border-radius: 5px; background-color: #007bff; color: white; border: none; cursor: pointer; font-weight: bold; font-size: 1rem; transition: background-color 0.2s; margin-top:10px;";
    const photoDisplayAreaStyle = "flex: 2 1 60%; min-width: 320px; display: flex; flex-direction: column;"; // Conteúdo empilhado

    container.innerHTML = `
        <div id="apodLayout" style="display: flex; flex-wrap: wrap; gap: 25px; align-items: flex-start;">
            <div id="apodControlPanel" style="${controlPanelStyle}">
                <h4 style="color: #f0f0f0; margin-top:0; margin-bottom: 10px; font-size: 1.3rem; text-align:center;">Foto(s) Astronômica(s)</h4>
                <div>
                    <label for="apodSelectedDate" style="${labelStyle}">Data Principal:</label>
                    <input type="date" id="apodSelectedDate" style="${inputStyle}">
                </div>
                <div>
                    <label for="photoQuantity" style="${labelStyle}">Quantidade de Fotos:</label>
                    <select id="photoQuantity" style="${selectStyle}">
                        <option value="1" selected>1 Foto (data selecionada)</option>
                        <option value="2">2 Fotos (selecionada e anterior)</option>
                        <option value="3">3 Fotos (selecionada e 2 anteriores)</option>
                    </select>
                </div>
                <button onclick="handleFetchButtonClick()" style="${buttonStyle}"
                    onmouseover="this.style.backgroundColor='#0056b3'"
                    onmouseout="this.style.backgroundColor='#007bff'">
                    Ver Foto(s)
                </button>
            </div>

            <div id="apodDisplayArea" style="${photoDisplayAreaStyle}">
                <div id="apodFeedback" style="text-align:center; color: #ccc; padding: 20px; font-size:1.1em; min-height: 50px;"></div>
                <div id="apodPhotosContainer"> 
                    </div>
            </div>
        </div>
    `;
}

async function fetchAndDisplayNasaPhotos(photoProvider, startDate, endDate) {
    const photosContainer = document.getElementById('apodPhotosContainer');
    const feedbackDiv = document.getElementById('apodFeedback');

    if (!photosContainer || !feedbackDiv) {
        console.error("ERRO: Elementos da UI APOD (photosContainer ou feedbackDiv) não encontrados.");
        if(feedbackDiv) feedbackDiv.innerHTML = `<p style="color:red;">Erro de configuração da página.</p>`;
        return;
    }

    feedbackDiv.innerHTML = `<p style="color: #ccc; padding: 40px 0; font-size:1.2rem;">Carregando fotos de ${startDate} a ${endDate}...</p>`;
    photosContainer.innerHTML = '';

    try {
        const dataArray = await photoProvider.getPhotos(startDate, endDate);
        
        if (!Array.isArray(dataArray) || dataArray.length === 0) {
            feedbackDiv.innerHTML = `<p style="color:#ffb3b3; background-color: rgba(255,100,100,0.1); border:1px solid #ff8c8c; padding:15px; border-radius:5px;">Nenhuma foto encontrada para o período de ${startDate} a ${endDate}.</p>`;
            return;
        }
        
        feedbackDiv.innerHTML = '';
        const sortedData = dataArray.sort((a, b) => new Date(b.date) - new Date(a.date)); 

        let photosHTML = '';
        const titleStyle = "color: #e9ecef; text-align: center; font-size: 1.6rem; margin-bottom: 5px; line-height: 1.2;";
        const dateSubStyle = "font-size: 0.85em; color: #adb5bd; text-align:center; display:block; margin-bottom:12px;";
        const mediaImgStyle = "width: 100%; max-width: 100%; height: auto; border-radius: 8px; display: block; margin: 10px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.3);";
        const mediaIframeWrapperStyle = "position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; margin: 10px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.3);";
        const mediaIframeStyle = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;";
        
        sortedData.forEach(data => {
            photosHTML += `
                <div class="apod-entry" style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #2c2c32;">
                    <h3 style="${titleStyle}">${data.title || "Título Indisponível"}</h3>
                    <span style="${dateSubStyle}">${data.date || "Data Indisponível"}</span>
                    ${data.media_type === 'image'
                        ? `<img src="${data.url}" alt="${data.title || 'Foto da NASA'}" style="${mediaImgStyle}" loading="lazy">`
                        : `<div style="${mediaIframeWrapperStyle}">
                               <iframe src="${data.url}" title="${data.title || 'Vídeo da NASA'}" allowfullscreen style="${mediaIframeStyle}"></iframe>
                           </div>`
                    }
                    </div>`;
        });
        photosContainer.innerHTML = photosHTML;

    } catch (error) {
        feedbackDiv.innerHTML = `<p style="color:#ff8c8c; background-color: rgba(255,100,100,0.1); border:1px solid #ff8c8c; padding:15px; border-radius:5px; text-align:center;">${error.message}</p>`;
        console.error('Erro ao processar APOD:', error);
    }
}

function handleFetchButtonClick() {
    const endDateInputEl = document.getElementById('apodSelectedDate');
    const quantitySelectEl = document.getElementById('photoQuantity');

    if (!endDateInputEl || !quantitySelectEl) {
        alert("Erro: Elementos de input não encontrados na página.");
        return;
    }

    const endDateString = endDateInputEl.value;
    const quantity = parseInt(quantitySelectEl.value);

    if (!endDateString) {
        alert("Por favor, selecione a data principal.");
        return;
    }

    const hoje = new Date();
    const dataSelecionadaObj = new Date(endDateString + "T00:00:00");
    hoje.setHours(0, 0, 0, 0);

    if (dataSelecionadaObj > hoje) {
        alert("A data principal não pode ser futura. Por favor, escolha uma data atual ou passada.");
        return;
    }

    let startDateObj = new Date(dataSelecionadaObj);
    if (quantity > 1) {
        startDateObj.setDate(dataSelecionadaObj.getDate() - (quantity - 1));
    }

    const formatDate = (dateObj) => dateObj.toISOString().split('T')[0];
    const startDateString = formatDate(startDateObj);

    const provider = NasaApodAdapter.getInstance('DOmEoiZ5NwXtG3hTJVuRMibe3XIBduziBbYMglZK');
    fetchAndDisplayNasaPhotos(provider, startDateString, endDateString);
}

function initializeApp() {
    setupApodUI();
    const today = new Date().toISOString().split('T')[0];
    
    const dateInput = document.getElementById('apodSelectedDate');
    if (dateInput) {
        dateInput.value = today;
    }
    const feedbackDiv = document.getElementById('apodFeedback');
    if(feedbackDiv) {
        feedbackDiv.innerHTML = "<p>Selecione uma data e quantidade, depois clique em 'Ver Foto(s)'.</p>";
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}