# AtomS3 USB MIDI

```cpp
#include "USB.h"
#include "USBMIDI.h"

USBMIDI MIDI;

void setup() {
  USB.begin();
}

void loop() {
  MIDI.noteOn(60, 127, 1);
  delay(500);
}

```