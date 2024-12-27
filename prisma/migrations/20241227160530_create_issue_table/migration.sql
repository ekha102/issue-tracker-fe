-- CreateTable
CREATE TABLE `Issue` (
    `issue_id` INTEGER NOT NULL AUTO_INCREMENT,
    `issue_title` VARCHAR(255) NOT NULL,
    `issue_desc` TEXT NOT NULL,
    `issue_status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    `issue_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `issue_updated` DATETIME(3) NOT NULL,

    PRIMARY KEY (`issue_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
