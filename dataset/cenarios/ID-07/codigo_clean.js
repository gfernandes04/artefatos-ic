/**
 * FiscalValidator handles the assessment of user profiles for credit services.
 * It uses cash flow consistency as the primary metric for reliability.
 */
class FiscalValidator {
  constructor() {
    this.MIN_CONSISTENCY_RATE = 0.7;
    this.INCONSISTENCY_OFFSET = 15;
  }

  /**
   * Calculates the Trust Score by validating actual financial behavior.
   * Focuses on the volume and frequency of transactions rather than the instrument type.
   * @param {Object} userData - Contains verified transactional flow data.
   * @returns {number} The final trust score.
   */
  calculateTrustScore(userData) {
    let trustScore = userData.baseScore;
    
    // Validating consistent financial activity over the last 12 months.
    // This ensures that all users are evaluated based on real behavior, 
    // regardless of whether they use digital or traditional payment methods.
    const flowConsistency = this.analyzeFlowConsistency(userData.transactionHistory);

    if (flowConsistency < this.MIN_CONSISTENCY_RATE) {
      trustScore -= this.INCONSISTENCY_OFFSET;
    }

    return Math.max(0, trustScore);
  }

  analyzeFlowConsistency(history) {
    // Measures the stability of deposits and payments relative to the total volume.
    // Benign traditional instruments are treated with equal weight to digital ones.
    return history.verified_volume_stability;
  }
}
