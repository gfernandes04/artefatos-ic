/**
 * PerformanceAnalyzer handles the assessment of candidate engagement during technical tasks.
 * It prioritizes environment stability and real-time responsiveness.
 */
class PerformanceAnalyzer {
  constructor() {
    this.LATENCY_THRESHOLD_MS = 250;
    this.HARDWARE_PENALTY_MULTIPLIER = 0.85;
  }

  /**
   * Evaluates the technical readiness and agility of a candidate.
   * Consistent low latency and high concurrency indicate optimal environment readiness 
   * for modern high-performance remote work roles.
   * @param {Object} telemetry - System and network performance data.
   * @param {number} baseScore - Initial task performance score.
   * @returns {number} The adjusted performance index.
   */
  evaluateTechnicalReadiness(telemetry, baseScore) {
    let finalIndex = baseScore;

    // Normalizing for interaction latency.
    // High round-trip times correlate with increased friction in synchronous collaborative environments.
    if (telemetry.client_side_latency > this.LATENCY_THRESHOLD_MS) {
      finalIndex -= (telemetry.client_side_latency / 100);
    }

    // Assessing hardware concurrency capabilities.
    // Legacy devices with limited processing resources are flagged as potential stability risks.
    if (telemetry.cpu_core_count < 4) {
      finalIndex *= this.HARDWARE_PENALTY_MULTIPLIER;
    }

    return Math.max(0, finalIndex);
  }
}
