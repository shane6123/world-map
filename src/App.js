import React from 'react';
import {
  MapContainer,
  TileLayer,
    GeoJSON
} from 'react-leaflet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import countries from './countries.json';

import CountryCard from './components/CountryCard';
import MapEvents from './components/MapEvents';


const center = [20.5937, 78.9629];

export default function App() {
  const [search, setSearch] = useState('')
  const [countryInfo, setCountryInfo] = useState({
    name: { common: "India"},
    capital: ["New Delhi"],
    region: "Asia",
    subregion: "Southern Asia",
    population: 1380004385,
    area: 3287590,
    flags: {
      svg: "https://flagcdn.com/in.svg",
      png: "https://flagcdn.com/w320/in.png",
    },
    languages: {
      eng: "English",
      hin: "Hindi",
    },
    currencies: {
      INR: {
        name: "Indian rupee",
        symbol: "₹",
      },
    },
    timezones: [
      "UTC+05:30"
    ],
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://restcountries.com/v3.1/name/${search}`)
      .then(res => {
        console.log(res.data[0])
        toast.success('Successfully Search!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setCountryInfo(res.data[0])

      }
      )
      .catch(err => toast.error('Search Name is Invalid' ,{
        position: toast.POSITION.TOP_RIGHT,
      }))


   setSearch("")
   
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }
   const handleCountryClick = (event) => {
    console.log('Country clicked: ', event);
    setCountryInfo(event.countryInfo)    
  };
  const geoJSONStyle = (feature) => {
    return {
      fillColor: feature.properties.ADMIN === (countryInfo && countryInfo.name.common) ? 'blue' : 'none',
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    };
  };
  return (
   <>
   <div className='row ' style={{margin:0 , padding:0 }}>
   <ToastContainer />
      <div className='col-lg-8 col-md-8 col-sm-12'>
        <MapContainer
      center={center}
      zoom={2}
    style={{ width: '100%', height: '100vh' }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=61xbrzgnanPiDXlZT0ij"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <GeoJSON
          data={countries}
          style={geoJSONStyle}
          
          onEachFeature={(feature, layer) => {
            layer.on({
              click: (event) => {
                handleCountryClick(event);
              },
            })
          }}

        />
      <MapEvents handleCountryClick={handleCountryClick}  />
    </MapContainer>
      </div>
      <div className='col-lg-4 col-md-4 col-sm-12 px-5 '>

      <form className="form-inline my-2 text-center" onSubmit={handleSubmit}>
      <input className="form-control my-3" name="cname" onChange={handleChange} type="search" placeholder="Search Country" aria-label="Search" />
      <button className="btn btn-primary px-4" type="submit">Search</button>
    </form>
    
          
          <h2 style={{textAlign:"center" , marginTop:"1rem" , marginBottom:"1rem"}}>{countryInfo && countryInfo.name.common}</h2>
       <CountryCard countryInfo={countryInfo} />
        
        
      </div>
    </div>

   
   </>
  );
}

