class NasaApodAdapter extends PhotoProvider {
    constructor(apiKey) {
        super();
        this.apiKey = apiKey;
    }

    async getPhotos(startDate, endDate) {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}&start_date=${startDate}&end_date=${endDate}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar fotos da NASA");
        return await response.json();
    }
}