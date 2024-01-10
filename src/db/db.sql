-- Tables from the database
-- Table structure for table `users`
CREATE TABLE `type19_node`.`users` (
`id` INT NOT NULL AUTO_INCREMENT , 
`name` VARCHAR(255) NOT NULL , 
`email` VARCHAR(255) NOT NULL , 
`password` VARCHAR(255) NOT NULL , 
`role_id` INT NOT NULL , 
PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Table structure for table `shop_items`
CREATE TABLE `type19_node`.`shop_items` (
`id` INT NOT NULL AUTO_INCREMENT , 
`name` VARCHAR(255) NOT NULL , 
`price` DECIMAL(10,2) NOT NULL , 
`description` TEXT NOT NULL , 
`image` TEXT NOT NULL , 
`item_type_id` INT NOT NULL , 
PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Table structure for table `item_types`
CREATE TABLE `type19_node`.`item_types` (
`id` INT NOT NULL AUTO_INCREMENT , 
`name` VARCHAR(255) NOT NULL , 
PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Table structure for table `orders`
CREATE TABLE `type19_node`.`orders` (
`id` INT NOT NULL AUTO_INCREMENT , 
`user_id` INT NOT NULL , 
`shop_item_id` INT NOT NULL , 
`quantity` INT NOT NULL , 
`total_price` DECIMAL(10,2) NOT NULL , 
`status` VARCHAR(255) NOT NULL , 
PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Table structure for table `user_roles`
CREATE TABLE `type19_node`.`user_roles` (
`id` INT NOT NULL AUTO_INCREMENT , 
`name` VARCHAR(255) NOT NULL , 
PRIMARY KEY (`id`)
) ENGINE = InnoDB;
-- /Tables from the database

-- Insert data into the item_types table
INSERT INTO `item_types` (`id`, `name`) VALUES 
(NULL, 'food'), 
(NULL, 'drink'), 
(NULL, 'electronic'), 
(NULL, 'clothes');

-- Insert data into the user_roles table
INSERT INTO `user_roles` (`id`, `name`) VALUES 
(NULL, 'admin'), 
(NULL, 'user'), 
(NULL, 'guest');