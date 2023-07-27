import React from 'react';
import {
  MapContainer,
  TileLayer,
   useMapEvents , GeoJSON
} from 'react-leaflet';


import './App.css';
import axios from 'axios';
import { useState } from 'react';
import countries from './countries.json';
import { Card } from 'react-bootstrap';


const center = [20.5937, 78.9629];

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(null)
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
    }
  })
   const handleCountryClick = (event) => {
    console.log('Country clicked: ', event);
    // console.log('Country clicked: ', event.target.feature.properties.name);
    // setSelectedCountry(event.countryInfo.name);
    setCountryInfo(event.countryInfo)
    console.log("seleted country", countryInfo.area)
    
  };
  const geoJSONStyle = (feature) => {
    // console.log(feature, selectedCountry)
    return {
      fillColor: feature.properties.ADMIN === (countryInfo && countryInfo.name.common) ? 'blue' : 'gray',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };
  return (
   <>
   <div className='row'>
   <h1 className='text-center'>React Leaflet Map</h1>
      <div className='col-md-8'>
        <MapContainer
      center={center}
      zoom={10}
      style={{ width: '90%', height: '95vh' }}

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
      <div className='col-4'>
        <h2>Country Information</h2>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" style={{width:'18rem' , height:'12rem'}} src={countryInfo && countryInfo.flags.svg} />
      <Card.Body>
        <Card.Title>India</Card.Title>
        <Card.Text>
          <div className='row'>
            <div className='col-5'>Capital</div>
            <div className='col-7'>{countryInfo && countryInfo.capital[0]}</div>
            <div className='col-5'>Population</div>
            <div className='col-7'>{countryInfo && countryInfo.population}</div>
            <div className='col-5'>Area</div>
            <div className='col-7'>{countryInfo &&  countryInfo.area}</div>
            
          
          </div>
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
        
        
      </div>
    </div>

   
   </>
  );
}

const MapEvents = ({ handleCountryClick }) => {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      // console.log(lat, lng);
      
      axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then((response) => {
          const countryName = response.data.address.country;
          // console.log('Country: ', response.data );
          
          axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
          .then((response) => {
            console.log('Country information: ', response.data[0]);
            // localStorage.setItem("countryInfo", JSON.stringify(response.data[0].area))
            handleCountryClick({ countryInfo: response.data[0] });
          })
          .catch((error) => {
            console.log('Error fetching country information:', error);
          });
          // handleCountryClick({ target: { feature: { properties: { name: countryName } } } });
        })
        .catch((error) => {
          console.log('Error fetching country:', error);
        });
    },
  });

  return null;
};