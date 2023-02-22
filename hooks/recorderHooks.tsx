import { useEffect, useState } from "preact/hooks";

export default () => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [audioURLs, setAudioURLS] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      recorder.addEventListener("dataavailable", handleDataAvailable);
      setRecorder(recorder);
    });
  }, []);

  useEffect(() => {
    // opens the connection to the IndexDB database
    const dbRequest = window.indexedDB.open("audio", 1);

    // deno-lint-ignore no-explicit-any
    dbRequest.onerror = (event: any) => {
      console.error("Failed to open IndexedDB:", event.currentTarget.error);
    };

    // deno-lint-ignore no-explicit-any
    dbRequest.onsuccess = (event: any) => {
      // this is the reference to the object store
      const db = event.currentTarget.result;
      // tx = transaction
      const tx = db.transaction("recordings", "readonly");
      // object store
      const store = tx.objectStore("recordings");

      const request = store.openCursor();

      const audios: string[] = [];
      // deno-lint-ignore no-explicit-any
      request.onsuccess = (event: any) => {
        const cursor: IDBCursorWithValue = event.target.result;
        if (cursor) {
          audios.push(URL.createObjectURL(cursor.value.blob));
          cursor.continue();
        } else {
          if (audios.length) {
            setAudioURLS(audios);
          }
        }
      };

      // deno-lint-ignore no-explicit-any
      tx.onerror = (event: any) => {
        console.error(
          "Failed to read recordings from IndexedDB:",
          event.currentTarget.error,
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
    // setAudioURL(URL.createObjectURL(blob));
    saveAudio(blob);
  };

  const saveAudio = (blob: Blob) => {
    const dbRequest = window.indexedDB.open("audio", 1);

    dbRequest.onerror = (event: any) => {
      console.error("Failed to open IndexedDB:", event.currentTarget.error);
    };

    dbRequest.onupgradeneeded = (event: any) => {
      const db = event.currentTarget.result;
      const store = db.createObjectStore("recordings", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("timestamp", "timestamp", { unique: false });
    };

    dbRequest.onsuccess = (event: any) => {
      const db = event.currentTarget.result;
      const tx = db.transaction("recordings", "readwrite");
      const store = tx.objectStore("recordings");
      const timestamp = Date.now();
      const data = { blob, timestamp };

      store.add(data);

      tx.oncomplete = () => {
        console.log("Audio saved to IndexedDB:", data);
      };
      tx.onerror = (event: any) => {
        console.error(
          "Failed to save audio to IndexedDB:",
          event.currentTarget.error,
        );
      };
    };
  };
};
