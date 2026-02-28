/**
 * Supabase database types.
 *
 * Generate real types from your Supabase schema by running:
 *   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
 *
 * For now, this is a placeholder that will be replaced once the DB schema is created.
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            classes: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    image_url: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database["public"]["Tables"]["classes"]["Row"],
                    "id" | "created_at" | "updated_at"
                >;
                Update: Partial<
                    Database["public"]["Tables"]["classes"]["Insert"]
                >;
            };
            items: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    type: string | null;
                    rarity: string | null;
                    image_url: string | null;
                    stats: Json | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database["public"]["Tables"]["items"]["Row"],
                    "id" | "created_at" | "updated_at"
                >;
                Update: Partial<
                    Database["public"]["Tables"]["items"]["Insert"]
                >;
            };
            recipes: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    result_item_id: string | null;
                    ingredients: Json | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database["public"]["Tables"]["recipes"]["Row"],
                    "id" | "created_at" | "updated_at"
                >;
                Update: Partial<
                    Database["public"]["Tables"]["recipes"]["Insert"]
                >;
            };
            skills: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    class_id: string | null;
                    type: string | null;
                    image_url: string | null;
                    stats: Json | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database["public"]["Tables"]["skills"]["Row"],
                    "id" | "created_at" | "updated_at"
                >;
                Update: Partial<
                    Database["public"]["Tables"]["skills"]["Insert"]
                >;
            };
            monsters: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    type: "monster" | "boss";
                    level: number | null;
                    hp: number | null;
                    image_url: string | null;
                    location: string | null;
                    drops: Json | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database["public"]["Tables"]["monsters"]["Row"],
                    "id" | "created_at" | "updated_at"
                >;
                Update: Partial<
                    Database["public"]["Tables"]["monsters"]["Insert"]
                >;
            };
            dungeons: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    level_range: string | null;
                    image_url: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database["public"]["Tables"]["dungeons"]["Row"],
                    "id" | "created_at" | "updated_at"
                >;
                Update: Partial<
                    Database["public"]["Tables"]["dungeons"]["Insert"]
                >;
            };
            npcs: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    location: string | null;
                    type: string | null;
                    image_url: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database["public"]["Tables"]["npcs"]["Row"],
                    "id" | "created_at" | "updated_at"
                >;
                Update: Partial<Database["public"]["Tables"]["npcs"]["Insert"]>;
            };
            quests: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    npc_id: string | null;
                    rewards: Json | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database["public"]["Tables"]["quests"]["Row"],
                    "id" | "created_at" | "updated_at"
                >;
                Update: Partial<
                    Database["public"]["Tables"]["quests"]["Insert"]
                >;
            };
            guides: {
                Row: {
                    id: string;
                    title: string;
                    slug: string;
                    content: string | null;
                    category: string | null;
                    author_id: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database["public"]["Tables"]["guides"]["Row"],
                    "id" | "created_at" | "updated_at"
                >;
                Update: Partial<
                    Database["public"]["Tables"]["guides"]["Insert"]
                >;
            };
            builds: {
                Row: {
                    id: string;
                    name: string;
                    class_id: string | null;
                    description: string | null;
                    skills: Json | null;
                    items: Json | null;
                    author_id: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database["public"]["Tables"]["builds"]["Row"],
                    "id" | "created_at" | "updated_at"
                >;
                Update: Partial<
                    Database["public"]["Tables"]["builds"]["Insert"]
                >;
            };
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    role: "admin" | "user";
                    display_name: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database["public"]["Tables"]["profiles"]["Row"],
                    "created_at" | "updated_at"
                >;
                Update: Partial<
                    Database["public"]["Tables"]["profiles"]["Insert"]
                >;
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: {
            monster_type: "monster" | "boss";
            user_role: "admin" | "user";
        };
        CompositeTypes: Record<string, never>;
    };
}
