import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files: check dist/ first for compiled storefront, then fall back to root
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(path.join(distPath, 'index.html'))) {
    console.log('[Sovereign Server] Serving compiled assets from dist/ directory');
    app.use(express.static(distPath));
}
console.log('[Sovereign Server] Serving raw assets from root directory');
app.use(express.static(path.join(__dirname)));

app.post('/api/tts', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text parameter is required.' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'your_gemini_api_key_here') {
            console.warn('[TTS Proxy Warning] GEMINI_API_KEY is not configured on the server.');
            return res.status(500).json({ 
                error: 'Sovereign TTS Server Warning: GEMINI_API_KEY is not configured on this host. Please set it in your .env file or pass it as a url key (e.g. ?key=AIzaSy...)' 
            });
        }

        console.log(`[TTS Proxy] Generating speech for text: "${text.substring(0, 60)}..."`);

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Say in an authentic, warm, rhythmic Jamaican Patois elder accent: ${text}` }] }],
                generationConfig: {
                    responseModalities: ["AUDIO"],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Fenrir" } } }
                }
            })
        });

        const result = await response.json();
        
        if (result.error) {
            console.error('[TTS Proxy Error]', result.error);
            return res.status(response.status || 500).json({ error: result.error.message || 'Gemini API speech synthesis failed.' });
        }

        if (!result.candidates || !result.candidates[0] || !result.candidates[0].content || !result.candidates[0].content.parts[0] || !result.candidates[0].content.parts[0].inlineData) {
            console.error('[TTS Proxy Error] Invalid response format from Gemini:', JSON.stringify(result));
            return res.status(500).json({ error: 'Gemini API returned an unexpected response format. Ensure billing is enabled and API access is active.' });
        }

        const base64Audio = result.candidates[0].content.parts[0].inlineData.data;
        res.json({ audioContent: base64Audio });
    } catch (error) {
        console.error('[TTS Proxy Internal Error]', error);
        res.status(500).json({ error: 'Internal server error during speech generation.' });
    }
});

// Fallback to serve index.html for all other routes
app.get('*all', (req, res) => {
    const distIndex = path.join(__dirname, 'dist', 'index.html');
    if (fs.existsSync(distIndex)) {
        res.sendFile(distIndex);
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 REGGAE KITCHEN SOVEREIGN SERVER ACTIVE`);
    console.log(`🛡️  URL: http://localhost:${PORT}`);
    console.log(`🔐 Mode: Zero-Exposure Server-Side TTS Proxy`);
    console.log(`==================================================`);
});
