const readline = require('readline')

const FCFS = require('./fcfs')
const SCAN = require('./scan')
const LOOK = require('./look')
const CSCAN = require('./scan')
const CLOOK = require('./clook')

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const askQuestion = (question) => {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer))
  })
}

const ask = function(questions) {
  return new Promise(async resolve => {
      let outputs = []

      for(let index = 0; index < questions.length; index++) {

          const question = questions[index]
          const request_question = questions[index].includes('Loc')

          if (index === 4 && !request_question) {
            console.log(`Disk Scheduling Algorithim:
            [A] First Come First Serve (FCFS)
            [B] Shortest Seek Time First (SSTF)
            [C] Scan
            [D] Look
            [E] Circular Scan (CSCAN)
            [F] Circular Look (CLOOK)
            [G] Exit`)
          }

          let answer = await askQuestion(question)

          while (answer > 10 && index === 3 && !request_question)
            answer = await askQuestion(question)

          if (index === 3 && !request_question) {
            const request_answers = []

            for (let request_index = 0; request_index < parseInt(answer); request_index++) {
              request_answers.push(parseInt(await askQuestion(`Loc ${request_index}: `)))
            }

            outputs.push(request_answers)
            continue
          }

          if (index !== 4) {
            outputs.push(parseInt(answer))
          } else {
            outputs.push(answer)
          }

      }

      resolve(outputs)
  })
}

const start_app = () => {
  ask([
    'Input current position: ',
    'Input track size: ',
    'Input seek rate: ',
    'Input number of request: ',
    'Enter choice: '
  ])
    .then(async(answers) => {
  
      console.log(answers)

      // answers[0] = current position or head
      const currrent_position_head = answers[0]
      // answers[1] = track size or disk size
      const track_disk_size = answers[1]
      // answers[2] = seek rate
      const seek_rate = answers[2]
      // answers[3] = array or arr
      const array = answers[3]  
      // answers[4] = letter of choice A up to G
      const choice = answers[4].toLowerCase()
  
      if (choice === 'a') {
        FCFS(array, currrent_position_head, track_disk_size)
      } else if (choice === 'b') {
  
      } else if (choice === 'c') {
        SCAN(array, currrent_position_head, track_disk_size)
      } else if (choice === 'd') {
        LOOK(array, currrent_position_head)
      } else if (choice === 'e') {
        CSCAN(array, currrent_position_head, track_disk_size)
      } else if (choice === 'f') {
        CLOOK(array, currrent_position_head)
      } else {
        rl.close()
      }

      const repeat = await askQuestion('Input again [y/n]? ')
      const repeat_lower = repeat.toLowerCase()

      if (repeat_lower === 'n') {
        rl.close()
      } else if (repeat_lower === 'y') {
        start_app()
      }
    })
}

start_app()

