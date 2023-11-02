import type { Gpio as GpioType } from "onoff";
import { settings } from "../settings";

function getGpio(): typeof GpioType {
  try {
    const { Gpio } = require("onoff");
    return Gpio;
  } catch (err) {
    console.log("[gpio error]:", err);
    return {
      accessible: false,
    } as any;
  }
}

const Gpio = getGpio();

const OUT_PINS = Gpio.accessible
  ? settings.pins.map((value) => new Gpio(value, "high"))
  : [];

const data = {
  isStarted: false,
};

function pulsePins(timeoutInSeconds = 5): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!Gpio.accessible) reject(new Error("cannot pulse pins"));
    try {
      for (const gpio of OUT_PINS) {
        gpio.writeSync(1);
      }
    } catch (err) {
      reject(err);
    }
    setTimeout(() => {
      try {
        for (const gpio of OUT_PINS) gpio.writeSync(0);
        resolve();
      } catch (err) {
        reject(err);
      }
    }, timeoutInSeconds * 1000);
  });
}

export async function startAllPins(timeoutInSeconds = 5) {
  if (data.isStarted) return;
  data.isStarted = true;
  try {
    await pulsePins(timeoutInSeconds);
  } catch (err) {
    console.error("[gpio error] - cannot start some gpio pins");
  }
}

export async function stopAllPins(timeoutInSeconds = 5) {
  if (!data.isStarted) return;
  data.isStarted = false;
  try {
    await pulsePins(timeoutInSeconds);
  } catch (err) {
    console.error("[gpio error] - cannot stop some gpio pins");
  }
}
