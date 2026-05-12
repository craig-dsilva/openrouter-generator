interface ModelSelectorProps {
  models: string;
  selectedModel: string;
  handleModel: (value: string) => void;
}

const ModelSelector = ({
  models,
  selectedModel,
  handleModel,
}: ModelSelectorProps) => {
  return (
    <select
      name="model-selector"
      id="model-selector"
      value={selectedModel}
      onChange={(e) => handleModel(e.target.value)}
    >
      <option key="">Select a model . . .</option>
      {models &&
        models.map((model: any) => {
          return (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          );
        })}
    </select>
  );
};

export default ModelSelector;
