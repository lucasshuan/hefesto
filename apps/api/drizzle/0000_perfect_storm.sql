CREATE TYPE "public"."component_tiers" AS ENUM('budget', 'entry', 'mid', 'high', 'enthusiast');--> statement-breakpoint
CREATE TYPE "public"."source_trust_levels" AS ENUM('official', 'verified', 'community', 'unverified');--> statement-breakpoint
CREATE TYPE "public"."source_vendor_types" AS ENUM('retailer', 'marketplace', 'manufacturer', 'distributor', 'aggregator');--> statement-breakpoint
CREATE TYPE "public"."user_roles" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" bigint NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text
);
--> statement-breakpoint
ALTER TABLE "accounts" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "brands" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"name" varchar(120) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "brands" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "categories" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"name" varchar(120) NOT NULL,
	"parent_category_id" bigint
);
--> statement-breakpoint
ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "category_translations" (
	"category_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "component_features" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"component_id" bigint NOT NULL,
	"feature_id" bigint NOT NULL,
	"value_text" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "component_features" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "component" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"name" varchar(180) NOT NULL,
	"brand_id" bigint,
	"category_id" bigint,
	"model" varchar(120),
	"tier" "component_tiers" DEFAULT 'entry' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "component" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "favorite_component" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"component_id" bigint NOT NULL,
	"user_id" bigint NOT NULL
);
--> statement-breakpoint
ALTER TABLE "favorite_component" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "features" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"category_id" bigint NOT NULL,
	"name" varchar(120) NOT NULL,
	"key" varchar(120) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "features" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "listing_prices" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"listing_id" bigint NOT NULL,
	"price" numeric(12, 2) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listing_prices" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "listings" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"component_id" bigint NOT NULL,
	"source_id" bigint NOT NULL,
	"url" varchar(2048) NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"currency" varchar(3) DEFAULT 'BRL' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "session" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" bigint NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "session" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "source" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"name" varchar(160) NOT NULL,
	"domain" varchar(200),
	"country" varchar(2),
	"vendor_type" "source_vendor_types" DEFAULT 'retailer' NOT NULL,
	"trust_level" "source_trust_levels" DEFAULT 'unverified' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "source" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "user" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image_url" text,
	"role" "user_roles" DEFAULT 'user' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "verifications" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "fk_category_parent" FOREIGN KEY ("parent_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "component_features" ADD CONSTRAINT "fk_component_feature_component" FOREIGN KEY ("component_id") REFERENCES "public"."component"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "component_features" ADD CONSTRAINT "fk_component_feature_feature" FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "component" ADD CONSTRAINT "fk_component_brand" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "component" ADD CONSTRAINT "fk_component_category" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_component" ADD CONSTRAINT "fk_fc_component" FOREIGN KEY ("component_id") REFERENCES "public"."component"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_component" ADD CONSTRAINT "fk_fc_user" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "features" ADD CONSTRAINT "fk_feature_category" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_prices" ADD CONSTRAINT "fk_listing_price_listing" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "fk_listing_component" FOREIGN KEY ("component_id") REFERENCES "public"."component"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "fk_listing_source" FOREIGN KEY ("source_id") REFERENCES "public"."source"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_brand_name" ON "brands" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_category_name" ON "categories" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_comp_feature" ON "component_features" USING btree ("component_id","feature_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_component_name" ON "component" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_component_brand" ON "component" USING btree ("brand_id");--> statement-breakpoint
CREATE INDEX "idx_component_category" ON "component" USING btree ("category_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_feature_cat_key" ON "features" USING btree ("category_id","key");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_listing_source_component" ON "listings" USING btree ("source_id","component_id");--> statement-breakpoint
CREATE INDEX "idx_listing_component" ON "listings" USING btree ("component_id");--> statement-breakpoint
CREATE INDEX "idx_listing_source" ON "listings" USING btree ("source_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_source_name" ON "source" USING btree ("name");