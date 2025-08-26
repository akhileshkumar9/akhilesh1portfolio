import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductReviews = ({ productId, rating, reviewCount }) => {
  const [sortBy, setSortBy] = useState('helpful');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    name: ''
  });

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      title: "Exceptional Sound Quality",
      comment: "These headphones exceeded my expectations! The sound quality is crystal clear, and the noise cancellation works perfectly. I use them for work calls and music, and they're comfortable for long periods.",
      date: "2025-01-15",
      helpful: 23,
      verified: true,
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      title: "Great Value for Money",
      comment: "Good headphones overall. The battery life is impressive, lasting almost the full 30 hours as advertised. Only complaint is they can get a bit tight during extended use.",
      date: "2025-01-10",
      helpful: 18,
      verified: true,
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 5,
      title: "Perfect for Work from Home",
      comment: "Bought these for remote work and they've been a game-changer. The microphone quality is excellent for video calls, and the active noise cancellation helps me focus.",
      date: "2025-01-08",
      helpful: 15,
      verified: false,
      avatar: "ED"
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      rating: 3,
      title: "Good but not great",
      comment: "Decent headphones but I expected more from the price point. The sound is good but not exceptional. Build quality feels solid though.",
      date: "2025-01-05",
      helpful: 8,
      verified: true,
      avatar: "AR"
    },
    {
      id: 5,
      name: "Lisa Wang",
      rating: 5,
      title: "Audiophile Approved",
      comment: "As someone who's particular about audio quality, these headphones deliver. The frequency response is balanced, and the detail in the highs and mids is impressive.",
      date: "2025-01-02",
      helpful: 31,
      verified: true,
      avatar: "LW"
    }
  ];

  const ratingDistribution = {
    5: 58,
    4: 23,
    3: 12,
    2: 5,
    1: 2
  };

  const renderStars = (rating, size = 16, interactive = false, onRatingChange = null) => {
    return [...Array(5)]?.map((_, i) => (
      <button
        key={i}
        onClick={() => interactive && onRatingChange?.(i + 1)}
        disabled={!interactive}
        className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}
      >
        <Icon
          name="Star"
          size={size}
          className={`${
            i < Math.floor(rating)
              ? 'text-accent fill-current' :'text-muted-foreground'
          } ${interactive ? 'hover:text-accent' : ''}`}
        />
      </button>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleWriteReview = () => {
    setShowWriteReview(!showWriteReview);
  };

  const handleSubmitReview = (e) => {
    e?.preventDefault();
    // In real app, this would submit to API
    console.log('Submitting review:', newReview);
    setShowWriteReview(false);
    setNewReview({ rating: 5, title: '', comment: '', name: '' });
  };

  const handleHelpfulClick = (reviewId) => {
    // In real app, this would update helpful count via API
    console.log('Marking review as helpful:', reviewId);
  };

  const sortedReviews = [...reviews]?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b?.date) - new Date(a?.date);
      case 'oldest':
        return new Date(a?.date) - new Date(b?.date);
      case 'rating-high':
        return b?.rating - a?.rating;
      case 'rating-low':
        return a?.rating - b?.rating;
      case 'helpful':
      default:
        return b?.helpful - a?.helpful;
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-foreground">
          Customer Reviews ({reviewCount})
        </h2>
        <Button
          onClick={handleWriteReview}
          variant="outline"
          iconName="PenTool"
          className="self-start sm:self-auto"
        >
          Write a Review
        </Button>
      </div>

      {/* Overall Rating Summary */}
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="text-5xl font-bold text-foreground">
                {rating?.toFixed(1)}
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start mb-1">
                  {renderStars(rating, 20)}
                </div>
                <p className="text-muted-foreground">
                  Based on {reviewCount} reviews
                </p>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {Object.entries(ratingDistribution)?.reverse()?.map(([stars, percentage]) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm text-foreground w-8">
                  {stars}★
                </span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-accent rounded-full h-2 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-10 text-right">
                  {percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Rating
              </label>
              <div className="flex items-center gap-1">
                {renderStars(newReview?.rating, 24, true, (rating) =>
                  setNewReview(prev => ({ ...prev, rating }))
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={newReview?.name}
                onChange={(e) => setNewReview(prev => ({ ...prev, name: e?.target?.value }))}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Review Title
              </label>
              <input
                type="text"
                value={newReview?.title}
                onChange={(e) => setNewReview(prev => ({ ...prev, title: e?.target?.value }))}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                placeholder="Summarize your review"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Review
              </label>
              <textarea
                value={newReview?.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e?.target?.value }))}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                rows="4"
                placeholder="Tell others what you think about this product"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" iconName="Send">
                Submit Review
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowWriteReview(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Sort Options */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="px-3 py-1 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
        >
          <option value="helpful">Most Helpful</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="rating-high">Highest Rating</option>
          <option value="rating-low">Lowest Rating</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews?.map((review) => (
          <div key={review?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                {review?.avatar}
              </div>

              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-foreground">
                      {review?.name}
                    </h4>
                    {review?.verified && (
                      <span className="bg-success/10 text-success text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                        <Icon name="CheckCircle" size={12} />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(review?.date)}
                  </span>
                </div>

                {/* Rating and Title */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review?.rating)}
                  </div>
                  <h5 className="font-medium text-foreground">
                    {review?.title}
                  </h5>
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground leading-relaxed">
                  {review?.comment}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => handleHelpfulClick(review?.id)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="ThumbsUp" size={14} />
                    Helpful ({review?.helpful})
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="Flag" size={14} />
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Reviews */}
      <div className="text-center">
        <Button variant="outline" iconName="ChevronDown">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default ProductReviews;