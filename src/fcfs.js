https://www.geeksforgeeks.org/fcfs-disk-scheduling-algorithms/

// Javascript program to demonstrate
// FCFS Disk Scheduling algorithm
function FCFS(arr, head) {
  var seek_count = 0;
  var distance, cur_track

  for (var i = 0; i < arr.length; i++) {
    cur_track = arr[i]

    // Calculate absolute distance
    distance = Math.abs(cur_track - head)

    // Increase the total count
    seek_count += distance

    // Accessed track is now new head
    head = cur_track
  }

  console.log(`Total head movement: ${seek_count}`)

  // Seek sequence would be the same
  // as request array sequence
  console.log(`Seek Sequence is ${arr.join(' -> ')}`);
}

module.exports = FCFS
