https://www.geeksforgeeks.org/look-disk-scheduling-algorithm/

function LOOK(arr, head, direction = 'left') {
  let seek_count = 0
  let distance, cur_track

  let left = []
  let right = []
  let seek_sequence = []

  // Appending values which are
  // currently at left and right
  // direction from the head.
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < head)
      left.push(arr[i])

    if (arr[i] > head)
      right.push(arr[i])
  }

  // Sorting left and right vectors
  // for servicing tracks in the
  // correct sequence.
  left.sort(function (a, b) { return a - b })
  right.sort(function (a, b) { return a - b })

  // Run the while loop two times.
  // one by one scanning right
  // and left side of the head
  let run = 2
  while (run-- > 0) {
    if (direction == "left") {
      for (let i = left.length - 1; i >= 0; i--) {
        cur_track = left[i]

        // Appending current track to
        // seek sequence
        seek_sequence.push(cur_track)

        // Calculate absolute distance
        distance = Math.abs(cur_track - head)

        // Increase the total count
        seek_count += distance

        // Accessed track is now the new head
        head = cur_track
      }

      // Reversing the direction
      direction = "right"
    }
    else if (direction == "right") {
      for (let i = 0; i < right.length; i++) {
        cur_track = right[i]

        // Appending current track to
        // seek sequence
        seek_sequence.push(cur_track)

        // Calculate absolute distance
        distance = Math.abs(cur_track - head)

        // Increase the total count
        seek_count += distance

        // Accessed track is now new head
        head = cur_track
      }

      // Reversing the direction
      direction = "left"
    }
  }

  // Seek sequence would be the same
  // as request array sequence
  console.log(`Total head movement: ${arr.join(' -> ')}`)

  console.log(`Seek time: ${seek_count}`)
}

module.exports = LOOK
