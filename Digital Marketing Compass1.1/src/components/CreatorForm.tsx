import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { Creator, CreatorFormData } from '@/services/creatorsService';

interface CreatorFormProps {
  creator?: Creator;
  onSubmit: (data: CreatorFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

interface PortfolioItem {
  title: string;
  description: string;
  image_url: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
  };
}

export function CreatorForm({ creator, onSubmit, onCancel, isLoading }: CreatorFormProps) {
  const [formData, setFormData] = useState<CreatorFormData>({
    name: '',
    email: '',
    specialty: 'Lifestyle',
    followers: 0,
    engagement_rate: 0,
    rate_per_post: 0,
    instagram: '',
    tiktok: '',
    youtube: '',
    bio: '',
    location: '',
    image_url: '',
    status: 'Pending',
    rating: 5,
    completed_campaigns: 0,
    tags: '',
    portfolio_items: []
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  useEffect(() => {
    if (creator) {
      setFormData({
        name: creator.name,
        email: creator.email,
        specialty: creator.specialty,
        followers: creator.followers,
        engagement_rate: creator.engagement_rate,
        rate_per_post: creator.rate_per_post,
        instagram: creator.instagram,
        tiktok: creator.tiktok,
        youtube: creator.youtube,
        bio: creator.bio,
        location: creator.location,
        image_url: creator.image_url,
        status: creator.status,
        rating: creator.rating,
        completed_campaigns: creator.completed_campaigns,
        tags: creator.tags,
        portfolio_items: []
      });

      // Parse portfolio items if they exist
      try {
        const parsed = JSON.parse(creator.portfolio_items || '[]');
        setPortfolioItems(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Error parsing portfolio items:', error);
        setPortfolioItems([]);
      }
    }
  }, [creator]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      portfolio_items: portfolioItems
    };

    try {
      await onSubmit(submissionData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const addPortfolioItem = () => {
    setPortfolioItems([...portfolioItems, {
      title: '',
      description: '',
      image_url: '',
      metrics: { views: 0, likes: 0, comments: 0 }
    }]);
  };

  const updatePortfolioItem = (index: number, field: string, value: any) => {
    const updated = [...portfolioItems];
    if (field.startsWith('metrics.')) {
      const metricField = field.split('.')[1];
      updated[index].metrics[metricField as keyof typeof updated[0]['metrics']] = value;
    } else {
      (updated[index] as any)[field] = value;
    }
    setPortfolioItems(updated);
  };

  const removePortfolioItem = (index: number) => {
    setPortfolioItems(portfolioItems.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.split(',').map(t => t.trim()).includes(currentTag.trim())) {
      const newTags = formData.tags ? `${formData.tags}, ${currentTag.trim()}` : currentTag.trim();
      setFormData({ ...formData, tags: newTags });
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t !== tagToRemove)
      .join(', ');
    setFormData({ ...formData, tags: updatedTags });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{creator ? 'Edit Creator' : 'Add New Creator'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="specialty">Specialty *</Label>
                <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Beauty">Beauty</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="followers">Followers</Label>
                <Input
                  id="followers"
                  type="number"
                  value={formData.followers}
                  onChange={(e) => setFormData({ ...formData, followers: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="engagement_rate">Engagement Rate (%)</Label>
                <Input
                  id="engagement_rate"
                  type="number"
                  step="0.1"
                  value={formData.engagement_rate}
                  onChange={(e) => setFormData({ ...formData, engagement_rate: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="rate_per_post">Rate per Post ($)</Label>
                <Input
                  id="rate_per_post"
                  type="number"
                  value={formData.rate_per_post}
                  onChange={(e) => setFormData({ ...formData, rate_per_post: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="instagram">Instagram Handle</Label>
                <Input
                  id="instagram"
                  placeholder="@username"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="tiktok">TikTok Handle</Label>
                <Input
                  id="tiktok"
                  placeholder="@username"
                  value={formData.tiktok}
                  onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="youtube">YouTube Channel</Label>
                <Input
                  id="youtube"
                  placeholder="Channel Name"
                  value={formData.youtube}
                  onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                />
              </div>
            </div>

            {/* Bio and Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="image_url">Profile Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
                {formData.image_url && (
                  <div className="mt-2">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add a tag..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.split(',').map(tag => tag.trim()).filter(Boolean).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Portfolio Items */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <Label>Portfolio Items</Label>
                <Button type="button" onClick={addPortfolioItem} size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Portfolio Item
                </Button>
              </div>
              
              <div className="space-y-4">
                {portfolioItems.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Portfolio Item {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePortfolioItem(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={item.title}
                            onChange={(e) => updatePortfolioItem(index, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Image URL</Label>
                          <Input
                            value={item.image_url}
                            onChange={(e) => updatePortfolioItem(index, 'image_url', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Label>Description</Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => updatePortfolioItem(index, 'description', e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <Label>Views</Label>
                          <Input
                            type="number"
                            value={item.metrics.views}
                            onChange={(e) => updatePortfolioItem(index, 'metrics.views', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label>Likes</Label>
                          <Input
                            type="number"
                            value={item.metrics.likes}
                            onChange={(e) => updatePortfolioItem(index, 'metrics.likes', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div>
                          <Label>Comments</Label>
                          <Input
                            type="number"
                            value={item.metrics.comments}
                            onChange={(e) => updatePortfolioItem(index, 'metrics.comments', parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : (creator ? 'Update Creator' : 'Create Creator')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}