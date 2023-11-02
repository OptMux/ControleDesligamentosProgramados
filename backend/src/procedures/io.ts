import type { BinaryValue } from "onoff";
import { Gpio } from "onoff";
import { settings } from "../settings";

function getPins() {
  if (!Gpio.accessible) return;
  const outputPin = new Gpio(settings.outputPin, "out");
  const inputPin = new Gpio(settings.inputPin, "in");
  const alarmPin = new Gpio(settings.alarmPin, "out");

  alarmPin.writeSync(0);

  return {
    outputPin,
    inputPin,
    alarmPin,
  };
}

const PINS = getPins();

const data = {
  isStarted: false,
};

function pulsePin(pin: Gpio, timeoutInSeconds = 5): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!Gpio.accessible) reject(new Error("cannot pulse pin"));
    try {
      pin?.writeSync?.(1);
    } catch (err) {
      reject(err);
    }
    setTimeout(() => {
      try {
        pin?.writeSync?.(0);
        resolve();
      } catch (err) {
        reject(err);
      }
    }, timeoutInSeconds * 1000);
  });
}

async function fireAlarm(
  timeoutInSeconds = settings.alarmPinPulseTimeoutInSeconds
) {
  if (!PINS) return;
  return await pulsePin(PINS?.alarmPin, timeoutInSeconds);
}

function readPin(pin: Gpio, delayInSeconds = 30): Promise<BinaryValue> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(pin?.readSync?.());
      } catch (err) {
        reject(err);
      }
    }, delayInSeconds * 30);
  });
}

export async function startGpio(
  timeoutInSeconds = settings.outputPinPulseTimeoutInSeconds
) {
  if (data.isStarted || !PINS) return;
  data.isStarted = true;
  let isActivated = false;
  try {
    await pulsePin(PINS.outputPin, timeoutInSeconds);
    isActivated = true;
  } catch (err) {
    console.error("[gpio error] - cannot start some gpio pins");
    data.isStarted = false;
  }

  if (
    isActivated &&
    (await readPin(PINS.inputPin, settings.inputPinReadDelayInSeconds)) === 1
  ) {
    fireAlarm();
    throw new Error("cannot be started");
  } else throw new Error("cannot be started");
}

export async function stopGpio(
  timeoutInSeconds = settings.outputPinPulseTimeoutInSeconds
) {
  if (!data.isStarted || !PINS) return;
  data.isStarted = false;
  let isActivated = false;
  try {
    await pulsePin(PINS.outputPin, timeoutInSeconds);
    isActivated = true;
  } catch (err) {
    console.error("[gpio error] - cannot stop some gpio pins");
  }
  if (
    isActivated &&
    (await readPin(PINS.inputPin, settings.inputPinReadDelayInSeconds)) === 0
  ) {
    fireAlarm();
    throw new Error("cannot be stopped");
  } else throw new Error("cannot be stopped");
}
