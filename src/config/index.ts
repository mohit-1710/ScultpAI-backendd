// src/config/index.ts
import dotenv from 'dotenv';

// Load environment variables from .env file
// This should be done as early as possible
dotenv.config();

/**
 * Application Configuration Object.
 * Centralizes all configuration values, prioritizing environment variables
 * and providing sensible defaults for development.
 */
const config = {
  /**
   * The current running environment (e.g., 'development', 'production').
   */
  env: process.env.NODE_ENV || 'development',

  /**
   * The port number the application server will listen on.
   */
  port: parseInt(process.env.PORT || '5000', 10), // Default to 5000 if PORT not set

  /**
   * API related configurations.
   */
  api: {
    /**
     * The prefix for all API routes (e.g., '/api/v1').
     */
    prefix: process.env.API_PREFIX || '/api/v1',
  },

  /**
   * CORS (Cross-Origin Resource Sharing) configuration.
   */
  corsOptions: {
    /**
     * Specifies the origin(s) allowed to make requests.
     * For production, list your frontend domain(s).
     */
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Your frontend dev URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
    exposedHeaders: ['Content-Range', 'Content-Length', 'Accept-Ranges'],
    credentials: true
  },

  /**
   * Google Generative AI (Gemini) API Key.
   * CRITICAL: Ensure this is set in your .env file for production.
   */
  googleGenerativeAiApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,

  /**
   * Configuration for LLM models to be used.
   */
  llmModels: {
    scripting: process.env.GEMINI_MODEL_SCRIPTING || 'gemini-2.5-flash-preview-04-17', // Or 'gemini-pro'
    manimCode: process.env.GEMINI_MODEL_MANIM_CODE || 'gemini-2.5-flash-preview-04-17', // Or 'gemini-1.5-flash-latest'
  },

  /**
   * Google Cloud Storage configuration for storing videos and audio files
   */
  storage: {
    googleCloud: {
      projectId: process.env.GCS_PROJECT_ID,
      keyFilename: process.env.GCS_KEY_FILE,
      bucketName: process.env.GCS_BUCKET_NAME || 'sculptai-media',
      baseUrl: process.env.GCS_BASE_URL || `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME || 'sculptai-media'}`
    }
  },

  /**
   * Manim Rendering Service configurations.
   */
  manimRenderService: {
    endpoint: process.env.MANIM_RENDER_ENDPOINT || 'https://dockerdeploy-production.up.railway.app',
    timeout: parseInt(process.env.MANIM_RENDER_TIMEOUT_MS || '300000', 10), // 5 minutes
    outputDir: process.env.MANIM_OUTPUT_DIR || '/manim-videos', // Path where videos are stored and accessible
    useStaticServing: process.env.MANIM_USE_STATIC_SERVING === 'true',
    staticUrlPrefix: process.env.MANIM_STATIC_URL_PREFIX || '/videos', // URL prefix if static serving is enabled
  },

  /**
   * Text-to-Speech configurations
   */
  tts: {
    enabled: !!process.env.ELEVENLABS_API_KEY,
    elevenLabs: {
      apiKey: process.env.ELEVENLABS_API_KEY,
      defaultVoiceId: process.env.ELEVENLABS_DEFAULT_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL', // Default to "Rachel" voice
    },
  },

  /**
   * Logging configuration.
   */
  logging: {
    level: process.env.LOG_LEVEL || 'info', // e.g., 'debug', 'info', 'warn', 'error'
  },
};

// Freeze the config object to prevent accidental modifications at runtime.
export default Object.freeze(config);