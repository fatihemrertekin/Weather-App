import React from 'react'
import { formatDateforDay, formatDateforDayNumber} from '../utils/helpers'

function Card({ day, date, minTemp, maxTemp, icon }) {
    return (
        <>
            <div className="card-cols">
                <a href='#' className="card nav-link">
                    <div className="card-body text-center">
                        <h5 className="card-title afacad-bold">
                            {day} |
                            <span> {date}</span>
                        </h5>
                        <img className="weather-icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="hava durumu" />
                        <div className='degree d-flex justify-content-center'>
                            <span className='afacad-bold'>{maxTemp}°</span>
                            <span>{minTemp}°</span>
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}

export default Card