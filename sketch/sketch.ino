#include <FastLED.h>

#define LED_PIN     6       // Data Pin
#define NUM_LEDS    600     // LEDs
#define TRACK_LENGTH 200.0  // 200m track

CRGB leds[NUM_LEDS];

// Function to calculate LED speed and control pacing
void runPacer(CRGB color, float distance, int minutes, int seconds, int intervals, int delayMs) {
    // Convert duration to total seconds
    float totalTime = (minutes * 60.0) + seconds;
    
    // Calculate speed in meters per second
    float speed = distance / totalTime;  // m/s
    
    // Calculate LED position per update
    float metersPerLED = TRACK_LENGTH / NUM_LEDS;
    float ledSpeed = speed / metersPerLED;  // LEDs per second
    
    int intervalTime = totalTime / intervals;  // Time for each interval

    Serial.print("Speed: "); Serial.print(speed); Serial.println(" m/s");
    Serial.print("LED Speed: "); Serial.print(ledSpeed); Serial.println(" LEDs/s");

    // Run pacing animation
    for (int i = 0; i < intervals; i++) {
        for (int pos = 0; pos < NUM_LEDS; pos++) {
            // Clear LEDs
            FastLED.clear();
            // Set current LED
            leds[pos] = color;
            FastLED.show();
            delay((1000 / ledSpeed));  // Adjust delay based on calculated LED speed
        }
        delay(delayMs);  // Delay between intervals
    }
}

void setup() {
    Serial.begin(115200);
    FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS);
    FastLED.clear();
    FastLED.show();

    // Example usage: Red color, 200m, 2 minutes, 30 seconds, 3 intervals, 1000ms delay
    runPacer(CRGB::Red, 200.0, 2, 30, 3, 1000);
}

void loop() {
    // Nothing in loop, function is called in setup for testing
}
