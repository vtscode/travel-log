import React from 'react';
import LogEntryForm from "./LogEntryForm";
import ReactMapGL, { Marker, Popup} from 'react-map-gl';
import { listLogEntries,abortFetching } from "./API";
const Map = () => {
  const [logData,setLogData] = React.useState([]);
  const [showPopup,setshowPopup] = React.useState({});
  const [addEntryLocation,setaddEntryLocation] = React.useState(null);
  const [viewport, setViewport] = React.useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });

  const getEntries = async () => {
    try {
      const logEntries = await listLogEntries();
      setLogData(logEntries);
    } catch (error) {
      console.log(error)
    }
  };

  const showAddMarkerPopup = (event) => {
    console.log(event);
    const [longitude,latitude] = event.lngLat;
    setaddEntryLocation({
      latitude,
      longitude
    })
  };

  React.useEffect(() => {
    getEntries();
    // clean upp things ...
    return abortFetching;
  },[]);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      <>
      {
        logData && logData.map(x => (
        <React.Fragment key={x._id}>
          <Marker 
            latitude={x.latitude} 
            longitude={x.longitude}
            // offsetLeft={-12} 
            // offsetTop={-24}
          >
            <div onClick={() => setshowPopup({ [x._id] : true})}>
              <svg 
              style={{
                  height: `${4 * viewport.zoom}px`,
                  width: `${4 * viewport.zoom}px`
                }}
                className="marker yellow" 
                version="1.1" 
                id="Layer_1" 
                x="0px" y="0px" viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035    c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719    c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          {showPopup[x._id] && 
            (<Popup
              latitude={x.latitude} 
              longitude={x.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setshowPopup({})}
              anchor="top" 
            >
              <div className="popup">
                <center>
                  {x.image && <img src={x.image} alt="popup-data" height={100} />}
                  <h3>{x.title}</h3>
                  <span>Rating : {x.rating}</span>
                </center>
                <p>{x.comments}</p>
                <small>Visited on : <i>{new Date(x.visitDate).toLocaleDateString()}</i></small>
              </div>
            </Popup>)
          }
        </React.Fragment>
        ))
      }
      {addEntryLocation && (<>
        <Marker 
          latitude={addEntryLocation.latitude} 
          longitude={addEntryLocation.longitude}
          // offsetLeft={-12} 
          // offsetTop={-24}
        >
          <div>
            <svg 
             style={{
                height: `${4 * viewport.zoom}px`,
                width: `${4 * viewport.zoom}px`
              }}
              className="marker red" 
              version="1.1" 
              id="Layer_1" 
              x="0px" y="0px" viewBox="0 0 512 512"
            >
              <g>
                <g>
                  <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035    c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719    c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                </g>
              </g>
            </svg>
          </div>
        </Marker>
        <Popup
          latitude={addEntryLocation.latitude} 
          longitude={addEntryLocation.longitude}
          closeButton={true}
          closeOnClick={false}
          dynamicPosition={true}
          onClose={() => setaddEntryLocation(null)}
          anchor="top" 
        >
          <div className="popup">
            <LogEntryForm onClose={() => {
              getEntries()
              setaddEntryLocation(null);
            }} location={addEntryLocation} />
          </div>
        </Popup>
      </>)}
      </>
    </ReactMapGL>
  );
}

export default Map;
