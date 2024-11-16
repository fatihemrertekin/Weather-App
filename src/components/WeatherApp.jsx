import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../utils/helpers";
import { isValidCity } from "../utils/helpers";
import "../styles/WeatherApp.css"

const WeatherApp = () => {

    const openApi = import.meta.env.VITE_OPEN_API_KEY;
    const unsplashApi = import.meta.env.VITE_UNSPLASH_API_KEY;


    const [weatherData, setWeatherData] = useState(null)
    const [imageData, setimageData] = useState(null)
    const [city, setCity] = useState("İstanbul"); // Varsayılan şehir
    const [searchCity, setSearchCity] = useState(""); // Kullanıcıdan alınan şehir
    const [error, setError] = useState(null); // Hata mesajlarını saklamak için


    // Şehir bilgisine göre hava durumu verisini al
    const fetchWeatherData = (cityName) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=tr&appid=${openApi}`)
            .then((response) => {
                setWeatherData(response.data); // Veriyi state'e kaydet
                console.log("Weather Data:", response.data); // Gelen veriyi kontrol et
            })
            .catch((error) => {
                console.error("Hava durumu verisi alınırken hata oluştu:", error);
                setWeatherData(null); // Hata durumunda veriyi sıfırla
            });
    }; // Şehir bilgisi değiştiğinde API çağrısı yap


    const fetchImageData = (cityName) => {
        axios
            .get(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=${unsplashApi}`)
            .then(response => setimageData(response.data))
            .catch((error) => {
                console.error("Resim verileri alınırken hata oluştu:", error);
                setimageData(null);
            });
    }


    useEffect(() => {
        fetchWeatherData(city);
        fetchImageData(city);
    }, []); // Sayfa yüklendiğinde bir kez çalışır


    // Form gönderildiğinde çağrılan fonksiyon
    const handleSubmit = (e) => {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
        // Girişin boş olup olmadığını kontrol et
        if (!searchCity.trim()) {
            setError(["Lütfen bir Türkiye'den şehir adı giriniz!"]);
            return;
        }

        if (!isValidCity(searchCity)) {
            setError(["Geçersiz bir şehir adı girdiniz..", "Sadece Türkiye'deki illeri girebilirsiniz!"]);
            return;
        }

        // Geçerli bir giriş varsa
        setError(null); // Hata mesajını sıfırla
        setCity(searchCity);
        fetchWeatherData(searchCity);
        fetchImageData(searchCity);
        setSearchCity("")
    };

    return (
        <div>
            <video autoPlay loop muted className="background-video">
                <source src="/src/assets/images/son.mp4" type="video/mp4" />
            </video>
            {weatherData ? (
                <div className="container">
                    <div id="header">
                        <video autoPlay loop muted className="main-video">
                            <source src="/src/assets/images/son.mp4" type="video/mp4" />
                        </video>
                        <div className="left-header">
                            <div className="city-name">
                                <p><i className="fa-solid fa-location-dot"></i> {weatherData.name}</p>
                            </div>
                            <div className="input">
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <input type="text" placeholder="Şehir Giriniz" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} />
                                    <button type="submit" className="input-btn">
                                        <i className="fa-solid fa-magnifying-glass-location"></i>Ara
                                    </button>
                                </form>
                                {error && <p className="error-message">{error.map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}</p>} {/* Hata mesajını göster */}
                            </div>
                            <div className="base-info">
                                <p>{weatherData.weather[0].description}</p>
                                <p>{weatherData.main.temp} °C</p>
                                <p>{formatDate(weatherData.dt)}</p>
                            </div>
                        </div>
                        <div className="right-header">
                            <img className="weather-icon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="hava durumu" />
                        </div>
                    </div>
                    <div id="main">
                        <div className="left-main">
                            <video autoPlay loop muted className="left-main-video">
                                <source src="/src/assets/images/son.mp4" type="video/mp4" />
                            </video>
                            <div className="image-container">
                                {imageData && imageData.results && imageData.results[1] ? (
                                    <>
                                        <img
                                            className="city-image"
                                            src={imageData.results[1].urls.small}
                                            alt="şehir resmi"
                                        />
                                        <img
                                            className="city-image"
                                            src={imageData.results[2].urls.small}
                                            alt="şehir resmi"
                                        />
                                    </>
                                ) : (
                                    <p>Resimler Yükleniyor...</p>
                                )}
                            </div>
                        </div>
                        <div className="right-main">
                            <video autoPlay loop muted className="right-main-video">
                                <source src="/src/assets/images/son.mp4" type="video/mp4" />
                            </video>
                            <div className="top">
                                <div className="feels-like">
                                    <p className="name">Hissedilen</p>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <p className="context">
                                        {weatherData.main.feels_like} °C
                                    </p>
                                </div>
                                <div className="temp-min">
                                    <p className="name">En Düşük Sıcaklık</p>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <p className="context">
                                        {weatherData.main.temp_min} °C
                                    </p>
                                </div>
                                <div className="temp-max">
                                    <p className="name">En Yüksek Sıcaklık</p>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <p className="context">
                                        {weatherData.main.temp_max} °C
                                    </p>
                                </div>
                                <div className="pressure">
                                    <p className="name">Basınç</p>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <p className="context">
                                        {weatherData.main.pressure}
                                    </p>
                                </div>
                                <div className="humidity">
                                    <p className="name">Nem</p>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <p className="context">
                                        {weatherData.main.humidity}
                                    </p>
                                </div>
                                <div className="wind-speed">
                                    <p className="name">Rüzgar Hızı</p>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <p className="context">
                                        {weatherData.wind.speed}
                                    </p>
                                </div>
                            </div>
                            <div className="bottom">

                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="loading">Veriler Yüklenemedi...</h1>
            )}
        </div>
    )
}

export default WeatherApp