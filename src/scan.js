https://www.geeksforgeeks.org/scan-elevator-disk-scheduling-algorithms/

function scan(arr, head, disk_size, direction = 'left') {
  let seek_count = 0
  let distance, cur_track
  let left = [], right = []
  let seek_sequence = []

  // appending end values
  // which has to be visited
  // before reversing the direction
  if (direction == 'left')
    left.push(0)

  else if (direction == 'right')
    right.push(disk_size - 1)

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < head)
      left.push(arr[i])

    if (arr[i] > head)
      right.push(arr[i])
  }

  // sorting left and right vectors
  left.sort(function (a, b) { return a - b })
  right.sort(function (a, b) { return a - b })

  // run the while loop two times.
  // one by one scanning right
  // and left of the head
  let run = 2;
  while (run-- > 0) {
    if (direction == 'left') {
      for (let i = left.length - 1; i >= 0; i--) {
        cur_track = left[i]

        // appending current track to seek sequence
        seek_sequence.push(cur_track)

        // calculate absolute distance
        distance = Math.abs(cur_track - head)

        // increase the total count
        seek_count += distance

        // accessed track is now the new head
        head = cur_track
      }

      direction = 'right'
    }
    else if (direction == 'right') {
      for (let i = 0; i < right.length; i++) {
        cur_track = right[i]

        // appending current track to seek sequence
        seek_sequence.push(cur_track)

        // calculate absolute distance
        distance = Math.abs(cur_track - head)

        // increase the total count
        seek_count += distance

        // accessed track is now new head
        head = cur_track
      }

      direction = 'left'
    }
  }
  
  // Seek sequence would be the same
  // as request array sequence
  console.log(`Total head movement: ${arr.join(' -> ')}`)

  console.log(`Seek time: ${seek_count}`)
}

module.exports = scan
