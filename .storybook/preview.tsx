import type { Preview } from "@storybook/nextjs-vite";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource-variable/newsreader";
import "../styles/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    a11y: { test: "todo" },
    backgrounds: { options: { cream: { name: "Cream", value: "#F6F1E8" }, dark: { name: "Dark", value: "#1C1B18" } } },
  },
  decorators: [(Story) => <div className="min-w-[320px] max-w-[900px] p-6"><Story /></div>],
};
export default preview;
