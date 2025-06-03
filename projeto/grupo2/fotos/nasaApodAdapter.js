class NasaApodAdapter extends PhotoProvider {
    constructor(apiKey) {
        super();
        if (NasaApodAdapter._instance) {
            return NasaApodAdapter._instance;
        }

        this.apiKey = apiKey;
        NasaApodAdapter._instance = this;
    }

    static getInstance(apiKey) {
        if (!NasaApodAdapter._instance) {
            NasaApodAdapter._instance = new NasaApodAdapter(apiKey);
        }
        return NasaApodAdapter._instance;
    }

    async getPhotos(startDate, endDate) {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}&start_date=${startDate}&end_date=${endDate}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar fotos da NASA");
        return await response.json();
    }
}
