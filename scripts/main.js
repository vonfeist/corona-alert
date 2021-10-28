// Image switcher code



function fetchAppointment() {
  return fetch('http://localhost:8010/proxy?v=0.3&robot=1').then(res => res.json()).then(results => {
   openTab(results);
   setTimeout(() => {
    fetchAppointment();
  }, 1000)
  }).catch(error => console.warn('Api Error', error))
}

function openTab(results) {
  let practiceId = 0;
  let executed = false;
  for (let i = 0; i < results.stats.length; i++) {
    console.log(results.stats[i].open);
    if (results.stats[i].open === true && !executed) {
      switch(results.stats[i].id) {
        case 'arena':
          practiceId = 158431;
          break;
        case 'messe':
          practiceId = 158434;
          break;
        case 'erika':
          practiceId = 158437;
          break;
        case 'velodrom':
          practiceId = 158435;
          break;
        case 'tegel':
          practiceId = 0;
          break;
        default:
          practiceId = 0;
          break;
      }

      
      if (practiceId != 0 && executed != true) {
      const url = `https://www.doctolib.de/institut/berlin/ciz-berlin-berlin?pid=practice-${practiceId}`;
      console.log(results.stats[i].open, url);
      console.log(results.stats[i].id, ' is open');
      executed = true;
        document.getElementById('sound1').play();
        const appointment = document.getElementById('appointment');
        appointment.innerHTML = results.stats[i].id;
        window.open(url, '_blank');
      }
    }
  }
}

fetchAppointment();
