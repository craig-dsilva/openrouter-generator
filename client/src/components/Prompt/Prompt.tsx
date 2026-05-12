import "./prompt.css";

const Prompt = () => {
  return (
    <div className="main-prompt-container">
      <textarea
        className="main-prompt-textbox"
        name="prompt"
        id="prompt"
      ></textarea>
      <button>Send</button>
    </div>
  );
};

export default Prompt;
