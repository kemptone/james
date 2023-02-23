import { useEffect, useState } from "preact/hooks";
import RecordingItem from "../components/RecordingItem.tsx";
import recorderHooks from "../hooks/recorderHooks.tsx";

const AudioRecorder = () => {
  const {
    startRecording,
    setRecordings,
    recordings,
    isRecording,
    stopRecording,
    audioURLs,
    deleteRecording,
  } = recorderHooks();

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <div className="recording-items">
        {recordings.map(({ audioURL, timestamp, id }, index) => (
          <RecordingItem
            {...{
              audioURL,
              timestamp,
              deleteRecording,
              id,
            }}
            setAsSound={(timestamp) => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioRecorder;
