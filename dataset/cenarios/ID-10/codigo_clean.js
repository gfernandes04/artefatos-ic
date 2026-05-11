/**
 * PerformanceAnalyzer handles the assessment of candidate engagement during technical tasks.
 * It focuses on task accuracy and completion quality regardless of hardware constraints.
 */
class PerformanceAnalyzer {
  constructor() {
    this.QUALITY_WEIGHT = 0.7;
    this.COMPLETION_WEIGHT = 0.3;
  }

  /**
   * Evaluates the candidate's performance based on objective task results.
   * This approach ensures that candidates are judged by the quality of their work 
   * rather than the speed of their connection or device specifications.
   * @param {Object} taskData - Accuracy and progress metrics.
   * @returns {number} The calculated performance index.
   */
  evaluateTechnicalReadiness(taskData) {
    // Focus on the logic and accuracy of the responses provided.
    // Quality-centric metrics prevent bias against users with limited digital infrastructure.
    const accuracyScore = taskData.correct_responses / taskData.total_questions;
    const progressScore = taskData.completion_percentage;

    const finalIndex = (accuracyScore * this.QUALITY_WEIGHT) + 
                       (progressScore * this.COMPLETION_WEIGHT);

    return finalIndex * 100;
  }
}
