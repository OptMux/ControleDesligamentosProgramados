import { Buffer } from "buffer";
import { getAllLogs } from "../services/log";
import { SystemLog } from "../store/ducks/logs/logs.types";
import { formatDate } from "./format";

function getLogFileName(extension = "txt") {
  const now = new Date();
  return `CDP_Log-${now.toISOString()}.${extension}`;
}

export function formatLogMessage(log: SystemLog) {
  return `[${formatDate(log.createdAt, "DD/MM/YY | HH:mm")}] ${log.source}: ${
    log.message
  }`;
}

export async function downloadAllLogs(chunks?: number) {
  const logs = await getAllLogs(chunks, true);
  const linkElement = document.createElement("a");

  const formattedLogs: string[] = logs.map(formatLogMessage);

  const buffer = new Buffer(formattedLogs.join("\n"));
  const data = buffer.toString("base64");

  linkElement.href = `data:text/plain;base64,${data}`;
  linkElement.download = getLogFileName();

  document.body.appendChild(linkElement);
  linkElement.click();
  document.body.removeChild(linkElement);
}
