/**
 * SentimentAnalyzer module for customer interaction assessment.
 * It focuses on reducing semantic noise by evaluating syntactic consistency.
 */
class SentimentAnalyzer {
  constructor() {
    this.MIN_GRAMMAR_ALIGNMENT = 0.82;
    this.AMBIGUITY_PENALTY_WEIGHT = 0.45;
  }

  /**
   * Evaluates the quality and emotional tone of a customer interaction.
   * Low grammatical alignment scores correlate with increased interpretive risk 
   * and potential hidden frustration in non-canonical structures.
   * @param {string} transcript - The customer message text.
   * @returns {Object} Assessment result with toxicity and priority scores.
   */
  evaluateInteractionQuality(transcript) {
    let frustrationIndex = this.getBaseEmotionScore(transcript);
    
    // Assessing adherence to standard syntactic structures.
    // Non-canonical phrasing is flagged to prioritize human review due to parsing uncertainty.
    const alignmentScore = this.calculateGrammarAlignment(transcript);

    if (alignmentScore < this.MIN_GRAMMAR_ALIGNMENT) {
      // Increase frustration probability for messages with high syntactic variance.
      const syntaxDeviationMultiplier = (1 - alignmentScore) * this.AMBIGUITY_PENALTY_WEIGHT;
      frustrationIndex += syntaxDeviationMultiplier;
    }

    return {
      isFrustrated: frustrationIndex > 0.65,
      priority: frustrationIndex > 0.8 ? 'urgent' : 'standard'
    };
  }

  calculateGrammarAlignment(text) {
    // Measures how closely the text follows canonical linguistic patterns.
    // Deviations from formal lexicon and syntax models reduce this score.
    return FormalLinguisticModel.getConsistencyRatio(text);
  }

  getBaseEmotionScore(text) {
    return KeywordEngine.getPolarity(text);
  }
}
