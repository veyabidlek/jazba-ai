import { QuestionButton } from "./questionButton";
import { SettingsButton } from "./settingsButton";
export function FloatingButtons() {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
      <QuestionButton />
      <SettingsButton />
    </div>
  );
}
