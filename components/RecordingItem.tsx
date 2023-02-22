import preact from "preact";

const RecordingItem: preact.FunctionalComponent<{
  audioURL: string;
  setAsSound: () => void;
  deleteSound: () => void;
}> = (props) => {
  return (
    <div className="recording-item">
      <audio
        src={props.audioURL}
        controls
        loop
      />
      <button
        onClick={props.setAsSound}
        children="✔"
        className="icon"
      />
      <button
        onClick={props.deleteSound}
        children="✕"
        className="icon"
      />
    </div>
  );
};

export default RecordingItem;
