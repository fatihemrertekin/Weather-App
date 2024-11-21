export const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.toLocaleDateString("tr-TR", { weekday: "long" });
    const formattedDate = date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    return `${day}`;
};

export const formatTemp = (temp) => {
    const integerPart = Math.floor(temp);
    return integerPart;
}

export const formatWind = (wind) => {
    const speedInMetersPerSecond = wind; // m/s
    const speedInKmPerHour = speedInMetersPerSecond * 3.6;
    const onlyInteger = Math.floor(speedInKmPerHour)
    return onlyInteger;
}

export const isValidCity = (cityName) => {
    const cities = [
        "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
    ];

    // Şehir adlarını normalize eden fonksiyon
    const normalizeCityName = (name) => {
        return name
            .toLocaleLowerCase("tr-TR") // Türkçe karakter desteği ile küçült
            .trim(); // Başındaki ve sonundaki boşlukları kaldır
    };

    // Kullanıcının girdiği şehir adını normalize et
    const normalizedCity = normalizeCityName(cityName);

    // Şehir listesini normalize et ve karşılaştır
    const normalizedCities = cities.map(normalizeCityName);

    return normalizedCities.includes(normalizedCity);
};