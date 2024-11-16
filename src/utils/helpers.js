export const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.toLocaleDateString("tr-TR", { weekday: "long" });
    const formattedDate = date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    return `${day} | ${formattedDate}`;
};

export const isValidCity = (cityName) => {
    const cities = [
        "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara",
        "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt",
        "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı",
        "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum",
        "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta",
        "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri",
        "Kırıkkale", "Kırklareli", "Kırşehir", "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya",
        "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye",
        "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Şanlıurfa", "Şırnak", "Tekirdağ",
        "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
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