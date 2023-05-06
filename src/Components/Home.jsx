import { useState, useEffect } from "react";
import axios from "axios";
import { Triangle } from "react-loader-spinner";

import { useNavigate } from 'react-router-dom'


export default function Home() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState([]);

    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => console.warn(err))
    }, [])



    const filtered = []

    if (filter.length) {
        const filtering = data.filter(regione => regione.region.toLowerCase().includes(filter.toLowerCase()) || regione.name.common.toLowerCase().includes(filter.toLowerCase()))
        filtered.push(filtering)
    } else {
        filtered.push(data)
    }



    return (
        <div className="container pt-5 pb-5">
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
                    <>

                        <div className="row">
                            <div className="col-md-3 col">
                                <input type="text" className="form-control" placeholder="Search for a country…" onChange={e => setFilter(e.target.value)} />
                            </div>
                            <div className="col text-end">
                                <select style={{ border: 'none', backgroundColor:'unset' }} onChange={e => setFilter(e.target.value)}>
                                    <option value="">Filter by Region</option>
                                    <option value="africa">Africa</option>
                                    <option value="america">America</option>
                                    <option value="asia">Asia</option>
                                    <option value="europe">Europe</option>
                                    <option value="oceania">Oceania</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mt-5">
                            {filtered[0].map((post, ind) => {
                                return (
                                    <div key={ind} className="col-md-3 p-2" style={{cursor:'pointer'}} onClick={() => navigate('/id', { state: { message: post.name.common } })}>
                                        <div className="border" style={{ borderRadius: '5px', overflow: 'hidden' }}>
                                            <img src={post.flags.png} style={{ width: '100%', height: '200px', overflow: 'hidden' }} alt="" />
                                            <div className="p-1">
                                                <h5>{post.name.common}</h5>
                                                <p>Population : {post.population}</p>
                                                <p>Regione : {post.region}</p>
                                                <p>Capital : {post.capital}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </>
            }
        </div>
    )
}