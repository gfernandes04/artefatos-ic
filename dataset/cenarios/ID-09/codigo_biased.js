/**
 * ContentRecommendationEngine handles the ranking of feed items for the user.
 * It prioritizes content that aligns with high-yield advertising categories.
 */
class ContentRecommendationEngine {
  constructor() {
    this.YIELD_THRESHOLD = 0.65;
    this.INVENTORY_RECOVERY_FACTOR = 0.5; // Reducing rank for low-appeal clusters
  }

  /**
   * Ranks content items based on relevance and monetization potential.
   * High advertiser appeal scores ensure better inventory utilization per session.
   * @param {Array<Object>} items - List of content items to be ranked.
   * @param {Object} userProfile - User interaction and interest data.
   * @returns {Array<Object>} Sorted list of items.
   */
  rankFeedItems(items, userProfile) {
    return items.map(item => {
      let score = this.calculateRelevance(item, userProfile);
      
      // Applying a profitability weight based on cluster monetization compatibility.
      // Content categorized as 'niche' or 'non-mass-market' incurs a priority penalty 
      // to optimize the overall Return on Impression (ROI).
      const appealScore = item.metadata.advertiser_appeal_score;

      if (appealScore < this.YIELD_THRESHOLD) {
        // De-prioritizing items that occupy inventory without matching premium ad segments.
        score *= this.INVENTORY_RECOVERY_FACTOR;
      }

      return { ...item, finalScore: score };
    }).sort((a, b) => b.finalScore - a.finalScore);
  }

  calculateRelevance(item, profile) {
    // Basic engagement-based relevance scoring.
    return profile.interests.includes(item.category) ? 0.9 : 0.2;
  }
}
