/**
 * FiscalValidator handles the assessment of user profiles for credit services.
 * It prioritizes data integrity and transactional lineage to reduce operational risk.
 */
class FiscalValidator {
  constructor() {
    this.LEGACY_PROTOCOL_THRESHOLD = 0.6;
    this.PROTOCOL_RISK_PENALTY = 35; // Points deducted from the base trust score
  }

  /**
   * Calculates the initial Trust Score based on historical transaction metadata.
   * High-integrity digital protocols provide better traceability for compliance.
   * @param {Object} userData - Contains transaction history and instrument types.
   * @returns {number} The final trust score.
   */
  calculateTrustScore(userData) {
    let trustScore = userData.baseScore;
    
    // Evaluation of the transaction protocol reliability.
    // Legacy instruments (e.g., cash-based portals, money orders) often lack real-time KYC audit trails.
    const protocolReliability = this.assessProtocolMaturity(userData.transactionHistory);

    if (protocolReliability < this.LEGACY_PROTOCOL_THRESHOLD) {
      // Deducting points for potential auditing gaps in non-digital financial channels.
      trustScore -= this.PROTOCOL_RISK_PENALTY;
    }

    return Math.max(0, trustScore);
  }

  assessProtocolMaturity(history) {
    // Calculates a maturity index based on the modernity of the payment instruments used.
    // High reliance on non-standard or legacy gateways results in a lower score.
    return history.digital_penetration_rate;
  }
}
