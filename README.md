# PRODIGY_WD_02
  Repository for the Web Developer task #1 for my internship at Prodigy Infotech: A stopwatch application.

This is a simple stopwatch application with a few features:
* The stopwatch itself with the play button. Once the play button is activated, it will be replaced with a pause button, which pauses the stopwatch.
* A reset button, which is only activated once the user pauses for the first time. If this button was clicked, it will show a confirmation dialog, which prompts the user if they really want to reset their stopwatch or not. If the user confirms they want to reset, the stopwatch goes back to 0 and all of the tracked laps will be cleared.
* An Add Lap button with a lap tracker, which is activated once the user presses "Play", when they can add as many laps as they want. Once a user adds a lap, a lap tracker will appear below the stopwatch container. It counts the number of laps, then lists a vertical array of track laps with the exact moment the laps were added/tracked. Note that once a user presses "Pause", they can only add one lap, but if they press "Play" again, they can add as many laps as they want while the stopwatch is active.
