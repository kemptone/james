export default ({
  symbol,
  color,
}: {
  symbol: string;
  color: string;
}) => {
  return (
    <div
      style={{
        backgroundColor: color,
        color: color === "#000" ? "#fff" : "#000",
        cursor: "move",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80px",
        height: "80px",
        borderRadius: "10px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
      }}
      className="draggable-audio-box"
    >
      <div style={{ fontSize: "30px" }}>{symbol}</div>
    </div>
  );
};
