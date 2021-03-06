https://www.geeksforgeeks.org/c-scan-disk-scheduling-algorithm/

function CSCAN(arr, head, disk_size) {
  let seek_count = 0
  let distance, cur_track
  let left = [], right = []
  let seek_sequence = []

  // appending end values
  // which has to be visited
  // before reversing the direction
  left.push(0)
  right.push(disk_size - 1)

  // tracks on the left of the
  // head will be serviced when
  // once the head comes back
  // to the beggining (left end).
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < head)
      left.push(arr[i])

    if (arr[i] > head)
      right.push(arr[i])
  }

  // sorting left and right vectors
  left.sort(function (a, b) { return a - b })
  right.sort(function (a, b) { return a - b })

  // first service the requests
  // on the right side of the
  // head.
  for (let i = 0; i < right.length; i++) {
    cur_track = right[i];

    // appending current track to seek sequence
    seek_sequence.push(cur_track);

    // calculate absolute distance
    distance = Math.abs(cur_track - head);

    // increase the total count
    seek_count += distance;

    // accessed track is now new head
    head = cur_track;
  }

  // once reached the right end
  // jump to the beggining.
  head = 0;

  // adding seek count for head returning from 199 to 0
  seek_count += (disk_size - 1)

  // Now service the requests again
  // which are left.
  for (let i = 0; i < left.length; i++) {
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

  // Seek sequence would be the same
  // as request array sequence
  console.log(`Total head movement: ${arr.join(' -> ')}`)

  console.log(`Seek time: ${seek_count}`)
}

module.exports = CSCAN
