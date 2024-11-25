export const formatDateforDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.toLocaleDateString("tr-TR", { weekday: "long" });
    return day;
};

export const formatDateforDayNumber = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleDateString("tr-TR", {
        day: "2-digit",
    });
    return formattedDate;
}

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

// Günlük veriyi işleme fonksiyonu
export const processDailyWeather = (weatherFiveData) => {
    const daysOfWeek = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

    return Object.values(
        weatherFiveData.list.reduce((acc, item) => {
            const date = new Date(item.dt_txt);
            const dayKey = date.toISOString().split("T")[0];
            const dayName = daysOfWeek[date.getDay()];
            const dayNumber = date.getDate();

            // Gün için yeni bir obje oluştur veya güncelle
            if (!acc[dayKey]) {
                acc[dayKey] = {
                    dayName,
                    dayNumber,
                    minTemp: item.main.temp_min,
                    maxTemp: item.main.temp_max,
                    icons: [item.weather[0].icon],
                };
            } else {
                acc[dayKey].minTemp = Math.min(acc[dayKey].minTemp, item.main.temp_min);
                acc[dayKey].maxTemp = Math.max(acc[dayKey].maxTemp, item.main.temp_max);
                acc[dayKey].icons.push(item.weather[0].icon);
            }

            return acc;
        }, {})
    ).map(day => {
        // Günlük iconlardan en yaygın olanını seç
        const mostCommonIcon = day.icons.reduce(
            (prev, curr, _, arr) =>
                arr.filter(icon => icon === curr).length > arr.filter(icon => icon === prev).length ? curr : prev,
            day.icons[0]
        );

        return {
            dayName: day.dayName,
            dayNumber: day.dayNumber,
            minTemp: day.minTemp,
            maxTemp: day.maxTemp,
            icon: mostCommonIcon,
        };
    });
};
