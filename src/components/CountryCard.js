import React from 'react'
import {  Card } from 'react-bootstrap'

const CountryCard = ({countryInfo}) => {
  return (
    <>
         <Card >
      <Card.Img variant="top" alt='Flag Image' style={{height:"12rem" ,width:"100%"}} src={countryInfo && countryInfo.flags.png} />
      <Card.Body>
       
        <Card.Text>
          <div className='row'>
              <div className='col-md-5 bold-text'> <b>Capital</b></div>
              <div className='col-md-7 normal-text'>{countryInfo && countryInfo.capital[0]}</div>
              <div className='col-md-5 bold-text'> <b>Currencies</b></div>
              <div className='col-md-7 normal-text'>{countryInfo && Object.values(countryInfo.currencies).map(cur =>{
                return <> <span className='mr-2'>{cur.name} , </span>  <span>{cur.symbol}</span></>
              })}</div>
              <div className='col-md-5 bold-text'> <b>Population</b></div>
              <div className='col-md-7 normal-text'>{countryInfo && countryInfo.population}</div>
              <div className='col-md-5 bold-text'> <b>Capital</b></div>
              <div className='col-md-7 normal-text'>{countryInfo && Object.values(countryInfo.languages).map(lang=>{
                return <span className='lang' key={lang}>{lang}</span>
              })}</div>
              <div className='col-md-5 bold-text'> <b>Area</b></div>
              <div className='col-md-7 normal-text'>{countryInfo && countryInfo.area}</div>
              <div className='col-md-5 bold-text'> <b>Capital</b></div>
              <div className='col-md-7 normal-text'>{countryInfo && countryInfo.timezones[0]}</div>
              <div className='col-md-5 bold-text'> <b>Capital</b></div>
              <div className='col-md-7 normal-text'>{countryInfo && countryInfo.region}</div>
          
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
    </>
  )
}

export default CountryCard