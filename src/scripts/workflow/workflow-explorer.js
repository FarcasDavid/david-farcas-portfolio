import { workflowStages } from "../content/workflow-stages.js";

export function initWorkflowExplorer({ document }) {
  const stageButtons = [...document.querySelectorAll("button[data-stage]")];
  function selectStage(id) {
    const stage = workflowStages[id];
    if (!stage) return;
    for (const button of stageButtons) {
      const selected = button.dataset.stage === id;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
      button
        .closest(".pipeline, .system-map, [data-pipeline]")
        ?.setAttribute("data-active-stage", id);
    }
    const title = document.querySelector("#stage-title");
    const description = document.querySelector("#stage-description");
    const index = document.querySelector("#stage-index");
    if (title) title.textContent = stage.title;
    if (description) description.textContent = stage.description;
    if (index) index.textContent = stage.index;
    document.body.dataset.activeStage = id;
  }

  for (const button of stageButtons) {
    button.addEventListener("click", () => selectStage(button.dataset.stage));
  }
  const initialStage =
    stageButtons.find(
      (button) => button.getAttribute("aria-pressed") === "true",
    ) || stageButtons[0];
  if (initialStage) selectStage(initialStage.dataset.stage);

}
