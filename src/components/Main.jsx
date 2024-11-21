import Card from "./Card";
import ColorSlider from "./ColorSlider";
import { formatDate, formatTemp, formatWind } from "../utils/helpers";
import { isValidCity } from "../utils/helpers";
import { useEffect, useState } from "react";

function Main({ weatherData }) {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const handleResize = () => {
        const isMobileView = window.innerWidth < 768;
        setIsMobile(isMobileView); // Mobile görünümü state'de sakla
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize); // Resize olayını dinle
        return () => {
            window.removeEventListener("resize", handleResize); // Temizlik
        };
    }, []);

    return (
        <div>
            <main className="container mt-4 mt-xl-0">
                <div className="top-section d-flex justify-content-between align-items-top">
                    <div className="top-left-section">
                        <div className="city-name-day afacad-bold">
                            <p>
                                {weatherData.name}, TR
                                <span className="afacad-regular text-capitalize">
                                    {formatDate(weatherData.dt)} | {weatherData.weather[0].description}
                                </span>

                            </p>
                        </div>
                        <div className="icon-degree d-flex">
                            <div className="icon-degree d-flex align-items-center">
                                <img className="weather-icon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="hava durumu" />
                                <h1>
                                    {isMobile ? formatTemp(weatherData.main.temp) : weatherData.main.temp}
                                    
                                </h1>
                            </div>
                            <span>°C</span>
                        </div>
                    </div>
                    <div className="top-right-section">
                        <p>Rüzgar: {formatWind(weatherData.wind.speed)} kmh</p>
                        <p>Nem: %{weatherData.main.humidity}</p>
                        <p>Basınç: {weatherData.main.pressure} hPa</p>
                        <p>Hissedilen: {weatherData.main.feels_like} °C</p>
                    </div>
                </div>
                <div className="mid-section d-flex align-items-top align-items-lg-center">
                    <h2>
                        HAVA
                        <br />
                        <span>KİRLİLİĞİ!</span>
                    </h2>
                    <p>
                        Hava kirliliği, günümüzde insan sağlığını ve çevreyi olumsuz etkileyen en önemli sorunlardan biridir. Özellikle büyük şehirlerde, sanayi faaliyetleri, motorlu taşıt emisyonları ve fosil yakıt kullanımı nedeniyle hava kalitesi düşmektedir. Dünya Sağlık Örgütü'ne göre, dünya nüfusunun büyük bir kısmı kirli hava solumakta ve bu durum solunum yolu hastalıkları, kalp rahatsızlıkları ve erken ölümlere yol açmaktadır. Hava kirliliğini azaltmak için yenilenebilir enerji kaynaklarının kullanımı, toplu taşımanın teşvik edilmesi ve yeşil alanların artırılması gibi önlemler alınmalıdır.
                    </p>
                </div>
                <ColorSlider value={weatherData.main.temp} />
                <div className="bottom-section d-flex">
                    <Card weatherData={weatherData}/>
                    <Card weatherData={weatherData}/>
                    <Card weatherData={weatherData}/>
                    <Card weatherData={weatherData}/>
                    <Card weatherData={weatherData}/>
                </div>
                <p className="mt-5 data">Data from openweathermap.org </p>
            </main>
        </div>
    )
}

export default Main