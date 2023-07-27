import { useMapEvents } from 'react-leaflet';
import axios from 'axios';


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
            //   console.log('Country information: ', response.data[0]);
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


export default MapEvents