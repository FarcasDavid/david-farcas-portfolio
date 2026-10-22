export const workflowStages = {
  prepare: {
    index: "01",
    title: "Start with data you can trust.",
    description:
      "Garbage in, garbage out. I collect relevant inputs, clean and validate them, and prepare a consistent foundation for the model.",
  },
  inference: {
    index: "02",
    title: "Turn inputs into useful output.",
    description:
      "I shape the model workflow around the problem, with clear inputs, outputs, and constraints. Prepared data becomes predictions or generated results.",
  },
  evaluate: {
    index: "03",
    title: "Define success. Test. Refine.",
    description:
      "I test against representative examples, inspect failure cases, and compare changes against measurable baselines. Quality is checked, not assumed.",
  },
  deliver: {
    index: "04",
    title: "Make it useful. Keep improving.",
    description:
      "I connect the model to an application with clear interfaces, validation, and practical safeguards. Feedback and monitoring guide the next improvement.",
  },
};

