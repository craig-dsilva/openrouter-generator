interface ModelSelectorProps {
  models: string;
  selectedModel: string;
  updateModel: (value: string) => void;
}

const ModelSelector = ({
  models,
  selectedModel,
  updateModel,
}: ModelSelectorProps) => {
  return (
    <select
      name="model-selector"
      id="model-selector"
      value={selectedModel}
      onChange={(e) => updateModel(e.target.value)}
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
