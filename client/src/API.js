const API_URL = 'http://localhost:1337';

const controller = new AbortController();
const signal = controller.signal;

const listLogEntries = async () => {
  try {
    const resp = await fetch(`${API_URL}/api/logs`,{
      method : 'GET',
      signal : signal
    });
    return resp.json();
  } catch (error) {
    console.log(error);
  }
};
const createLogEntry = async (params) => {
  try {
    const resp = await fetch(`${API_URL}/api/logs`,{
      method : 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(params),
      signal : signal
    });
    return resp.json();
  } catch (error) {
    console.log(error);
  }
};

const abortFetching = () => {
  console.log('Now aborting');
  // Abort.
  controller.abort();
}

export { abortFetching,listLogEntries,createLogEntry };