ALTER TABLE "auth_user" ADD COLUMN "first_name" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "auth_user" ADD COLUMN "last_name" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "auth_user" ADD COLUMN "email" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "auth_user" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "auth_user" ("username");