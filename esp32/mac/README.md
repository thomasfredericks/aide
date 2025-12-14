# ESP32 MAC

```cpp
  // CREATE NAME FROM MAC ---------------------------------------| 
  const size_t myNameMaxLength = 32;
  char myName[myNameMaxLength] = "atom-"; // name prefix
  // append last 3 bytes of MAC address in hex
  snprintf(myName + strlen(myName),
           myNameMaxLength - strlen(myName),
           "%06x",
           ((uint32_t)myMac[3] << 16) | ((uint32_t)myMac[4] << 8) | (uint32_t)myMac[5]);
 // -------------------------------------------------------------|
```