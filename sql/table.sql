CREATE TABLE "loans" (
	"loan_id"	INTEGER NOT NULL,
	"firstname"	TEXT NOT NULL,
	"lastname"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	"loan_amount" INTEGER NOT NULL,
	"purpose"	TEXT NOT NULL,
	"status"	TEXT NOT NULL DEFAULT 'PENDING',
	PRIMARY KEY("loan_id" AUTOINCREMENT)
);