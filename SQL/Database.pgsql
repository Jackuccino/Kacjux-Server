------ Table: "Kacjux"."Items" ------
-- DROP TABLE "Kacjux"."Items";
CREATE TABLE "Kacjux"."Items"
(
  "ItemId" SERIAL NOT NULL PRIMARY KEY,
  "Key" VARCHAR(150) NOT NULL,
  "Description" VARCHAR(1000),
  "Image" VARCHAR(150) NOT NULL,
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
  "TableNum" INTEGER NOT NULL,
  "Date" DATE NOT NULL DEFAULT CURRENT_DATE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "Kacjux"."Orders"
  OWNER TO jackxu;

------ Create Item Procedures ------
--------------------------------------------------------------------
CREATE OR REPLACE FUNCTION "Kacjux"."Get_All_Items"()
RETURNS SETOF "Kacjux"."Items"
LANGUAGE SQL
AS $$
SELECT * FROM "Kacjux"."Items";
$$;
--------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE "Kacjux"."Insert_Item"(key VARCHAR(150), description VARCHAR(1000), image VARCHAR(150), price MONEY, type VARCHAR(50))
LANGUAGE SQL
AS $$
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Image", "Price", "Type") 
VALUES (key, description, image, price, type);
$$;
--------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE "Kacjux"."Get_Item"(id INTEGER)
LANGUAGE SQL
AS $$
SELECT * FROM "Kacjux"."Items" WHERE "ItemId" = id;
$$;
--------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE "Kacjux"."Update_Item"(key VARCHAR(150), description VARCHAR(1000), image VARCHAR(150), price MONEY, type VARCHAR(50), id INTEGER)
LANGUAGE SQL
AS $$
UPDATE "Kacjux"."Items" SET "Key" = key, "Description" = description, "Image" = image, "Price" = price, "Type" = type WHERE "ItemId" = id;
$$;
--------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE "Kacjux"."Delete_Item"(id INTEGER)
LANGUAGE SQL
AS $$
DELETE FROM "Kacjux"."Items" WHERE "ItemId" = id;
$$;
--------------------------------------------------------------------

------ Drop Item Procedures ------
--------------------------------------------------------------------
DROP FUNCTION "Kacjux"."Get_All_Items";
--------------------------------------------------------------------
DROP PROCEDURE "Kacjux"."Insert_Item";
--------------------------------------------------------------------
DROP PROCEDURE "Kacjux"."Get_Item";
--------------------------------------------------------------------
DROP PROCEDURE "Kacjux"."Update_Item";
--------------------------------------------------------------------
DROP PROCEDURE "Kacjux"."Delete_Item";
--------------------------------------------------------------------

------ Create Order Procedures ------
--- 
--------------------------------------------------------------------
CREATE OR REPLACE FUNCTION "Kacjux"."Get_All_Orders"()
RETURNS SETOF "Kacjux"."Orders"
LANGUAGE SQL
AS $$
SELECT * FROM "Kacjux"."Orders";
$$;
--- 
--------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE "Kacjux"."Insert_Order"(orderno INTEGER, totalprice MONEY, itemid INTEGER, quantity INTEGER, note VARCHAR(1000), tableNum INTEGER)
LANGUAGE SQL
AS $$
INSERT INTO "Kacjux"."Orders" ("OrderNo", "TotalPrice", "OrderItem", "Quantity", "Note", "TableNum") 
VALUES (orderno, totalprice, itemid, quantity, note, tableNum);
$$;
--- 
--------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE "Kacjux"."Get_Order"(id INTEGER)
LANGUAGE SQL
AS $$
SELECT * FROM "Kacjux"."Orders" WHERE "OrderId" = id;
$$;
--- 
--------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE "Kacjux"."Close_Order"(tf BOOLEAN, id INTEGER)
LANGUAGE SQL
AS $$
UPDATE "Kacjux"."Orders" SET "Closed" = tf WHERE "OrderId" = id;
$$;
--- 
--------------------------------------------------------------------
CREATE OR REPLACE PROCEDURE "Kacjux"."Delete_Order"(id INTEGER)
LANGUAGE SQL
AS $$
DELETE FROM "Kacjux"."Orders" WHERE "OrderId" = id;
$$;
--------------------------------------------------------------------

------ Drop Order Procedures ------
DROP FUNCTION "Kacjux"."Get_All_Orders";
--------------------------------------------------------------------
DROP PROCEDURE "Kacjux"."Insert_Order";
--------------------------------------------------------------------
DROP PROCEDURE "Kacjux"."Get_Order";
--------------------------------------------------------------------
DROP PROCEDURE "Kacjux"."Close_Order";
--------------------------------------------------------------------
DROP PROCEDURE "Kacjux"."Delete_Order";
--------------------------------------------------------------------

------ REST Query for Items ------
--------------------------------------------------------------------
SELECT * FROM "Kacjux"."Items";
--------------------------------------------------------------------
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Image", "Price", "Type") 
VALUES ('Pot Stickers', 'Pot Stickers', 'pot_sticker', 9.75, 'Appetizers');
--------------------------------------------------------------------
CALL "Kacjux"."Update_Item"(CAST('Pot Stickers' AS VARCHAR(150)), 
CAST('Pot Stickers' AS VARCHAR(1000)), CAST('pot_sticker' AS VARCHAR(150)), 
CAST(8.25 AS MONEY), CAST('Appetizers' AS VARCHAR(50)), CAST(1 AS INTEGER))
--------------------------------------------------------------------
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Image", "Price", "Type") 
VALUES ('Mar Far Chicken', 'Mar Far Chicken', 'mar_far_chicken', 10.75, 'Selected Delicious Cuisine');
--------------------------------------------------------------------
CALL "Kacjux"."Update_Item"(CAST('Mar Far Chicken' AS VARCHAR(150)), 
CAST('Mar Far Chicken' AS VARCHAR(1000)), CAST('mar_far_chicken' AS VARCHAR(150)), 
CAST(10.75 AS MONEY), CAST('Selected Delicious Cuisine' AS VARCHAR(50)), CAST(2 AS INTEGER))
--------------------------------------------------------------------
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Image", "Price", "Type") 
VALUES ('Lemon Chicken', 'Lemon Chicken', 'lemon_chicken', 12.25, 'Selected Delicious Cuisine');
--------------------------------------------------------------------
CALL "Kacjux"."Update_Item"(CAST('Lemon Chicken' AS VARCHAR(150)), 
CAST('Lemon Chicken' AS VARCHAR(1000)), CAST('lemon_chicken' AS VARCHAR(150)), 
CAST(12.25 AS MONEY), CAST('Selected Delicious Cuisine' AS VARCHAR(50)), CAST(3 AS INTEGER))
--------------------------------------------------------------------
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Image", "Price", "Type") 
VALUES ('Sesame Chicken', 'Sesame Chicken', 'sesame_chicken', 12.00, 'Hot Spicy & House Specials');
--------------------------------------------------------------------
CALL "Kacjux"."Update_Item"(CAST('Sesame Chicken' AS VARCHAR(150)), 
CAST('Sesame Chicken' AS VARCHAR(1000)), CAST('sesame_chicken' AS VARCHAR(150)), 
CAST(12.00 AS MONEY), CAST('Hot Spicy & House Specials' AS VARCHAR(50)), CAST(4 AS INTEGER))
--------------------------------------------------------------------
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Image", "Price", "Type") 
VALUES ('Barbeque Pork', 'Barbeque Pork', 'barbeque_pork', 9.00, 'Appetizers');
--------------------------------------------------------------------
CALL "Kacjux"."Update_Item"(CAST('Barbeque Pork' AS VARCHAR(150)), 
CAST('Barbeque Pork' AS VARCHAR(1000)), CAST('barbeque_pork' AS VARCHAR(150)), 
CAST(9.00 AS MONEY), CAST('Appetizers' AS VARCHAR(50)), CAST(5 AS INTEGER))
--------------------------------------------------------------------
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Image", "Price", "Type") 
VALUES ('Pork Fried Rice', 'Pork Fried Rice', 'pork_fried_rice', 8.50, 'Rice');
--------------------------------------------------------------------
CALL "Kacjux"."Update_Item"(CAST('Pork Fried Rice' AS VARCHAR(150)), 
CAST('Pork Fried Rice' AS VARCHAR(1000)), CAST('pork_fried_rice' AS VARCHAR(150)), 
CAST(8.75 AS MONEY), CAST('Rice' AS VARCHAR(50)), CAST(6 AS INTEGER))
--------------------------------------------------------------------
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Image", "Price", "Type") 
VALUES ('Pork Foo Young', 'Pork Foo Young', 'pork_foo_young', 10.00, 'Egg Foo Young');
--------------------------------------------------------------------
CALL "Kacjux"."Update_Item"(CAST('Pork Foo Young' AS VARCHAR(150)), 
CAST('Pork Foo Young' AS VARCHAR(1000)), CAST('pork_foo_young' AS VARCHAR(150)), 
CAST(10.00 AS MONEY), CAST('Egg Foo Young' AS VARCHAR(50)), CAST(7 AS INTEGER))
--------------------------------------------------------------------
INSERT INTO "Kacjux"."Items" ("Key", "Description", "Image", "Price", "Type") 
VALUES ('Beef Chow Fun', 'Beef Chow Fun', 'beef_chow_fun', 12.50, 'Selected Delicious Cuisine');
--------------------------------------------------------------------
CALL "Kacjux"."Update_Item"(CAST('Beef Chow Fun' AS VARCHAR(150)), 
CAST('Beef Chow Fun' AS VARCHAR(1000)), CAST('beef_chow_fun' AS VARCHAR(150)), 
CAST(12.50 AS MONEY), CAST('Selected Delicious Cuisine' AS VARCHAR(50)), CAST(8 AS INTEGER))
--------------------------------------------------------------------
SELECT * FROM "Kacjux"."Items" WHERE "ItemId" = 1;
--------------------------------------------------------------------
UPDATE "Kacjux"."Items" SET "Price" = '$11.00' WHERE "ItemId" = 1;
--------------------------------------------------------------------
DELETE FROM "Kacjux"."Items" WHERE "ItemId" = 1;
--------------------------------------------------------------------

------ REST Query for Orders ------
SELECT * FROM "Kacjux"."Orders";
--------------------------------------------------------------------
INSERT INTO "Kacjux"."Orders" ("OrderNo", "TotalPrice", "OrderItem", "Quantity", "Note") VALUES (36, 10.00, 2, 2, NULL);
--------------------------------------------------------------------
SELECT * FROM "Kacjux"."Orders" WHERE "OrderId" = 2;
--------------------------------------------------------------------
UPDATE "Kacjux"."Orders" SET "Closed" = TRUE, "Note" = '911 Spicy' WHERE "OrderId" = 2;
--------------------------------------------------------------------
DELETE FROM "Kacjux"."Orders" WHERE "OrderId" = 5;
--------------------------------------------------------------------

------ Postman Body ------
-- insert item --
--------------------------------------------------------------------
{
  "Key": "Pot Stickers",
  "Image": "require('./app/assets/images/potsticker.jpg')",
  "Description": "Pot Stickers",
  "Price": 9.75,
  "Type": "Appetizers"
}
--------------------------------------------------------------------
{
  "Key": "Mar Far Chichen",
  "Image": "require('./app/assets/images/mfch.png')",
  "Description": "Mar Far Chichen",
  "Price": 10.25,
  "Type": "Selected Delicious Cuisine"
}
--------------------------------------------------------------------
{
  "Key": "Lemon Chicken",
  "Image": "require('./app/assets/images/lemonch.jpg')",
  "Description": "Lemon Chicken",
  "Price": 11.75,
  "Type": "Selected Delicious Cuisine"
}
--------------------------------------------------------------------
{
  "Key": "Sesame Chicken",
  "Image": "require('./app/assets/images/sesamech.jpg')",
  "Description": "Sesame Chicken",
  "Price": 11.50,
  "Type": "Selected Delicious Cuisine"
}
--------------------------------------------------------------------
{
  "Key": "Barbeque Pork",
  "Image": "require('./app/assets/images/bbqpork.jpg')",
  "Description": "Barbeque Pork",
  "Price": 8.50,
  "Type": "Appetizers"
}
--------------------------------------------------------------------
-- insert order --
--------------------------------------------------------------------
{
  "OrderNo": "1",
  "TotalPrice": "",
  "OrderItem": "",
  "Quantity": "",
  "Note": ""
}
--------------------------------------------------------------------