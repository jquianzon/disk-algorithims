https://www.geeksforgeeks.org/c-look-disk-scheduling-algorithm/

// Function to perform C-LOOK on the request
// array starting from the given head
function CLOOK(arr, head) {
  let seek_count = 0
  let distance, cur_track

  let left = []
  let right = []
  let seek_sequence = []

  // Tracks on the left of the
  // head will be serviced when
  // once the head comes back
  // to the beginning (left end)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < head)
      left.push(arr[i])

    if (arr[i] > head)
      right.push(arr[i])
  }

  // Sorting left and right vectors
  left.sort(function (a, b) { return a - b })
  right.sort(function (a, b) { return a - b })

  // First service the requests
  // on the right side of the
  // head
  for (let i = 0; i < right.length; i++) {
    cur_track = right[i]

    // Appending current track
    // to seek sequence
    seek_sequence.push(cur_track)

    // Calculate absolute distance
    distance = Math.abs(cur_track - head)

    // Increase the total count
    seek_count += distance

    // Accessed track is now new head
    head = cur_track
  }

  // Once reached the right end
  // jump to the last track that
  // is needed to be serviced in
  // left direction
  seek_count += Math.abs(head - left[0])
  head = left[0]

  // Now service the requests again
  // which are left
  for (let i = 0; i < left.length; i++) {
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

  // Seek sequence would be the same
  // as request array sequence
  console.log(`Total head movement: ${arr.join(' -> ')}`)

  console.log(`Seek time: ${seek_count}`)
}

module.exports = CLOOK
