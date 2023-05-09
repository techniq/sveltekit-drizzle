ALTER TABLE "auth_user" ALTER COLUMN "first_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "auth_user" ALTER COLUMN "last_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "auth_user" ALTER COLUMN "email" DROP NOT NULL;