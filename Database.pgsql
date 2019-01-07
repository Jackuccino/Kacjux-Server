------ Table: "Kacjux"."Items" ------
-- DROP TABLE "Kacjux"."Items";
CREATE TABLE "Kacjux"."Items"
(
  "ItemId" SERIAL NOT NULL PRIMARY KEY,
  "Name" VARCHAR(150) NOT NULL,
  "Image" VARCHAR(50),
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

------ REST Query for Items ------
SELECT * FROM "Kacjux"."Items";
INSERT INTO "Kacjux"."Items" ("Name", "Image", "Description", "Price", "Type") VALUES ('Mar Far Chichen', 'mfch.png', 'Fried Chichen', 10.00, 'Selected Delicious Cuisine');
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
  "Name": "Pot Stickers",
  "Image": require("./app/assets/images/potsticker.jpg"),
  "Description": "Pot Stickers",
  "price": 9.75,
    "Type": "   Appetizers"
}
{
  "Name": "Mar Far Chichen",
  "Image": require("./app/assets/images/mfch.png"),
  "Description": "Mar Far Chichen",
  "price": 10.25,
    "Type": "Selected Delicious Cuisine"
}
{
  "Name": "Lemon Chicken",
  "Image": require("./app/assets/images/lemonch.jpg"),
  "Description": "Lemon Chicken",
  "price": 11.75,
    "Type": "Selected Delicious Cuisine"
}
{
  "Name": "Sesame Chicken",
  "Image": require("./app/assets/images/sesamech.jpg"),
  "Description": "Sesame Chicken",
  "price": 11.50,
    "Type": "Selected Delicious Cuisine"
}
{
    "Name": "Barbeque Pork",
  "Image": require("./app/assets/images/bbqpork.jpg"),
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