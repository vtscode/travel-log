import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { listLogEntries,abortFetching } from "./API";

const Map = () => {
  const [logData,setLogData] = React.useState([]);
  const [viewport, setViewport] = React.useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 4
  });

  React.useEffect(() => {
    (async () => {
      try {
        const logEntries = await listLogEntries();
        setLogData(logEntries);
      } catch (error) {
        console.log(error)
      }
    })();
    // clean upp things ...
    return abortFetching;
  },[]);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
        logData && logData.map(x => (
        <Marker 
          key={x._id}
          latitude={x.latitude} 
          longitude={x.longitude}
          offsetLeft={-20} 
          offsetTop={-10}
        >
          <div>{x.title}</div>
        </Marker>
        ))
      }
    </ReactMapGL>
  );
}

export default Map;
