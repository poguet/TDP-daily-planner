var time = dayjs().format('H:mm:ss');
$('currentDay').text(`Current Time : ${time}`);

function keepTime() {
    let localStoragedata = JSON.parse(localStorage.getItem('schedule'))
    if(localStoragedata !== null){
      for(let i = 0; i < localStoragedata.length; i++) {
        let target_textarea = document.getElementById(`hour-${localStoragedata[i].time}`).childNodes[3]
        target_textarea.value = localStoragedata[i].message
      }
    }
  
  }
  keepTime()

  function save () {
    let timeHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]
    let currentHour = dayjs().format('H')

    for(i = 0; i < timeHours.length; i++) {
      let currenttimeBlock = $(`#hour-${timeHours[i]}`)

      if(timeHours[i] > currentHour) {
        currenttimeBlock.attr('class', 'row time-block future')
      } else if (timeHours[i] < currentHour){
        currenttimeBlock.attr('class', 'row time-block past')
      } else if (timeHours[i] === currentHour){
        currenttimeBlock.attr('class', 'row time-block present')
      }

      let currentBtn = currenttimeBlock.find('button')

      currentBtn.click(function(event) {
        event.preventDefault();
        let currenttimeblockText = currenttimeBlock.find('textarea')[0].value
        let currentIndex = currenttimeBlock.attr('id').split('-')[1]

        let userData = {
          time : currentIndex,
          message : currenttimeblockText
      }
      let data = JSON.parse(localStorage.getItem('schedule'))
      if(data === null){
        data = []
        data.push(userData)
      } else{
        data.push(userData)
      }

      localStorage.setItem('schedule', JSON.stringify(data));

      })

    }
  };
  save()  