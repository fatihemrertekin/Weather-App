import { useState } from 'react'

function Navbar({ searchCity, setSearchCity, handleSubmit, error }) {

    return (
        <div>
            {error &&
                <div className="alert alert-primary">
                    <div className="container" role="alert">
                        {error.map((line, index) => (
                            <span key={index}>
                                {line}
                            </span>
                        ))}
                    </div>
                </div>
            }
            <nav className="navbar navbar-expand-xl">
                <div className="container">
                    <a className="navbar-brand logo text-uppercase saira-condensed-bold me-3" href="#">
                        Hava<span className="navbar-brand-span">dar</span>
                    </a>
                    <button className="navbar-toggler ms-4" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="40" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
                    </button>
                    <form className="col-12 col-xl-3 d-flex" role="search" onSubmit={(e) => handleSubmit(e)}>
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Şehir ismi giriniz"
                            aria-label="Search"
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                        />
                        <button
                            id='toastBtn'
                            className="btn btn-outline-success"
                            type="submit">
                                
                            <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" height="24px" viewBox="0 -960 960 960" width="24px">
                                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                            </svg>
                        </button>
                    </form>
                    <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 m-xl-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Hava Durumu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Hava Kalitesi</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Saatlik/Günlük Tahmin</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Haritalar</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </div>
    )
}

export default Navbar