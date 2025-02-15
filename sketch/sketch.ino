#include <FastLED.h>

#define LED_PIN     6       // Data pin
#define NUM_LEDS    600     // LEDs
#define TRACK_LENGTH 200.0  // 200m track

CRGB leds[NUM_LEDS];

void runPacer(CRGB color, float distance, int minutes, int seconds, int intervals, int delayMs) {
    float totalTime = (minutes * 60.0) + seconds;
    float speed = distance / totalTime;  
    float metersPerLED = TRACK_LENGTH / NUM_LEDS;
    float ledSpeed = speed / metersPerLED;  

    int intervalTime = totalTime / intervals;  

    Serial.print("Speed: "); Serial.print(speed); Serial.println(" m/s");
    Serial.print("LED Speed: "); Serial.print(ledSpeed); Serial.println(" LEDs/s");

    for (int i = 0; i < intervals; i++) {
        for (int pos = 0; pos < NUM_LEDS; pos++) {
            FastLED.clear();
            leds[pos] = color;
            FastLED.show();
            delay((1000 / ledSpeed));  
        }
        delay(delayMs);
    }
}

void parseData(String input) {
    int values[7];
    int index = 0;
    char *ptr = strtok((char*)input.c_str(), ",");
    
    while (ptr != NULL && index < 7) {
        values[index++] = atoi(ptr);
        ptr = strtok(NULL, ",");
    }
    
    if (index == 7) {
        CRGB color = CRGB(values[0], values[1], values[2]);
        float distance = values[3];
        int minutes = values[4];
        int seconds = values[5];
        int intervals = values[6];
        int delayMs = values[7];

        Serial.println("Received Data:");
        Serial.print("Color: "); Serial.print(values[0]); Serial.print(", ");
        Serial.print(values[1]); Serial.print(", "); Serial.println(values[2]);
        Serial.print("Distance: "); Serial.println(distance);
        Serial.print("Duration: "); Serial.print(minutes); Serial.print(":"); Serial.println(seconds);
        Serial.print("Intervals: "); Serial.println(intervals);
        Serial.print("Delay: "); Serial.println(delayMs);

        runPacer(color, distance, minutes, seconds, intervals, delayMs);
    } else {
        Serial.println("Invalid data received!");
    }
}

void setup() {
    Serial.begin(115200);
    Serial2.begin(115200);

    FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS);
    FastLED.clear();
    FastLED.show();

    Serial.println("Waiting for data...");
}

void loop() {
    if (Serial1.available()) {  
        String data = Serial1.readStringUntil('\n');  
        Serial.print("Received: ");
        Serial.println(data);
        parseData(data);
    }
}
