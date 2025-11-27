# ESP32 MAC

```cpp
  	// GET FACTORY DEFINED ESP32 MAC --------------------------------------
    uint8_t myMac[6];
  	esp_efuse_mac_get_default(myMac);
    // --------------------------------------------------------------------
    // CREATE SSD FROM MAC ------------------------------------------------
  	char mySSD[MAX_SSID_SIZE] = "lesquare-XXXXXX";
  	sprintf(mySSD+9, "%06x", myMac[3]<<16 | myMac[4]<<8 | myMac[5] );
  	strcpy((char*)wifi_settings.ap_ssid, mySSD);
    // --------------------------------------------------------------------
```