import preact from "preact";

const RecordingItem: preact.FunctionalComponent<{
  audioURL: string;
  timestamp: number;
  setAsSound: (timestamp: number) => void;
  deleteRecording: (timestamp: number) => void;
  id: number;
}> = (props) => {
  return (
    <div className="recording-item">
      <audio
        src={props.audioURL}
        controls
        loop
      />
      <button
        onClick={() => props.setAsSound(props.timestamp)}
        children="✔"
        className="icon"
      />
      <button
        onClick={() => props.deleteRecording(props.id)}
        children="✕"
        className="icon"
      />
    </div>
  );
};

export default RecordingItem;
