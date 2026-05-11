/**
 * SentimentAnalyzer module for customer interaction assessment.
 * It uses intent-based analysis to ensure equitable treatment across linguistic styles.
 */
class SentimentAnalyzer {
  constructor() {
    this.EMOTION_THRESHOLD = 0.7;
  }

  /**
   * Evaluates the interaction quality based on semantic intent and emotional markers.
   * This approach remains agnostic to syntactic variations and dialectal patterns.
   * @param {string} transcript - The customer message text.
   * @returns {Object} Assessment result.
   */
  evaluateInteractionQuality(transcript) {
    // Focus purely on emotional keywords and contextual intent.
    // This avoids penalizing users based on their specific phrasing or grammatical style.
    const emotionalMarkers = this.extractEmotionalMarkers(transcript);
    const frustrationIndex = this.calculateIntentPolarity(emotionalMarkers);

    return {
      isFrustrated: frustrationIndex > this.EMOTION_THRESHOLD,
      priority: frustrationIndex > 0.85 ? 'urgent' : 'standard'
    };
  }

  extractEmotionalMarkers(text) {
    // Identifies adjectives and verbs that explicitly signal frustration or satisfaction.
    return ContextualNLP.getKeywords(text);
  }

  calculateIntentPolarity(markers) {
    // Aggregates emotional markers to determine the actual user intent.
    return markers.reduce((acc, m) => acc + m.weight, 0) / markers.length;
  }
}
