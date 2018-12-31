------ Table: public."Items" ------
-- DROP TABLE public."Items";
CREATE TABLE public."Items"
(
  "ItemId" SERIAL NOT NULL PRIMARY KEY,
  "Name" VARCHAR(150) NOT NULL,
  "Description" VARCHAR(1000),
  "Price" MONEY NOT NULL,
  "Type" VARCHAR(50) NOT NULL,
  "Date" DATE NOT NULL DEFAULT CURRENT_DATE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."Items"
  OWNER TO jackxu;

------ Table: public."Orders" ------
-- DROP TABLE public."Orders";
CREATE TABLE public."Orders"
(
  "OrderId" SERIAL NOT NULL PRIMARY KEY,
  "OrderNo" INTEGER NOT NULL,
  "TotalPrice" MONEY NOT NULL,
  "OrderItem" INTEGER NOT NULL REFERENCES "Items"("ItemId"),
  "Quantity" INTEGER NOT NULL DEFAULT 1,
  "Closed" BOOLEAN NOT NULL DEFAULT false,
  "Note" VARCHAR(1000),
  "Date" DATE NOT NULL DEFAULT CURRENT_DATE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."Orders"
  OWNER TO jackxu;

------ REST Query for Items ------
SELECT * FROM "Items";
INSERT INTO "Items" ("Name", "Description", "Price", "Type") VALUES ('Mar Far Chichen', 'Fried Chichen', 10.00, 'Selected Delicious Cuisine');
SELECT * FROM "Items" WHERE "ItemId" = 1;
UPDATE "Items" SET "Price" = '$11.00' WHERE "ItemId" = 1;
DELETE FROM "Items" WHERE "ItemId" = 1;

------ REST Query for Orders ------
SELECT * FROM "Orders";
INSERT INTO "Orders" ("OrderNo", "TotalPrice", "OrderItem", "Quantity", "Note") VALUES (36, 10.00, 2, 2, NULL);
SELECT * FROM "Orders" WHERE "OrderId" = 2;
UPDATE "Orders" SET "Closed" = TRUE, "Note" = '911 Spicy' WHERE "OrderId" = 2;
DELETE FROM "Orders" WHERE "OrderId" = 5;