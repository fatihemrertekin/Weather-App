import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/WeatherApp.css"

const WeatherApp = () => {

    const openApi = import.meta.env.VITE_OPEN_API_KEY;
    const unsplashApi = import.meta.env.VITE_UNSPLASH_API_KEY;

    const [weatherData, setweatherData] = useState([])
    const [imageData, setimageData] = useState([])

    // useEffect(() => {
    //     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=istanbul&units=metric&lang=tr&appid=${openApi}`)
    //     .then(response => setweatherData(response.data))
    //     .catch(error => console.error(error))
    // }, [])

    useEffect(() => {
        axios.get(`https://api.unsplash.com/search/photos?query=istanbul&client_id=${unsplashApi}`)
        .then(response => setimageData(response.data))
        .catch(error => console.error(error))
    }, [])
    
  return (
    <div>
        <div className="container">
            <div id="header">
                <div className="left-header">
                    <div className="city-name">
                        <p><i className="fa-solid fa-location-dot"></i> New York</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Şehir Giriniz"/>
                        <button type="button" className="input-btn"><i className="fa-solid fa-magnifying-glass-location"></i>Ara</button>
                    </div>
                    <div className="base-info">
                        <p>Cloudy</p>
                        <p>26°C</p>
                        <p>Sunday | 12 Dec 2024</p>
                    </div>
                </div>
                <div className="right-header">
                    <img className="weather-icon" src="https://openweathermap.org/img/wn/02d@2x.png" alt="hava durumu" />
                </div>
            </div>
            <div id="main">
                <div className="left-main">
                     <div className="image-container">
                        <img className="city-image" src={imageData.results ? imageData.results[1].urls.small : null} alt="şehir resmi" />
                        <img className="city-image" src={imageData.results ? imageData.results[2].urls.small : null} alt="şehir resmi" />
                     </div>
                </div>
                <div className="right-main">
                    <div className="top">
                        <div className="feels-like">
                            <p className="name">Hissedilen</p>
                            <i className="fa-solid fa-location-dot"></i>
                            <p className="context">
                                12
                            </p>
                        </div>
                        <div className="temp-min">
                            <p className="name">En Düşük Sıcaklık</p>
                            <i className="fa-solid fa-location-dot"></i>
                            <p className="context">
                                12
                            </p>
                        </div>
                        <div className="temp-max">
                            <p className="name">En Yüksek Sıcaklık</p>
                            <i className="fa-solid fa-location-dot"></i>
                            <p className="context">
                                12
                            </p>
                        </div>
                        <div className="pressure">
                            <p className="name">Basınç</p>
                            <i className="fa-solid fa-location-dot"></i>
                            <p className="context">
                                12
                            </p>
                        </div>
                        <div className="humidity">
                            <p className="name">Nem</p>
                            <i className="fa-solid fa-location-dot"></i>
                            <p className="context">
                                12
                            </p>
                        </div>
                        <div className="wind-speed">
                            <p className="name">Rüzgar Hızı</p>
                            <i className="fa-solid fa-location-dot"></i>
                            <p className="context">
                                12
                            </p>
                        </div>
                    </div>
                    <div className="bottom">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp