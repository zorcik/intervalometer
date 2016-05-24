#include <SoftwareSerial.h>
 
int bluetoothTx = 10;  // TX-O pin of bluetooth mate, Arduino D2
int bluetoothRx = 11;  // RX-I pin of bluetooth mate, Arduino D3
 
int led = 13;
 
int buttonPin1 = 7;
int buttonPin2 = 8;
int button1State = 0;
int button2State = 0;
 
int dataFromBt;
String dataFromSerial;
 
boolean lightBlink = false;
 
SoftwareSerial bluetooth(bluetoothTx, bluetoothRx);
 
void setup()
{
  Serial.begin(9600);  // Begin the serial monitor at 9600bps
 
  bluetooth.begin(115200);  // The Bluetooth Mate defaults to 115200bps
  bluetooth.print("$");  // Print three times individually
  bluetooth.print("$");
  bluetooth.print("$");  // Enter command mode
  delay(100);  // Short delay, wait for the Mate to send back CMD
  bluetooth.println("U,9600,N");  // Temporarily Change the baudrate to 9600, no parity
  // 115200 can be too fast at times for NewSoftSerial to relay the data reliably
  bluetooth.begin(9600);  // Start bluetooth serial at 9600
  pinMode(led, OUTPUT);
  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);
}
 
void loop()
{
 
  if (bluetooth.available()) // If the bluetooth sent any characters
  {
    // Send any characters the bluetooth prints to the serial monitor
 
    //Serial.println((char)bluetooth.read());
    dataFromBt = (char)bluetooth.read();
 
    Serial.print("Data: ");
    Serial.println(dataFromBt);
    if (dataFromBt == '1') {
      Serial.println("led on");
      digitalWrite(led, HIGH);
      //bluetooth.print("1");
    }
    if (dataFromBt == '0') {
      Serial.println("led off");
      digitalWrite(led, LOW);
      //bluetooth.print("0");
    }

        
 
  }

  if (Serial.available())
  {
    dataFromSerial = Serial.readString();
    Serial.print("Dane z seriala: ");
    Serial.println(dataFromSerial);
    bluetooth.println(dataFromSerial);
  }
 
}
