// APP 原生桥：注入 window.NativeTTS（WebView 没有语音合成，调用系统 TTS 引擎）
import { TextToSpeech } from "@capacitor-community/text-to-speech";

(window as any).NativeTTS = {
  isSupported: true,
  async speak(text: string, opts: any) {
    await TextToSpeech.stop().catch(() => {});
    await TextToSpeech.speak({
      text,
      rate: Math.min(2, Math.max(0.5, opts?.rate ?? 1)),
      pitch: Math.min(2, Math.max(0.5, opts?.pitch ?? 1)),
      volume: Math.min(1, Math.max(0, opts?.volume ?? 1)),
      lang: "zh-CN",
    });
  },
  async stop() {
    await TextToSpeech.stop().catch(() => {});
  },
};
