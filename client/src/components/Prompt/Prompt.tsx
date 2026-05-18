import "./prompt.css";

interface PromptProps {
  message: string;
  handlePrompt: (value: string) => void;
  submitPrompt: () => void;
}

const Prompt = ({ message, handlePrompt, submitPrompt }: PromptProps) => {
  return (
    <div className="main-prompt-container">
      <textarea
        className="main-prompt-textbox"
        name="prompt"
        id="prompt"
        value={message}
        onChange={(e) => handlePrompt(e.target.value)}
      ></textarea>
      <button onClick={submitPrompt}>Send</button>
    </div>
  );
};

export default Prompt;
