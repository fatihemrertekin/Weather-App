import { useEffect, useState } from "react";
import axios from "axios";
import { formatDateforDay } from "../utils/helpers";
import { isValidCity } from "../utils/helpers";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/WeatherApp.css"
import Navbar from "./Navbar";
import Main from "./Main";
import { ClipLoader } from 'react-spinners';

// src/App.jsx veya ilgili bileşen dosyanızda
// import sonVideo from '/assets/videos/son.mp4'; // build aşamasında videoların yüklenmeme sorununun çözümü burada yolu vermekten ibaretmiş baya zamanımı aldı eğer netlifyda kullandığım video gelmezse bu şekilde çözülüyor.navbar-brand

const WeatherApp = () => {

    const openApi = import.meta.env.VITE_OPEN_API_KEY;

    const [weatherData, setWeatherData] = useState(null);
    const [weatherFiveData, setweatherFiveData] = useState(null);
    const [city, setCity] = useState("istanbul"); // Varsayılan şehir
    const [country, setCountry] = useState("TR");
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

    // Şehir bilgisine göre hava durumu verisini al
    const fetchWeatherFiveData = (cityName) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&lang=tr&appid=${openApi}`)
            .then((response) => {
                setweatherFiveData(response.data); // Veriyi state'e kaydet
                console.log("Weather Five Data:", response.data); // Gelen veriyi kontrol et
            })
            .catch((error) => {
                console.error("Hava durumu verisi alınırken hata oluştu:", error);
                setweatherFiveData(null); // Hata durumunda veriyi sıfırla
            });
    }; // Şehir bilgisi değiştiğinde API çağrısı yap

    useEffect(() => {
        fetchWeatherData(city);
        fetchWeatherFiveData(city);
    }, []); // Sayfa yüklendiğinde bir kez çalışır


    // Form gönderildiğinde çağrılan fonksiyon
    const handleSubmit = (e) => {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
        // Girişin boş olup olmadığını kontrol et
        if (!searchCity.trim()) {
            setError(["Lütfen Türkiye'den bir şehir adı giriniz!"]);
            setTimeout(() => {
                setError(null)
              }, 5000); // 5000 milisaniye = 5 saniye
            return;
        }

        if (!isValidCity(searchCity)) {
            setError(["Geçersiz bir şehir adı girdiniz,", " sadece Türkiye'deki illeri girebilirsiniz!"]);
            setTimeout(() => {
                setError(null)
              }, 5000); // 5000 milisaniye = 5 saniye
            return;
        }

        // Geçerli bir giriş varsa
        setError(null); // Hata mesajını sıfırla
        setCity(searchCity);
        fetchWeatherData(searchCity);
        fetchWeatherFiveData(searchCity);
        setSearchCity("")
    };


    return (
        <div>
            {(weatherData && weatherFiveData) ? (
                <div className="afacad-regular">
                    <Navbar 
                        searchCity={searchCity}
                        setSearchCity={setSearchCity}
                        handleSubmit={handleSubmit}
                        error={error}/>
                    <Main weatherData={weatherData} weatherFiveData={weatherFiveData}/>
                </div>
            ) : (
                <div className="loading d-flex justify-content-center align-items-center">
                    <ClipLoader color="#FFFFFF" size={60} />
                </div>
            )}
        </div >
    )
}

export default WeatherApp