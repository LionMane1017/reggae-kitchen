// --- SOVEREIGN AUDIO KERNEL ---
// PCM to WAV converter for Gemini TTS output
export const pcmToWav = (pcmData, sampleRate) => {
  const buffer = new ArrayBuffer(44 + pcmData.length * 2);
  const view = new DataView(buffer);
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 32 + pcmData.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, pcmData.length * 2, true);
  for (let i = 0; i < pcmData.length; i++) {
    view.setInt16(44 + i * 2, pcmData[i], true);
  }
  return new Blob([buffer], { type: 'audio/wav' });
};

// Gemini TTS Speech Generator
// Supports two methods: Direct API key or Server-side proxy
export const generateSpeech = async (text) => {
  try {
    // Phonetic mapping for TTS accuracy
    const processedText = text
      .replace(/ital/gi, "Eye-tahl")
      .replace(/\$12\.99/g, "twelve dollars and ninety nine cents")
      .replace(/\$14\.95/g, "fourteen dollars and ninety five cents")
      .replace(/\$15\.99/g, "fifteen dollars and ninety nine cents")
      .replace(/\$13\.99/g, "thirteen dollars and ninety nine cents")
      .replace(/\$59\.99/g, "fifty nine dollars and ninety nine cents");

    // Check for API key from URL params or env
    const urlParams = new URLSearchParams(window.location.search);
    const apiKey = urlParams.get('key') || import.meta.env.VITE_GEMINI_API_KEY || '';

    let base64Audio;

    if (apiKey) {
      // Method A: Direct browser invocation via provided API key
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Say in an authentic, warm, rhythmic Jamaican Patois elder accent: ${processedText}`
              }]
            }],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: "Fenrir" }
                }
              }
            }
          })
        }
      );
      const result = await response.json();
      if (result.error) throw new Error(result.error.message);
      base64Audio = result.candidates[0].content.parts[0].inlineData.data;
    } else {
      // Method B: Secure Server-Side Proxy (No client key exposure)
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: processedText })
      });
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      base64Audio = result.audioContent;
    }

    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Int16Array(len / 2);
    for (let i = 0; i < len; i += 2) {
      bytes[i / 2] = (binaryString.charCodeAt(i + 1) << 8) | binaryString.charCodeAt(i);
    }
    const wavBlob = pcmToWav(bytes, 24000);
    const audio = new Audio(URL.createObjectURL(wavBlob));
    return audio;
  } catch (error) {
    console.error("Audio generation failed:", error);
    return null;
  }
};
