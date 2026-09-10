import "./ModelSelector.css";

interface ModelSelectorProps {
  models: [] | undefined;
  selectedModel: string;
  handleModel: (value: string) => void;
  apiKey: string;
  handleKey: React.Dispatch<React.SetStateAction<string>>;
  submitKey: (value: React.MouseEvent<HTMLButtonElement>) => void;
  keyAlert: boolean;
}

const ModelSelector = ({
  models,
  selectedModel,
  handleModel,
  apiKey,
  handleKey,
  submitKey,
  keyAlert,
}: ModelSelectorProps) => {
  return (
    <>
      <div className="api-key-container">
        <label htmlFor="api-key">API Key:</label>
        <input
          className="api-key"
          type="password"
          name="api-key"
          id="api-key"
          value={apiKey}
          onChange={(e) => handleKey(e.target.value)}
          placeholder="Enter your API key here..."
        />
        <button onClick={submitKey}>Save key</button>
      </div>
      <p style={{ visibility: keyAlert ? "visible" : "hidden" }}>
        Key saved successfully
      </p>
      <select
        className="model-selector"
        name="model-selector"
        id="model-selector"
        value={selectedModel}
        onChange={(e) => handleModel(e.target.value)}
      >
        <option key="">Select a model . . .</option>
        {models &&
          models.map((model: { id: number; name: string }) => {
            return (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default ModelSelector;
