import { useEffect, useState } from "preact/hooks";

const AudioRecorder = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setStream(stream);
      const recorder = new MediaRecorder(stream);
      recorder.addEventListener("dataavailable", handleDataAvailable);
      setRecorder(recorder);
    });
  }, []);

  useEffect(() => {
    const dbRequest = window.indexedDB.open("audio", 1);
    dbRequest.onerror = (event: any) => {
      console.error("Failed to open IndexedDB:", event.target.error);
    };
    dbRequest.onsuccess = (event: any) => {
      const db = event.target.result;
      const tx = db.transaction("recordings", "readonly");
      const store = tx.objectStore("recordings");
      const index = store.index("timestamp");
      const request = index.openCursor(null, "prev");
      request.onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          setAudioURL(URL.createObjectURL(cursor.value.blob));
        }
      };
      tx.onerror = (event: any) => {
        console.error(
          "Failed to read recordings from IndexedDB:",
          event.target.error,
        );
      };
    };
  }, []);

  const startRecording = () => {
    recorder?.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    recorder?.stop();
    setIsRecording(false);
  };

  const handleDataAvailable = (e: BlobEvent) => {
    const blob = e.data;
    setAudioURL(URL.createObjectURL(blob));
    saveAudio(blob);
  };

  const saveAudio = (blob: Blob) => {
    const dbRequest = window.indexedDB.open("audio", 1);
    dbRequest.onerror = (event: any) => {
      console.error("Failed to open IndexedDB:", event.target.error);
    };
    dbRequest.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      const store = db.createObjectStore("recordings", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("timestamp", "timestamp", { unique: false });
    };
    dbRequest.onsuccess = (event: any) => {
      const db = event.target.result;
      const tx = db.transaction("recordings", "readwrite");
      const store = tx.objectStore("recordings");
      const timestamp = Date.now();
      const data = { blob, timestamp };
      store.add(data);
      tx.oncomplete = () => {
        console.log("Audio saved to IndexedDB:", data);
      };
      tx.onerror = (event: any) => {
        console.error("Failed to save audio to IndexedDB:", event.target.error);
      };
    };
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      {audioURL && <audio src={audioURL} controls />}
    </div>
  );
};

export default AudioRecorder;
