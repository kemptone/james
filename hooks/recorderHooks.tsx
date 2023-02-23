import { useEffect, useState } from "preact/hooks";

interface Recording {
  audioURL: string;
  timestamp: number;
  id: number;
}

export default () => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [refreshId, refreshDB] = useState(1);

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
      // const db = event.currentTarget.result;
      const db = (event.currentTarget as IDBOpenDBRequest).result;
      // tx = transaction
      const tx = db.transaction("recordings", "readonly");
      // object store
      const store = tx.objectStore("recordings");

      const request = store.openCursor();

      const audios: Recording[] = [];
      // deno-lint-ignore no-explicit-any
      request.onsuccess = (event: any) => {
        const cursor: IDBCursorWithValue = event.target.result;
        if (cursor) {
          audios.push({
            audioURL: URL.createObjectURL(cursor.value.blob),
            timestamp: cursor.value.timestamp,
            id: cursor.value.id,
          });
          cursor.continue();
        } else {
          setRecordings(audios);
        }
        console.count("how many");
      };

      // deno-lint-ignore no-explicit-any
      tx.onerror = (event: any) => {
        console.error(
          "Failed to read recordings from IndexedDB:",
          event.currentTarget.error,
        );
      };
    };
  }, [refreshId]);

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

  const deleteRecording = (id: number) => {
    const dbRequest = window.indexedDB.open("audio", 1);

    dbRequest.onerror = (event: any) => {
      console.error("Failed to open IndexedDB:", event.currentTarget.error);
    };

    dbRequest.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction("recordings", "readwrite");
      const store = tx.objectStore("recordings");
      const request = store.getKey(id);
      request.onsuccess = (event: any) => {
        const key = event.target.result;
        if (key !== undefined) {
          store.delete(key);
        }

        tx.oncomplete = () => {
          refreshDB(Math.random());
        };

        tx.onerror = () => {
          refreshDB(Math.random());
        };
      };
    };
  };

  const saveAudio = (blob: Blob) => {
    const dbRequest = window.indexedDB.open("audio", 1);

    dbRequest.onerror = (event: any) => {
      console.error("Failed to open IndexedDB:", event.currentTarget.error);
    };

    dbRequest.onupgradeneeded = (event: any) => {
      const db = (event.currentTarget as IDBOpenDBRequest).result;
      const store = db.createObjectStore("recordings", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("timestamp", "timestamp", { unique: false });
    };

    dbRequest.onsuccess = (event: any) => {
      const db = (event.currentTarget as IDBOpenDBRequest).result;
      const tx = db.transaction("recordings", "readwrite");
      const store = tx.objectStore("recordings");
      const timestamp = Date.now();
      const data = { blob, timestamp };

      store.add(data);

      tx.oncomplete = () => {
        console.log("Audio saved to IndexedDB:", data);
        setRecordings((prev) => {
          const thing = {
            audioURL: URL.createObjectURL(data.blob),
            timestamp: data.timestamp,
            id: Math.random(),
          };

          return [
            ...prev,
            thing,
          ];
        });
        // refreshDB(Math.random());
      };
      tx.onerror = (event: any) => {
        console.error(
          "Failed to save audio to IndexedDB:",
          event.currentTarget.error,
        );
      };
    };
  };

  return {
    recorder,
    setRecorder,
    recordings,
    setRecordings,
    isRecording,
    setIsRecording,
    startRecording,
    stopRecording,
    handleDataAvailable,
    saveAudio,
    deleteRecording,
  };
};
