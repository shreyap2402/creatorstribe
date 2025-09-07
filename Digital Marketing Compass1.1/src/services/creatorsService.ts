import { table } from '@devvai/devv-code-backend';

const TABLE_ID = 'excjf77qxxxc'; // Creators table ID

export interface Creator {
  _uid?: string;
  _id?: string;
  _tid?: string;
  name: string;
  email: string;
  specialty: string;
  followers: number;
  engagement_rate: number;
  rate_per_post: number;
  instagram: string;
  tiktok: string;
  youtube: string;
  bio: string;
  location: string;
  image_url: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Suspended';
  rating: number;
  completed_campaigns: number;
  joined_date: string;
  tags: string;
  portfolio_items: string; // JSON string of portfolio items
}

export interface CreatorFormData {
  name: string;
  email: string;
  specialty: string;
  followers: number;
  engagement_rate: number;
  rate_per_post: number;
  instagram: string;
  tiktok: string;
  youtube: string;
  bio: string;
  location: string;
  image_url: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Suspended';
  rating: number;
  completed_campaigns: number;
  tags: string;
  portfolio_items: Array<{
    title: string;
    description: string;
    image_url: string;
    metrics: {
      views: number;
      likes: number;
      comments: number;
    };
  }>;
}

export class CreatorsService {
  
  async getAllCreators(options?: {
    limit?: number;
    cursor?: string;
    specialty?: string;
    status?: string;
    searchTerm?: string;
  }) {
    try {
      const queryOptions: any = {
        limit: options?.limit || 50,
        cursor: options?.cursor,
        sort: '_id',
        order: 'desc' as const
      };

      // Add filters if provided
      if (options?.specialty) {
        queryOptions.query = { specialty: options.specialty };
      } else if (options?.status) {
        queryOptions.query = { status: options.status };
      }

      const response = await table.getItems(TABLE_ID, queryOptions);
      
      // Filter by search term on client side if provided
      let filteredItems = response.items;
      if (options?.searchTerm) {
        const searchLower = options.searchTerm.toLowerCase();
        filteredItems = response.items.filter((creator: Creator) => 
          creator.name.toLowerCase().includes(searchLower) ||
          creator.email.toLowerCase().includes(searchLower) ||
          creator.specialty.toLowerCase().includes(searchLower) ||
          creator.location.toLowerCase().includes(searchLower)
        );
      }

      return {
        creators: filteredItems as Creator[],
        nextCursor: response.nextCursor
      };
    } catch (error) {
      console.error('Error fetching creators:', error);
      throw error;
    }
  }

  async getCreatorById(uid: string, id: string): Promise<Creator | null> {
    try {
      const response = await table.getItems(TABLE_ID, {
        query: { _uid: uid, _id: id },
        limit: 1
      });
      
      return response.items.length > 0 ? response.items[0] as Creator : null;
    } catch (error) {
      console.error('Error fetching creator:', error);
      throw error;
    }
  }

  async createCreator(creatorData: CreatorFormData): Promise<void> {
    try {
      const portfolioJson = JSON.stringify(creatorData.portfolio_items);
      
      await table.addItem(TABLE_ID, {
        name: creatorData.name,
        email: creatorData.email,
        specialty: creatorData.specialty,
        followers: creatorData.followers,
        engagement_rate: creatorData.engagement_rate,
        rate_per_post: creatorData.rate_per_post,
        instagram: creatorData.instagram,
        tiktok: creatorData.tiktok,
        youtube: creatorData.youtube,
        bio: creatorData.bio,
        location: creatorData.location,
        image_url: creatorData.image_url,
        status: creatorData.status,
        rating: creatorData.rating,
        completed_campaigns: creatorData.completed_campaigns,
        joined_date: new Date().toISOString(),
        tags: creatorData.tags,
        portfolio_items: portfolioJson
      });
    } catch (error) {
      console.error('Error creating creator:', error);
      throw error;
    }
  }

  async updateCreator(creator: Creator): Promise<void> {
    try {
      if (!creator._uid || !creator._id) {
        throw new Error('Creator must have _uid and _id for updates');
      }

      await table.updateItem(TABLE_ID, {
        _uid: creator._uid,
        _id: creator._id,
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
        portfolio_items: creator.portfolio_items
      });
    } catch (error) {
      console.error('Error updating creator:', error);
      throw error;
    }
  }

  async deleteCreator(uid: string, id: string): Promise<void> {
    try {
      await table.deleteItem(TABLE_ID, {
        _uid: uid,
        _id: id
      });
    } catch (error) {
      console.error('Error deleting creator:', error);
      throw error;
    }
  }

  async getCreatorsBySpecialty(specialty: string) {
    try {
      const response = await table.getItems(TABLE_ID, {
        query: { specialty },
        sort: '_id',
        order: 'desc' as const,
        limit: 100
      });

      return response.items as Creator[];
    } catch (error) {
      console.error('Error fetching creators by specialty:', error);
      throw error;
    }
  }

  async getCreatorsByStatus(status: string) {
    try {
      const response = await table.getItems(TABLE_ID, {
        query: { status },
        sort: '_id',
        order: 'desc' as const,
        limit: 100
      });

      return response.items as Creator[];
    } catch (error) {
      console.error('Error fetching creators by status:', error);
      throw error;
    }
  }
}

export const creatorsService = new CreatorsService();