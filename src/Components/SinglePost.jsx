import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Triangle } from "react-loader-spinner";

import { IoIosArrowRoundBack } from 'react-icons/io'

export default function SinglePost() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const state = useLocation();

    const [country, setCountry] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/name/' + state.state.message)
            .then(res => {
                setCountry(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])


    console.log(country);


    return (
        <div className="container">
            {
                loading ?
                    <div style={{ textAlign: 'center', paddingTop: '10%' }}>
                        <Triangle
                            height="200"
                            width="1200"
                            color="#4fa94d"
                            ariaLabel="triangle-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    </div>
                    :
                    <div className="pt-5">
                        <button style={{ backgroundColor: 'unset', border: 'none' }} onClick={() => navigate('/')}><IoIosArrowRoundBack /> Back</button>

                        {country.map(post => {
                            return (

                                <div className="row mt-5">
                                    <div className="col-md-6">
                                        <img src={post.flags.png} className='img-fluid border' style={{ width: '100%' }} alt="" />
                                    </div>
                                    <div className="col-md-6 pt-2 row">
                                        <div className="col-md-6">
                                            <h1>{post.name.common}</h1>
                                            <p>Native name : {post.altSpellings[1]}</p>
                                            <p>Population : {post.population}</p>
                                            <p>Regione : {post.region}</p>
                                            <p>Subregion : {post.subregion}</p>
                                            <p>Capital : {post.capital}</p>
                                        </div>
                                        <div className="col-md-6 pt-5">
                                            <p>Top level Domain :  {post.tld}</p>
                                            <p>Currencies : </p>
                                            <p>Languages : {state.state.message}</p>
                                        </div>
                                        {
                                            post.borders ?
                                                <p>Border Countrys : {post.borders.map((post, ind) => <button key={ind} className="py-2">{post}</button>)}</p>
                                                :
                                                null
                                        }
                                    </div>
                                </div>

                            )
                        })}
                    </div>
            }
        </div>
    )
}