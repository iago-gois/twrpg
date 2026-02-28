import type { Database } from "./database";

// Convenience type aliases for table rows
export type GameClass = Database["public"]["Tables"]["classes"]["Row"];
export type Item = Database["public"]["Tables"]["items"]["Row"];
export type Recipe = Database["public"]["Tables"]["recipes"]["Row"];
export type Skill = Database["public"]["Tables"]["skills"]["Row"];
export type Monster = Database["public"]["Tables"]["monsters"]["Row"];
export type Dungeon = Database["public"]["Tables"]["dungeons"]["Row"];
export type NPC = Database["public"]["Tables"]["npcs"]["Row"];
export type Quest = Database["public"]["Tables"]["quests"]["Row"];
export type Guide = Database["public"]["Tables"]["guides"]["Row"];
export type Build = Database["public"]["Tables"]["builds"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

// Boss is a Monster with type = "boss"
export type Boss = Monster & { type: "boss" };

// Insert types
export type GameClassInsert = Database["public"]["Tables"]["classes"]["Insert"];
export type ItemInsert = Database["public"]["Tables"]["items"]["Insert"];
export type RecipeInsert = Database["public"]["Tables"]["recipes"]["Insert"];
export type SkillInsert = Database["public"]["Tables"]["skills"]["Insert"];
export type MonsterInsert = Database["public"]["Tables"]["monsters"]["Insert"];
export type DungeonInsert = Database["public"]["Tables"]["dungeons"]["Insert"];
export type NPCInsert = Database["public"]["Tables"]["npcs"]["Insert"];
export type QuestInsert = Database["public"]["Tables"]["quests"]["Insert"];
export type GuideInsert = Database["public"]["Tables"]["guides"]["Insert"];
export type BuildInsert = Database["public"]["Tables"]["builds"]["Insert"];

// Update types
export type GameClassUpdate = Database["public"]["Tables"]["classes"]["Update"];
export type ItemUpdate = Database["public"]["Tables"]["items"]["Update"];
export type RecipeUpdate = Database["public"]["Tables"]["recipes"]["Update"];
export type SkillUpdate = Database["public"]["Tables"]["skills"]["Update"];
export type MonsterUpdate = Database["public"]["Tables"]["monsters"]["Update"];
export type DungeonUpdate = Database["public"]["Tables"]["dungeons"]["Update"];
export type NPCUpdate = Database["public"]["Tables"]["npcs"]["Update"];
export type QuestUpdate = Database["public"]["Tables"]["quests"]["Update"];
export type GuideUpdate = Database["public"]["Tables"]["guides"]["Update"];
export type BuildUpdate = Database["public"]["Tables"]["builds"]["Update"];
