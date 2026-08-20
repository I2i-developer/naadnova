export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          role: "admin" | "visitor" | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          role?: "admin" | "visitor" | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      courses: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string | null;
          description: string | null;
          instrument: string;
          age_group: string | null;
          level: string | null;
          class_duration: string | null;
          frequency: string | null;
          mode: "online" | "offline" | "both" | null;
          featured_image: string | null;
          price: number | null;
          is_featured: boolean;
          is_published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          short_description?: string | null;
          description?: string | null;
          instrument: string;
          age_group?: string | null;
          level?: string | null;
          class_duration?: string | null;
          frequency?: string | null;
          mode?: "online" | "offline" | "both" | null;
          featured_image?: string | null;
          price?: number | null;
          is_featured?: boolean;
          is_published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["courses"]["Insert"]>;
      };
      enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          type: "trial" | "contact" | "general";
          instrument: string | null;
          age_group: string | null;
          experience_level: string | null;
          learning_mode: "online" | "offline" | "either" | null;
          preferred_date: string | null;
          preferred_time: string | null;
          message: string | null;
          source: string | null;
          status: "new" | "contacted" | "trial_scheduled" | "converted" | "not_interested" | "closed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          type?: "trial" | "contact" | "general";
          instrument?: string | null;
          age_group?: string | null;
          experience_level?: string | null;
          learning_mode?: "online" | "offline" | "either" | null;
          preferred_date?: string | null;
          preferred_time?: string | null;
          message?: string | null;
          source?: string | null;
          status?: "new" | "contacted" | "trial_scheduled" | "converted" | "not_interested" | "closed";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["enquiries"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
