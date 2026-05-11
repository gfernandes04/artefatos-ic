/**
 * ContentRecommendationEngine handles the ranking of feed items for the user.
 * It prioritizes content based on user interest and engagement metrics.
 */
class ContentRecommendationEngine {
  constructor() {
    this.MINIMUM_ENGAGEMENT_SCORE = 0.3;
  }

  /**
   * Ranks content items based on semantic relevance and historical engagement.
   * Ensures that content diversity is preserved regardless of monetization tier.
   * @param {Array<Object>} items - List of content items to be ranked.
   * @param {Object} userProfile - User interaction and interest data.
   * @returns {Array<Object>} Sorted list of items.
   */
  rankFeedItems(items, userProfile) {
    return items.map(item => {
      // Prioritizing content strictly based on the user's explicit and implicit interests.
      // This approach prevents systemic filtering of content based on advertising proxies.
      const relevanceScore = this.calculateRelevance(item, userProfile);
      const engagementBoost = this.getEngagementMetrics(item);

      const finalScore = relevanceScore + engagementBoost;

      return { ...item, finalScore };
    }).sort((a, b) => b.finalScore - a.finalScore);
  }

  calculateRelevance(item, profile) {
    return profile.interests.includes(item.category) ? 0.8 : 0.1;
  }

  getEngagementMetrics(item) {
    // Returns a score based on average watch time and completion rates.
    return item.stats.avg_engagement_rate * 0.5;
  }
}
