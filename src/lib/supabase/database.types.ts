// Generated from the live database schema. Do not edit by hand:
// regenerate after every migration (see docs/database.md).

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      keywords: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      people: {
        Row: {
          id: number
          known_for_department: string | null
          name: string
          profile_path: string | null
          updated_at: string
        }
        Insert: {
          id: number
          known_for_department?: string | null
          name: string
          profile_path?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          known_for_department?: string | null
          name?: string
          profile_path?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          region: string
          updated_at: string
          username: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          region?: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          region?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      providers: {
        Row: {
          display_priority: number | null
          id: number
          logo_path: string | null
          name: string
          updated_at: string
        }
        Insert: {
          display_priority?: number | null
          id: number
          logo_path?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          display_priority?: number | null
          id?: number
          logo_path?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      title_availability: {
        Row: {
          offer_type: Database["public"]["Enums"]["offer_type"]
          provider_id: number
          region: string
          title_id: string
        }
        Insert: {
          offer_type: Database["public"]["Enums"]["offer_type"]
          provider_id: number
          region: string
          title_id: string
        }
        Update: {
          offer_type?: Database["public"]["Enums"]["offer_type"]
          provider_id?: number
          region?: string
          title_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "title_availability_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "title_availability_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "titles"
            referencedColumns: ["id"]
          },
        ]
      }
      title_credits: {
        Row: {
          character: string | null
          ord: number
          person_id: number
          role: Database["public"]["Enums"]["credit_role"]
          title_id: string
        }
        Insert: {
          character?: string | null
          ord?: number
          person_id: number
          role: Database["public"]["Enums"]["credit_role"]
          title_id: string
        }
        Update: {
          character?: string | null
          ord?: number
          person_id?: number
          role?: Database["public"]["Enums"]["credit_role"]
          title_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "title_credits_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "title_credits_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "titles"
            referencedColumns: ["id"]
          },
        ]
      }
      titles: {
        Row: {
          availability_fetched_at: string | null
          backdrop_path: string | null
          created_at: string
          details_fetched_at: string | null
          genre_ids: number[]
          id: string
          imdb_id: string | null
          keyword_ids: number[]
          media_type: Database["public"]["Enums"]["media_type"]
          number_of_seasons: number | null
          origin_countries: string[]
          original_language: string | null
          original_title: string | null
          overview: string | null
          popularity: number | null
          poster_path: string | null
          release_date: string | null
          runtime_minutes: number | null
          status: string | null
          tagline: string | null
          title: string
          tmdb_id: number
          updated_at: string
          vote_average: number | null
          vote_count: number | null
        }
        Insert: {
          availability_fetched_at?: string | null
          backdrop_path?: string | null
          created_at?: string
          details_fetched_at?: string | null
          genre_ids?: number[]
          id: string
          imdb_id?: string | null
          keyword_ids?: number[]
          media_type: Database["public"]["Enums"]["media_type"]
          number_of_seasons?: number | null
          origin_countries?: string[]
          original_language?: string | null
          original_title?: string | null
          overview?: string | null
          popularity?: number | null
          poster_path?: string | null
          release_date?: string | null
          runtime_minutes?: number | null
          status?: string | null
          tagline?: string | null
          title: string
          tmdb_id: number
          updated_at?: string
          vote_average?: number | null
          vote_count?: number | null
        }
        Update: {
          availability_fetched_at?: string | null
          backdrop_path?: string | null
          created_at?: string
          details_fetched_at?: string | null
          genre_ids?: number[]
          id?: string
          imdb_id?: string | null
          keyword_ids?: number[]
          media_type?: Database["public"]["Enums"]["media_type"]
          number_of_seasons?: number | null
          origin_countries?: string[]
          original_language?: string | null
          original_title?: string | null
          overview?: string | null
          popularity?: number | null
          poster_path?: string | null
          release_date?: string | null
          runtime_minutes?: number | null
          status?: string | null
          tagline?: string | null
          title?: string
          tmdb_id?: number
          updated_at?: string
          vote_average?: number | null
          vote_count?: number | null
        }
        Relationships: []
      }
      usage_days: {
        Row: {
          day: string
          user_id: string
        }
        Insert: {
          day?: string
          user_id: string
        }
        Update: {
          day?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      credit_role:
        | "director"
        | "writer"
        | "creator"
        | "cinematographer"
        | "composer"
        | "cast"
      media_type: "movie" | "tv"
      offer_type: "flatrate" | "free" | "ads" | "rent" | "buy"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      credit_role: [
        "director",
        "writer",
        "creator",
        "cinematographer",
        "composer",
        "cast",
      ],
      media_type: ["movie", "tv"],
      offer_type: ["flatrate", "free", "ads", "rent", "buy"],
    },
  },
} as const
