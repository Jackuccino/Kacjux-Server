------ Table: "Kacjux"."Items" ------
-- DROP TABLE "Kacjux"."Items";
CREATE TABLE "Kacjux"."Items"
(
  "ItemId" SERIAL NOT NULL PRIMARY KEY,
  "Key" VARCHAR(150) NOT NULL,
  "Description" VARCHAR(1000),
  "Price" MONEY NOT NULL,
  "Type" VARCHAR(50) NOT NULL,
  "Date" DATE NOT NULL DEFAULT CURRENT_DATE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Kacjux"."Items"
  OWNER TO jackxu;

------ Table: "Kacjux"."Orders" ------
-- DROP TABLE "Kacjux"."Orders";
CREATE TABLE "Kacjux"."Orders"
(
  "OrderId" SERIAL NOT NULL PRIMARY KEY,
  "OrderNo" INTEGER NOT NULL,
  "TotalPrice" MONEY NOT NULL,
  "OrderItem" INTEGER NOT NULL REFERENCES "Kacjux"."Items"("ItemId"),
  "Quantity" INTEGER NOT NULL DEFAULT 1,
  "Closed" BOOLEAN NOT NULL DEFAULT false,
  "Note" VARCHAR(1000),
  "Date" DATE NOT NULL DEFAULT CURRENT_DATE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Kacjux"."Orders"
  OWNER TO jackxu;

------ Create Item Procedures ------
CREATE OR REPLACE FUNCTION "Kacjux"."Get_All_Items"()
RETURNS SETOF "Kacjux"."Items"
LANGUAGE SQL
AS $$
SELECT * FROM "Kacjux"."Items";
$$;

CREATE OR REPLACE PROCEDURE "Kacjux"."Insert_Item"(key VARCHAR(150), description VARCHAR(1000), price MONEY, type VARCHAR(50))
LANGUAGE SQL
AS $$
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Price", "Type") 
VALUES (key, description, price, type);
$$;

CREATE OR REPLACE PROCEDURE "Kacjux"."Get_Item"(id INTEGER)
LANGUAGE SQL
AS $$
SELECT * FROM "Kacjux"."Items" WHERE "ItemId" = id;
$$;

CREATE OR REPLACE PROCEDURE "Kacjux"."Update_Item"(key VARCHAR(150), description VARCHAR(1000), price MONEY, type VARCHAR(50), id INTEGER)
LANGUAGE SQL
AS $$
UPDATE "Kacjux"."Items" SET "Key" = key, "Description" = description, "Price" = price, "Type" = type WHERE "ItemId" = id;
$$;

CREATE OR REPLACE PROCEDURE "Kacjux"."Delete_Item"(id INTEGER)
LANGUAGE SQL
AS $$
DELETE FROM "Kacjux"."Items" WHERE "ItemId" = id;
$$;

------ Create Order Procedures ------
CREATE OR REPLACE FUNCTION "Kacjux"."Get_All_Orders"()
RETURNS SETOF "Kacjux"."Orders"
LANGUAGE SQL
AS $$
SELECT * FROM "Kacjux"."Orders";
$$;

CREATE OR REPLACE PROCEDURE "Kacjux"."Insert_Order"(orderno INTEGER, totalprice MONEY, itemid INTEGER, quantity INTEGER, note VARCHAR(1000))
LANGUAGE SQL
AS $$
INSERT INTO "Kacjux"."Orders" ("OrderNo", "TotalPrice", "OrderItem", "Quantity", "Note") 
VALUES (orderno, totalprice, itemid, quantity, note);
$$;

CREATE OR REPLACE PROCEDURE "Kacjux"."Get_Order"(id INTEGER)
LANGUAGE SQL
AS $$
SELECT * FROM "Kacjux"."Orders" WHERE "OrderId" = id;
$$;

CREATE OR REPLACE PROCEDURE "Kacjux"."Close_Order"(tf BOOLEAN, id INTEGER)
LANGUAGE SQL
AS $$
UPDATE "Kacjux"."Orders" SET "Closed" = tf WHERE "OrderId" = id;
$$;

CREATE OR REPLACE PROCEDURE "Kacjux"."Delete_Order"(id INTEGER)
LANGUAGE SQL
AS $$
DELETE FROM "Kacjux"."Orders" WHERE "OrderId" = id;
$$;

------ REST Query for Items ------
SELECT * FROM "Kacjux"."Items";
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Price", "Type") 
VALUES ('Pot Stickers', 'Pot Stickers', 9.75, 'Appetizers');
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Price", "Type") 
VALUES ('Mar Far Chicken', 'Mar Far Chicken', 10.25, 'Selected Delicious Cuisine');
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Price", "Type") 
VALUES ('Lemon Chicken', 'Lemon Chicken', 11.75, 'Selected Delicious Cuisine');
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Price", "Type") 
VALUES ('Sesame Chicken', 'Sesame Chicken', 11.50, 'Selected Delicious Cuisine');
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Price", "Type") 
VALUES ('Barbeque Pork', 'Barbeque Pork', 8.50, 'Appetizers');
SELECT * FROM "Kacjux"."Items" WHERE "ItemId" = 1;
UPDATE "Kacjux"."Items" SET "Price" = '$11.00' WHERE "ItemId" = 1;
DELETE FROM "Kacjux"."Items" WHERE "ItemId" = 1;

------ REST Query for Orders ------
SELECT * FROM "Kacjux"."Orders";
INSERT INTO "Kacjux"."Orders" ("OrderNo", "TotalPrice", "OrderItem", "Quantity", "Note") VALUES (36, 10.00, 2, 2, NULL);
SELECT * FROM "Kacjux"."Orders" WHERE "OrderId" = 2;
UPDATE "Kacjux"."Orders" SET "Closed" = TRUE, "Note" = '911 Spicy' WHERE "OrderId" = 2;
DELETE FROM "Kacjux"."Orders" WHERE "OrderId" = 5;

------ Postman Body ------
-- insert item --
{
  "Key": "Pot Stickers",
  "Image": "require('./app/assets/images/potsticker.jpg')",
  "Description": "Pot Stickers",
  "Price": 9.75,
  "Type": "Appetizers"
}
{
  "Key": "Mar Far Chichen",
  "Image": "require('./app/assets/images/mfch.png')",
  "Description": "Mar Far Chichen",
  "Price": 10.25,
  "Type": "Selected Delicious Cuisine"
}
{
  "Key": "Lemon Chicken",
  "Image": "require('./app/assets/images/lemonch.jpg')",
  "Description": "Lemon Chicken",
  "Price": 11.75,
  "Type": "Selected Delicious Cuisine"
}
{
  "Key": "Sesame Chicken",
  "Image": "require('./app/assets/images/sesamech.jpg')",
  "Description": "Sesame Chicken",
  "Price": 11.50,
  "Type": "Selected Delicious Cuisine"
}
{
  "Key": "Barbeque Pork",
  "Image": "require('./app/assets/images/bbqpork.jpg')",
  "Description": "Barbeque Pork",
  "Price": 8.50,
  "Type": "Appetizers"
}
-- insert order --
{
  "OrderNo": "1",
  "TotalPrice": "",
  "OrderItem": "",
  "Quantity": "",
  "Note": ""
}