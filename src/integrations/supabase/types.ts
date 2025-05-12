export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      case_studies: {
        Row: {
          challenge: string | null
          company_name: string | null
          id: string
          resource_id: string | null
          results_md: string | null
          solution: string | null
          technologies: string[] | null
        }
        Insert: {
          challenge?: string | null
          company_name?: string | null
          id?: string
          resource_id?: string | null
          results_md?: string | null
          solution?: string | null
          technologies?: string[] | null
        }
        Update: {
          challenge?: string | null
          company_name?: string | null
          id?: string
          resource_id?: string | null
          results_md?: string | null
          solution?: string | null
          technologies?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "case_studies_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: true
            referencedRelation: "lesson_resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_case_resource"
            columns: ["resource_id"]
            isOneToOne: true
            referencedRelation: "lesson_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_articles: {
        Row: {
          id: string
          lesson_id: string | null
          order: number | null
          source_name: string | null
          title: string | null
          url: string | null
        }
        Insert: {
          id?: string
          lesson_id?: string | null
          order?: number | null
          source_name?: string | null
          title?: string | null
          url?: string | null
        }
        Update: {
          id?: string
          lesson_id?: string | null
          order?: number | null
          source_name?: string | null
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_articles_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_resources: {
        Row: {
          id: string
          lesson_id: string
          markdown_body: string | null
          order: number | null
          resource_type: string
          title: string | null
          url: string | null
        }
        Insert: {
          id?: string
          lesson_id: string
          markdown_body?: string | null
          order?: number | null
          resource_type: string
          title?: string | null
          url?: string | null
        }
        Update: {
          id?: string
          lesson_id?: string
          markdown_body?: string | null
          order?: number | null
          resource_type?: string
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_resources_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string | null
          est_time_minutes: number | null
          id: string
          order: number
          slug: string | null
          stage_id: string
          summary: string | null
          title: string
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          est_time_minutes?: number | null
          id?: string
          order: number
          slug?: string | null
          stage_id: string
          summary?: string | null
          title: string
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          est_time_minutes?: number | null
          id?: string
          order?: number
          slug?: string | null
          stage_id?: string
          summary?: string | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "stages"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          preferred_language: string | null
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          preferred_language?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          preferred_language?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      roadmaps: {
        Row: {
          created_at: string | null
          data: Json
          id: string
          skill_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          id?: string
          skill_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: string
          skill_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "roadmaps_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roadmaps_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      stages: {
        Row: {
          id: string
          order: number
          roadmap_id: string
          title: string
        }
        Insert: {
          id?: string
          order: number
          roadmap_id: string
          title: string
        }
        Update: {
          id?: string
          order?: number
          roadmap_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "stages_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      user_learning_streaks: {
        Row: {
          created_at: string | null
          id: string
          last_activity_date: string | null
          streak_count: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_activity_date?: string | null
          streak_count?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_activity_date?: string | null
          streak_count?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_lesson_progress: {
        Row: {
          completed_at: string | null
          id: string
          last_viewed_resource: string | null
          lesson_id: string | null
          percent_complete: number | null
          started_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          last_viewed_resource?: string | null
          lesson_id?: string | null
          percent_complete?: number | null
          started_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          last_viewed_resource?: string | null
          lesson_id?: string | null
          percent_complete?: number | null
          started_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_lesson_progress_last_viewed_resource_fkey"
            columns: ["last_viewed_resource"]
            isOneToOne: false
            referencedRelation: "lesson_resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roadmap_progress: {
        Row: {
          id: string
          percent: number | null
          roadmap_id: string
          stage: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          percent?: number | null
          roadmap_id: string
          stage?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          percent?: number | null
          roadmap_id?: string
          stage?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skills: {
        Row: {
          id: string
          last_interaction_at: string | null
          percent_complete: number | null
          skill_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          last_interaction_at?: string | null
          percent_complete?: number | null
          skill_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          last_interaction_at?: string | null
          percent_complete?: number | null
          skill_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          preferred_language: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          preferred_language?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          preferred_language?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      user_streaks: {
        Row: {
          current_streak_days: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
