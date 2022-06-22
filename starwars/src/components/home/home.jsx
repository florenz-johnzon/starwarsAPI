import React from 'react';
import stars from '../../pictures/stars.jpg';
import Head from '../head/head';
import Footer from '../footer/footer';
import "./index.css"

const Home = () => {
  return (
    <div>
    <Head/>
    <img src ={stars} className="bg" alt="starwars"/>
    <Footer/>
    </div>
  )
}

export default Home;