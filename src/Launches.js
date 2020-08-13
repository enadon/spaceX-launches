import React from 'react'

import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

import './styles/Launches.css';

function validateYear (year) {
  return (year >= 2006 && year <= new Date().getFullYear() ? true : false)
}

function Launches(props) {

  const GET_LAUNCHES = gql`query GetLaunches($year: String!){
    launchesPast( limit: 5, find: {launch_year: $year}) {
      mission_name
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
      }
      links {
        flickr_images
      }
      launch_date_local
    }
    }`

  const { data, loading, error } = useQuery(GET_LAUNCHES, {
    variables: { year: props.year || new Date().getFullYear() },
  });

  if (loading) return <p className="centeredTxt">Loading...</p>;
  if (error) return <p className="centeredTxt">PLease, input valid year</p>;

  if (validateYear(props.year)) 
    return (
    <React.Fragment>
      <div className="container">
        {data && data.launchesPast && data.launchesPast.map((launch, index) => (
          <div key={index} className="card">
              <div className="cardHeaders">
                <h3>Mission: {launch.mission_name}</h3>
                <h5>Launch date: {launch.launch_date_local}</h5>
              </div>
              <p>Platform: {launch.launch_site.site_name_long}</p>
              <p>Rocket name: {launch.rocket.rocket_name}</p>
              <div className="gallery">
                { launch.links.flickr_images.map( (img, indx) => {return (img) ? <div className="flckrImg"><img key={indx} src={img}/></div> : null} ) }
              </div>
          </div>
        ))}
      </div>
    </React.Fragment>
    )

  else return <p className="centeredTxt">PLease, input full year</p>;

}

export default Launches